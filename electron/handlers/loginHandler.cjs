const { getPocketbase } = require("../db/getPocketbase.cjs")

exports.loginHandler = async (_, credentials) => {
    try {
        const pb = await getPocketbase();
        const response = await pb.collection('users').authWithPassword(credentials.email, credentials.password);
        return response.record;
    } catch (error) {
        console.log(error.data);
        return null;
    }
}