# LETICIA: simuLated sEarch Task deploy and InteraCtIon cApture platform

LETICIA is a web platform intended to be an open-source solution to deploy study designs in the Interactive Information Retrieval (IIR) field. Besides deploying these studies, LETICIA can conduct them and collect various types of data from user's interactions. LETICIA presents several features out of the box that can be customized to researchers' needs: A built-in search engine, a tool to build document collections, an interactive application programming interface (API), a data logger, and a session flow manager.

## Quick Start

To install and test LETICIA, follow these steps:
 
1. Clone this repository or download it as ZIP
2. Install required dependencies ([Docker](#docker-install))
3. Open the `src/` directory on your local version of this repository
    1. Copy `.env.example`, rename it as `.env` and edit the file to customize Environment Variables (if needed)
    2. Run `leticia-build.sh` to build the Docker image of LETICIA
    3. Run `leticia-up.sh` to run LETICIA as a Docker container
4. Open the `extras/` directory on your local version of this repository
    1. Run `load-example-content.sh`, this will populate the database with some assets to test the platform

Now you can test the platform on `localhost:3000` in a web browser. You can access to OpenAPI documentation on `localhost:3001/openapi`. The MongoDB Database can be reached at `localhost:3010` and the Solr Inverted Index can be accessed at `localhost:3011`. To stop the LETICIA platform, run `leticia-down.sh` located on the `src/` directory. 

## Required dependencies

LETICIA is designed to run on GNU/Linux distributions and it was tested on Ubuntu Server 20.04 LTS. The required software dependencies are listed as follows:

- Node.js (tested on LTS v16.x)
- MongoDB (tested on version 5.0)
- Solr (tested on version 8.11.1)
- Java JDK (tested on OpenJDK 11)

## Install Instructions

### Development {#leticia-dev}

1. Install the required dependencies (instructions are available below)
2. Download or clone this repository
3. On LETICIA's repository `src/` directory, copy `.env.example`, rename it as `.env` and edit the file to customize Environment Variables (if needed)
4. On `src/` directory, run `npm install` to install Node.js dependencies
5. On `src/` directory, run `npm run dev` to start LETICIA in watch mode for development

### Production

You can run LETICIA in production mode by one of these options: Docker or PM2.

#### Docker deploy {#leticia-docker}

This setup is recommended for quick-and-easy deploys on high-performance servers. All dependencies are downloaded as Docker images.

1. Install Docker and Docker Compose (instructions are available below)
2. Download or clone this repository
3. On LETICIA's repository `src/` directory, copy `.env.example`, rename it as `.env` and edit the file to customize Environment Variables (if needed)
4. On `src/` directory, run `./leticia-build.sh` to download and generate all required dependencies
5. On `src/` directory, run `./leticia-up.sh` to deploy LETICIA on background
6. On `src/` directory, run `./leticia-down.sh` to stop running LETICIA

#### PM2 deploy {#leticia-pm2}

This setup uses less resources than the Docker option, but involves more steps and manual install of dependencies.

1. Install Node.js, MongoDB, and Solr (instructions are available below)
2. Install PM2 globally for Node.js: `npm install -g pm2`
3. On LETICIA's repository `src/` directory, copy `.env.example`, rename it as `.env` and edit the file to customize Environment Variables (if needed)
4. On `src/` directory, run `npm install` and then run `npm run clean && npm run build`
5. On `src/` directory, run LETICIA with PM2: `pm2 start ecosystem.config.js`, other actions that can be performed with PM2 to control the plaform on production are available on the [PM2 documentation](https://pm2.keymetrics.io/docs/usage/application-declaration/)

### Installing required dependencies {#deps-install}

The following instructions are designed for Ubuntu 20.04 LTS. Adapt them if you are using another GNU/Linux distribution.

#### Node.js {#node-install}

Run these commands to install latest Node.js LTS:

```
$ curl -sL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```

#### MongoDB {#mongo-install}

Run these commands to install MongoDB:

```
$ wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
$ echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
$ sudo apt-get update
$ sudo apt-get install -y mongodb-org
$ sudo systemctl start mongod
$ sudo systemctl enable mongod
```

#### Solr {#solr-install}

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

#### Docker and Docker Compose {#docker-install}

This is required only for Docker production deploy.

1. Install required dependencies for Docker

        $ sudo apt-get update
        $ sudo apt-get install ca-certificates curl gnupg lsb-release

2. Add Docker's GPG key

        $ sudo mkdir -p /etc/apt/keyrings
        $ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg 

3. Set up Docker's repository

        $ echo \
          "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
          $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

4. Install Docker and Docker Compose

        $ sudo apt-get update
        $ sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin

5. Enable using Docker for current user (without requiring `sudo`):

        $ sudo usermod -aG docker $(whoami)
        $ logout

### Environment variables {#env-vars}

To run LETICIA, a file with environment variables called `.env` is required on project's `src/` directory. You can copy and rename the `.env.example` file to get the default settings, or you can customize this file to customize the deploy. The following environment variables are available on LETICIA:

| Env Variable           | Default Value | Description                                       |
|------------------------|---------------|---------------------------------------------------|
| LETICIA_HOST           | localhost     | IP address or DNS domain where LETICIA is running |
| LETICIA_PROTOCOL       | http          | Protocol used by LETICIA (http or https)          |
| LETICIA_PORT           | 3000          | Local port to deploy LETICIA's WebApp             |
| MONGODB_HOST           | localhost     | URL for MongoDB                                   |
| MONGODB_PORT           | 27017         | Port for MongoDB                                  |
| MONGODB_DATA_DB        | leticia-data  | Database name for experimental data               |
| MONGODB_USER_DB        | leticia-user  | Database name for credential data                 |
| SOLR_HOST              | localhost     | URL for Solr (inverted index)                     |
| SOLR_PORT              | 8983          | Port for Solr                                     |
| SOLR_CORE              | leticia       | Core/collection for Solr                          |
| ENABLE_GOOGLE_LOGIN    | true          | Toggles Google SSO Login                          |
| GOOGLE_CLIENT_ID       | insert-id     | Google SSO Login client id                        |
| GOOGLE_CLIENT_SECRET   | insert-secret | Google SSO Login client secret                    |
| ENABLE_FACEBOOK_LOGIN  | true          | Toggles Facebook SSO Login                        |
| FACEBOOK_CLIENT_ID     | insert-id     | Facebook SSO Login client id                      |
| FACEBOOK_CLIENT_SECRET | insert-secret | Facebook SSO Login client secret                  |
| ENABLE_EMAIL_LOGIN     | true          | Toggles Email Login                               |
| JWT_KEY                | secret        | String for JWT token generation                   |
| LETICIA_PILOT_MODE     | false         | Toggles LETICIA's Pilot Mode (deprecated)         |
| CURRENT_SESSION_FLOW   | short         | Activity flow to run with new participants        |
| ENABLE_FRONTEND        | true          | Toggles deploy of LETICIA's Frontend              |
| ENABLE_API_DOCS        | true          | Toggles deploy of LETICIA's OpenAPI Documentation |

### Example databases {#populate-db}

After deploying LETICIA either in development or PM2 deploy mode, is possible to install a pre-populated database as an example to create new experimental assets. You can do so by running the following commands from the project's root directory:

```
$ cd extras/databaseScripts/
$ mongo leticia-data populateDataDatabase-en.js
```

## License {#license}

The source code of LETICIA is available under the GNU Affero General Public License version 3.

LETICIA's frontend uses some royalty-free images from [Pixabay](https://pixabay.com). They can be replaced with custom images under the `src/client/assets/` directory.