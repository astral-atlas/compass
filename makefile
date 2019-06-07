javascript-files := $(shell find src -name "*.js" -not -name "*.bs.js")
reasonml-files := $(wildcard src/*.re)
bucklescript-generated-files := $(patsubst %.re, %.bs.js, $(reasonml-files))

output-bundles = dist/atlas-client.cjs.js dist/atlas-client.umd.js dist/atlas-client.esm.js

$(output-bundles): yarn.lock $(javascript-files) $(bucklescript-generated-files) rollup.config.js
	node_modules/.bin/rollup -c
	touch $(output-bundles)

$(bucklescript-generated-files): $(reasonml-files)
	node_modules/.bin/bsb -make-world
	touch $(bucklescript-generated-files)