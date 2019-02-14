const fs = require('fs');
const childProcess = require('child_process');

['16.3.x', '16.4.x', '16.5.x', '16.6.x', '16.7.x', '16.8.x'].forEach(version => {
  if (!fs.existsSync(`react-versions/react-${version}`)) {
    childProcess.execSync(
      `npm i react-test-renderer@${version} react-dom@${version} react@${version} --prefix react-versions/react-${version}`,
      { stdio: [0, 1, 2] }
    );
  }
});
