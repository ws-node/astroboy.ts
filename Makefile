build:
	yarn run test
	rm -rf dist
	tsc
	mkdir dist/bin
	cp bin/atc dist/bin

document:
	rm -rf doc
	node_modules/.bin/typedoc --out ./doc/ ./src/

rc: build
	node ./pkg.rc.js

publish: build
	node ./pkg.build.js