const { secondsToMinutesAndSeconds } = require('../utils/secondsToMinutesAndSeconds.cjs');
const { getPocketbase } = require('../db/getPocketbase.cjs');

exports.getRecentlyPlayed = async (
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
    const { filter = null, sort = null, expand = null } = queryParams; 

    const recentlyPlayedSongsPromise = pb.collection('recently_played').getList(
      page, 
      perPage,
      {
        filter,
        sort,
        expand
      }
    );

    const likedSongsPromise = pb.collection('liked_songs').getFullList(Number.MAX_SAFE_INTEGER, { filter: `user = "${userId}"` });

    const response = await Promise.allSettled([
      recentlyPlayedSongsPromise,
      likedSongsPromise
    ])

    const recentlyPlayedSongsResponse = response[0].value;
    const likedSongsResponse = response[1].value;
    
    return {
      ...recentlyPlayedSongsResponse,
      items: recentlyPlayedSongsResponse.items.map(playlistSong => {
        const songObject = playlistSong.expand.song
        return {
          name: songObject.name,
          artist: songObject.expand.user.username,
          duration: secondsToMinutesAndSeconds(songObject.duration),
          cid: songObject.cid,
          id: songObject.id,
          liked: likedSongsResponse.find((song) => songObject.id === song.song)?.id,
        }
      })
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}