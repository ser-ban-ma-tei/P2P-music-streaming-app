const { getPocketbase } = require('../db/getPocketbase.cjs');

exports.getFullList = async (
  _,
  {
    collection = '',
    queryParams = {}
  }
) => {
  try {
    const pb = await getPocketbase();
    const { filter = null, sort = null, expand = null } = queryParams;
  
    const recordsList = await pb.collection(collection).getFullList(
      Number.MAX_SAFE_INTEGER,
      {
        filter,
        sort,
        expand
      }
    )
  
    return recordsList;
  } catch (error) {
    console.log(error);
    return [];
  }
}