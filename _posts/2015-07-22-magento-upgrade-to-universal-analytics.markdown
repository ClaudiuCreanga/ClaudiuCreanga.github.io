---
layout: post
title:  "Upgrade to google universal analytics on magento"
date:   2015-07-22 23:26:17
categories: magento, analytics
description: "Magento 1.x comes with a google classic analytics module, which is cool. But the new standard is universal analytics. Here is how to upgrade, the right way."
---
There are several reasons why you should upgrade to universal analytics: 

<ul class="cool-bullet lists">
<li>&nbsp; better data collection from any device</li>
<li>&nbsp; track data across multiple domains</li>
<li>&nbsp; custom dimensions and metrics</li>
</ul>

I've mentioned that we're going to do this the right way and the right way in magento very often means by creating a custom module.

Let's go into <span class="code">app/code/local/Company</span>. Replace company by the name of your company or whatever name you want. Here you should insert all your custom modules created by yourself. Make a new folder called <span class="code">Universalanalytics</span>. Inside this one make a new folder <span class="code">etc</span>. Inside it create 3 xml files: <span class="code">system.xml</span>, <span class="code">config.xml</span> and <span class="code">adminhtml.xml</span>.

First the config.xml (remember to replace company by your company name everywhere):
{% highlight xml linenos %}
<?xml version="1.0"?>
<config>
	<modules>
		<Company_Universalanalytics>
			<version>0.1.0</version>
		</Company_Universalanalytics>
	</modules>
	<global>
		<blocks>
			<universalanalytics>
				<class>Company_Universalanalytics_Block</class>
			</universalanalytics>
		</blocks>
		<helpers>
			<universalanalytics>
				<class>Company_Universalanalytics_Helper</class>
			</universalanalytics>
		</helpers>
		<models>
			<universalanalytics>
				<class>Company_Universalanalytics_Model</class>
			</universalanalytics>
		</models>
	</global>
	<frontend>
		<events>
            <checkout_onepage_controller_success_action>
                <observers>
                    <universalanalytics_order_success>
                        <class>universalanalytics/observer</class>
                        <method>setUniversalanalyticsOnOrderSuccessPageView</method>
                    </universalanalytics_order_success>
                </observers>
            </checkout_onepage_controller_success_action>
            <checkout_multishipping_controller_success_action>
                <observers>
                    <universalanalytics_order_success>
                        <class>universalanalytics/observer</class>
                        <method>setUniversalanalyticsOnOrderSuccessPageView</method>
                    </universalanalytics_order_success>
                </observers>
            </checkout_multishipping_controller_success_action>
        </events>
		<layout>
			<updates>
				<universalanalytics>
					<file>universalanalytics.xml</file>
				</universalanalytics>
			</updates>
		</layout>
	</frontend>
</config>
{% endhighlight %}

In this file you declare your version and register your events and declare classes.

We need to create the backend section in magento, so in <span class="code">adminhtml.xml</span> insert:

{% highlight xml linenos %}
<?xml version="1.0"?>
<config>
  <acl>
    <resources>
      <admin>
        <children>
          <system>
            <children>
              <config>
                <children>
                  <universalanalytics translate="title">
                    <title>Google Universal Analytics</title>
                    <sort_order>100</sort_order>
                  </universalanalytics>
                </children>
              </config>
            </children>
          </system>
        </children>
      </admin>
    </resources>
  </acl>
</config>
{% endhighlight %}

This files inserts a block for options in magento backend in section system -> config.

Finally, inside <span class="code">system.xml</span>:
{% highlight xml linenos %}
<?xml version="1.0"?>
<config>
  <sections>
    <universalanalytics translate="label">
      <label>Google Universal Analytics</label>
      <tab>sales</tab>
      <sort_order>340</sort_order>
      <show_in_default>1</show_in_default>
       <show_in_website>1</show_in_website>
      <show_in_store>1</show_in_store>
      <groups>
        <universalanalytics translate="label">
          <label>Universal Analytics Property</label>
          <comment>If you want to insert a comment about universal analytics.</comment>
          <frontend_type>text</frontend_type>
          <sort_order>100</sort_order>
          <show_in_default>1</show_in_default>
          <show_in_website>1</show_in_website>
		  <show_in_store>1</show_in_store>
          <fields>
	        <active translate="label">
              <label>Activate Universal Analytics</label>
              <frontend_type>select</frontend_type>
              <source_model>adminhtml/system_config_source_yesno</source_model>
              <sort_order>100</sort_order>
              <show_in_default>1</show_in_default>
              <show_in_website>1</show_in_website>
			  <show_in_store>1</show_in_store>
            </active>
            <account translate="label">
              <label>Universal Analytics Property</label>
              <frontend_type>text</frontend_type>
              <sort_order>200</sort_order>
              <show_in_default>1</show_in_default>
              <show_in_website>1</show_in_website>
			  <show_in_store>1</show_in_store>
            </account>
            <anonymization translate="label">
                <label>Enable IP anonymization</label>
                <frontend_type>select</frontend_type>
                <source_model>adminhtml/system_config_source_yesno</source_model>
                <sort_order>300</sort_order>
                <show_in_default>1</show_in_default>
                <show_in_website>1</show_in_website>
                <show_in_store>1</show_in_store>
            </anonymization>
          </fields>
        </universalanalytics>
      </groups>
    </universalanalytics>
  </sections>
</config>
{% endhighlight %}

Here you tell magento where exactly this block should be inserted (in sales tab, just under google api section).

To register our module we need one more step:
Go to <span class="code">app/etc/modules/</span> and create an xml file <span class="code">Company_Universalanalytics.xml</span>:

{% highlight xml linenos %}
<?xml version="1.0"?>
<config>
	<modules>
		<Company_Universalanalytics>
			<active>true</active>
			<codePool>local</codePool>
		</Company_Universalanalytics>
	</modules>
</config>
{% endhighlight %}

Now that our module is registered we can get to work. We will keep the default classic analytics module configuration but make a few tweeks.

Magento classic analytics module is found in <span class="code">app/code/core/Mage/GoogleAnalytics</span>. 

Copy the folders <span class="code">Block</span>, <span class="code">Helper</span> and <span class="code">Model</span> inside our Universalanalytics folder. Then replace the content of the files as below:

In  <span class="code">Helper/Data.php</span> we check the options in the admin:

{% highlight php linenos %}
<?php
class Company_Universalanalytics_Helper_Data extends Mage_Core_Helper_Abstract
{
    /**
     * Config paths for using throughout the code
     */
    const XML_PATH_ACTIVE        = 'universalanalytics/universalanalytics/active';
    const XML_PATH_ACCOUNT       = 'universalanalytics/universalanalytics/account';
    const XML_PATH_ANONYMIZATION = 'universalanalytics/universalanalytics/anonymization';

    /**
     * Whether GA is ready to use
     *
     * @param mixed $store
     * @return bool
     */
    public function isUniversalanalyticsAvailable($store = null)
    {
        $accountId = Mage::getStoreConfig(self::XML_PATH_ACCOUNT, $store);
        return $accountId && Mage::getStoreConfigFlag(self::XML_PATH_ACTIVE, $store);
    }

    /**
     * Whether GA IP Anonymization is enabled
     *
     * @param null $store
     * @return bool
     */
    public function isIpAnonymizationEnabled($store = null)
    {
        return Mage::getStoreConfigFlag(self::XML_PATH_ANONYMIZATION, $store);
    }
}
?>
{% endhighlight %}

In  <span class="code">Model/Observer.php</span> we get the universalanalytics block on success page:

{% highlight php linenos %}
<?php
class Company_Universalanalytics_Model_Observer
{
    /**
     * Create Google Analytics block for success page view
     *
     * @deprecated after 1.3.2.3 Use setGoogleAnalyticsOnOrderSuccessPageView() method instead
     * @param Varien_Event_Observer $observer
     */
    public function order_success_page_view($observer)
    {
        $this->setUniversalanalyticsOnOrderSuccessPageView($observer);
    }

    /**
     * Add order information into GA block to render on checkout success pages
     *
     * @param Varien_Event_Observer $observer
     */
    public function setUniversalanalyticsOnOrderSuccessPageView(Varien_Event_Observer $observer)
    {
        $orderIds = $observer->getEvent()->getOrderIds();
        if (empty($orderIds) || !is_array($orderIds)) {
            return;
        }
        $block = Mage::app()->getFrontController()->getAction()->getLayout()->getBlock('universalanalytics');
        //var_dump($block);
        if ($block) {
            $block->setOrderIds($orderIds);
        }
    }
}
?>
{% endhighlight %}

In  <span class="code">Block/Universalanalytics.php</span> is where the magic is being done:

{% highlight php linenos %}
<?php
class Company_Universalanalytics_Block_Universalanalytics extends Mage_Core_Block_Template{	
	 
	 /**
     * @deprecated after 1.4.1.1
     * @see self::_getOrdersTrackingCode()
     * @return string
     */
    public function getQuoteOrdersHtml()
    {
        return '';
    }

    /**
     * @deprecated after 1.4.1.1
     * self::_getOrdersTrackingCode()
     * @return string
     */
    public function getOrderHtml()
    {
        return '';
    }

    /**
     * @deprecated after 1.4.1.1
     * @see _toHtml()
     * @return string
     */
    public function getAccount()
    {
        return '';
    }

    /**
     * Get a specific page name (may be customized via layout)
     *
     * @return string|null
     */
    public function getPageName()
    {
        return $this->_getData('page_name');
    }

    /**
     * Render regular page tracking javascript code
     * The custom "page name" may be set from layout or somewhere else. It must start from slash.
     *
     * @link http://code.google.com/apis/analytics/docs/gaJS/gaJSApiBasicConfiguration.html#_gat.GA_Tracker_._trackPageview
     * @link http://code.google.com/apis/analytics/docs/gaJS/gaJSApi_gaq.html
     * @param string $accountId
     * @return string
     */
    protected function _getPageTrackingCode($accountId)
    {
        $pageName   = trim($this->getPageName());
        $optPageURL = '';
        if ($pageName && preg_match('/^\/.*/i', $pageName)) {
            $optPageURL = ", '{$this->jsQuoteEscape($pageName)}'";
        }
        
        $hostName = $_SERVER['SERVER_NAME'];
        
        return "
        	
			ga('create', '{$this->jsQuoteEscape($accountId)}', '".$hostName."');
			" . $this->_getAnonymizationCode() . "
			ga('send', 'pageview' ".$optPageURL.");
			
		";
    }


    /**
     * Render information about specified orders and their items
     *
     * @link http://code.google.com/apis/analytics/docs/gaJS/gaJSApiEcommerce.html#_gat.GA_Tracker_._addTrans
     * @return string
     */
    
    
    protected function _getOrdersTrackingCode()
	{
		
	    $orderIds = $this->getOrderIds();
	    if (empty($orderIds) || !is_array($orderIds)) {
	        return;
	    }
	    $collection = Mage::getResourceModel('sales/order_collection')
	        ->addFieldToFilter('entity_id', array('in' => $orderIds))
	    ;
	    $result = array("
	        // Transaction code...
	        ga('require', 'ecommerce', 'ecommerce.js');
	    ");
	
	    foreach ($collection as $order) {
	        if ($order->getIsVirtual()) {
	            $address = $order->getBillingAddress();
	        } else {
	            $address = $order->getShippingAddress();
	        }
	
	        $result[] = "
	            ga('ecommerce:addTransaction', {
	                id:          '".$order->getIncrementId()."', // Transaction ID
	                affiliation: '".$this->jsQuoteEscape(Mage::app()->getStore()->getFrontendName())."', // Affiliation or store name
	                revenue:     '".$order->getBaseGrandTotal()."', // Grand Total
	                shipping:    '".$order->getBaseShippingAmount()."', // Shipping cost
	                tax:         '".$order->getBaseTaxAmount()."', // Tax
	
	            });
	        ";
	
	        foreach ($order->getAllVisibleItems() as $item) {
	
	            $result[] = "
	            ga('ecommerce:addItem', {
	
	                id:       '".$order->getIncrementId()."', // Transaction ID.
	                sku:      '".$this->jsQuoteEscape($item->getSku())."', // SKU/code.
	                name:     '".$this->jsQuoteEscape($item->getName())."', // Product name.
	                category: '', // Category or variation. there is no 'category' defined for the order item
	                price:    '".$item->getBasePrice()."', // Unit price.
	                quantity: '".$item->getQtyOrdered()."' // Quantity.
	
	            });
	        ";
	
	        }
	        $result[] = "ga('ecommerce:send');";
	    }
	    return implode("\n", $result);
	}

    /**
     * Render GA tracking scripts
     *
     * @return string
     */
    protected function _toHtml()
    {
        if (!Mage::helper('universalanalytics')->isUniversalanalyticsAvailable()) {
            return '';
        }
        return parent::_toHtml();
    }

    /**
     * Render IP anonymization code for page tracking javascript code
     *
     * @return string
     */
    protected function _getAnonymizationCode()
    {
        if (!Mage::helper('universalanalytics')->isIpAnonymizationEnabled()) {
            return '';
        }
        return "ga('set', 'anonymizeIp', true);";
    }
	
}
?>
{% endhighlight %}

The most import part here is the function <span class="code">getOrdersTrackingCode()</span> that sends transaction data to universal analytics on the success page (order id, sku, order total etc.).

Now let's insert our universal analytics code. Create a file called universalanalytics.xml in <span class="code">app/design/frontend/base/default/layout/</span> where we insert our block in the head section of every file:

{% highlight xml linenos %}
<?xml version="1.0" ?>
<layout version="0.1.0">
	<default>
		<reference name="head">
			<block type="universalanalytics/universalanalytics" name="universalanalytics" template="universalanalytics/universalanalytics.phtml" />
		</reference>
	</default>
</layout>
{% endhighlight %}

The last step is to create a folder called universalanalytics inside <span class="code">app/design/frontend/base/default/template/</span> and in there the file <span class="code">universalanalytics.phtml</span>:

{% highlight php linenos %}
<?php 

if (!Mage::helper('core/cookie')->isUserNotAllowSaveCookie()): ?>
<?php $accountId = Mage::getStoreConfig(Company_Universalanalytics_Helper_Data::XML_PATH_ACCOUNT); ?>

<!-- BEGIN UNIVERSAL ANALYTICS -->
<script type="text/javascript">
//<![CDATA[
	
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	
	<?php echo $this->_getPageTrackingCode($accountId) ?>
    <?php echo $this->_getOrdersTrackingCode() ?>


//]]>
</script>
<!-- END UNIVERSAL ANALYTICS -->
<?php endif; ?>
{% endhighlight %}

Here we have our universal analytics code and we take our values from the settings in admin. 

To recap, this is the structure of our small module:
{% highlight php linenos %}
app/code/local/Company/Universalanalytics/Block/Universalanalytics.php
app/code/local/Company/Universalanalytics/etc/adminhtml.xml
app/code/local/Company/Universalanalytics/etc/config.xml
app/code/local/Company/Universalanalytics/etc/system.xml
app/code/local/Company/Universalanalytics/Helper/Data.php
app/design/frontend/base/default/layout/universalanalytics.xml
app/design/frontend/base/default/template/universalanalytics/universalanalytics.phtml
app/etc/modules/Company_Universalanalytics.xml
{% endhighlight %}

Test it!

Now it is time to clear cache and log into the admin. Go to system->config->Universal analytics (sales category), insert your property id and activate the script. Refresh your frontend and you should see the google analytics script. Submit a test order and view the source code of the success page. Make sure data is sent to google analytics. You should see something like this in source code:

{% highlight javascript linenos %}
<!-- BEGIN UNIVERSAL ANALYTICS -->
<script type="text/javascript">
//<![CDATA[
	
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	
	
        	
			ga('create', 'UA-xxxxxxx-x', 'www.your-site.com');
			
			ga('send', 'pageview' );
			
		    
	        // Transaction code...
	        ga('require', 'ecommerce', 'ecommerce.js');
	    

	            ga('ecommerce:addTransaction', {
	                id:          '101112058', // Transaction ID
	                affiliation: 'Website name', // Affiliation or store name
	                revenue:     '7.9400', // Grand Total
	                shipping:    '3.3000', // Shipping cost
	                tax:         '1.3200', // Tax
	
	            });
	        

	            ga('ecommerce:addItem', {
	
	                id:       '100112058', // Transaction ID.
	                sku:      '1114597', // SKU/code.
	                name:     'Cool product', // Product name.
	                category: '', // Category or variation. there is no 'category' defined for the order item
	                price:    '3.3200', // Unit price.
	                quantity: '1.0000' // Quantity.
	
	            });
	        
ga('ecommerce:send');

//]]>
</script>
<!-- END UNIVERSAL ANALYTICS -->
{% endhighlight %}

Go into analytics dashboard and make sure that you receive the tracking data (visits) and transaction data.

Tested on magento 1.7 - 1.9. Let me know how it goes. You can view the module on my 
<a href="https://github.com/ClaudiuCreanga/" title="Github" target="_blank">
	<i class="fa fa-github-alt"></i>
</a>.
