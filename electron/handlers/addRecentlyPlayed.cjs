const { getPocketbase } = require('../db/getPocketbase.cjs');
const { MAX_RECENTLY_PLAYED_SONGS } = require('../utils/constants.cjs');

exports.addRecentlyPlayed = async (_, { songId, userId }) => {
    try {
        const pb = await getPocketbase();

        const recentlyPlayedSongs = await pb.collection('recently_played').getFullList(undefined, {
            sort: '-created'
        })

        if (recentlyPlayedSongs.length >= MAX_RECENTLY_PLAYED_SONGS) 
            await pb.collection('recently_played').delete(recentlyPlayedSongs.at(-1).id);
        

        const remainingRecentlyPlayedSongs = recentlyPlayedSongs.length <= 1 ? recentlyPlayedSongs : recentlyPlayedSongs.slice(0, -1);
        const doubledSong = remainingRecentlyPlayedSongs.find((song) => song.song === songId && song.user === userId);

        if (doubledSong) {
            await pb.collection('recently_played').delete(doubledSong.id);
        }
        

        await pb.collection('recently_played').create({
            'song': songId,
            'user': userId
        })
    } catch (error) {
        console.log(error);
    }
}