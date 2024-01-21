const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Привет! Введите текст для записи в файл:');

rl.on('line', (input) => {
  fs.promises.writeFile('output.txt', input, 'utf-8')
    .then(() => {
      console.log('Текст успешно записан в файл output.txt');
      rl.close();
    })
    .catch(error => {
      console.error('Ошибка записи файла:', error);
      rl.close();
    });
});