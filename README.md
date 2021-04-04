# LeTiCiA: tooL for Task diffiCulty Assessment

This is LeTiCiA's main repository.

## Required dependencies

- Node.js (tested on latest LTS v14.x)
- MongoDB (tested on version 4.4)
- Solr (tested on version 8.7.0)
- Java JDK (tested on OpenJDK 11)

## Install Instructions

### Development

1. Install the required dependencies (instructions are available below)
2. Download or clone this repository
3. On LeTiCiA's repository root directory, copy `.env.example`, rename it as `.env` and edit the file to customize Environment Variables (if needed)
4. On root directory, run `npm install` to install Node.js dependencies
5. On root directory, run `npm run dev` to start LeTiCiA in watch mode for development

### Production

You can run LeTiCiA in production mode following these instructions:

1. Install the required dependencies (instructions are available below)
2. Install PM2 and http-server globally for Node.js: `npm install -g pm2 http-server`
3. On LeTiCiA's repository root directory, copy `.env.example`, rename it as `.env` and edit the file to customize Environment Variables (if needed)
4. On root directory, run `npm install` and then run `npm run clean && npm run build`
5. On root directory, run LeTiCiA with PM2:

        $ pm2 start ./build/server/index.js --name leticia-backend
        $ pm2 start http-server --name leticia-frontend -- ./build/client -p 3000 --proxy http://localhost:3000?

### Installing required dependencies

The following instructions are designed for Ubuntu 20.04 LTS. Adapt them if you are using another GNU/Linux distribution.

#### Node.js

Run these commands to install latest Node.js LTS:

```
$ curl -sL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```

#### MongoDB

Run these commands to install MongoDB:

```
$ wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
$ echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
$ sudo apt-get update
$ sudo apt-get install -y mongodb-org
$ sudo systemctl start mongod
$ sudo systemctl enable mongod
```

#### Solr

1. Solr requires Java 8 JDK or greater to run. Run these commands to install OpenJDK:

        $ sudo apt-get update
        $ sudo apt-get install default-jre default-jdk

2. Run the following commands to install Solr:

        $ cd /tmp
        $ wget https://archive.apache.org/dist/lucene/solr/8.7.0/solr-8.7.0.tgz
        $ tar xzf solr-8.7.0.tgz solr-8.7.0/bin/install_solr_service.sh --strip-components=2
        $ sudo bash ./install_solr_service.sh solr-8.7.0.tgz

3. Create a new core (collection) in Solr for LeTiCiA:

        $ sudo su - solr -c "/opt/solr/bin/solr create -c leticia -n data_driven_schema_configs"

## TODO List

- i18n Support
- API documentation

## License

The source code of LeTiCiA is available under the GNU Affero General Public License version 3.

All dependencies are distibuted under their own licenses.