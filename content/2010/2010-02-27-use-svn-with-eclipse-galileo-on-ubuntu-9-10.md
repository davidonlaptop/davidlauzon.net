---
title: Use svn with Eclipse Galileo on Ubuntu 9.10
author: David On Laptop
layout: post
date: 2010-02-27T14:25:25+00:00
url: /2010/02/use-svn-with-eclipse-galileo-on-ubuntu-9-10/
seo_follow:
  - 'false'
seo_noindex:
  - 'false'
categories:
  - Howtos
tags:
  - eclipse
  - linux
  - subclipse
  - svn

---
After wasting a lot of time myself, I thought this could serve some other people&#8230;

So here&#8217;s how I did it :

  * First install the Subclipse plugin 
      1. Run sudo eclipse (that will install plugins system-wide)
      2. Eclipse > Install new software > Add
      3. Name = &#8220;whatever&#8221;
      4. Location = **http://subclipse.tigris.org/update_1.6.x**
      5. OK
      6. Work with: &#8220;whatever&#8221;
      7. Select these to install : 
          * CollabNet Merge Client
          * Subclipse
          * Subclipse Integration for Mylyn 3.x
          * Subversion Client Adapter
          * Subversion JavaHL Native Library Adapter
          * Subversion Revision Graph
      8. If you get a &#8220;Subversion 1.6 contains a bug that causes Eclipse to crash &#8230;. GNOME keyring &#8230; we recommand &#8230; &#8220;, choose OK.
  * Next install the Java bindings for SVN 
      1. sudo apt-get install libsvn-java
      2. Eclipse > Window > Preferences > Team > SVN
      3. If that triggers a &#8220;Failed to load JavaHL Library.&#8221; error, you need to add libsvnjavahl-1 in the Eclipse path :
      4. Just throw a symlink into one of the path in the error message :
      5. 
      	```bash
        sudo ln -s /usr/lib/jni/libsvnjavahl-1.so /usr/lib/libsvnjavahl-1.so
                 sudo ln -s /usr/lib/jni/libsvnjavahl-1.so.0.0.0 /usr/lib/libsvnjavahl-1.so.0.0.0
        ```
    
      6. Restart eclipse and step 3 should be solved.
  * Perhaps you want to use SVN with existing checkout project ? 
      1. Right-click on your project in Eclipse
      2. Team > Share Project > svn > Validate Conneciton on Finish > Finish
  * [Screenshots of what you can do with Subclipse][1]


 [1]: http://subclipse.tigris.org/servlets/ProjectProcess?pageID=rr1TIx