
angular.module('htmlToPdfSave')
.directive('pdfSaveButton' , ['$rootScope' , '$pdfStorage' , function($rootScope , $pdfStorage) {

	return {
		restrict: 'A',
		link : function(scope , element , attrs ) {
			$pdfStorage.pdfSaveButtons.push(element) ;

			scope.buttonText = "Button";
			element.on('click' , function() {
				var activePdfSaveId = attrs.pdfSaveButton ;
				var activePdfSaveName = attrs.pdfName;
				$rootScope.$broadcast('savePdfEvent' , {activePdfSaveId : activePdfSaveId, activePdfSaveName: activePdfSaveName}) ;


			})
		}


	}

}]) ;
