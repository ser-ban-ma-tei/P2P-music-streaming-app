const { getPocketbase } = require('../db/getPocketbase.cjs');

exports.addSongToPlaylist = async (_, data) => {
  try {
    const pb = await getPocketbase();

    await pb.collection('songs_playlists').create(data);
  } catch (error) {
    console.log(error?.data);
  }
}