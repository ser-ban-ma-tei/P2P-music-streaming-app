const {getPocketbase} = require('../db/getPocketbase.cjs');

exports.addM3u8FileToDb = async (m3u8ChangedFileAdded, userId, songName, songGenre) => {
  try {
    const pb = await getPocketbase();

    const song = {
      name: songName,
      user: userId,
      duration: m3u8ChangedFileAdded.duration,
      cid: `${m3u8ChangedFileAdded.cid.toString()}?filename=${m3u8ChangedFileAdded.m3u8FileName}`,
      streams: 1,
      genre: songGenre
    }

    await pb.collection('songs').create(song);
  } catch (error) {
    console.log(error.data);
  }
};
