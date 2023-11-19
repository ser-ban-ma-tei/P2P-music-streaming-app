const fs = require('fs').promises;
const path = require('path');

exports.readChunksFolder = async () => {
  const chunksFolderPath = path.join(__dirname, './chunks');
  const files = await fs.readdir(chunksFolderPath);

  const chunks = [];
  let m3u8FilePath;

  for (const file of files) {
    if (file.includes('.m3u8')) {
      m3u8FilePath = path.join(chunksFolderPath, file);
      m3u8FileContent = await fs.readFile(
        path.join(chunksFolderPath, `./${file}`)
      );
    } else {
      chunks.push(path.join(chunksFolderPath, file));
    }
  }

  return {
    chunks,
    m3u8File: {
      path: m3u8FilePath,
      content: Buffer.from(m3u8FileContent).toString()
    }
  };
};
