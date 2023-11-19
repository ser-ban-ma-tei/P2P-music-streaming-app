const { getPocketbase } = require('../db/getPocketbase.cjs');

exports.toggleLikedSong = async (_, { songId, userId, likedId, action }) => {
  try {
    const pb = await getPocketbase();

    const data = {
      song: songId,
      user: userId
    };

    if (action === 'add')
      await pb.collection('liked_songs').create(data);
    
    if (action === 'remove')
      await pb.collection('liked_songs').delete(likedId);

    return true;
  } catch (error) {
    console.log(error?.data);
    return false;
  }
}