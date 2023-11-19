const { dialog } = require('electron');

exports.openDialogHandler = () =>
  dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'songs', extensions: ['mp3'] }],
  });
