const { exec } = require('child_process');
const util = require('util');
const path = require('path');

exports.toHLSChunks = async (songPath) => {
  const execPromise = util.promisify(exec);
  const chunksFolderPath = path.join(__dirname, './chunks');
  const songName = songPath.split('/').at(-1).split('.').at(0);

  await execPromise(
    `ffmpeg -i ${songPath} -profile:v baseline -level 3.0 -start_number 0 -hls_time 10 -hls_list_size 0 -f hls  ${chunksFolderPath}/${songName}.m3u8`
  );
};
