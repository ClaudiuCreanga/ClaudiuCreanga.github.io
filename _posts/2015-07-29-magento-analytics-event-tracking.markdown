---
layout: post
title:  "Add event tracking for Google Analytics in magento"
date:   2015-07-29 23:26:17
categories: analytics
description: "There are quite a few modules out there that add event tracking to magento. Unless you want a complex tracking system, tracking events with Google Analytics can be done with a few lines of code."
---
As you may know, GA, by default, records only page loads. Only when the url is changed the <span class="code">ga function</span> sends data to your analytics account, as you can see from the standard tracking code: <span class="code">ga('send', 'pageview')</span> But, obviously, you would want to track more than page changes: add to cart clicks, newsletter signups etc.

One thing that I would want to know is if customers actually buy products from the category page, or is that add to basket button on category pages useless. To test it you just have to add an <span class="code">onclick event</span> to the add to basket button:

{% highlight javascript linenos %}
onClick="ga('send', 'event', 'category-page', 'add-to-cart', '<?php echo $_product->getName(); ?>', '<?php echo preg_replace('/\..*/', '', $_product->getFinalPrice()); ?>',{'nonInteraction': 1});"
{% endhighlight %}

The code explained:
To every node in your page you can attach an onclick event. Here we attach it to the add to cart button, but you can attach it to an image, video or paragraph. On click, we call the <span class="code">function ga</span> which is defined in the analytics script <span class="code">http://www.google-analytics.com/analytics.js</span>. Inside this function you pass some parameters:
<ul class="cool-bullet lists">
<li>send - sends the data, you shouldn't change this one.</li>
<li>event - it is the type of hit. In our case it is an event. When loading a new page it is a pageview.</li>
<li>category-page - it is the category of our event. It is used to differentiate between events. Usually you want to test multiple types of events on multiple pages.</li>
<li>add-to-cart - it is the action of the event. You should use a meaningful name.</li>
<li><?php echo $_product->getName(); ?> - it is the event's label. Here I use the name of the product. Depending on your theme configuration you should change it, or you can just use a string.</li>
<li><?php echo preg_replace('/\..*/', '', $_product->getFinalPrice()); ?> - this is the value of the event. Here I get the final price, but because it gets returned with 4 decimals in my theme I strip everything that comes after the dot. This should contain a number, if it contains any other character, like dots, it returns an error. This field should be changed based on your theme.</li>
<li>{'nonInteraction': 1} - setting the interaction to true means that the click event does not influence your bounce rate. Otherwise your event will be treated like an interaction and it will skew your bounce rate stats.</li>
</ul>

Now you can go into your analytics dashboard and under Real-Time -> Events you should see your data right away. Event statistics are showed in the Behaviour section -> Events.

A full example of a tracked button event in magento:

{% highlight php linenos %}
<?php if($_product->isSaleable()): ?>
    <button type="button" title="<?php echo $this->__('Add to Cart') ?>" class="button btn-cart" onClick="ga('send', 'event', 'category-page', 'add-to-cart', '<?php echo $_product->getName(); ?>', '<?php echo preg_replace('/\..*/', '', $_product->getFinalPrice()); ?>',{'nonInteraction': 1});"><span><span><?php echo $this->__('Add to Cart Tracked') ?></span></span></button>
<?php else: ?>
    <p class="availability out-of-stock"><span><?php echo $this->__('Out of stock') ?></span></p>
<?php endif; ?>
{% endhighlight %}

