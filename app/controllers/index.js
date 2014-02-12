/**
 * for now code generates only one pdf file
 * @TODO: jspdf fixes 
 * create multiple files
 * remove old files when given TTL received
 * 
 * add support template files with place holders
 * use google pdf reader for android 
 * fix images issue for android 
 */


var jsPdfLib = require('/jsPDFMod/TiJSPDF');
var _isAndroid = Ti.Platform.osname === 'android';
var _tempFile = null;


function createPDF() {
        var doc =  new jsPdfLib.jsPDF();
        doc.setProperties({
            title: 'Title',
            subject: 'This is the subject',   
            author: 'John Doe',
            keywords: 'one, two, three',
            creator: 'Someone'
        });

        //var image1Data = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "image1.jpg").read().getText();
        var image1 = Ti.Filesystem.resourcesDirectory  + "image1.jpg";
        doc.addImage(image1, 'JPEG', 10, 20, 128, 96);

        doc.setFont("helvetica");
        doc.setFontType("bold");
        doc.setFontSize(24);
        doc.text(20, 180, 'Hello world');
        doc.text(20, 190, 'This is jsPDF with image support\nusing Titanium..');

        doc.addPage();
        doc.rect(20, 120, 10, 10); // empty square
        doc.rect(40, 120, 10, 10, 'F'); // filled square

        var image2 = Ti.Filesystem.resourcesDirectory  + "image2.jpg";
        doc.addImage(image2, 'JPEG', 70, 10, 100, 120);

        doc.setFont("helvetica");
        doc.setFontType("normal");
        doc.setFontSize(24);
        doc.text(20, 180, 'This is what I looked like trying to get');
        doc.text(20, 190, 'the save function into the plugin system.');
        doc.text(20, 200, 'It works now');

        doc.text(20, 240, (new Date()).toString());
        
        doc.addPage();



        ////// font faces TEST
        doc.setFont("courier");
        doc.setFontType("normal");
        doc.text(20, 150, 'This is courier normal.');

        doc.setFont("times");
        doc.setFontType("italic");
        doc.text(20, 160, 'This is times italic.');

        doc.setFont("helvetica");
        doc.setFontType("bold");
        doc.text(20, 170, 'This is helvetica bold.');
        doc.addPage();
        doc.text(20, 20, "i'm on a new page yesssss...");

        /////// circler TEST
        doc.ellipse(140, 220, 100, 5);

        doc.setFillColor(0,0,255);
        doc.ellipse(80, 20, 10, 5, 'F');

        doc.setLineWidth(1);
        doc.setDrawColor(0);
        doc.setFillColor(255,0,0);
        doc.circle(120, 20, 5, 'FD');

        /////// fontsize TEST
        doc.setFontSize(22);
        doc.text(20, 130, 'This is a title');

        doc.setFontSize(16);
        doc.text(20, 180, 'This is some normal sized text underneath.');


        /////// line TEST

        doc.addPage();

        doc.line(20, 20, 60, 20); // horizontal line
        doc.setLineWidth(0.5);
        doc.line(20, 25, 60, 25);

        doc.setLineWidth(1);
        doc.line(20, 30, 60, 30);

        doc.setLineWidth(1.5);
        doc.line(20, 35, 60, 35);

        doc.setDrawColor(255,0,0); // draw red lines

        doc.setLineWidth(0.1);
        doc.line(100, 20, 100, 60); // vertical line

        /////// sequare TEST
        // Empty square
        doc.rect(20, 100, 10, 10); 

        // Filled square
        doc.rect(40, 120, 10, 10, 'F');

        // Empty red square
        doc.setDrawColor(255,0,0);
        doc.rect(60, 120, 10, 10);

        // Filled square with red borders
        doc.setDrawColor(255,0,0);
        doc.rect(80, 120, 10, 10, 'FD'); 



        /////// text color TTTEEESST
        doc.addPage();
        doc.setTextColor(100);
        doc.text(20, 20, 'This is gray.');

        doc.setTextColor(150);
        doc.text(20, 30, 'This is light gray.');

        doc.setTextColor(255, 0, 0);
        doc.text(20, 40, 'This is red.');

        doc.setTextColor(0, 255, 0);
        doc.text(20, 50, 'This is green.');

        doc.setTextColor(0, 0, 255);
        doc.text(20, 60, 'This is blue.');

        ///// triangle TESSST
        doc.triangle(60, 100, 60, 120, 80, 110, 'FD');
        doc.setLineWidth(1);
        doc.setDrawColor(255,0,0);
        doc.setFillColor(0,0,255);
        doc.triangle(100, 100, 110, 100, 120, 130, 'FD');





        var timeStampName = new Date().getTime();
        cleanOrphans();
        _tempFile = Ti.Filesystem.getFile(Ti.Filesystem.getTempDirectory(), timeStampName + '.pdf');      
        doc.save(_tempFile);
}

function showPDF() {

    if (_isAndroid) {
      var intent = Ti.Android.createIntent({
        action: Ti.Android.ACTION_VIEW,
        type: "application/pdf",
        data: _tempFile.nativePath
      });

      try {
        Ti.Android.currentActivity.startActivity(intent);
      } catch(e) {
        Ti.API.debug(e);
        alert('You have no apps on your device that can open PDFs. Please download one from the marketplace.');
      }
    } else {
            var winPDF = Ti.UI.createWindow({
                backgroundColor: '#eee',
                height: Ti.UI.FILL,
                title: 'PDF Preview',
                width: Ti.UI.FILL,
                layout: 'horizontal'
            });
            var btnClose = Ti.UI.createButton({
                title: 'Close'
            });
            btnClose.addEventListener('click', function (e) {
                winPDF.close();
            });
            winPDF.setRightNavButton(btnClose);
            var pdfview = Ti.UI.createWebView({
                backgroundColor: '#eee',
                url: _tempFile.nativePath,
                height: Ti.UI.FILL,
                width: Ti.UI.FILL
            });
            winPDF.add(pdfview);
            winPDF.open();
    }
} // end of event listener

function cleanOrphans() {
    if (_tempFile != null) {
      _tempFile.deleteFile();
    }
    _tempFile = null;
}

$.container.addEventListener('close',function (e) {
  cleanOrphans();
});
    
    

$.container.open();
    
function testPDF() {
  createPDF();
  showPDF(); 
}    


function testSignature() {
  var signatureCtl = Alloy.createController("signature", {});  
  var signatureView = signatureCtl.getView(); 
  signatureView.open();
}




