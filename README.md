# Onesearch Feeds Module
This is a D8 version of onesearch feeds module

## Getting started

### Prerequisites
This module __requires__ [Config Ignore](https://www.drupal.org/project/config_ignore) and [Search API](https://www.drupal.org/project/search_api). Install and enable those two modules first.

Also enable `Database Search` and `Database Search Defaults` modules as well, those are part of `Search API` module.

### Install Onesearch Feeds module
Please update `composer.json` file 

Under 'repositories', please add following:
```
    {
            "type": "package",
            "package": {
              "name": "utlib/onesearch_feeds_8",
              "version": "dev-master",
              "type": "drupal-custom-module",
              "source": {
                  "url": "git@github.com:utlib/onesearch_feeds_8.git",
                  "type": "git",
                  "reference": "master"
              }
            }
        }
```
and add the following line under `require`
```
"utlib/onesearch_feeds_8": "dev-master#{git commit hash}",
```
lastly, add the following line under `installer-paths` - if it doesn't exist
```
"web/modules/custom/{$name}" : ["type:drupal-custom-module"],
```

`[commit SHA]` is the commit hash of the commit wish to use. It can be found at [`Commits`](https://github.com/utlib/onesearch_feeds_8/commits/master) on [module github page](https://github.com/utlib/onesearch_feeds_8). For every commit, there's a 8 digit alphanumeric text on the right side. 

Run `composer install`

After `composer install` is finished, go into the theme directory (`web/modules/custom/onesearch_feeds_8`) and run `npm install`

Include onesearch_feeds_8 directory to .gitignore of drupal site.

Enable Onesearch Feeds module via drush or Configuration page

## Post installation steps

### Set up a search index on Search API
Go to  `Configuration` > `Search API`. As a default `Database Server` and `Default content index` will be enabled. ✅

Go to `Default Content Index` and clicking `Edit` tab, from there can choose which entities to index (file, block, content, taxonomy, etc..) and which content type to index.

Go back to `View` page by clicking `View` tab, and click `Index now` button to start indexing Drupal contents.

### Configure Onesearch Feeds module
Go to `Configuration` > `Onesearch Feeds`. 

For local development site, it is required to check ✅ for `Running drupal sites in localhost?` since it's impossible to do REST API call directly on endeca (and other sites) because of CORS. 

For Drupal site search, click on `Search Options` tab. Check ✅ for `Drupal Web Search` and enter the machine name of Drupal Search API Index. If `Default Content Index` was used, it will be `default_index`.

In this page, there are options to choose which search results to be displayed. (Books, Summon, Journal / Databases, etc.)

### Optional - keep local Onesearch Feeds module configuration separate from production

Go to `Configuration` > `Configuration Synchronization` > `Ignore`. At the textarea for `Configuration entity names to ignore`. (1)

To keep __ALL__ of Onesearch Feeds module configuration on localhost separated from the production, enter

```
onesearch_feeds_8.*
```

For a la carte separation, click on `Export` tab, then `Single Item` and select either `onesearch_feeds_8.adminsettings` or `onesearch_feeds_8.searchoptionsettings` at `Configuration name` dropdown list to get a list of configuration names.

For example:
```
onesearch_feeds_8_books_enabled: 1
```
Copy and paste the part `onesearch_feeds_8_books_enabled` to (1) and click save.

Then do drush cex, add / commit / push to git to push to the production

## Working with the module

### React + CSS Parts
Run `npm install` from `/app` directory

React + SCSS files are found in `/app/src` directory

Run `npm run watch-css` to compile scss every time there are changes.

For React change, after change / save JS file, run `npm run build` to compile JS file.

### Drupal module files
Don't forget to run `drush cr` after save!
