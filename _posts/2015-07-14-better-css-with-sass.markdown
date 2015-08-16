---
layout: post
title:  "Tips for writing better CSS with SASS"
date:   2015-07-14 23:26:17
categories: frontend
description: "How to better use the placeholder and the @extend and @include directives."
---
In every project you have a list of items that have a specific background, like a list of social icons. Traditionally, you would style them up like this:
{% highlight css linenos %}
.socials{
	//general style for the list
}
.socials a{
	//general style for list items
}
.facebook{
	//background and specific style for the facebook item
}
{% endhighlight %}
This isn't bad, but SASS provides a much better way to use patterns and write minimal code. First we set up an array in which we insert our social items and then we do a foreach loop to insert our style.
{% highlight css linenos %}
$social-items: facebook twitter google pinterest instagram youtube reddit linkedin mail 
@each $social-item in $social-items {
	a.#{$social-item} {
		background: url(images/icons/socials-#{$social-item}.svg) no-repeat;
	}
}
{% endhighlight %}
Like this, if you want to add more items latter you just have to add an item to the array and an image. In our example, the image name should be socials-facebook.svg and the class in our html is .facebook.

If you've used SASS then you've used the @extend and @include directives. There are many times when you would want to extend a class and reuse it as much as possible. But if there is some general style that you always want to extend but there is no html element where this general style alone is applied, then you would want to use a placeholder. 

Say you have three types of buttons. The general style will go into a placeholder (%):
{% highlight css linenos %}
%button{
	//general style;
}
.button-checkout{
	@extend %button;
	//checkout style;
}
.button-buy{
	@extend %button;
	//buy style;
}
.button-subscribe{
	@extend %button;
	//subscribe style;
}
{% endhighlight %}
There is no need for a button class in this case, so why make one?

One more tip, use @include only when you have to do it and @extend is not possible (i.e. you want to include variables). This is because @include duplicates your code while @extend concatenates selectors. Because @extend concatenates selectors, you cannot use them in @media queries. 