const util = require('util');
const fs = require('fs').promises;
const { exec } = require('child_process');

exports.changeTheM3u8FileAndAddItToIpfs = async (m3u8File, chunksAdded) => {
  const execPromise = util.promisify(exec);

  for (const chunkAdded of chunksAdded) {
    const ipfsChunkURL = `http://127.0.0.1:8080/ipfs/${chunkAdded.cid}?filename=${chunkAdded.chunkName}`;
    m3u8File.content = m3u8File.content.replace(chunkAdded.chunkName, ipfsChunkURL);
  }

  await fs.writeFile(m3u8File.path, m3u8File.content, (err) => console.log(err));

  const { stdout } = await execPromise(`ipfs add ${m3u8File.path}`);
  const response = stdout?.split(' ');

  if (response[0] !== 'added')
    return 'error';

  const duration = Math.floor(m3u8File.content.split('\n').filter(line => line.includes('#EXTINF:')).map(line => line.split(':')[1].slice(0, -1)).reduce((acc, seconds) => acc + Number(seconds), 0));
  const cid = response[1];
  const m3u8FileName = response[2].slice(0, -1);

  return {
    cid,
    m3u8FileName,
    duration
  };
};
