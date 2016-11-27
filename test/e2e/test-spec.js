describe("End to End address test", function(){
	it("Should have contacts", function(done){
		browser.get('http://localhost:8080');
		element.all(by.repeater('user in users'))
			.then(function(users){
				var first = users[0];
				console.log(first);
				var test = first.getText();
				expect(test).toEqual('Vinod Varma');
				done();
			})
	})

})