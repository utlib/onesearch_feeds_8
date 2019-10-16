# Onesearch Feeds Module
This is a D8 version of onesearch feeds module

To use this module for the library site, please add following lines at `composer.json` under `repositories` of the drupal site.

```
      {
        "type": "package",
        "package": {
            "name": "central-library-services/onesearch_feeds_8",
            "version": "dev-master",
            "type": "drupal-custom-module",
            "source": {
                "url": "git@git.library.utoronto.ca:central-library-services/onesearch_feeds_8.git",
                "type": "git",
                "reference": "master"
            }
        }       
      },
```
and add the following line under `require`
```
"central-library-services/onesearch_feeds_8": "dev-master",
```