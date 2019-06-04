javascript-files := $(shell find src -name "*.js" -not -name "*.bs.js")
reasonml-files := $(wildcard src/*.re)
bucklescript-generated-files := $(patsubst %.re, %.bs.js, $(reasonml-files))

dist/atlas-client.cjs.js dist/atlas-client.umd.js dist/atlas-client.esm.js: yarn.lock $(javascript-files) $(bucklescript-generated-files) rollup.config.js
	rm -rf dist
	node_modules/.bin/rollup -c

$(bucklescript-generated-files): $(reasonml-files)
	rm src/*bs.js
	node_modules/.bin/bsb -make-world