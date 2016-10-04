---
title: Apache virtual host using a symlink to home directory
author: David On Laptop
layout: post
date: 2011-06-29T23:11:36+00:00
url: /2011/06/apache-virtual-host-using-a-symlink-to-home-directory/
seo_follow:
  - 'false'
seo_noindex:
  - 'false'
categories:
  - Howtos
tags:
  - apache
  - linux

---
## Forbidden : You don&#8217;t have the permission to access / on this server.

If you see this error message, then perhaps you&#8217;re trying to use an Apache virtual host that&#8217;s located somewhere in your home directory?

Well this could be because Apache doesn&#8217;t have the permissions to traverse the directory, and this post explains how to fix it with complete config files.

In my case, my default apache document root is /var/www and I want to server `/var/www/potdigger` which is a symlink to `/home/david/workspace/php/potdigger_backend` .

## Find out what user the Apache process is using
```bash
david@dragdroid:~$ ps auxf |grep apache
david    23857  0.0  0.0   5304   856 pts/0    S+   18:00   0:00  |   \_ grep --color=auto apache
root     23381  0.0  0.0   5652  2628 ?        Ss   17:25   0:00 /usr/sbin/apache2 -k start
www-data 23384  0.0  0.0   5424  1816 ?        S    17:25   0:00  \_ /usr/sbin/apache2 -k start
www-data 23386  0.0  0.0 227328  2820 ?        Sl   17:25   0:00  \_ /usr/sbin/apache2 -k start
www-data 23387  0.0  0.0 227208  2624 ?        Sl   17:25   0:00  \_ /usr/sbin/apache2 -k start
```

In my case (Ubuntu), the user is `www-data`. Note : Your process could be named httpd instead of apache.

## Login with this user to see which directories causes problem.
```bash
david@dragdroid:~$ sudo -i -u www-data
[sudo] password for david: 
$ ls /var/www/ -l
total 12
-rw-r--r-- 1 root  root   177 2011-06-29 15:30 index.html
lrwxrwxrwx 1 root  root    43 2011-06-29 16:13 potdigger -> /home/david/workspace/php/potdigger_backend
$ cd potdigger
cd: 2: can't cd to potdigger
$ cd /home/david/workspace/php/potdigger_backend
cd: 3: can't cd to /home/david/workspace/php/potdigger_backend
$ cd /home/david/workspace/php
cd: 5: can't cd to /home/david/workspace/php
$ cd /home/david/workspace    
cd: 6: can't cd to /home/david/workspace
$ cd /home/david 
```
Now we see that we can get to `/home/david` without any problem. It&#8217;s the `workspace/php/potdigger_backend` path that it can&#8217;t access.

## Set the executable permission on these directories.
```bash
david@dragdroid:~$ pwd
/home/david
david@dragdroid:~$ chmod a+x workspace workspace/php workspace/php/potdigger_backend
david@dragdroid:~$
```

Open a new terminal window (so that you use your logon user) and type :


## Verify that it works
```bash
$ cd /home/david/workspace/php/potdigger_backend
$ pwd
/home/david/workspace/php/potdigger_backend
```

Use the first window (logged in as `www_data`) and type :



## Reload the apache configuration, and boom!
```bash
david@dragdroid:~$ sudo /etc/init.d/apache2 reload
[sudo] password for david: 
 * Reloading web server config apache2                                                                                                                                                                                                       apache2: Could not reliably determine the server's fully qualified domain name, using 127.0.1.1 for ServerName                                                                                                                                                                                                        [ OK ]
david@dragdroid:~$
```


Here&#8217;s my vhost related config :
```
NameVirtualHost *:80
<VirtualHost *:80>
        ServerName potdigger

        DocumentRoot /var/www/potdigger
        <Directory /var/www/potdigger>
                Options Indexes FollowSymLinks MultiViews
                AllowOverride All
                Order allow,deny
                allow from all
        </Directory>

        ErrorLog ${APACHE_LOG_DIR}/potdigger-error.log

        # Possible values include: debug, info, notice, warn, error, crit, alert, emerg.
        LogLevel  warn
        CustomLog ${APACHE_LOG_DIR}/potdigger-access.log combined
</VirtualHost>
```


## [EDIT June 30th 2011] For Fedora / Red Hat users
When logging in using the apache user on my Fedora box, I would get a &#8220;This account is currently not available&#8221; error. So here&#8217;s what I did :

```bash
[david@H20 ~]$ cd $HOME
[david@H20 ~]$ pwd
/home/david
[david@H20 ~]$ ls -ld . workspace workspace/android workspace/android/intuitia workspace/android/intuitia/prototypes workspace/android/intuitia/prototypes/potdigger_backend workspace/android/intuitia/prototypes/potdigger_backend/trunk
drwx------. 78 david david 4096 Jun 30 16:38 .
drwx------   5 david david 4096 May  5 12:42 workspace
drwxrwxr-x  23 david david 4096 Jun 27 05:43 workspace/android
drwxrwxr-x   4 david david 4096 May 27 10:57 workspace/android/intuitia
drwxrwxr-x  14 david david 4096 Jun 30 16:37 workspace/android/intuitia/prototypes
drwxrwxr-x   4 david david 4096 Jun 30 16:37 workspace/android/intuitia/prototypes/potdigger_backend
drwxrwxr-x  10 david david 4096 Jun 30 16:37 workspace/android/intuitia/prototypes/potdigger_backend/trunk
```

We can observe that `/home/david` (`.`) and `/home/david/workspace` directories lacks the executable bit.
```bash
[david@H20 ~]$ chmod a+x . workspace
```