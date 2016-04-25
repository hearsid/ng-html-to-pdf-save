(function(angular, window) {

angular.module('htmlToPdfSave' , []) ;



})(window.angular , window) ;

(function(angular , window) {

angular.module('htmlToPdfSave')
.directive('pdfSaveButton' , function($rootScope , $pdfStorage) {
	
	return {
		restrict: 'A',
		link : function(scope , element , attrs ) {
			$pdfStorage.pdfSaveButtons.push(element) ;

			scope.buttonText = "Button";
			element.on('click' , function() {
				var activePdfSaveId = attrs.pdfSaveButton ;
				$rootScope.$broadcast('savePdfEvent' , {activePdfSaveId : activePdfSaveId}) ;

			 
			})
		}


	}

}) ;

});
(function(angular , window) {

angular.module('htmlToPdfSave') 
.directive('pdfSaveContent' , function($rootScope , $pdfStorage) { 


			return {
				link : function(scope , element , attrs ) {

					$pdfStorage.pdfSaveContents.push(element) ;

					var myListener = scope.$on('savePdfEvent' , function(event , args) {

					var currentElement = element ;
						var currentElementId = currentElement[0].getAttribute('pdf-save') ;

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
						var pdfId = singleElement.getAttribute('pdf-save') ;

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

						var element = $('[pdf-save='+id+']') ,
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

}) ;



})(window.angular , window) ;

(function(angular , window) {

angular.module('htmlToPdfSave') 
.service('$pdfStorage' , function() {
	this.pdfSaveButtons = [] ;
	this.pdfSaveContents = [] ;
})
.service('pdfSaveConfig' , function() {
	this.pdfName = "default.pdf";
})

}) ;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0bG1Ub1BkZlNhdmUubW9kdWxlLmpzIiwiaHRtbFRvUGRmU2F2ZS5idXR0b25EaXJlY3RpdmUuanMiLCJodG1sVG9QZGZTYXZlLmNvbnRlbnREaXJlY3RpdmUuanMiLCJodG1sVG9QZGZTYXZlLnNlcnZpY2VzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJzYXZlSHRtbFRvUGRmLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKGFuZ3VsYXIsIHdpbmRvdykge1xuXG5hbmd1bGFyLm1vZHVsZSgnaHRtbFRvUGRmU2F2ZScgLCBbXSkgO1xuXG5cblxufSkod2luZG93LmFuZ3VsYXIgLCB3aW5kb3cpIDtcbiIsIihmdW5jdGlvbihhbmd1bGFyICwgd2luZG93KSB7XG5cbmFuZ3VsYXIubW9kdWxlKCdodG1sVG9QZGZTYXZlJylcbi5kaXJlY3RpdmUoJ3BkZlNhdmVCdXR0b24nICwgZnVuY3Rpb24oJHJvb3RTY29wZSAsICRwZGZTdG9yYWdlKSB7XG5cdFxuXHRyZXR1cm4ge1xuXHRcdHJlc3RyaWN0OiAnQScsXG5cdFx0bGluayA6IGZ1bmN0aW9uKHNjb3BlICwgZWxlbWVudCAsIGF0dHJzICkge1xuXHRcdFx0JHBkZlN0b3JhZ2UucGRmU2F2ZUJ1dHRvbnMucHVzaChlbGVtZW50KSA7XG5cblx0XHRcdHNjb3BlLmJ1dHRvblRleHQgPSBcIkJ1dHRvblwiO1xuXHRcdFx0ZWxlbWVudC5vbignY2xpY2snICwgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBhY3RpdmVQZGZTYXZlSWQgPSBhdHRycy5wZGZTYXZlQnV0dG9uIDtcblx0XHRcdFx0JHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzYXZlUGRmRXZlbnQnICwge2FjdGl2ZVBkZlNhdmVJZCA6IGFjdGl2ZVBkZlNhdmVJZH0pIDtcblxuXHRcdFx0IFxuXHRcdFx0fSlcblx0XHR9XG5cblxuXHR9XG5cbn0pIDtcblxufSk7IiwiKGZ1bmN0aW9uKGFuZ3VsYXIgLCB3aW5kb3cpIHtcblxuYW5ndWxhci5tb2R1bGUoJ2h0bWxUb1BkZlNhdmUnKSBcbi5kaXJlY3RpdmUoJ3BkZlNhdmVDb250ZW50JyAsIGZ1bmN0aW9uKCRyb290U2NvcGUgLCAkcGRmU3RvcmFnZSkgeyBcblxuXG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRsaW5rIDogZnVuY3Rpb24oc2NvcGUgLCBlbGVtZW50ICwgYXR0cnMgKSB7XG5cblx0XHRcdFx0XHQkcGRmU3RvcmFnZS5wZGZTYXZlQ29udGVudHMucHVzaChlbGVtZW50KSA7XG5cblx0XHRcdFx0XHR2YXIgbXlMaXN0ZW5lciA9IHNjb3BlLiRvbignc2F2ZVBkZkV2ZW50JyAsIGZ1bmN0aW9uKGV2ZW50ICwgYXJncykge1xuXG5cdFx0XHRcdFx0dmFyIGN1cnJlbnRFbGVtZW50ID0gZWxlbWVudCA7XG5cdFx0XHRcdFx0XHR2YXIgY3VycmVudEVsZW1lbnRJZCA9IGN1cnJlbnRFbGVtZW50WzBdLmdldEF0dHJpYnV0ZSgncGRmLXNhdmUnKSA7XG5cblx0XHRcdFx0XHQvLyBzYXZlIGEgY2FsbCBvZiBxdWVyeSBzZWxlY3RvciBiZWNhdXNlIGFuZ3VsYXIgbG9hZHMgdGhlIGVsZW1lbnQgb24gbG9hZCBieSBkZWZhdWx0XG5cdFx0XHRcdFx0Ly9cdHZhciBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW3BkZi1zYXZlXScpIDtcblx0XHRcdFx0XHRcdHZhciBlbGVtID0gJHBkZlN0b3JhZ2UucGRmU2F2ZUNvbnRlbnRzIDtcblx0XHRcdFx0XHRcdHZhciBicm9hZGNhc3RlZElkID0gYXJncy5hY3RpdmVQZGZTYXZlSWQgO1xuXG5cblxuXHRcdFx0XHRcdC8vaXRlcmF0ZSB0aHJvdWdoIHRoZSBlbGVtZW50IGFycmF5IHRvIG1hdGNoIHRoZSBpZCBcblx0XHRcdFx0XHRmb3IodmFyIGkgPSAwO2kgPCBlbGVtLmxlbmd0aCA7IGkrKykge1xuXG5cdFx0XHRcdFx0XHQvLyBoYW5kbGUgdGhlIGNhc2Ugb2YgZWxlbSBnZXR0aW5nIGxlbmd0aCBcblx0XHRcdFx0XHQvL1x0aWYoaSA9PSAnbGVuZ3RoJyB8fCBpID09ICdpdGVtJylcblx0XHRcdFx0XHQvL1x0XHRjb250aW51ZSA7XG5cblx0XHRcdFx0XHRcdC8vIGlmIHRoZSBldmVudCBpcyByZWNlaXZlZCBieSBvdGhlciBlbGVtZW50IHRoYW4gZm9yIHdob20gaXQgd2hhdCBwcm9wb2dhdGVkIGZvciBjb250aW51ZVxuXHRcdFx0XHRcdFx0XG5cblx0XHRcdFx0XHRcdGlmKCFtYXRjaFRoZUlkcyhicm9hZGNhc3RlZElkICwgY3VycmVudEVsZW1lbnRJZCkpXG5cdFx0XHRcdFx0XHRcdGNvbnRpbnVlIDtcblxuXHRcdFx0XHRcdFx0dmFyIHNpbmdsZSA9IGVsZW1baV0gO1xuXHRcdFx0XHRcdFx0dmFyIHNpbmdsZUVsZW1lbnQgPSBzaW5nbGVbMF07XG5cdFx0XHRcdFx0XHQvL3ZhciBwYXJlbnQgPSBzaW5nbGVbMF0gO1xuXHRcdFx0XHRcdFx0dmFyIHBkZklkID0gc2luZ2xlRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3BkZi1zYXZlJykgO1xuXG5cdFx0XHRcdFx0XHRpZihtYXRjaFRoZUlkcyhwZGZJZCAsIGJyb2FkY2FzdGVkSWQpKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdJZCBpcyBzYW1lJyk7XG5cdFx0XHRcdFx0XHRcdGNvbnZlcnRUb1BkZihlbGVtICwgcGRmSWQpO1xuXHRcdFx0XHRcdFx0XHRicmVhayA7IC8vIGV4aXQgdGhlIGxvb3Agb25jZSBwZGYgZ2V0cyBwcmludGVkXG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRmdW5jdGlvbiBtYXRjaFRoZUlkcyhlbGVtSWQgLCBicm9hZGNhc3RlZElkKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZWxlbUlkID09IGJyb2FkY2FzdGVkSWQgO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGZ1bmN0aW9uIGNvbnZlcnRUb1BkZih0aGVFbGVtZW50ICwgaWQpIHtcblx0XHRcdFx0XHRcdC8vdGhlRWxlbWVudCA9IFt0aGVFbGVtZW50XTtcblx0XHRcdFx0XHRcdGNvbnZlcnQodGhlRWxlbWVudCAsIGlkICkgO1xuXG5cdFx0XHRcdFx0fVxuXG5cblx0XHRcdFx0XHRmdW5jdGlvbiBjb252ZXJ0KHRoZUVsZW1lbnQgLCBpZCkge1xuXG5cdFx0XHRcdFx0XHR2YXIgZWxlbWVudCA9ICQoJ1twZGYtc2F2ZT0nK2lkKyddJykgLFxuXHRcdFx0XHRcdFx0Y2FjaGVfd2lkdGggPSBlbGVtZW50LndpZHRoKCksXG5cdFx0XHRcdFx0XHQgYTQgID1bIDU5NS4yOCwgIDg0MS44OV07ICAvLyBmb3IgYTQgc2l6ZSBwYXBlciB3aWR0aCBhbmQgaGVpZ2h0XG5cdFx0XHRcdFx0XHQgXG5cblx0XHRcdFx0XHRcdCAkKCdib2R5Jykuc2Nyb2xsVG9wKDApO1xuXHRcdFx0XHRcdFx0IGNyZWF0ZVBERigpO1xuXG5cdFx0XHRcdFx0XHQvL2NyZWF0ZSBwZGZcblx0XHRcdFx0XHRcdGZ1bmN0aW9uIGNyZWF0ZVBERigpe1xuXHRcdFx0XHRcdFx0XHRnZXRDYW52YXMoKS50aGVuKGZ1bmN0aW9uKGNhbnZhcyl7IFxuXHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdyZXNvbHZlZCBnZXQgY2FudmFzJyk7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIGltZyA9IGNhbnZhcy50b0RhdGFVUkwoXCJpbWFnZS9wbmdcIiksXG5cdFx0XHRcdFx0XHRcdFx0ZG9jID0gbmV3IGpzUERGKHtcblx0XHRcdFx0XHRcdFx0XHRcdHVuaXQ6J3B4JywgXG5cdFx0XHRcdFx0XHRcdFx0XHRmb3JtYXQ6J2E0J1xuXHRcdFx0XHRcdFx0XHRcdH0pOyAgICAgXG5cdFx0XHRcdFx0XHRcdFx0ZG9jLmFkZEltYWdlKGltZywgJ0pQRUcnLCAyMCwgMjApO1xuXHRcdFx0XHRcdFx0XHRcdGRvYy5zYXZlKCdjaGFydC1yZXBvcnRzLnBkZicpO1xuXHRcdFx0XHRcdFx0XHRcdGVsZW1lbnQud2lkdGgoY2FjaGVfd2lkdGgpO1xuXG5cdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIGNyZWF0ZSBjYW52YXMgb2JqZWN0XG5cdFx0XHRcdFx0XHRmdW5jdGlvbiBnZXRDYW52YXMoKXtcblx0XHRcdFx0XHRcdFx0ZWxlbWVudC53aWR0aCgoYTRbMF0qMS4zMzMzMykgLTgwKS5jc3MoJ21heC13aWR0aCcsJ25vbmUnKTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGh0bWwyY2FudmFzKGVsZW1lbnQse1xuXHRcdFx0XHRcdFx0XHRcdGltYWdlVGltZW91dDoyMDAwLFxuXHRcdFx0XHRcdFx0XHRcdHJlbW92ZUNvbnRhaW5lcjp0cnVlXG5cdFx0XHRcdFx0XHRcdH0pOyBcblx0XHRcdFx0XHRcdH1cblxuXG5cdFx0XHRcdFx0fVxuXG5cblxuXHRcdFx0fSkgO1xuXHRcdFx0Ly8gaGFuZGxlIHRoZSBtZW1vcnkgbGVha1xuXHRcdFx0Ly8gdW5iaW5kIHRoZSBldmVudFxuXHRcdFx0c2NvcGUuJG9uKCckZGVzdHJveScsIG15TGlzdGVuZXIpOyBcblxufVxuXG59XG5cbn0pIDtcblxuXG5cbn0pKHdpbmRvdy5hbmd1bGFyICwgd2luZG93KSA7XG4iLCIoZnVuY3Rpb24oYW5ndWxhciAsIHdpbmRvdykge1xuXG5hbmd1bGFyLm1vZHVsZSgnaHRtbFRvUGRmU2F2ZScpIFxuLnNlcnZpY2UoJyRwZGZTdG9yYWdlJyAsIGZ1bmN0aW9uKCkge1xuXHR0aGlzLnBkZlNhdmVCdXR0b25zID0gW10gO1xuXHR0aGlzLnBkZlNhdmVDb250ZW50cyA9IFtdIDtcbn0pXG4uc2VydmljZSgncGRmU2F2ZUNvbmZpZycgLCBmdW5jdGlvbigpIHtcblx0dGhpcy5wZGZOYW1lID0gXCJkZWZhdWx0LnBkZlwiO1xufSlcblxufSkgO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
