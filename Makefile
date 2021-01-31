SHELL = /bin/bash -o pipefail
build:
	@dotrun build

dev:
	@dotrun dev

deploy: export PROD=95.217.222.60
deploy: build
	scp -r public/* ${PROD}:/var/www/questionmate

prod: build
	@dotrun
