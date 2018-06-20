const fs = require('fs');
const childProcess = require('child_process');

['15.5.x', '15.6.x', '16.0.x', '16.1.x', '16.2.x', '16.3.x', '16.4.x'].forEach(
  version => {
    if (!fs.existsSync(`react-versions/react-${version}`)) {
      childProcess.execSync(
        `npm i react-test-renderer@${version} react-dom@${version} react@${version} --prefix react-versions/react-${version}`,
        { stdio: [0, 1, 2] }
      );
    }
  }
);
