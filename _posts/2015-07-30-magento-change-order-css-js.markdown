---
layout: post
title:  "Change order of included css and js files"
date:   2015-07-30 23:26:17
categories: magento
description: "Magento does not offer an easy way to manage the order of assets being loaded, css or javascript. Here is a quick simple module that can help."
---
Magento loads first the javascript files contained in root/js folder and then those in skin_js. This provides a good enough structure so that you can load core javascript files first and then your own ones in skin_js. But say you have multiple layouts files that each loads javascript files which depends on each other. For example you have a custom module that needs the jquery library, but its javascript files are loaded before so it returns an error. 

We create a simple module to be able to specify the order of css and javascript files. First register it. Create a file named <span class="code">Company_Ordersuccess.xml</span> inside <span class="code">app/etc/modules</span> and insert:
{% highlight xml linenos %}
<?xml version="1.0"?>
<config>
	<modules>
		<Company_Ordersuccess>
			<active>true</active>
			<codePool>local</codePool>
		</Company_Ordersuccess>
	</modules>
</config>
{% endhighlight %}

Then create the module. Inside <span class="code">app/code/local/Company</span> create the path <span class="code">ReorderAssets/etc/config.xml</span> and insert:

{% highlight xml linenos %}
<?xml version="1.0"?>
<config>
    <modules>
        <Company_ReorderAssets>
            <version>1.0.0</version>
        </Company_ReorderAssets>
    </modules>
    <global>
        <blocks>
            <class>Company_ReorderAssets_Block</class>
            <page>
                <rewrite>
                    <html_head>Company_ReorderAssets_Block_Page_Html_Head</html_head>
                </rewrite>
            </page>          
        </blocks>
    </global>
</config>
{% endhighlight %}

Now we create the path for the class that we want to edit:<span class="code">ReorderAssets/Block/Page/Html/Head.php</span> and insert:
{% highlight php linenos %}
<?php

class Company_ReorderAssets_Block_Page_Html_Head extends Mage_Page_Block_Html_Head {

	public function addItemFirst($type, $name, $params = null, $if = null, $cond = null) {
		
	    if ($type === 'skin_css' && empty($params)) {
	        $params = 'media="all"';
	    }
	
	    $firstElement = array();
	    $firstElement[$type . '/' . $name] = array(
	        'type' => $type,
	        'name' => $name,
	        'params' => $params,
	        'if' => $if,
	        'cond' => $cond,
	    );
	
	    $this->_data['items'] = array_merge($firstElement, $this->_data['items']);
	
	    return $this;
	    
	}
	
	public function addItemAfter($after, $type, $name, $params = null, $if = null, $cond = null) {
		
	    if ($type === 'skin_css' && empty($params)) {
	        $params = 'media="all"';
	    }
	
	    $firstElement = array();
	    $firstElement[$type . '/' . $name] = array(
	        'type' => $type,
	        'name' => $name,
	        'params' => $params,
	        'if' => $if,
	        'cond' => $cond,
	    );
	
	    if (array_key_exists($after, $this->_data['items'])){
	        // get the position 
	        $pos = 1;
	        foreach ($this->_data['items'] as $key => $options){
	            if ($key == $after) :
	                break;
	            endif;
	            $pos +=1;
	        }
	
	        array_splice($this->_data['items'], $pos, 0, $firstElement);
	
	    }
	
	    return $this;
	    
	}

}

{% endhighlight %}

The function <span class="code">addItemFirst</span> adds the first javascript or css file, but it will not ad it again if it is already added. It is used the same as the addItem function. The function <span class="code">addItemAfter</span> adds the needed css or js file after the first item. It's file path should be either js/file.js for root js folder or file.js for skin_js folder. Here it is how to use it in your layout.xml
{% highlight xml linenos %}
<?xml version="1.0"?>
<layout version="0.1.0">
	<default>
        <reference name="head">
	        <action method="addItemFirst"><type>skin_js</type><script>js/jquery.js</script></action>
	       	<action method="addItemAfter">
		        <after>skin_js/js/jquery.js</after>
				<type>skin_js</type>
				<script>newsletter_popup/newsletter_popup.js</script>
	       	</action>
	        <action method="addItemAfter">
		        <after>skin_js/js/jquery.js</after>
				<type>skin_js</type>
				<script>newsletter_popup/cookies.js</script>
	       	</action>
        </reference>
	</default>
</layout>
{% endhighlight %}
Now if I do a source code I get:

{% highlight html linenos %}
<script type="text/javascript" src="http://example.net/skin/frontend/company/theme/js/jquery.js"></script>
<script type="text/javascript" src="http://example.net/skin/frontend/company/theme/newsletter_popup/cookies.js"></script>
<script type="text/javascript" src="http://example.net/skin/frontend/company/theme/newsletter_popup/newsletter_popup.js"></script>
{% endhighlight %}

This xml loads first with <span class="code">addItemFirst</span> (which is the same as addItem) the file js/jquery.js which is in skin_js. If it is already added in another xml, it will not load it again, but it is necessary to be stated here. Then with <span class="code">addItemAfter</span we add the javascript <span class="code">newsletter_popup/newsletter_popup.js</span> after the <span class="code">skin_js/js/jquery.js</span>. Calling the skin_js before the path is important.

If you were to include a root/js file:
{% highlight xml linenos %}
<action method="addItemAfter">
    <after>js/jquery.js</after>
    <type>js</type>
    <script>newsletter_popup/newsletter_popup.js</script>
</action>
{% endhighlight %}

Of course you must replace Company with the name of your company by convention.

Special thanks to Koncz Szabolcs.

