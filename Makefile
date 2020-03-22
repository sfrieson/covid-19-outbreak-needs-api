.runtimeconfig.json:
	firebase functions:config:get > .runtimeconfig.json
.firebaserc:

functions/node_modules: functions/package-lock.json functions/package.json
	npm install --prefix functions

.PHONY: server
server: .runtimeconfig.json functions/node_modules
	firebase emulators:start --only functions
