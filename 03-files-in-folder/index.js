const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Ошибка чтения содержимого каталога', err);
    return;
  }
  files.forEach(file => {
    const filePath = path.join(folderPath, file);
    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error(`Ошибка получения информации о файле ${file}`, err);
        return;
      }
      if (stats.isFile()) {
        const fileExtension = path.extname(file).replace('.', '');
        console.log(`${file} - ${fileExtension} - ${stats.size} bytes`);
      }
    });
  });
});