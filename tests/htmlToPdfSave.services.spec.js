/**
 * Created by siddharthsharma on 5/28/16.
 */

// check if service $pdfStorage exists
// check if the same has properties pdfSaveButtons and pdfSaveContents
// both of the above should be of type array

// check if the service pdfSaveConfig exists
// check if it has a property pdfName
// pdfName == "default.pdf"

describe('' , function() {


    it('pdf angular module is defined' , function() {

        beforeEach(function() {

        });

        expect(pdfModule).not().toEqual(undefined) ;
    })
});