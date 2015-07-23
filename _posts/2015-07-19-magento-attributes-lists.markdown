---
layout: post
title:  "Get magento super attributes as lists"
date:   2015-07-19 23:26:17
categories: magento
description: "By default, magento returns super-attributes as a dropdown. Here is an easy way to get transform it in a list so that you can manipulate it easily"
---
Configurable products in magento come by default with a select dropdown where you can choose the simple product associated to it. This can sometimes be aesthetically unpleasant and requires one more step from the customer (selecting the simple product).

It will be better if every simple product would have it's own add to basket button. This will not be ideal if you have complex configurations, but if you have a product with multiple sizes, it can provide a better experience for customers.

Now, the super attributes dropdown is built in magento as an json object. So it would be extremely difficult to edit it. What we can do is leave the object as it is and build on top of it a simulation of a click.

So, go to <span class="code">your-theme/template/catalog/product/view/type/options/configurable.phtml</span> and wrap the dropdown inside a hidden div: 

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

Afterwards, build our own list of options for the size super attribute:

{% highlight php linenos %}
<?php $attributes = ($_product->getTypeInstance(true)->getConfigurableAttributesAsArray($_product));?>
<?php if(count($attributes[0]['values']) > 0): ?>
  <ul class="new-options">
    <?php foreach($attributes[0]['values'] as $attribute): ?>
      <li>
        <h3 class="size"><?php echo $attribute['label']; ?></h3>
        <h3 class="price"><?php $without_decimals = Mage::helper('core')->currency((int)($_product->getPrice() + $attribute['pricing_value']),true,false); echo str_replace(".00", "", $without_decimals); ?></h3>
        <div class="product-add-to-cart"><a class="small button" data-type="<?php echo $attribute['label'] ?>" href="javascript:void(0)">Add to Bag</a></div>
      </li>
    <?php endforeach; ?>
  </ul>
<?php endif; ?>
{% endhighlight %}

Here, as you can see, I called the size, price and made an add to bag button for each simple product. With jQuery, when the user clicks on a buy button next to the simple product, select that product in the default dropdown and simulate a click on the default button:

{% highlight javascript linenos %}
//add to cart simple product
$(".product-add-to-cart").on("click", function(){
  var index = $(this).parent().index() + 1;
  $(".super-attribute-select option:eq("+index+")").prop('selected', true);
  $("#ajax-add-to-cart")[0].click();
})
{% endhighlight %}

All done!