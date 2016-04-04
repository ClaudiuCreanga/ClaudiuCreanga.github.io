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

Another issue can be that you are using a VM and you are applying the permissions to the shared folder from the VM instead from your local system. 

If it still doesn't work, maybe it is a cached issue, so you can run cd into pub/static and run <span class="code">find . -depth -name .htaccess -prune -o -delete</span> followed by <span class="code">rm -rf var/cache/ var/generation/ var/page_cache/ var/view_preprocessed/</span> and <span class="code">php bin/magento setup:static-content:deploy</span>