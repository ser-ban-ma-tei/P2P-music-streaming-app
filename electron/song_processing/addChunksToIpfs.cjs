const util = require('util');
const { exec } = require('child_process');

exports.addChunksToIpfs = async (chunks) => {
  const execPromise = util.promisify(exec);

  const chunksAdded = [];

  for (let i = 0; i < chunks.length; i += 1) {
    const { stdout } = await execPromise(`ipfs add ${chunks[i]}`);
    const response = stdout?.split(' ');

    if (response[0] !== 'added')
      return 'error';

    const cid = response[1];
    const chunkName = response[2].slice(0, -1);

    chunksAdded.push({
      cid,
      chunkName
    })
  }


  return chunksAdded;
};
