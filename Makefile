build:
	yarn run test
	rm -rf dist
	tsc

document:
	rm -rf doc
	node_modules/.bin/typedoc --out ./doc/ ./src/

rc: build
	node ./pkg --rc 1