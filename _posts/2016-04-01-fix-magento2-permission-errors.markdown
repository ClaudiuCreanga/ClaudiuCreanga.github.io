---
layout: post
title:  "Fix permission issues in magento2"
date:   2016-04-01 23:26:17
categories: magento
description: "Permission issues in magento2 can be caused by many issues, here is a few ways to solve them."
---
If you get one of these permission errors: <span class="code">exception 'Magento\Framework\Exception\LocalizedException' with message 'Can't create directory /var/www/html/magento2/var/generation</span> it can be because:
<ul class="cool-bullet lists">
<li>the user permissions on the var folder are wrong</li>
<li>the owner of the var folder is wrong</li>
<li>the user doesn't have access to the database</li>
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

{% highlight javascript linenos %}
onClick="ga('send', 'event', 'category-page', 'add-to-cart', '<?php echo $_product->getName(); ?>', '<?php echo preg_replace('/\..*/', '', $_product->getFinalPrice()); ?>',{'nonInteraction': 1});"
{% endhighlight %}

The code explained:

To every node in your page you can attach an onclick event. Here we attach it to the add to cart button, but you can attach it to an image, video or paragraph. On click, we call the <span class="code">function ga</span> which is defined in the analytics script <span class="code">http://www.google-analytics.com/analytics.js</span>. Inside this function you pass some parameters:

<ul class="cool-bullet lists">
<li>&nbsp; send - sends the data, you shouldn't change this one.</li>
<li>&nbsp; event - it is the type of hit. In our case it is an event. When loading a new page it is a pageview.</li>
<li>&nbsp; category-page - it is the category of our event. It is used to differentiate between events. Usually you want to test multiple types of events on multiple pages.</li>
<li>&nbsp; add-to-cart - it is the action of the event. You should use a meaningful name.</li>
<li>&nbsp; $_product->getName(); - it is the event's label. Here I use the name of the product. Depending on your theme configuration you should change it, or you can just use a string.</li>
<li>&nbsp; preg_replace('/\..*/', '', $_product->getFinalPrice()); - this is the value of the event. Here I get the final price, but because it gets returned with 4 decimals in my theme I strip everything that comes after the dot. This should contain a number, if it contains any other character, like dots, it returns an error. This field should be changed based on your theme.</li>
<li>&nbsp; {'nonInteraction': 1} - setting the interaction to true means that the click event does not influence your bounce rate. Otherwise your event will be treated like an interaction and it will skew your bounce rate stats.</li>
</ul>

Now you can go into your analytics dashboard and under <span class="code"Real-Time -> Events</span> you should see your data right away. Event statistics are showed in the section<span class="code"Behaviour -> Events</span> (it usually takes over 12h to populate).

A full example of a tracked button event in magento:

{% highlight php linenos %}
<?php if($_product->isSaleable()): ?>
    <button type="button" title="<?php echo $this->__('Add to Cart') ?>" class="button btn-cart" onClick="ga('send', 'event', 'category-page', 'add-to-cart', '<?php echo $_product->getName(); ?>', '<?php echo preg_replace('/\..*/', '', $_product->getFinalPrice()); ?>',{'nonInteraction': 1});"><span><span><?php echo $this->__('Add to Cart Tracked') ?></span></span></button>
<?php else: ?>
    <p class="availability out-of-stock"><span><?php echo $this->__('Out of stock') ?></span></p>
<?php endif; ?>
{% endhighlight %}

