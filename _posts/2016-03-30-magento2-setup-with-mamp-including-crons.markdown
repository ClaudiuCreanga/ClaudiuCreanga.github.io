---
layout: post
title:  "Magento2 setup with MAMP, crons included"
date:   2016-03-30 23:26:17
categories: magento
description: "If you don't like docker or vagrant, Mamp is probably your best alternative to get an easy working setup of magento2."
---
First you must upgrade to mysql 5.6. Download the archive from their <a href="http://blog-en.mamp.info/2015/07/how-to-use-mysql-5-6-with-mamp-and-mamp.html" target="_blank">official blog</a>. Unzip it an run it. It will update your mysql server to 5.6. 

Chose a supported php version in mamp, preferably php7. Then open your php.ini file (File -> Edit Template -> your php version) and change this value <span class="code">always_populate_raw_post_data</span> to -1.

In your terminal open your bash profile (<span class="code">sudo nano ~/.bash_profile</span>) and add this:
{% highlight bash linenos %}
PHP_VERSION=`ls /Applications/MAMP/bin/php/ | sort -n | tail -1`
export PATH=/Applications/MAMP/bin/php/${PHP_VERSION}/bin:$PATH
{% endhighlight %}
Now type <span class="code">source ~/.bash_profile</span> to refresh your bash profile. If you check your php version in the command line: <span class="code">which php</span> followed by <span class="code">php -v</span> you should get the mamp php and the same php version that you have in your mamp. It is necessary to have the same php that runs in the command line and in the webserver. 

You can install magento2 now with your <a href="http://devdocs.magento.com/guides/v2.0/install-gde/bk-install-guide.html" target="_blank">preferred method</a>.

Once this is ok you can proceed to set up the crons. Put a file in your root server folder with <span class="code">phpinfo()</span> and render it in the browser. There you can see 3 lines that you need: USER, Loaded Configuration File, memory_limit. Now we run <span class="code">sudo crontab -u USER -e</span> and insert our crons (change it to your setup):

{% highlight bash linenos %}
*/1 * * * * /Applications/MAMP/bin/php/php7.0.0/bin/php -c /Library/Application\ Support/appsolute/MAMP\ PRO/conf/php.ini /Users/magento-2/bin/magento cron:run >> /Users/magento-2/var/log/setup.cron.log&
*/1 * * * * /Applications/MAMP/bin/php/php7.0.0/bin/php -c /Library/Application\ Support/appsolute/MAMP\ PRO/conf/php.ini /Users/magento-2/update/cron.php >> /Users/magento-2/var/log/setup.cron.log&
*/1 * * * * /Applications/MAMP/bin/php/php7.0.0/bin/php -c /Library/Application\ Support/appsolute/MAMP\ PRO/conf/php.ini /Users/magento-2/bin/magento setup:cron:run >> /Users/magento-2/var/log/setup.cron.log&
{% endhighlight %}

<span class="code">/Library/Application\ Support/appsolute/MAMP\ PRO/conf/php.ini</span> is my Loaded Configuration File.
<span class="code">/Users/magento-2/</span> is the path to my magento root. Change it to yours. 
<span class="code">/Applications/MAMP/bin/php/php7.0.0/bin/php</span> is php7. Change it to your version if necessary.

To make sure everything runs ok you have to check <span class="code">var/log/setup.cron.log</span> and see <span class="code">Ran jobs by schedule.</span>

In your magento .htaccess change the <span class="code">memory_limit</span> to 2G.

Note that if you are upgrading from magento 2.0.0 there is a bug for php7 that will not let you upgrade and it will not detect your crons. You have to <a href="http://devdocs.magento.com/guides/v2.0/release-notes/tech_bull_201-upgrade.html" target="_blank">apply the patch</a> and run the resolution 1.

If you get this error in your mamp php logs:
<span class="code">PHP Fatal error: require_once(): Failed opening required '/public_html/magento2/update/vendor/autoload.php'</span> you must run composer install within the update folder.

More information about the crons <a href="http://devdocs.magento.com/guides/v2.0/config-guide/cli/config-cli-subcommands-cron.html" target="_blank">here</a>.
