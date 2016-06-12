---
layout: post
title:  "How to use translations in magento2, like en_GB"
date:   2016-06-01 23:26:17
categories: magento
description: "Best way to change titles and other often used expressions in magento2 is via translations."
---
You want to replace "Related products" with "Use with" or "Search entire store here..." with "Search...". Here is how to create a new language pack like en_GB where you will insert all your translations:

Create path <span class="code">/app/i18n/magento/uk_gb/</span>.

In that folder create 4 files:
<ul class="cool-bullet lists">
<li>composer.json</li>
{% highlight php linenos %}
{
"name": "magento/uk_gb",
  "description": "Ukrainian",
  "version": "100.0.1",
  "license": [
    "OSL-3.0",
    "AFL-3.0"
  ],
  "require": {
    "magento/framework": "100.0.*"
  },
  "type": "magento2-language",
  "autoload": {
    "files": [
      "registration.php"
    ]
  }
}
{% endhighlight %}

<li>uk_GB.csv</li>
{% highlight xml linenos %}

"some newsletter text","changed newsletter text"

{% endhighlight %}


<li>language.xml</li>
{% highlight xml linenos %}
<?xml version="1.0"?>
<language xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:App/Language/package.xsd">
    <code>uk_GB</code>
    <vendor>magento</vendor>
    <package>uk_gb</package>
</language>
{% endhighlight %}

<li>registration.php</li>
{% highlight php linenos %}
<?php

\Magento\Framework\Component\ComponentRegistrar::register(
    \Magento\Framework\Component\ComponentRegistrar::LANGUAGE,
    'magento_uk_gb',
    __DIR__
);

?>
{% endhighlight %}

</ul>
Bare in mind that it is case sensitive. Path, registration and vendor are uk_gb, but csv and code is uk_GB.


If you get one of these permission errors: 
{% highlight php linenos %}
exception 'Magento\Framework\Exception\LocalizedException' with message 'Can't create directory /var/www/html/magento2/var/generation
{% endhighlight %}

it can be because:
<ul class="cool-bullet lists">
<li> the user permissions on the var folder are wrong</li>
<li> the owner of the var folder is wrong</li>
<li> the user doesn't have access to the database</li>
</ul>
If it is one of the first 2 situations you can solve it simply with <span class="code">find /var -type d -exec chmod g+s {} \;</span> from the root folder. Or <span class="code">chown -R user var</span> to change the user. 

If you still get the error and maybe you are running a VM, make sure that the user has access to the database. Run a magento command like <span class="code">php bin/magento setup:static-content:deploy</span>. If you get a database error like this one: 
{% highlight mysql linenos %}
[PDOException]                                                                          
  SQLSTATE[HY000] [1045] Access denied for user ...
{% endhighlight %}
Then you need to login to mysql and give the right privileges to your user:
{% highlight mysql linenos %}
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' IDENTIFIED BY 'password' WITH GRANT OPTION;
{% endhighlight %}

Another issue can be that you are using a VM and you are applying the permissions to the shared folder from the VM instead from your local system. 

If it still doesn't work, maybe it is a cached issue, so you can:
{% highlight php linenos %}
cd pub/static
find . -depth -name .htaccess -prune -o -delete
cd ../../
rm -rf var/cache/ var/generation/ var/page_cache/ var/view_preprocessed/
php bin/magento setup:static-content:deploy
{% endhighlight %}
