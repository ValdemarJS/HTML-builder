const fs = require('fs');
const path = require('path');

async function copyDir(source, target) {
  try {
    await fs.promises.mkdir(target, { recursive: true });
    const files = await fs.promises.readdir(source);
    for (const file of files) {
      const filePath = path.join(source, file);
      const targetPath = path.join(target, file);
      const fileStat = await fs.promises.lstat(filePath);
      if (fileStat.isDirectory()) {
        await copyDir(filePath, targetPath);
      } else {
        const fileData = await fs.promises.readFile(filePath);
        await fs.promises.writeFile(targetPath, fileData);
      }
    }
    console.log('Папка успешно скопирована');
  } catch (error) {
    console.error('Ошибка копирования папки:', error);
  }
}

copyDir('files', 'files-copy');