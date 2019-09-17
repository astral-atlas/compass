const resolve = require('rollup-plugin-node-resolve');
const flowEntry = require('rollup-plugin-flow-entry');
const commonjs = require('rollup-plugin-commonjs');
const { terser } = require('rollup-plugin-terser');

const rollupConfig = {
  input: 'src/compass.js',
  output: [
    { format: 'cjs', file: 'dist/compass.cjs.js' },
    { format: 'umd', file: 'dist/compass.umd.js', name: 'ATLAS_CLIENT' },
    { format: 'esm', file: 'dist/compass.esm.js' },
  ],
  plugins: [resolve(), flowEntry(), commonjs(), terser()],
};

export default rollupConfig;