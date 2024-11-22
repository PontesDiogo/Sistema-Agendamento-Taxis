const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function question(prompt) {
  return new Promise((resolve, reject) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
}

module.exports = { question };