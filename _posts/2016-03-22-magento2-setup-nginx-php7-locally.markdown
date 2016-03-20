---
layout: post
title:  "Magento2 local setup with nginx, mariadb and php7"
date:   2016-03-22 23:26:17
categories: magento
description: "How to setup your magento2 website locally with nginx and php7 if you're using a Linux distro (like ubuntu or debian)."
---
Installing nginx is as simple as
{% highlight bash linenos %}
sudo apt-get update
sudo apt-get install nginx
{% endhighlight %}

Now if you go to http://localhost you can see a welcome message from nginx. You can stop, start or restart it by using <span class="code">sudo /etc/init.d/nginx stop.</span>

Next we have to install php7:
{% highlight bash linenos %}
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:ondrej/php
{% endhighlight %}
If you have php5 and you want to remove it:
{% highlight bash linenos %}
sudo apt-get update && apt-get purge php5-fpm && apt-get --purge autoremove
{% endhighlight %}
Then install php7:
{% highlight bash linenos %}
sudo apt-get install php7.0-fpm php7.0-mysql php7.0-curl php7.0-gd php7.0-json php7.0-mcrypt php7.0-opcache php7.0-xml php7.0-xsl php7.0-mbstring
{% endhighlight %}
and restart nginx.

Next step is to install mariadb:
{% highlight bash linenos %}
sudo apt-get install mariadb-server
{% endhighlight %}
You will be asked for the password. Then stop the service to configure it:
{% highlight bash linenos %}
sudo service mysql stop
sudo mysql_install_db
{% endhighlight %}
Start MariaDB:
{% highlight bash linenos %}
sudo service mysql start
{% endhighlight %}
And now let’s secure MariaDB by removing the test databases and anonymous user created by default:
{% highlight bash linenos %}
sudo mysql_secure_installation
{% endhighlight %}
And configure your root details.
To check your installation run <span class="code">mysql -p</span>.If you get an access denied run <span class="code">
sudo mysql -p</span>.
If it works to login to mysql only as root then you have to create a normal user and give him access to the db:
{% highlight bash linenos %}
CREATE USER 'computer_user'@'localhost' IDENTIFIED BY 'some_pass';
GRANT ALL PRIVILEGES ON *.* TO 'computer_user'@'localhost'
    ->     WITH GRANT OPTION;
{% endhighlight %}


If you're starting from an already existing project just git clone your project, otherwise run a composer create:
composer create-project --repository-url=https://repo.magento.com/ magento/project-community-edition <installation directory name>
