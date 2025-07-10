all:
	npm run build
	rsync -avz --delete dist/myextension/ resources/App/webextensions/mxlint
