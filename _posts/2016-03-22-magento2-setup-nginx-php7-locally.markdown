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
Then you create your magento2 database: <span class="code">create database magento2 </span>.

Next step is to configure the nginx configuration for our magento2 website. In <span class="code">/etc/nginx/sites-available/</span> create a new file called magento2.com, or whatever your site name is. In there copy these settings:
{% highlight bash linenos %}
# Magento Vars
# set $MAGE_ROOT /path/to/magento/root;
# set $MAGE_MODE default; # or production or developer

 upstream fastcgi_backend {
    server   unix:/var/run/php/php7.0-fpm.sock;
 }
 server {
    listen 80;
    server_name magento2.com;
    set $MAGE_ROOT /home/user/sites/magento2;
    set $MAGE_MODE developer;
    root $MAGE_ROOT/pub;

     index index.php;
     autoindex off;
     charset off;

     add_header 'X-Content-Type-Options' 'nosniff';
     add_header 'X-XSS-Protection' '1; mode=block';

     location /setup {
         root $MAGE_ROOT;
         location ~ ^/setup/index.php {
             fastcgi_pass   fastcgi_backend;
             fastcgi_index  index.php;
             fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
             include        fastcgi_params;
         }

         location ~ ^/setup/(?!pub/). {
             deny all;
         }

         location ~ ^/setup/pub/ {
             add_header X-Frame-Options "SAMEORIGIN";
         }
     }

     location /update {
         root $MAGE_ROOT;

         location ~ ^/update/index.php {
             fastcgi_split_path_info ^(/update/index.php)(/.+)$;
             fastcgi_pass   fastcgi_backend;
             fastcgi_index  index.php;
             fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
             fastcgi_param  PATH_INFO        $fastcgi_path_info;
             include        fastcgi_params;
         }

         # deny everything but index.php
         location ~ ^/update/(?!pub/). {
             deny all;
         }

         location ~ ^/update/pub/ {
             add_header X-Frame-Options "SAMEORIGIN";
         }
     }

     location / {
         try_files $uri $uri/ /index.php?$args;
     }

     location /pub {
         location ~ ^/pub/media/(downloadable|customer|import|theme_customization/.*\.xml) {
             deny all;
         }
         alias $MAGE_ROOT/pub;
         add_header X-Frame-Options "SAMEORIGIN";
     }

     location /static/ {
         if ($MAGE_MODE = "production") {
             expires max;
         }
         location ~* \.(ico|jpg|jpeg|png|gif|svg|js|css|swf|eot|ttf|otf|woff|woff2)$ {
             add_header Cache-Control "public";
             add_header X-Frame-Options "SAMEORIGIN";
             expires +1y;

             if (!-f $request_filename) {
                 rewrite ^/static/(version\d*/)?(.*)$ /static.php?resource=$2 last;
             }
         }
         location ~* \.(zip|gz|gzip|bz2|csv|xml)$ {
             add_header Cache-Control "no-store";
             add_header X-Frame-Options "SAMEORIGIN";
             expires    off;

             if (!-f $request_filename) {
                rewrite ^/static/(version\d*/)?(.*)$ /static.php?resource=$2 last;
             }
         }
         if (!-f $request_filename) {
             rewrite ^/static/(version\d*/)?(.*)$ /static.php?resource=$2 last;
         }
         add_header X-Frame-Options "SAMEORIGIN";
     }

     location /media/ {
         try_files $uri $uri/ /get.php?$args;

         location ~ ^/media/theme_customization/.*\.xml {
             deny all;
         }

         location ~* \.(ico|jpg|jpeg|png|gif|svg|js|css|swf|eot|ttf|otf|woff|woff2)$ {
             add_header Cache-Control "public";
             add_header X-Frame-Options "SAMEORIGIN";
             expires +1y;
             try_files $uri $uri/ /get.php?$args;
         }
         location ~* \.(zip|gz|gzip|bz2|csv|xml)$ {
             add_header Cache-Control "no-store";
             add_header X-Frame-Options "SAMEORIGIN";
             expires    off;
             try_files $uri $uri/ /get.php?$args;
         }
         add_header X-Frame-Options "SAMEORIGIN";
     }

     location /media/customer/ {
         deny all;
     }

     location /media/downloadable/ {
         deny all;
     }

     location /media/import/ {
         deny all;
     }

     location ~ cron\.php {
         deny all;
     }

     location ~ (index|get|static|report|404|503)\.php$ {
         try_files $uri =404;
         fastcgi_pass   fastcgi_backend;

         fastcgi_param  PHP_FLAG  "session.auto_start=off \n suhosin.session.cryptua=off";
         fastcgi_param  PHP_VALUE "memory_limit=256M \n max_execution_time=600";
         fastcgi_read_timeout 600s;
         fastcgi_connect_timeout 600s;
         fastcgi_param  MAGE_MODE $MAGE_MODE;

         fastcgi_index  index.php;
         fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
         include        fastcgi_params;
     }
 }
{% endhighlight %}
Don't forget to replace these 2 variables:
{% highlight bash linenos %}
server_name magento2.com;
set $MAGE_ROOT /home/user/sites/magento2;
{% endhighlight %}

Now you must link the available sites to the enabled ones:
{% highlight bash linenos %}
sudo ln -s /etc/nginx/sites-available/magento2.com /etc/nginx/sites-available/magento2.com
{% endhighlight %}
Then restart nginx: <span class="code">sudo /etc/init.d/nginx restart.</span>.

Now it is time to configure our magento2 files. If you're starting from an already existing project just git clone your project, otherwise run a composer create:
composer create-project --repository-url=https://repo.magento.com/ magento/project-community-edition <installation directory name>

If you don't have composer installed, you can install it easily:
{% highlight bash linenos %}
curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer
{% endhighlight %}

Go into your project folder and run a composer install. Read carefully the outputs and if a package is missing just install it.

The last step is to go to your /etc/hosts file and add (run sudo nano /etc/hosts):
{% highlight bash linenos %}
127.0.0.1 magento2.com
{% endhighlight %}
This will point that website to localhost which is served by nginx.

The last step is to go to: magento2.com/setup and follow the installation instructions. If you receive permission errors, then you must give privileges to your server for those directories, for example /var/generation or pub/static:
{% highlight bash linenos %}
find /var/www/magento2/var/generation -type d -exec chmod g+s {} \;
{% endhighlight %}

That should be it. Possible issues could be your fastcgi_split_path_info setting in php.ini which can be 1 if you're not using it in production. If you get errors you should check /var/log/nginx/error.log to see exactly what went wrong, or check the magento error reports in the var/log folder.
