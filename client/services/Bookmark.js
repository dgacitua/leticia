import { store } from '../modules/store';
import { deepCopy } from '../services/Utils';

const MIN_BOOKMARKS = 3; // TODO unhardcode this value

class BookmarkService {
  checkBookmark(bmList, bmDoc) {
    return !!bmList.find(e => e.docId === bmDoc.docId);
  }

  getBookmarkList() {
    return store.state.auth.user ? deepCopy(store.getters.bookmarks) : [];
  }

  setBookmarkList(bmList) {
    if (store.state.auth.user) store.commit({ type: 'setBookmarks', list: bmList });
  }

  resetBookmarkList() {
    if (store.state.auth.user) store.commit({ type: 'setBookmarks', list: [] });
  }

  bookmark(bmDoc) {
    let bmList = this.getBookmarkList();

    if (this.checkBookmark(bmList, bmDoc)) {
      console.log('Bookmark already added', bmDoc.docId);
    }
    else {
      bmList.push(bmDoc);
      this.setBookmarkList(bmList);
      console.log('Document Bookmarked!', bmDoc.docId, bmList);
    }
  }

  unbookmark(bmDoc) {
    let bmList = this.getBookmarkList();

    if (this.checkBookmark(bmList, bmDoc)) {
      let idx = bmList.findIndex(e => e.docId === bmDoc.docId);

      if (idx >= 0) {
        bmList.splice(idx, 1);
        this.setBookmarkList(bmList);
        console.log('Document Unbookmarked!', bmDoc.docId, bmList);
      }
    }
    else {
      console.log('Nothing to unbookmark', bmDoc.docId);
    }
  }

  fetchBookmarkStatus(bmList, docId) {
    return !!bmList && !!docId && !(!!bmList.find(e => e.docId === docId));
  }

  fetchBookmarkCount(bmList) {
    return !!bmList ? bmList.length : 0;
  }

  fetchMinBookmarks(bmList) {
    return !!bmList && (this.fetchBookmarkCount(bmList) >= MIN_BOOKMARKS);
  }
}

export default BookmarkService;