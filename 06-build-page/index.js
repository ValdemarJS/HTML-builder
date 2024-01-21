const fs = require('fs');
const path = require('path');

const projectDistDir = path.join(__dirname, 'project-dist');
const templatePath = path.join(__dirname, 'template.html');
const componentsDir = path.join(__dirname, 'components');
const stylesDir = path.join(__dirname, 'styles');
const assetsDir = path.join(__dirname, 'assets');

// Создание папки project-dist
async function createProjectDistFolder() {
  try {
    await fs.promises.mkdir(projectDistDir);
    console.log('Папка project-dist успешно создана');
  } catch (error) {
    console.error('Ошибка создания папки project-dist:', error);
  }
}

// Замена тегов шаблона на содержимое компонентов
async function replaceTemplateTags() {
  try {
    let templateContent = await fs.promises.readFile(templatePath, 'utf-8');
    const componentFiles = await fs.promises.readdir(componentsDir);

    // Заменяем теги в шаблоне на содержимое компонентов
    for (const component of componentFiles) {
      const componentName = path.parse(component).name;
      const componentPath = path.join(componentsDir, component);
      const componentContent = await fs.promises.readFile(componentPath, 'utf-8');
      const searchRegExp = new RegExp(`{{${componentName}}}`, 'g');
      templateContent = templateContent.replace(searchRegExp, componentContent);
    }

    const indexPath = path.join(projectDistDir, 'index.html');
    await fs.promises.writeFile(indexPath, templateContent);
    console.log('Файл index.html успешно создан');
  } catch (error) {
    console.error('Ошибка замены тегов шаблона:', error);
  }
}

// Компиляция стилей
async function compileStyles() {
  try {
    const outputFilePath = path.join(projectDistDir, 'style.css');
    let cssContent = '';

    // Чтение и объединение стилей в один файл
    const styleFiles = await fs.promises.readdir(stylesDir);
    for (const file of styleFiles) {
      if (path.extname(file) === '.css') {
        const filePath = path.join(stylesDir, file);
        const fileContent = await fs.promises.readFile(filePath, 'utf-8');
        cssContent += fileContent;
      }
    }

    await fs.promises.writeFile(outputFilePath, cssContent);
    console.log('Файл style.css успешно создан');
  } catch (error) {
    console.error('Ошибка компиляции стилей:', error);
  }
}

// Копирование assets
async function copyAssets() {
  try {
    const destPath = path.join(projectDistDir, 'assets');
    await fs.promises.mkdir(destPath);
    await fs.promises.copyFile(assetsDir, destPath);
    console.log('Папка assets успешно скопирована');
  } catch (error) {
    console.error('Ошибка копирования assets:', error);
  }
}

// Запуск всех функций
(async () => {
  await createProjectDistFolder();
  await replaceTemplateTags();
  await compileStyles();
  await copyAssets();
})();