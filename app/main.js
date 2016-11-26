var app = angular.module('myModule', []);
	app.service("contactService", function($http){
		this.contacts = [];
		var that = this;
		$http.get("response/contacts.json").then(function(res){
			//console.log(res.data);
			//while(res.data){
				that.contacts.push(res.data);	
			//}
			
		});
	})
	app.controller("myController", function(contactService, $scope){
		console.log(contactService.contacts)
		$scope.lists = contactService.contacts;
		$scope.users = ["vinod varma", "sai vinod"]
	})
	app.filter("proper", function(){
		return function(name){
			var type = typeof name;
			if(type != 'number' && type !== 'string') throw new Error();

			return name.toString().split(" ").map(function(word){
				return word[0].toUpperCase().
				concat(word.slice(1));
			}).join(" ");
		}
	})

	app.directive("avatar", function(){
		return {
			restrict:"AE",
			scope:{
				name:'='
			},
			template:"<span class='avatar'>{{ name[0] | proper }}</span>"
		}
	})