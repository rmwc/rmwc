const { execSync } = require('child_process');

module.exports = (tags) => {
  const filter =
    tags != null
      ? `--projects=${tags.map((tag) => `tag:${tag}`).join(',')}`
      : '';
  const packages = execSync(`npx nx show projects ${filter}`)
    .toString()
    .split('\n')
    .filter(Boolean);
  return packages;
};
