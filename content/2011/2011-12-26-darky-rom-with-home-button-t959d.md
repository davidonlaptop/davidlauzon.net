---
title: Darky ROM with HOME button on T959D (Galaxy S Fascinate)
author: David On Laptop
layout: post
date: 2011-12-27T04:44:46+00:00
url: /2011/12/darky-rom-with-home-button-t959d/
seo_follow:
  - 'false'
seo_noindex:
  - 'false'
categories:
  - Howtos

---
Hey! If you&#8217;ve installed the Darky Rom 10.2 (or 10.3) on your T959D phone (Samsung Galaxy S Fascinate), and you are missing the HOME and SEARCH key here is how to get them working :

## Install Darky ROM 10.2

  1. Download the latest Odin 3  (I used Odin3 v1.85) *
  2. Start Odin
  3. Download [DarkyROM\_10.2\_Resurrection.zip][1]
  4. Extract the ZIP
  5. Put the pit file in PIT
  6. Tick repartition
  7. Put PDA.tar it into PDA
  8. Put phone in Download Mode (vol-down+home+pwr)
  9. Connect through USB to your computer (make sure Kies is off)
 10. Hit Start
 11. Sit back and relax while your phone gets resurrected

* The provided Odin 1.3 didn&#8217;t detected my phone, so I just used version 1.85

## Install the key layout patch

But since this ROM is for the I9000 phone which has a hardware HOME button, you need to install a patch to fix the T959D&#8217;s software buttons :

  1. Download the [&#8220;Key Layout Update.zip&#8221; from this page][2]
  2. Connect your phone to your computer as a mass storage device
  3. Copy the &#8220;Key Layout Update.zip&#8221; to your phone&#8217;s sd card.
  4. Reboot in recovery mode, by holding the power button and choosing the option &#8220;Recovery&#8221;.
  5. &#8220;Install zip from sdcard&#8221;
  6. &#8220;Choose zip from sdcard&#8221;
  7. Select the zip
  8. Yes, install it
  9. Reboot and voila!

By the way, you can also use this patch with Darky ROM 10.3 but this ROM was waaaay too slow!

## Extra : the band frequencies

If your using Telus Canada, you may need to add the band frequencies (otherwise Canadian bands will be disabled by default) :

  1. Open the Dialer app
  2. Type \*#\*#197328640#\*#\*
  3. Select [1] Debug Screen
  4. Select [8] Phone control
  5. Select [7] Network control
  6. Select [2] Band Selection
  7. Select [4] Combi Bands []
  8. Select all the bands

 [1]: http://sourceforge.net/projects/ficeto.u/files/DarkyROM_10.2_Resurrection.zip/download
 [2]: http://forum.xda-developers.com/showthread.php?t=1252908