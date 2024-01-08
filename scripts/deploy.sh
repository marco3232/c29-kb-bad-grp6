set -e
set -o pipefail

echo [1/3] Building Typescript Project...
npm run build

echo [2/3] Uploading to EC2 Server...
scp -r \
  package.json \
  dist \
  public \
  bps:~/02-express-server/

echo [3/3] Install Dependencies...
ssh bps "
source ~/.nvm/nvm.sh
cd ~/02-express-server/
npm install --omit=dev
"

echo [Done] Deployment Finished.
