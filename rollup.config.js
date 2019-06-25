const rollupConfig = {
  input: 'src/index.js',
  output: [
    { format: 'cjs', file: 'dist/atlas-client.cjs.js' },
    { format: 'umd', file: 'dist/atlas-client.umd.js', name: 'ATLAS_CLIENT' },
    { format: 'esm', file: 'dist/atlas-client.esm.js' },
  ],
  plugins: [],
};

export default rollupConfig;