<template>
  <div>
    <b-navbar variant="dark" type="dark" class="d-flex justify-content-between align-items-center">
      <b-navbar-nav>
        <router-link to="/">
          <b-navbar-brand tag="h1" class="mb-0">LeTiCiA <sub>v1.0</sub></b-navbar-brand>
        </router-link>
        <b-nav-text class="navbar-button" v-if="showBookmarkButtons">
          <b-button variant="secondary" @click="goBack">
            <font-awesome-icon :icon="['fas', 'arrow-left']"></font-awesome-icon>
            Atrás
          </b-button>
        </b-nav-text>
        <b-nav-text class="navbar-button" v-if="showCurrentTask">
          <b-button v-b-modal.current-task variant="info" @click="showTaskModal">
            <font-awesome-icon :icon="['fas', 'tasks']"></font-awesome-icon>
            Tarea actual
          </b-button>
        </b-nav-text>
      </b-navbar-nav>

      <b-navbar-nav v-if="currentTimer">
        <b-nav-text class="navbar-text">
          <b>{{ currentTimer }}</b>
        </b-nav-text>
      </b-navbar-nav>

      <b-navbar-nav v-if="currentUser">
        <b-nav-text class="navbar-button" v-if="showBookmarkButtons">
          <b-button variant="primary" v-if="showBookmarkDocument" @click="bookmark">
            <font-awesome-icon :icon="['fas', 'bookmark']"></font-awesome-icon>
            Marcar documento
          </b-button>
          <b-button variant="primary" v-else @click="unbookmark">
            <font-awesome-icon :icon="['fas', 'file']"></font-awesome-icon>
            Desmarcar documento
          </b-button>
        </b-nav-text>
        <b-nav-text class="navbar-button" v-if="showEndSearch">
          <b-button variant="success" @click="endSearch">
            <font-awesome-icon :icon="['fas', 'check']"></font-awesome-icon>
            Terminar búsqueda
          </b-button>
        </b-nav-text>
        <b-nav-item>
          <font-awesome-icon :icon="['fas', 'user']"></font-awesome-icon>
        </b-nav-item>
        <b-nav-text to="/profile" class="navbar-text">
          {{ currentUser.email || currentUser.username }}
        </b-nav-text>
        <b-nav-item @click.prevent="logout">
          <font-awesome-icon icon="sign-out-alt"></font-awesome-icon>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>

    <b-modal
      id="current-task"
      ref="current-task"
      size="lg"
      title="Tarea actual"
      hide-header-close
      ok-only
    >
      <b-card :header="currentTaskObj.title" class="text-center">
        <b-card-text>{{ currentTaskObj.description }}</b-card-text>
      </b-card>
    </b-modal>
  </div>
</template>

<script>
import ActionSender from '../services/ActionSender';
import BookmarkService from '../services/Bookmark';
import EventBus from '../modules/eventBus';

import Timer from '../services/Timer';
import { toHHMMSS } from '../services/Utils';

export default {
  name: 'navbar',

  data() {
    return {
      timer: null,
      showEndSearch: false,
      showBookmarkButtons: false,
      showCurrentTask: false,
      currentDocument: null,
      bmService: new BookmarkService(),
      sender: new ActionSender('Bookmark')
    }
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    currentTaskObj() {
      return this.currentUser ? this.$store.getters.currentTask : '';
    },
    bookmarks() {
      return this.currentUser ? this.$store.getters.bookmarks : [];
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }
      else {
        return false;
      }
    },
    currentTimer() {
      if (Number.isInteger(this.$store.state.timerTime) && this.$store.state.timerTime >= 0) {
        return toHHMMSS(this.$store.state.timerTime);
      }
      else {
        return null;
      }
    },
    currentTask() {
      let nextStage = (!!this.$store.getters.stages && !!this.$store.getters.stageIndex) ? this.$store.getters.stages[this.$store.getters.stageIndex] : null;
      let stageName = nextStage ? nextStage.query.task : '';
      return stageName;
    },
    showBookmarkDocument() {
      let docId = this.currentDocument ? this.currentDocument.docId_s : null;
      return this.bmService.fetchBookmarkStatus(this.bookmarks, docId);
    },
    bookmarkCount() {
      return this.bmService.fetchBookmarkCount(this.bookmarks);
    }
  },

  created() {
    EventBus.$on('leticia-timer-create', (data) => {
      this.timer = new Timer(data.totalTime);
      this.timer.start();
    });

    EventBus.$on('leticia-timer-stop', () => {
      if (this.timer) {
        this.timer.stop();
        this.timer = null;
      }
    });

    EventBus.$on('leticia-timer-pause', () => {
      if (this.timer) {
        this.timer.pause();
      }
    });

    EventBus.$on('leticia-timer-resume', () => {
      if (this.timer) {
        this.timer.resume();
      }
    });

    EventBus.$on('leticia-bookmark-button-status', (data) => {
      this.showBookmarkButtons = data.status;
      this.currentDocument = data.doc;
    });

    EventBus.$on('leticia-current-task', (data) => {
      this.showCurrentTask = data.currentTask;
    });
  },

  methods: {
    logout() {
      EventBus.$emit('leticia-timer-stop');

      const sender = new ActionSender('UserLog');
      sender.userLog(false);

      this.$store.dispatch('auth/logout');
      //this.$store.dispatch('eraseAll');
      this.$router.replace('/');
    },
    checkSearchTaskReady(status) {
      this.showEndSearch = status;
    },
    bookmark(evt) {
      let bmDoc = {
        username: this.currentUser.username,
        action: 'Bookmark',
        task: this.currentTask,
        docId: this.currentDocument.docId_s,
        url: this.$router.currentRoute.fullPath,
        clientTimestamp: Date.now()
      };

      this.bmService.bookmark(bmDoc);
      this.showEndSearch = this.bmService.fetchMinBookmarks(this.bookmarks);

      this.sender.sendBookmark(bmDoc)
        .then((res) => {})
        .catch((err) => {
          console.error(err);
          alert('Ha ocurrido un error al marcar el documento [Código 475]');
        });
    },
    unbookmark(evt) {
      let bmDoc = {
        username: this.currentUser.username,
        action: 'Unbookmark',
        task: this.currentTask,
        docId: this.currentDocument.docId_s,
        url: this.$router.currentRoute.fullPath,
        clientTimestamp: Date.now()
      };

      this.bmService.unbookmark(bmDoc);
      this.showEndSearch = this.bmService.fetchMinBookmarks(this.bookmarks);
      
      this.sender.sendBookmark(bmDoc)
        .then((res) => {})
        .catch((err) => {
          console.error(err);
          alert('Ha ocurrido un error al desmarcar el documento [Código 476]');
       });
    },
    goBack(evt) {
      this.$router.go(-1);
    },
    endSearch(evt) {
      let message = {
        type: 'FinishSearchStage',
        source: 'Search'
      };

      this.sender.sendGenericAction(message)
        .then(res => {
          console.log(res.data);
          EventBus.$emit('leticia-next-challenge');
        })
        .catch(err => {
          console.error(err);
          alert('Ha ocurrido un error al terminar la búsqueda [Código 478]');
        });
    },
    showTaskModal() {
      let message = {
        type: 'ShowTaskModal',
        source: 'Search'
      };

      this.sender.sendGenericAction(message)
        .then(res => console.log(res.data))
        .catch(err => console.error(err));
    }
  }
}
</script>

<style scoped>
.navbar-text {
  color: white;
}

.navbar-button {
  padding: 0px 8px 0px 8px;
}
</style>