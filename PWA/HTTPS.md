## Generate CA Certificate
```
openssl req -x509 -nodes -sha256 -days 730 -newkey rsa:2048 -keyout key.pem -out ca.pem -config ca.cnf
```
`ca.pem` should be added to browser 

## Generate Server Certificate
```
openssl req -x509 -nodes -sha256 -days 730 -key key.pem -out cert.pem -config openssl.cnf -extensions 'v3_req'
```

## Start server
Install `http-server`
```
npm install -g http-server
```

Start the server
```
http-server --ssl -p 4443
```
It will search for `cert.pem` and `key.pem`