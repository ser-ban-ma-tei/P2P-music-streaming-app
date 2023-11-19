const { secondsToMinutesAndSeconds } = require('../utils/secondsToMinutesAndSeconds.cjs');
const { getPocketbase } = require('../db/getPocketbase.cjs');

exports.getSongs = async (
  _, 
  { 
    pagination = {},
    queryParams = {},
    userId = -1
  }
) => {
  try {
    const pb = await getPocketbase();
    const { page = 1, perPage = 10 } = pagination;
    const { filter = null, sort = null } = queryParams; 

    const songsPromise = pb.collection('songs').getList(
      page, 
      perPage,
      {
        filter,
        sort,
        expand: 'user'
      }
    );

    const likedSongsPromise = pb.collection('liked_songs').getFullList(Number.MAX_SAFE_INTEGER, { filter: `user = "${userId}"` })

    const response = await Promise.allSettled([
      songsPromise,
      likedSongsPromise
    ])
    
    const songsResponse = response[0].value;
    const likedSongsResponse = response[1].value;

    return {
      ...songsResponse,
      items: songsResponse.items.map(song => ({
        name: song.name,
        artist: song.expand.user.username,
        duration: secondsToMinutesAndSeconds(song.duration),
        cid: song.cid,
        id: song.id,
        liked: likedSongsResponse.find((likedSong) => song.id === likedSong.song)?.id,
      }))
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}