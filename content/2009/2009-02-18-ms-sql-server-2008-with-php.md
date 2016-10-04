---
title: MS SQL Server 2008 with PHP
author: David On Laptop
layout: post
date: 2009-02-18T13:59:49+00:00
url: /2009/02/ms-sql-server-2008-with-php/
seo_follow:
  - 'false'
seo_noindex:
  - 'false'
categories:
  - Howtos
tags:
  - php
  - sql server

---
I personally choose not to use Micro$oft products when it is possible, but sometimes the choice is not given. For these unfortunate who have to deal with SQL Server 2008 (or 2005), here is how to get around without too many swear words and avoid licensing costs.

## Requirements

  * Windows Vista (Win XP should do also)
  * .Net Framework 3.5 SP1
  * Windows Installer 4.5
  * Windows PowerShell 1.0
  * MS Core XML Services (MSXML) 6.0

Note: You need to have genuine windows copy to download PowerShell from Microsoft website; however it is possible to find it elsewhere if you google around.

## Setup SQL Server

  1. Download and install [MS SQL Server Express 2008 with Advanced Services][1] and choose the following options:
  2. **Single instance** Install (not clustered !)
  3. Name the instance &#8220;SQLExpress&#8221;
  4. In the options box choose &#8220;SQL Server&#8221;, and &#8220;**Management Studio**&#8221; (do not install full-text search, as it requires clustering)
  5. Set the **Server Service Account Name** to &#8220;NT AUTHORITY\NETWORK SERVICE&#8221;, auto
  6. Set the **SQL Server Browser** to &#8220;NT AUTHORITY\NETWORK SERVICE&#8221;, manual
  7. Choose **mixed mode authentication**
  8. Set SQL Server to listen on TCP port. 
      1. Start &#8220;SQL Server Configuration Manager&#8221;
      2. Network Configuration -> Protocols : **enable &#8220;Named Pipes&#8221; and &#8220;TCP/IP&#8221;**
      3. Right-click &#8220;TCP/IP&#8221; -> Listen All = Yes&#8221;
      4. In tab &#8220;IP addresses&#8221; -> Section IPAll -> **TCP Dynamic Ports = 1433**
      5. Repeat these steps for SQL Native Client.
      6. Restart SQL Server
  9. Create your database and set the owner to user &#8216;sa&#8217;, and change the user sa password.

## Setup PHP

This assumes you have wamp installed, otherwise just change the path.

1. Download the good version of [ntwdblib.dll (2000.80.194.0)][2]
2. Overwrite C:\wamp\bin\apache\apache2.2.8\bin\ntwdblib.dll
3. Overwrite C:\wamp\bin\php\php5.2.6\ntwdblib.dll
4. Enable **php_mssql.dll** in `php.ini`
5. Restart Apache

	```php
    $server = 'BANGKOK\SQLEXPRESS';  // The format is "HOST\SERVERNAME[,PORT]"
    $username = 'sa';
    mssql_connect($server, $username, $password);
    ```

## Debugging

  * You can test if SQL Server is listening on port 1433 by using [NMap/Zenmap for Windows][3] to do an &#8220;Intense scan, all TCP ports&#8221; on localhost, and you should see port 1433 open.
  * When trying to log within PHP you should see an entry in the log file: 
    <pre>c:\program Files\Microsoft SQL Server\MSSQL10.SQLEXPRESS\MSSQL\Log\ERRORLOG</pre>

I hope this will save you some time and swears!

 [1]: http://www.microsoft.com/downloads/details.aspx?FamilyId=B5D1B8C3-FDA5-4508-B0D0-1311D670E336&displaylang=en
 [2]: http://webzila.com/dll/1/ntwdblib.zip
 [3]: http://nmap.org/download.html
