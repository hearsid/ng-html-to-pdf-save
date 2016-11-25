## Angularjs save HTML as PDF in your browser
This is an angularjs module to save HTML as PDF <a target="_blank" href="http://hearsid.github.io/pdfSave/demo/pdfAngular.html">DEMO</a>, it basically converts the HTML to HTML5 canvas and captures the same and converts it to PDF and saves it in your browser .
<br/>
Here are the steps :
<br/>
1) bower install angular-save-html-to-pdf
<br/>OR<br/>
npm install angular-save-html-to-pdf

 2) Link the JS files in your HTML file :

 ```
	<script src="../bower_components/angular/angular.js"></script>
	<script src="../bower_components/jquery/dist/jquery.min.js"></script>
	<script src="https://cdn.rawgit.com/niklasvh/html2canvas/0.5.0-alpha2/dist/html2canvas.min.js"></script>
	<script src="../bower_components/jsPDF/dist/jspdf.debug.js"></script>
	<script src="../dist/saveHtmlToPdf.min.js"></script>

 ```

 3) Add this module to your angular app :
 ```
 var app = angular.module('app' , ['htmlToPdfSave']) ;
 ```
 4) Use the directives in your app , here is a code snippet from a working copy in demo folder :
  ```
  <button pdf-save-button="idOne" pdf-name="someone.pdf" class="btn">Hello Someone</button>
  	<!-- below block will be saved as pdf -->

  	<div pdf-save-content="idOne" >
  		Hello Someone
  	</div>

  	<button pdf-save-button="idOneGraph" pdf-name="hello.pdf" class="btn">Hello World</button>

 	<!-- below block will be saved as pdf -->

  	<div pdf-save-content="idOneGraph" >
  		Hello World
  	</div>
  ```

  To allow addition of multiple pdf save button and linking them to the pdf save content block every pdf-save-button and pdf-save-content directive is associated with an ID , the pdf-save-button will match the ID with pdf-save-content block and the matching HTML block will be saved .
  <br/>
  NOTE : This is a new repository and has been tested with basic HTML and google graphs , please create github issues if you find it is not working with something and consider contributing. Cheers .
