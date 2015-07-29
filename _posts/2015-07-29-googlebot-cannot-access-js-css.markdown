---
layout: post
title:  "Googlebot cannot access CSS /JS? Easy solution"
date:   2015-07-29 23:26:17
categories: analytics
description: "Google started sending to webmasters Search Console messages about the negative impacts on seo if they block robots' access to js and css files"
---
Although Google recommended publicly since 2014 through a video of Matt Cutts that javascript and css files should be made available to the googlebot, it started sending messages to webmasters just now. Simply put, googlebot started to understand css and javascript code so well that is confident now to use this information in ranking websites. From your css and javascript files it can tell if your site is responsive, if further information is loaded by scrolling etc.

In order to allow access to css and javascript files edit your robots.txt file to include:
{% highlight xml linenos %}
User-Agent: *
Allow: .js
Allow: .css
{% endhighlight %}
This code will help you if there is no other rule more specific which overwrites it. For example on all of our e-commerce sites we have a rule that prevents google from indexing cart pages (we don't need this page indexed): <span class="code">Disallow: /*cart*</span>. This rule will block google's access to javascript files like these:
{% highlight javascript linenos %}
http://example/js/ajaxaddtocart.js
http://example/js/cart/main.js
{% endhighlight %}
To fix it you must be more specific in allowing js files like this:
{% highlight xml linenos %}
User-Agent: *
Allow: .js
Allow: .css
Allow: /cart/*.js
Allow: /cart/*.css
Allow: /checkout/*.js
Allow: /checkout/*.css
{% endhighlight %}
You can test which files are blocked by going int webmasters dashboard, <span class="code">Google Index -> Blocked Resources</span>. You shouldn't have any css or javascript files there. 

After you made your edits be sure to go into <span class="code">Crawl -> robots.txt Tester</span> and test your urls. 
