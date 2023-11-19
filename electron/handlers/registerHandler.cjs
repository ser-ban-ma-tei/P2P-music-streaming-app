const {getPocketbase} = require('../db/getPocketbase.cjs');

exports.registerHandler = async (_, user) => {
    try {
        const pb = await getPocketbase();
        await pb.collection('users').create(user);
    } catch (error) {
        console.log(error.data);
    }
}