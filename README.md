# To Do PWA

## Setup
Install serve utility:
```
npm install -g serve
```

Install server modules:
```
cd server
npm install
```

Install client modules:
```
cd PWA
npm install
```

Create client config file:
```
cp PWA/config-example.js PWA/config.js
```
Edit the IP adress in `config.js` if necessary.

## Start server
```
node ./server/server.js
```

## Start client
```
serve ./PWA
```
Access client on port `5000`