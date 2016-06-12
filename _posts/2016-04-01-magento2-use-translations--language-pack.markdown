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
<li> composer.json</li>
{% highlight php linenos %}
{
"name": "magento/uk_gb",
  "description": "English",
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

<li> uk_GB.csv</li>
{% highlight xml linenos %}

"Related Products","Use with:"

{% endhighlight %}
Here of course you insert other translations. 


<li> language.xml</li>
{% highlight xml linenos %}
<?xml version="1.0"?>
<language xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:App/Language/package.xsd">
    <code>en_GB</code>
    <vendor>limesharp</vendor>
    <package>en_gb</package>
    <sort_order>100</sort_order>
    <use vendor="oxford-university" package="en_us"/>
</language>
{% endhighlight %}
We've used en_us as the parent language.


<li> registration.php</li>
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
Bare in mind that the language code is case sensitive. Path, registration and vendor are <span class="code">uk_gb</span>, but csv and language code is <span class="code">uk_GB</span>.

If you want to use translations in your module, you just create a i18n folder there and add your csv file. 

The numeronym i18n comes from Internationalization, 18 being the number of letters between the first i and the last n. The idea behind internationalization is that an application should potentially be adapted to various languages without the need to touch the code. Magento2 does well here. 
