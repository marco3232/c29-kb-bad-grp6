# ubuntu server setup
### 

```
1. cd /etc/nginx/conf.d
2. sudo vim rentngo.marcoding.me

3.server {
  listen 80;
  listen [::]:80;

  server_name rentngo.marcoding.me;

  location / {
    proxy_pass http://localhost:9090;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```
## create folder with your project
```
cd ~
mkdir rentngo
```
