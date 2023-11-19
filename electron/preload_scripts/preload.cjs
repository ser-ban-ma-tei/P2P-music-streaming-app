const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  openDialog: () => ipcRenderer.invoke('open-dialog'),
  uploadSong: (data) => ipcRenderer.invoke('upload-song', data),
  register: (user) => ipcRenderer.invoke('register', user),
  login: (credentials) => ipcRenderer.invoke('login', credentials),
  streamSongUpdate: (id) => ipcRenderer.invoke('stream-song-update', id),
  addRecentlyPlayed: (data) => ipcRenderer.invoke('add-recently-played', data),
  toggleLikedSong: (data) => ipcRenderer.invoke('toggle-liked-song', data),
  addNewPlaylist: (data) => ipcRenderer.invoke('add-new-playlist', data),
  addSongToPlaylist: (data) => ipcRenderer.invoke('add-song-to-playlist', data),
  getSongs: (requestDetails) => ipcRenderer.invoke('get-songs', requestDetails),
  getLikedSongs: (requestDetails) => ipcRenderer.invoke('get-liked-songs', requestDetails),
  getPlaylistSongs: (requestDetails) => ipcRenderer.invoke('get-playlist-songs', requestDetails),
  getFullList: (requestDetails) => ipcRenderer.invoke('get-full-list', requestDetails),
  logout: () => ipcRenderer.invoke('logout'),
  getRecentlyPlayed: (requestDetails) => ipcRenderer.invoke('get-recently-played', requestDetails)
});
