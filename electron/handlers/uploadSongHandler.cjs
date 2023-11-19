const { toHLSChunks } = require('../song_processing/toHLSChunks.cjs');
const { readChunksFolder } = require('../song_processing/readChunksFolder.cjs');
const { addChunksToIpfs } = require('../song_processing/addChunksToIpfs.cjs');
const {
  changeTheM3u8FileAndAddItToIpfs,
} = require('../song_processing/changeTheM3u8FileAndAddItToIpfs.cjs');
const { addM3u8FileToDb } = require('../song_processing/addM3u8FileToDb.cjs');
const {
  removeChunksFolderContent,
} = require('../utils/removeChunksFolderContent.cjs');

exports.uploadSongHandler = async (_, {songPath, userId, songName, songGenre}) => {
  try {
    if (!songName)
      return 'Type the name of the song';
    if (!songGenre)
      return 'Select the genre of the song';
    if (!songPath)
      return 'Select a file';

    await toHLSChunks(songPath);

    const chunksFolderFiles = await readChunksFolder();

    const chunksAdded = await addChunksToIpfs(chunksFolderFiles.chunks);

    if (chunksAdded === 'error') return 'error';

    const m3u8ChangedFileAdded = await changeTheM3u8FileAndAddItToIpfs(
      chunksFolderFiles.m3u8File,
      chunksAdded
    );

    if (m3u8ChangedFileAdded === 'error') return 'error';

    await addM3u8FileToDb(m3u8ChangedFileAdded, userId, songName, songGenre);

    await removeChunksFolderContent();

    return 'success';
  } catch (_) {
    return 'error';
  }
};

// QmTj7dX2Fd2RPYbgRbZ8EMTWv6b56sKKrBpbgiJD1upLk2
