const fs = require('fs').promises;
const path = require('path');

exports.removeChunksFolderContent = async () => {
  const chunksFolderPath = path.join(__dirname, '../song_processing/chunks');

  for (const file of await fs.readdir(chunksFolderPath)) {
    await fs.unlink(path.join(chunksFolderPath, `./${file}`));
  }
};
