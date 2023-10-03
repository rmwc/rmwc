const fs = require('fs');
const childProcess = require('child_process');

fs.readdir('react-versions', function (err, files) {
  const reactVersions = files.filter((f) => f.startsWith('react-'));

  reactVersions.forEach((reactVersion, index, arr) => {
    const versionNum = reactVersion.split('-')[1];
    const isFirstRun = index === 0;
    console.log('Running tests for', versionNum);
    childProcess.execSync(
      //prettier-ignore
      `export REACT_TEST_VERSION=${versionNum} CI=true && npx nx run-many -t test --env=jsdom ${isFirstRun ? '--coverage' : ''}`,
      { stdio: [0, 1, 2] }
    );
  });
});
