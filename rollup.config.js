import resolve from 'rollup-plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
import flowEntry from 'rollup-plugin-flow-entry'

const rollupConfig = {
  input: 'src/index.js',
  output: [
    { format: 'cjs', file: 'dist/atlas-client.cjs.js' },
    { format: 'umd', file: 'dist/atlas-client.umd.js', name: 'ATLAS_CLIENT' },
    { format: 'esm', file: 'dist/atlas-client.esm.js' },
  ],
  plugins: [resolve(), terser(), flowEntry()],
};

export default rollupConfig;