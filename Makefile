build:
	yarn run test
	tsc

rc: build
	node ./pkg --rc 1