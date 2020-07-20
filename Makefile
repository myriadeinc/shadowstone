
T = $(TAG)

dev:
	docker build -f Dockerfile.dev -t myriadeinc/shadowstone:dev .

up:
	docker-compose up

build: 
	docker build -f Dockerfile -t myriadeinc/shadowstone:${T} .