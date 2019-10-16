# Onesearch Feeds Module
This is a D8 version of onesearch feeds module

To use this module for the library site, please add following lines at `composer.json` under `repositories` of the drupal site.

```
      { 
          "type": "vcs",
          "url": "git@git.library.utoronto.ca:central-library-services/onesearch_feeds_8.git"
      },
```
and add the following line under `require`
```
"central-library-services/onesearch_feeds_8": "dev-master#{git commit hash}",
```

and do `composer update`