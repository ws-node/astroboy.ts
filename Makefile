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
	node ./pkg --rc 1

publish: build
	node ./pkg