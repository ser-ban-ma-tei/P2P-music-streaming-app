const { getPocketbase } = require('../db/getPocketbase.cjs');

exports.streamSongUpdate = async (_, id) => {
    try {
        const pb = await getPocketbase();
        const song = await pb.collection('songs').getFirstListItem(`id="${id}"`);
        await pb.collection('songs').update(id, { streams: song.streams + 1 })
    } catch (error) {
        console.log(error.data);
    }
}