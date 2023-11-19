const { getPocketbase } = require('../db/getPocketbase.cjs');

exports.addNewPlaylist = async (_, data) => {
  try {
    const pb = await getPocketbase();

    await pb.collection('playlists').create(data);
  } catch (error) {
    console.log(error?.data);
  }
}