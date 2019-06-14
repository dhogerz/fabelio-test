var expect  = require('chai').expect;
var request = require('request');

// describe('Status and content', function() {
//     describe ('Main page', function() {
//         it('status', function(done){
//             request('http://localhost:8080/', function(error, response, body) {
//                 expect(response.statusCode).to.equal(200);
//                 done();
//             });
//         });

//         it('content', function(done) {
//             request('http://localhost:8080/' , function(error, response, body) {
//                 expect(body).to.equal('Main Page');
//                 done();
//             });
//         });
//     });

//     describe ('List page', function() {
//         it('status', function(done){
//             request('http://localhost:8080/list', function(error, response, body) {
//                 expect(response.statusCode).to.equal(404);
//                 done();
//             });
//         });

//         it('content', function(done) {
//             request('http://localhost:8080/list' , function(error, response, body) {
//                 expect(body).to.equal('Get the list');
//                 done();
//             });
//         });

//     });

//     describe ('Product page', function() {
//         it('status', function(done){
//             request('http://localhost:8080/product', function(error, response, body) {
//                 expect(response.statusCode).to.equal(404);
//                 done();
//             });
//         });

//         it('content', function(done) {
//             request('http://localhost:8080/product' , function(error, response, body) {
//                 expect(body).to.equal('Get the product');
//                 done();
//             });
//         });

//     });
// });

// it('Main page content', function(done) {
//     request('http://localhost:8080' , function(error, response, body) {
//         expect(body).to.equal('Main Page');
//         done();
//     });
// });