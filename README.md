### Appcelerator Titanium - Image support in jsPDF ###

This is an example app with jsPDF image support plug-in that allows you to use the jsPDF library in Titanium with images, these are currently not currently available with jsPDF when used with Titanium normally.

This version is currently considered pre-release.

Version 0.2

[jsPDF libary](http://parall.ax/products/jspdf) 

I do not claim to be the author of the jsPDF library, this code simply adds preliminary image support when used with Titanium.

### History ###

0.1 Initial proof of concept
0.2 Some tweaks provided by [Ben Bahrenburg](http://bahrenburgs.com/), some of his public work [github.com/benbahrenburg](https://github.com/benbahrenburg)

### Future updates ###

1.0 Fully tested on iOS and Android with the generated PDFs tested on mobiles as well as desktops for compatibility. 

The 1.0 version of this library will be featured in an upcoming magazine issue of the forthcoming Newsstand magazine "Oracle: Deep Dives" .  This issue will be complete with many examples of code in Alloy and classic with many tips and tricks and walkthroughs on how and why this can now be done.  This document will be updated to show availability.

```javascript
var _jsPDF = require('./jsPDFMod/TiJSPDF');
var doc = new _jsPDF();
doc.setProperties({
    title: 'Title',
    subject: 'This is the subject',		
    author: 'John Doe',
    keywords: 'one, two, three',
    creator: 'Someone'
});

var imgSample1 = Ti.Filesystem.resourcesDirectory + 'image1.jpg';
doc.addImage(imgSample1, 'JPEG', 10, 20, 128, 96);

doc.setFont("helvetica");
doc.setFontType("bold");
doc.setFontSize(24);
doc.text(20, 180, 'Hello world');
doc.text(20, 190, 'This is jsPDF with image support\nusing Titanium..');

doc.addPage();
doc.rect(20, 120, 10, 10); // empty square
doc.rect(40, 120, 10, 10, 'F'); // filled square

var imgSample2 = Ti.Filesystem.resourcesDirectory + 'image2.jpg'
doc.addImage(imgSample2, 'JPEG', 70, 10, 100, 120);

doc.setFont("helvetica");
doc.setFontType("normal");
doc.setFontSize(24);
doc.text(20, 180, 'This is what I looked like trying to get');
doc.text(20, 190, 'the save function into the plugin system.');
doc.text(20, 200, 'It works now');

doc.text(20, 240, (new Date()).toString());

var timeStampName = new Date().getTime();
if (_tempFile != null) {
    _tempFile.deleteFile();
}
_tempFile = Ti.Filesystem.getFile(Ti.Filesystem.getTempDirectory(), timeStampName + '.pdf');			
doc.save(_tempFile);

```

### Restrictions ###

The jsPDF image module is free for use with personal or commercial projects.