const { build } = require("esbuild");
const { dependencies, peerDependencies } = require('./package.json');

const runV1 = {
  entryPoints: ["runv1/index.ts"],
  bundle: true,
  minify: false,
  // only needed if you have dependencies
  // external: Object.keys(dependencies).concat(Object.keys(peerDependencies)),
};

build({
  ...runV1,
  platform: 'browser',
  format: 'esm',
  outfile: "../volumes/scripts/runV1/main.bundle.js",
});