build:
	yarn run test
	rm -rf dist
	npx tsc
	mkdir dist/bin
	cp bin/atc dist/bin

document:
	npx compodoc --language zh-CN -c .compodocrc.yaml

rc: build
	node ./scripts/pkg.rc.js

publish: build
	node ./scripts/pkg.build.js