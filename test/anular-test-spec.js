var assert = chai.assert;
var expect = chai.expect;

describe("Test the angular app", function(){
	// it('Test the angular', function(){
	// 	expect(true).to.be.true;
	// })
	
	describe('The address book app', function(){
		beforeEach(function(){
			module('myModule');
			inject(function($injector){
				contactService = $injector.get('contactService');
				$httpBackend = $injector.get("$httpBackend");
			})
		})
		it("should have a property contacts, an array",function(){
			expect(contactService.contacts).to.be.an('array')
		})
		it("should call the backend", function (){
			$httpBackend.expectGET("response/contacts.json")
				.respond(200,[]);
			$httpBackend.flush();
		})

	})

})
describe("the contact controller", function(){
	beforeEach(function(){
		module('myModule');
		inject(function($injector, $rootScope){
			$scope = $rootScope.$new();
			contactService = $injector.get('contactService');
			$httpBackend = $injector.get("$httpBackend");
			$controller = $injector.get('$controller');
		})
	})

	it("Should store on array of control", function(){
		$controller("myController", { $scope:$scope,contactService:contactService});
		assert.isArray($scope.lists)
	});

})

describe("the proper filter", function(){
	beforeEach(function(){
		module("myModule");
		inject(function($injector){
			proper = $injector.get("$filter")("proper");
		})
	})
	it("should proper case a string", function(){
		expect(proper("vinod varma")).to.equal("Vinod Varma");
		expect(proper("sai vinod")).to.equal("Sai Vinod");
	})
	it("should take a number and return that as a String", function(){
		expect(proper(42)).to.equal("42");
	})
	it("should throw an error on an incompatible type", function(){
		assert.throws(function(){
			proper(undefined)
		})
	})
})

describe("avatar", function(){
	beforeEach(function(){
		module("myModule");
	})
	it("Should display the capitalize first letter of a name", function(){
		inject(function($rootScope, $compile){
			$rootScope.contact = {name:"Jon Arryn"};
			var element = $compile('<avatar name="contact.name" />')($rootScope);
			$rootScope.$digest();
			var dirText = element.text();
			expect(dirText).to.equal("J")
		})
	})
})



