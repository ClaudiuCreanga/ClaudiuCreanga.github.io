---
layout: post
title:  "Create a new CMS layout in magento"
date:   2015-07-30 23:26:17
categories: magento
description: "Creating a new CMS layout in magento is easy, but if you want it to appear in the dropdown of your CMS section in the admin you have to build a small module."
---
You may want to give your clients the chance to select the layout of their CMS pages easily in the dropdown list of Layout select tag. In wordpress it is very easy to create a new page template, you have to specify it at the beginning of your template and you're good to go:
{% highlight php linenos %}
<?php
/*
Template Name: New Template
*/
?>
{% endhighlight %}
Not in magento. We need to create a custom module and register it. Create path <span class="code">app/etc/modules/Company_DropdownLayout.xml</span> and insert:
{% highlight xml linenos %}
<?xml version="1.0"?>
<config>
    <modules>
        <Company_DropdownLayout>
            <active>true</active>
            <codePool>local</codePool>
            <depends>
                <Mage_Page />
            </depends>
        </Company_DropdownLayout>
    </modules>
</config>
{% endhighlight %}
Then create the config for our module. Create path <span class="code">app/code/local/Company/DropdownLayout/etc/config.xml</span> and insert:
{% highlight xml linenos %}
<?xml version="1.0"?> 
<config>
    <modules>
        <Company_DropdownLayout>
            <version>1.0.0</version>
        </Company_DropdownLayout>
    </modules>
    <global>
        <page>
            <layouts> 
                <newlayout module="page" translate="label">
                    <label>New custom layout</label>
                    <template>page/newlayout.phtml</template>
                    <layout_handle>newlayout</layout_handle>
                </newlayout> 
            </layouts>
        </page>
    </global>
    <frontend>
        <layout>
            <updates>
                <Company_DropdownLayout>
                    <file>Company_DropdownLayout.xml</file>
                </Company_DropdownLayout>
            </updates>
        </layout>
    </frontend>
</config>
{% endhighlight %}
We must set up the layout file. Create path <span class="code">app/design/frontend/base/default/layout/dropdownlayout.xml</span> and insert:
{% highlight xml linenos %}
<?xml version="1.0"?> 
<layout>
    <newlayout translate="label">
        <label>New custom layout</label>
        <reference name="root">
            <action method="setTemplate"><template>page/newlayout.phtml</template></action>
            <action method="setIsHandle"><applied>1</applied></action>
        </reference>
    </newlayout> 
</layout>
{% endhighlight %}
And you're almost done, except for the fact that you don't have your template file. You can now select the New custom layout in the dropdown:
<img class="post-image" src="{{ "/assets/images/post-images/new-layout.jpg" | prepend: site.baseurl }}" alt="magento new layout cms" />
But the page will return an error on the frontend: Not valid template file:frontend/base/default/template/page/newlayout.phtml

So we must create the template page. Create path <span class="code">app/frontend/base/default/template/page/newlayout.phtml</span> and insert:
{% highlight php linenos %}
<?php
/**
 * Template for New Custom Layout
 */
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php echo $this->getLang() ?>" lang="<?php echo $this->getLang() ?>">
<head>
<?php echo $this->getChildHtml('head') ?>
</head>
<body<?php echo $this->getBodyClass()?' class="'.$this->getBodyClass().'"':'' ?>>
<?php echo $this->getChildHtml('after_body_start') ?>
<div class="wrapper">
    <?php echo $this->getChildHtml('global_notices') ?>
    <div class="page">
	    <h1>This is the new page layout</h1>
	    ...
{% endhighlight %}
Make your edits here for the new template. Of course you can change the name of your layout to whatever you want inside the label node.