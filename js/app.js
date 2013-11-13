"use strict";

//配置myApp模块，以及依赖模块
angular.module("myApp", ["myApp.filters", "myApp.services", "myApp.directives", "myApp.controllers"]).
config(["$routeProvider", "$locationProvider",
	function($routeProvider, $locationProvider) {
		//todo留言路由配置
		$routeProvider.
		when("/message", {
			controller: "MsgListCtrl",
			templateUrl: "template/listMsg.html"
		}).
		when("/msg/:id", {
			controller: "MsgNewCtrl",
			templateUrl: "template/addMsg.html"
		}).
		otherwise({
			redirectTo: "/message"
		});

		//todo列表和编辑路由配置
		$routeProvider.
		when("/list", {
			controller: "ListCtrl",
			templateUrl: "template/list.html"
		}).
		when("/edit/:id", {
			controller: "EditCtrl",
			templateUrl: "template/edit.html"
		}).
		otherwise({
			redirectTo: "/list"
		});

		$locationProvider.html5Mode(false).hashPrefix("todo"); //添加slug
	}
]);