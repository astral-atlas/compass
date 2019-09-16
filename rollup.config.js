const resolve = require('rollup-plugin-node-resolve');
const flowEntry = require('rollup-plugin-flow-entry');
const commonjs = require('rollup-plugin-commonjs');
const { terser } = require('rollup-plugin-terser');

const rollupConfig = {
  input: 'src/index.js',
  output: [
    { format: 'cjs', file: 'dist/atlas-client.cjs.js' },
    { format: 'umd', file: 'dist/atlas-client.umd.js', name: 'ATLAS_CLIENT' },
    { format: 'esm', file: 'dist/atlas-client.esm.js' },
  ],
  plugins: [resolve(), flowEntry(), commonjs(), terser()],
};

export default rollupConfig;