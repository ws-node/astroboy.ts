SUBDIRS = configs middlewares app
.PHONY: subdirs $(SUBDIRS)
subdirs: $(SUBDIRS)

build:
	yarn run test
	rm -rf dist
	npx tsc
	mkdir dist/bin
	cp bin/atc dist/bin
	cp CHANGELOG.md dist
	cp README.md dist

document:
	npx compodoc --language zh-CN -c .compodocrc.yaml

rc: build
	npx bmpub publish -C ./scripts/pkg.rc.js

publish: build
	npx bmpub publish -C ./scripts/pkg.build.js
