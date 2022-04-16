# LETICIA: simuLatEd Task and actIvity Capture Interactive plAtform

This is LETICIA's main repository.

## Required dependencies

- Node.js (tested on latest LTS v14.x)
- MongoDB (tested on version 4.4)
- Solr (tested on version 8.7.0)
- Java JDK (tested on OpenJDK 11)

## Install Instructions

### Development

1. Install the required dependencies (instructions are available below)
2. Download or clone this repository
3. On LETICIA's repository root directory, copy `.env.example`, rename it as `.env` and edit the file to customize Environment Variables (if needed)
4. On root directory, run `npm install` to install Node.js dependencies
5. On root directory, run `npm run dev` to start LETICIA in watch mode for development

### Production

You can run LETICIA in production mode following these instructions:

1. Install the required dependencies (instructions are available below)
2. Install PM2 globally for Node.js: `npm install -g pm2`
3. On LETICIA's repository root directory, copy `.env.example`, rename it as `.env` and edit the file to customize Environment Variables (if needed)
4. On root directory, run `npm install` and then run `npm run clean && npm run build`
5. On root directory, run LETICIA with PM2: `pm2 start ecosystem.config.js`

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

3. Create a new core (collection) in Solr for LETICIA:

        $ sudo su - solr -c "/opt/solr/bin/solr create -c leticia -n data_driven_schema_configs"

### Example databases

After deploying LETICIA, is possible to install a pre-populated database as an example to create new experimental assets. You can do so by running the following commands from the project's root directory:

```
$ cd extras/databaseScripts/
$ mongo leticia-data populateDataDatabase-en.js
```

## License

The source code of LETICIA is available under the GNU Affero General Public License version 3.

All dependencies are distibuted under their own licenses.

LETICIA's frontend uses some royalty-free images from [Pixabay](https://pixabay.com). They can be replaced with custom images under the `/client/assets` directory.