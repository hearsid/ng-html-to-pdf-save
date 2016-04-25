
angular.module('htmlToPdfSave') 
.service('$pdfStorage' , function() {
	this.pdfSaveButtons = [] ;
	this.pdfSaveContents = [] ;
})
.service('pdfSaveConfig' , function() {
	this.pdfName = "default.pdf";
})

