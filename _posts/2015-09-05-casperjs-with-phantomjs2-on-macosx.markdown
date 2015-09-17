---
layout: post
title:  "How to use Casperjs with phantomjs 2.0.0 on macosx"
date:   2015-9-05 23:26:17
categories: frontend
description: "Casperjs is officially not ready for phantomjs 2.0.0, but it works pretty well"
---
Using Casperjs with phantomjs 1.x may give inaccurate results. To fully use the benefits of phantom you shouldn't install Casper with npm, bower or brew because that package already comes with an in built phantom 1.x version.

Just clone the git repository:
{% highlight javascript linenos %}
git clone git://github.com/n1k0/casperjs.git
{% endhighlight %}

and then create a symlink:
{% highlight javascript linenos %}
cd casperjs
ln -sf `pwd`/bin/casperjs /usr/local/bin/casperjs
{% endhighlight %}

Now if you install phantomjs 2 with brew:
{% highlight javascript linenos %}
brew install phantomjs
{% endhighlight %}

and run casperjs --v you should receive:
{% highlight javascript linenos %}
CasperJS version 1.1.0-beta3 at /Users/path/casperjs, using phantomjs version 2.0.0
{% endhighlight %}