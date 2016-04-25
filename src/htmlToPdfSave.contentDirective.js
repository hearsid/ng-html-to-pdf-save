
angular.module('htmlToPdfSave') 
.directive('pdfSaveContent' ,  [ '$rootScope' , '$pdfStorage' , function ($rootScope , $pdfStorage) { 


			return {
				link : function(scope , element , attrs ) {

					$pdfStorage.pdfSaveContents.push(element) ;

					var myListener = scope.$on('savePdfEvent' , function(event , args) {

					var currentElement = element ;
						var currentElementId = currentElement[0].getAttribute('pdf-save-content') ;

					// save a call of query selector because angular loads the element on load by default
					//	var elem = document.querySelectorAll('[pdf-save]') ;
						var elem = $pdfStorage.pdfSaveContents ;
						var broadcastedId = args.activePdfSaveId ;



					//iterate through the element array to match the id 
					for(var i = 0;i < elem.length ; i++) {

						// handle the case of elem getting length 
					//	if(i == 'length' || i == 'item')
					//		continue ;

						// if the event is received by other element than for whom it what propogated for continue
						

						if(!matchTheIds(broadcastedId , currentElementId))
							continue ;

						var single = elem[i] ;
						var singleElement = single[0];
						//var parent = single[0] ;
						var pdfId = singleElement.getAttribute('pdf-save-content') ;

						if(matchTheIds(pdfId , broadcastedId)) {
							console.log('Id is same');
							convertToPdf(elem , pdfId);
							break ; // exit the loop once pdf gets printed
						}

					}

					function matchTheIds(elemId , broadcastedId) {
						return elemId == broadcastedId ;
					}

					function convertToPdf(theElement , id) {
						//theElement = [theElement];
						convert(theElement , id ) ;

					}


					function convert(theElement , id) {

						var element = $('[pdf-save-content='+id+']') ,
						cache_width = element.width(),
						 a4  =[ 595.28,  841.89];  // for a4 size paper width and height
						 

						 $('body').scrollTop(0);
						 createPDF();

						//create pdf
						function createPDF(){
							getCanvas().then(function(canvas){ 
								console.log('resolved get canvas');
								var img = canvas.toDataURL("image/png"),
								doc = new jsPDF({
									unit:'px', 
									format:'a4'
								});     
								doc.addImage(img, 'JPEG', 20, 20);
								doc.save('chart-reports.pdf');
								element.width(cache_width);

							})
						}

						// create canvas object
						function getCanvas(){
							element.width((a4[0]*1.33333) -80).css('max-width','none');
							return html2canvas(element,{
								imageTimeout:2000,
								removeContainer:true
							}); 
						}


					}



			}) ;
			// handle the memory leak
			// unbind the event
			scope.$on('$destroy', myListener); 

}

}

}]) ;



