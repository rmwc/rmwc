const { readdirSync, statSync } = require('fs');
const { join } = require('path');

module.exports = () =>
  readdirSync('./src').filter(
    f => f !== '@types' && statSync(join('./src', f)).isDirectory()
  );
