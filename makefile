javascript-files := $(wildcard src/*.js)

dist/atlas-client.cjs.js dist/atlas-client.umd.js dist/atlas-client.esm.js: yarn.lock $(javascript-files) rollup.config.js
	node_modules/.bin/rollup -c

%.bs.js: %.re
	node_modules/.bin/bsb