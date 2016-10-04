---
title: How to use QT Jambi from within Eclipse
author: David On Laptop
layout: post
date: 2010-02-21T14:16:46+00:00
url: /2010/02/how-to-use-qt-jambi-from-within-eclipse/
seo_follow:
  - 'false'
seo_noindex:
  - 'false'
categories:
  - Howtos
tags:
  - eclipse
  - jambi
  - java
  - qt

---
This article is part 2 / 2 of using QT Jambi within Eclipse. [Click here to read the first part of this article, &#8220;Getting started with QT Jambi on Linux&#8221;][1].

The present article you will learn how to design forms within eclipse and structure your QT code using the MVC pattern :

1. File > New > Other > Qt Jambi Project (Using Designer Form) <img src="/asset/2010/2/21/jambi_new_project.jpg" alt="" width="421" height="300" />

2. Name it JambiWeb

3. Add a new QT Jambi Designer Form and ajust settings like on screenshot. <img src="/asset/2010/2/21/jambi_new_template_class.jpg" alt="" width="421" height="371" />

4. This will create 3 files :

	|File|Description|
    |--|--|
    | `src/views/WebView.jui` | XML used by the Designer |
    | `src/views/WebView.java	` | This is the view from the MVC concept, it displays the widgets contained in `Ui_WebView.java` |
    | `src/ui/views/Ui_WebView.java` | Java file generated from the XML (you should not edit this file because it will be automatically replaced when you make changes to the form in the Designer). This file is more like a container for the widgets in the form, it does *not* displays the elements. |

5. Now in order to respect the MVC pattern, the view should not display itself, but rather we should have a controller to trigger the display of the view. Add WebController class in the controllers package and insert this code :
	```java
    package controllers;
    
    import views.WebView;
    import com.trolltech.qt.gui.QApplication;

    public class WebController {
    private WebView webView;

    private Ui_WebView ui() { return webView.ui(); }

    public static void main(String[] args) {
    new WebController(args);
    }

    public WebController(String[] args) {
    QApplication.initialize(args);

    webView = new WebView(null);
    webView.show();

    initEvents();

    QApplication.exec();
    }

    private void initEvents() {
    }
    }
	```

6. Now delete the main() method in `views/WebView.java`, and the contents should be as follow:
	```java
    package views;&nbsp;

    import com.trolltech.qt.gui.*;

    public class WebView extends QMainWindow {
    private Ui_WebView ui = new Ui_WebView();

    public Ui_WebView ui() { return this.ui; }

    public WebView(QWidget parent) {
    super(parent);
    ui.setupUi(this);

    setWindowTitle("A custom browser for your application");
    }
    }
    ```

7. Next let&#8217;s design our interface

8. Open on views/WebView.jui and choose the &#8220;QT Designer UI Perspective&#8221;. This perspective should bring you a 3-tabbed panel on the right side of Eclipse view.

9. So choose &#8220;QT Object Inspector&#8221; tab and right click on your QMainWindow item and choose &#8220;add toolbar&#8221;. <img src="/asset/2010/2/21/jambi_add_toolbar.jpg" alt="" width="1008" height="630" />

10. At the bottom of the screen, choose the &#8220;QT Action Editor&#8221; tab, and 2 actions (Reload, Stop), and drag & drop them unto the toolbar you are designing.

11. Next choose &#8220;QT Widget Box&#8221; tab.

12. Add a QWebView widget and name it &#8220;browser&#8221; (using QT Object Inspector tab)

13. Add a QLineEdit widget anywhere in the window &#8211; we&#8217;ll add it to the toolbar manually.

14. Your view should be looking like this : <img src="/asset/2010/2/21/jambi_add_action_to_toolbar.jpg" alt="" width="1008" height="630" />

15. Save `WebView.jui` and go back to the Java perspective to add these lines to `views/WebView.java` :
	```java
    public WebView(QWidget parent) {
        // ...
        ui.toolBar.addWidget( ui.urlEdit );
        ui.toolBar.setFloatable(false);
        ui.toolBar.setMovable(false);
    }

    public Signal0 closed = new Signal0();

    @Override
    protected void closeEvent(QCloseEvent event) {
    	this.closed.emit();
    }
    ```

16. And let&#8217;s add code to handle the events in `controllers/WebController.java` :
	```java
    private void initEvents() {
        ui().actionReload.triggered.connect(this, "onReloadClicked()");
        ui().actionStop.triggered.connect(this, "onStopClicked()");

        ui().urlEdit.returnPressed.connect(this, "onUrlEditReturnPressed()");

        ui().browser.loadStarted.connect(this, "onLoadStarted()");
        ui().browser.loadProgress.connect(this, "onLoadProgress(int)");
        ui().browser.loadFinished.connect(this, "onLoadDone()");
        ui().browser.urlChanged.connect(this, "onUrlChanged(QUrl)");

        webView.closed.connect(this, "onClosed()");
    }

    private void openURL() {
        String text = ui().urlEdit.text();

        if (text.indexOf("://") &lt; 0)
        text = "http://" + text;

        ui().browser.load(new QUrl(text));
    }

    private void onReloadClicked() {
    	ui().browser.reload();
    }

    private void onStopClicked() {
    	ui().browser.stop();
    }

    private void onUrlEditReturnPressed() {
    	openURL();
    }

    private void onUrlChanged(QUrl url) {
    	ui().urlEdit.setText(url.toString());
    }

    private void onLoadStarted() {
    	ui().statusbar.showMessage("Starting to load: " + ui().urlEdit.text());
    }

    private void onLoadDone() {
    	ui().statusbar.showMessage("Loading done...");
    }

    private void onLoadProgress(int x) {
    	ui().statusbar.showMessage("Loading: " + x + " %");
    }

    private void onClosed() {
    	ui().browser.loadProgress.disconnect(this);
    	ui().browser.loadFinished.disconnect(this);
    }
    ```

17. In the code above you have an exemple of a custom signal (QT&#8217;s observer/observable pattern). Here is how it works : when `QMainWindow::closeEvent()` is triggered by QT when the user closes the app, we then delegates the information to the WebController via the signal `WebView::closed`

    . For more details refer to [QT Jambi article on signals & slots][2].</li> </ol> 
    
    But wait a minute! Cool application use icons not text in the toolbar! Yes you can!
    
      1. Download these two images ( <img style="width:32px" src="/asset/2010/2/21/refresh32.png" />, <img style="width:32px" src="/asset/2010/2/21/stop32.png" />) and save them in a directory named &#8220;images&#8221; in your eclipse project.
      2. Next add your images directory in your classpath: Project > Properties > Java Build Path > Librairies > Add Class Folder = &#8220;images&#8221;
      3. Add set the icon manually in views/WebView.java : 
    
      4. Read on the [QT Resource system][5] to understand how this works.
    
    Here you go! I hope this article will be usefull to someone!
    
## Source code

[final source code for this application][6]

## Credits

  * http://qt.nokia.com/doc/qtjambi-4.5.2_01/com/trolltech/qt/qtjambi-hellowebkit-code.html

  * http://qt.nokia.com/doc/qtjambi-4.5.2_01/com/trolltech/qt/qtjambi-resourcesystem.html
    

 [1]: /2010/01/getting-started-with-qt-jambi-on-linux/ "Getting started with QT Jambi on Linux"
 [2]: http://qt.nokia.com/doc/qtjambi-4.5.2_01/com/trolltech/qt/qtjambi-signalsandslots.html
 [3]: /asset/2010/2/21/refresh32.png
 [4]: /asset/2010/2/21/stop32.png
 [5]: http://qt.nokia.com/doc/qtjambi-4.5.2_01/com/trolltech/qt/qtjambi-resourcesystemoverview.html
 [6]: /asset/2010/2/21/JambiWeb.zip
 [7]: http://qt.nokia.com/doc/qtjambi-4.5.2_01/com/trolltech/qt/qtjambi-hellowebkit-code.html