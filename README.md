# LeTiCiA: tooL for Task diffiCulty Assessment

This is LeTiCiA's main repository.

## Install Instructions

### Development

1. Install latest LTS version for Node.js
2. Download or clone this repository
3. On LeTiCiA's repository root directory, copy `.env.example`, rename it as `.env` and edit the file to customize Environment Variables (if needed)
4. On root directory, run `npm install` and then run `npm run dev`

#### Installing Node.js

Run these commands for installing latest Node.js LTS on Ubuntu:

```
curl -sL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### Installing Solr for development

1. Solr requires Java 8 JDK or greater to run. Run the following commands to install Solr on Ubuntu:

        $ cd /tmp
        $ wget https://archive.apache.org/dist/lucene/solr/8.7.0/solr-8.7.0.tgz
        $ tar xzf solr-8.7.0.tgz solr-8.7.0/bin/install_solr_service.sh --strip-components=2
        $ sudo bash ./install_solr_service.sh solr-8.7.0.tgz

2. Create a new core (collection) in Solr for LeTiCiA:

        $ sudo su - solr -c "/opt/solr/bin/solr create -c leticia -n data_driven_schema_configs"

### Production

TODO

## TODO List

- Install Instructions
- Extended Challenge
- i18n Support

## License

The source code of LeTiCiA is available under the GNU Affero General Public License version 3.

All dependencies are distibuted under their own licenses.
