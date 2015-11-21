---
layout: post
title:  "Magento2 provides a powerful CLI"
date:   2015-11-17 23:26:17
categories: magento
description: "Magento2 comes with a powerful command line interface. It is possible to do a lot a lot of tasks like reindex, clean cache, generate code, create database backups just by typing in your terminal"
---
Magento2 comes with a powerful command line interface. It is possible to do a lot a lot of tasks like reindex, clean cache, generate code, create database backups just by typing in your terminal.

You run magento2 commands like this: <span class="code">php bin/magento command [options] [arguments]</span>. In order to be quicker I suggest creating an alias in your bash profile: <span class="code">alias phpm="php bin/magento"</span> (to open up your bash on mac run<span class="code">sudo nano ~/.bash_profile</span>). 

Now every time you want to run a magento command you just type <span class="code">phpm</span>.

Here is a list of the most helpful commands (with the explanation in brackets):
{% highlight xml linenos %}
phpm cache:clean (flushes all caches)
phpm indexer:reindex (reindexes)
phpm setup:static-content:deploy (deploys static view files)
phpm module:enable (enables specified module, i.e phpm module:enable Company_Stockists)
phpm setup:upgrade (upgrades the app, db and schema. This needs to run after every module install)
phpm setup:backup (takes backup of Magento Application code base, media and database)
phpm admin:user:create (creates an admin user, options required)
phpm cron:run (run a specific cron, i.e cron:run merchant)
{% endhighlight %}

Some commands have required options, like <span class="code">admin:user:create</span>. To see the options of a command you can run: <span class="code">phpm admin:user:create -h</span> and you'll get:

{% highlight xml linenos %}
Options:
 --admin-user           (Required) Admin user
 --admin-password       (Required) Admin password
 --admin-email          (Required) Admin email
 --admin-firstname      (Required) Admin first name
 --admin-lastname       (Required) Admin last name
{% endhighlight %}

So for the command to be successful, you may run it like this:
{% highlight xml linenos %}
phpm admin:user:create --admin-user claudiu --admin-password mypass123 --admin-email my@email.com --admin-firstname me --admin-lastname surname
{% endhighlight %}

The full list of commands:
{% highlight xml linenos %}
dmin
 admin:user:create                         Creates an administrator
 admin:user:unlock                         Unlock Admin Account
cache
 cache:clean                               Cleans cache type(s)
 cache:disable                             Disables cache type(s)
 cache:enable                              Enables cache type(s)
 cache:flush                               Flushes cache storage used by cache type(s)
 cache:status                              Checks cache status
catalog
 catalog:images:resize                     Creates resized product images
cron
 cron:run                                  Runs jobs by schedule
customer
 customer:hash:upgrade                     Upgrade customer's hash according to the latest algorithm
deploy
 deploy:mode:set                           Set application mode.
 deploy:mode:show                          Displays current application mode.
dev
 dev:source-theme:deploy                   Collects and publishes source files for theme.
 dev:tests:run                             Runs tests
 dev:urn-catalog:generate                  Generates the catalog of URNs to *.xsd mappings for the IDE to highlight xml.
 dev:xml:convert                           Converts XML file using XSL style sheets
i18n
 i18n:collect-phrases                      Discovers phrases in the codebase
 i18n:pack                                 Saves language package
 i18n:uninstall                            Uninstalls language packages
indexer
 indexer:info                              Shows allowed Indexers
 indexer:reindex                           Reindexes Data
 indexer:set-mode                          Sets index mode type
 indexer:show-mode                         Shows Index Mode
 indexer:status                            Shows status of Indexer
info
 info:adminuri                             Displays the Magento Admin URI
 info:backups:list                         Prints list of available backup files
 info:currency:list                        Displays the list of available currencies
 info:dependencies:show-framework          Shows number of dependencies on Magento framework
 info:dependencies:show-modules            Shows number of dependencies between modules
 info:dependencies:show-modules-circular   Shows number of circular dependencies between modules
 info:language:list                        Displays the list of available language locales
 info:timezone:list                        Displays the list of available timezones
maintenance
 maintenance:allow-ips                     Sets maintenance mode exempt IPs
 maintenance:disable                       Disables maintenance mode
 maintenance:enable                        Enables maintenance mode
 maintenance:status                        Displays maintenance mode status
module
 module:disable                            Disables specified modules
 module:enable                             Enables specified modules
 module:status                             Displays status of modules
 module:uninstall                          Uninstalls modules installed by composer
sampledata
 sampledata:deploy                         Deploy sample data modules
 sampledata:remove                         Remove all sample data packages from composer.json
 sampledata:reset                          Reset all sample data modules for re-installation
setup
 setup:backup                              Takes backup of Magento Application code base, media and database
 setup:config:set                          Creates or modifies the deployment configuration
 setup:cron:run                            Runs cron job scheduled for setup application
 setup:db-data:upgrade                     Installs and upgrades data in the DB
 setup:db-schema:upgrade                   Installs and upgrades the DB schema
 setup:db:status                           Checks if DB schema or data requires upgrade
 setup:di:compile                          Generates DI configuration and all non-existing interceptors and factories
 setup:di:compile-multi-tenant             Generates all non-existing proxies and factories, and pre-compile class definitions, inheritance information and plugin definitions
 setup:install                             Installs the Magento application
 setup:performance:generate-fixtures       Generates fixtures
 setup:rollback                            Rolls back Magento Application codebase, media and database
 setup:static-content:deploy               Deploys static view files
 setup:store-config:set                    Installs the store configuration
 setup:uninstall                           Uninstalls the Magento application
 setup:upgrade                             Upgrades the Magento application, DB data, and schema
theme
 theme:uninstall                           Uninstalls theme
{% endhighlight %}
