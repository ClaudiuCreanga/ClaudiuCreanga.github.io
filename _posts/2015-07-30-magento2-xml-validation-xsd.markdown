---
layout: post
title:  "New magento2 xml validation"
date:   2015-11-17 23:26:17
categories: magento
description: "In magento2 you can validate your xml files against its corresponding schema definition. This will help you avoid mistakes in your xmls."
---
In magento2 you can validate your xml files against its corresponding schema definition. 

In magento1 we had
{% highlight xml linenos %}
<?xml version="1.0"?>
<config>
    ....
</config>
{% endhighlight %}
In magento2 this becomes:
{% highlight xml linenos %}
<?xml version="1.0"?>
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:Module/etc/module.xsd">
    ....
</config>
{% endhighlight %}

The extra information provided there specifies the schema instance used and the URN to the corresponding xsd file. In our case we point out that our xml must follow the rules presented in the file: <span class="code">vendor/magento/framework/Module/etc/module.xsd</span>. The URN is a type of URI that is location-independent (unlike the URL). 

Remember the days when your module didn't work and you had to look for hours through xmls to find the typo? Those days should be over now because IDEs (like PhpStorm) can validate instantly your xml against the specified xsd. 

All you have to do is run <span class="code">php bin/magento dev:urn-catalog:generate .idea/misc.xml</span> and then if you reopen your IDE you can validate your xmls. 

In PhpStorm look for an exclamation mark or a green validation mark in the top right corner. Also you can go to <span class="code">PhpStorm > Preferences > Languages & Frameworks > Schemas and DTDs</span> and see all current URN resolutions.