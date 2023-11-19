const { addSongToPlaylist } = require('./addSongToPlaylist.cjs');
const { addNewPlaylist } = require('./addNewPlaylist.cjs');
const { streamSongUpdate } = require('./streamSongUpdate.cjs');
const { addRecentlyPlayed } = require('./addRecentlyPlayed.cjs');
const { openDialogHandler } = require('./openDialogHandler.cjs');
const { uploadSongHandler } = require('./uploadSongHandler.cjs');
const { registerHandler } = require('./registerHandler.cjs');
const { loginHandler } = require('./loginHandler.cjs');
const { toggleLikedSong } = require('./toggleLikedSong.cjs');
const { getSongs } = require('./getSongs.cjs');
const { getLikedSongs } = require('./getLikedSongs.cjs');
const { getPlaylistSongs } = require('./getPlaylistSongs.cjs');
const { getFullList } = require('./getFullList.cjs');
const { logoutHandler } = require('./logoutHandler.cjs');
const { getRecentlyPlayed } = require('./getRecentlyPlayed.cjs');

const handlersMap = [
  {
    handlerName: 'open-dialog',
    handler: openDialogHandler,
  },
  {
    handlerName: 'upload-song',
    handler: uploadSongHandler,
  },
  {
    handlerName: 'register',
    handler: registerHandler
  },
  {
    handlerName: 'login',
    handler: loginHandler
  },
  {
    handlerName: 'stream-song-update',
    handler: streamSongUpdate
  },
  {
    handlerName: 'add-recently-played',
    handler: addRecentlyPlayed,
  },
  {
    handlerName: 'toggle-liked-song',
    handler: toggleLikedSong
  },
  {
    handlerName: 'add-new-playlist',
    handler: addNewPlaylist
  },
  {
    handlerName: 'add-song-to-playlist',
    handler: addSongToPlaylist
  },
  {
    handlerName: 'get-songs',
    handler: getSongs
  },
  {
    handlerName: 'get-liked-songs',
    handler: getLikedSongs
  },
  {
    handlerName: 'get-playlist-songs',
    handler: getPlaylistSongs
  },
  {
    handlerName: 'get-full-list',
    handler: getFullList
  },
  {
    handlerName: 'logout',
    handler: logoutHandler
  },
  {
    handlerName: 'get-recently-played',
    handler: getRecentlyPlayed
  }
];

exports.handlersMap = handlersMap;
