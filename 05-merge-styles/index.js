const fs = require('fs');
const path = require('path');

const stylesDir = path.join(__dirname, 'styles');
const distDir = path.join(__dirname, 'project-dist');

function compileStyles(dir, outputFileName) {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error('Ошибка чтения содержимого каталога', err);
      return;
    }

    let cssContent = '';

    files.forEach(file => {
      const filePath = path.join(dir, file);
      const fileExt = path.extname(filePath);

      if (fileExt === '.css') {
        const fileData = fs.readFileSync(filePath, 'utf-8');
        cssContent += fileData;
      }
    });

    const outputPath = path.join(distDir, outputFileName);
    fs.writeFileSync(outputPath, cssContent);
    console.log('Файл bundle.css успешно создан');
  });
}

compileStyles(stylesDir, 'bundle.css');