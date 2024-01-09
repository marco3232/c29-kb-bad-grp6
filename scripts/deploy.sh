set -e
set -o pipefail

server=marco
server_dir="~/rentngo"
steps=4

echo [1/$steps] Building Typescript Project...
npm run build

echo [2/$steps] Uploading to EC2 Server...
scp -r \
  package.json \
  dist \
  public \
  "$server:$server_dir/"

echo [3/$steps] Install Dependencies...
ssh $server "
source ~/.nvm/nvm.sh
cd $server_dir
npm install --omit=dev
"

echo [4/$steps] Migrate Database...
ssh $server "
source ~/.nvm/nvm.sh
cd $server_dir
cp .env dist/
cd dist
npx knex migrate:latest
"

echo [Done] Deployment Finished.
