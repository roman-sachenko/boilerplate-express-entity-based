const path = require('path');

module.exports = {
  isObjectValid: (inputObject) => {
    return !!(inputObject && Object.keys(inputObject) && Object.keys(inputObject).length);
  },

  requireAllFromDir(dirPath, options) {

    const { skipFiles = [], extFilter = [] } = options;
    const filesToExport = {};

    require('fs').readdirSync(dirPath).forEach((fileFullName) => {

      if (!skipFiles.includes(fileFullName)) {
        const fileBaseNme = path.basename(fileFullName, path.extname(fileFullName));
        const filePath = `${dirPath}/${fileFullName}`;

        if (!extFilter.length) {
          return filesToExport[fileBaseNme] = require(`${filePath}`);
        }

        if (extFilter.includes(path.extname(fileFullName))) {
          return filesToExport[fileBaseNme] = require(`${filePath}`);
        }
      }

      return true;
    });

    return filesToExport;
  },

};
