# Firefox extension to add HTML5 desktop notifications support #

This extension adds desktop notifications to Firefox. It provides to each webpage an API described by Google Chrome at http://www.chromium.org/developers/design-documents/desktop-notifications/api-specification

With this extension installed, you can now use window.webkitNotifications in your webpage like in Google Chromium.

## Important note : project discontinued ##

<p><font color='red' size='4'><b>Now that Mozilla will ship this functionnality inside Firefox, this extension won't be needed anymore.</b></font></p>
See [Mozilla Bug #782211](https://bugzilla.mozilla.org/show_bug.cgi?id=782211).

## Usage example ##

For instance, this extension can display notifications with GMail and GChat.
You will have a message "Click here to activate desktop notifications" : click and authorize. Then, modify parameters under the general settings tab.

<p align='center'><wiki:gadget url="http://ff-html5notifications.googlecode.com/svn/wiki/gadget/html5notifications.xml" height="40" border="0" /></p>

## Download ##

<p align='center'><a href='http://cyril.me/dl/h5n/ff-html5notifications-latest-fx.xpi'><font size='5'>Download latest version</font></a><br />Current version is 1.2.4<br /><a href='http://code.google.com/p/ff-html5notifications/downloads/list'>Alternate server</a></p>

You can also download the extension on Mozilla addons website (not always up to date) :
https://addons.mozilla.org/firefox/addon/html-notifications/

_Note for Mac OS X users :_ HTML notifications are currently unsupported, and simple notifications need Growl to work (download Growl at http://www.growl.info/)

_Note for Linux users with libnotify (most of distributions) :_ extension mail fail to work sometimes. This can be solved by disabling images. For more informations, see [Issue 32](http://code.google.com/p/ff-html5notifications/issues/detail?id=32)

## Features ##

  * Create simple notifications : with icon, title and description
  * Support HTML notifications
  * Request permission using notification box
  * Support onclose, ondisplay and onerror notification attributes
  * Implement close() method
  * Disable notification auto-hiding
  * Localization support
  * Support [private browsing mode](http://code.google.com/p/ff-html5notifications/wiki/PrivateBrowsing)

## TODO ##

  * Support a preference checkbox "ignore private browsing mode"
  * Support notification stack (display new notification above/below the previous ones)
  * Implement postMessage for reflection iframe

## Will not ##
  * Support auto-close

## Notes ##

In HTML notifications, window.opener is a reflection iframe. It is not the window that has called the show() method. Only the focus() method can be used.

## Contact ##

If it's about a bug, a feature, or something else concerning directly the extension, please use the [Issues Link](http://code.google.com/p/ff-html5notifications/issues/list)

To contact me, please use the contact form at my blog :
http://blog.cyril.me/2010/08/notifications-html5-firefox/