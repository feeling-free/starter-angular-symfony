
proto_path = ./protos/
proto_files = $(wildcard $(proto_path)*/*.proto)
pb_ng_out = ./angular/src/pb/
pb_php_out = ./symfony/src-pb/

default: install generate test build
	@echo "Done."


install: install-ng install-php
	@npm i >/dev/null --silent

install-ng:
	@pushd angular/ && npm i >/dev/null --silent && popd

install-php:
	@pushd symfony/ && composer install && popd


test: test-ng test-php

test-php:
	php symfony/bin/phpunit

test-ng:
	@pushd angular/ && node_modules/.bin/ng test --watch=false && popd



generate: pb-ng pb-php

pb-ng: $(proto_files)
	@find $(pb_ng_out) ! -path $(pb_ng_out) ! -name '.gitignore' -exec rm -rf {} +
	@protoc \
		--plugin=./node_modules/.bin/protoc-gen-h1c-angular \
		--proto_path=$(proto_path) \
		--h1c-angular_out=$(pb_ng_out) \
		$^
	@echo generated $@

pb-php: $(proto_files)
	@find $(pb_php_out) ! -path $(pb_php_out) ! -name '.gitignore' -exec rm -rf {} +
	protoc --proto_path=$(proto_path) --php_out=$(pb_php_out) $^
	@echo generated $@