import express from 'express';

//import auth from './routes/auth';
//import search from './routes/search';
//import interactions from './routes/interactions';
//import bookmarks from './routes/bookmarks';
import keystrokes from './routes/keystrokes';
//import mousetrack from './routes/mousetrack';
//import scrolltrack from './routes/scrolltrack';

const router = express.Router();

//router.use('/auth', auth);
//router.use('/search', search);
//router.use('/interactions', interactions);
//router.use('/bookmarks', bookmarks);
router.use('/keystrokes', keystrokes);
//router.use('/mousetracks', mousetrack);
//router.use('/scrolltracks', scrolltrack);

export default router;