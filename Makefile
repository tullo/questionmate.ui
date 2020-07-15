deploy:
	npm run build
	scp -r public/* 95.217.222.60:/var/www/questionmate
