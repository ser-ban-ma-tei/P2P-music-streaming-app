const { getPocketbase } = require('../db/getPocketbase.cjs');

exports.logoutHandler = async () => {
  try {
    const pb = await getPocketbase()

    pb.authStore.clear();
  } catch (error) {
    console.log(error);
  }
}