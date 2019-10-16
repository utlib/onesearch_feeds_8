# Onesearch Feeds Module
This is a D8 version of onesearch feeds module

For every commit,
increase version number at `composer.json`.
After commit and push to git, update version number at `Repository > Tags` - use same version # as `composer.json`.

To use this module for the library site, please update `composer.json` at the root directory of the drupal site.

Under 'repositories', please add following:
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

git commit hash for the `master` branch can be found at `Repository > Commits` at Gitlab repository.

and do `composer update`