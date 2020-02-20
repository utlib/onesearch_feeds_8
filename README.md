# Onesearch Feeds Module
This is a D8 version of onesearch feeds module

## Getting started

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
