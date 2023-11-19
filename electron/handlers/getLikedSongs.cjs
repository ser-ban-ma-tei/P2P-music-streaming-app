const { secondsToMinutesAndSeconds } = require('../utils/secondsToMinutesAndSeconds.cjs');
const { getPocketbase } = require('../db/getPocketbase.cjs');

exports.getLikedSongs = async (
  _,
  {
    pagination = {},
    queryParams = {},
  }
) => {
  try {
    const pb = await getPocketbase();
    const { page = 1, perPage = 10 } = pagination;
    const { filter = null, sort = null, expand = null } = queryParams;

    const likedSongsResponse = await pb.collection('liked_songs').getList(
      page, 
      perPage,
      {
        filter,
        sort,
        expand
      }
    );

    return {
      ...likedSongsResponse,
      items: likedSongsResponse.items.map(likedSong => {
        const songObject = likedSong.expand.song
        return {
          name: songObject.name,
          artist: songObject.expand.user.username,
          duration: secondsToMinutesAndSeconds(songObject.duration),
          cid: songObject.cid,
          id: songObject.id,
          liked: likedSongsResponse.items.find((song) => songObject.id === song.song)?.id,
        }
      })
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}