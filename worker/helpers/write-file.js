'use strict';

const fs = require('fs');
const path = require('path');

const writeFile = async (
  directory,
  fileName,
  data,
  { pretty = false } = {}
) => {
  const content = JSON.stringify(data, null, pretty ? 2 : 0);
  await fs.promises.mkdir(directory, { recursive: true });
  await fs.promises.writeFile(
    path.join(directory, `${fileName}.json`),
    content
  );
  return;
};

module.exports = writeFile;
