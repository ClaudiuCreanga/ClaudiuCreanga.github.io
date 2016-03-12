---
layout: post
title:  "Ideas for mobile functionality in ecommerce websites"
date:   2016-03-11 23:26:17
categories: magento
description: "A list of useful functionalities that are often missing on mobile ecommerce sites but could improve the user experience and conversion rates."
---
Most ecommerce websites treat the mobile view of their website as a less featured version of the desktop view. It starts mobile-first with the minimum of features and then the features add up when the screen gets bigger.

What should be done instead is having a base design, a minimal subset of features that will be kept on mobile and desktop and on this design we will add mobile related features for mobile view and desktop related features for the desktop view. 
{% highlight php linenos %}
<div class="hide">
<?php if ($_product->isSaleable() && count($_attributes)):?>
    <dl>
    <?php foreach($_attributes as $_attribute): ?>
    <div class="option">
        <dt><label class="required"><em>*</em><?php echo $_attribute->getLabel() ?></label></dt>
        <dd<?php if ($_attribute->decoratedIsLast){?> class="last"<?php }?>>
            <div class="input-box">
                <select name="super_attribute[<?php echo $_attribute->getAttributeId() ?>]" id="attribute<?php echo $_attribute->getAttributeId() ?>" class="required-entry super-attribute-select">
                    <option><?php echo $this->__('Choose an Option...') ?></option>
                  </select>
              </div>
        </dd>
    </div>
    <?php endforeach; ?>
    </dl>
<?php endif;?>
</div>
{% endhighlight %}

