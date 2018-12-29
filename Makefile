build:
	yarn run test
	tsc

doc:
	typedoc --out ./document/ ./src/

rc: build
	node ./pkg --rc 1