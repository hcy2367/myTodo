"use strict";

/* Directives */
angular.module('myApp.directives', []).directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
        elm.text(version);
    };
}])

.directive('ngEnter', ['version', function(version) {
    return function(scope, elm, attrs) {
        // console.log(arguments)
        elm.bind("keydown",
        function($event) {
            // console.log($event)
            // console.log(attrs.ngEnter)
            if ($event.keyCode === 13) {

                // set event scope
                scope.$event = $event;
                scope.$apply(function() {
                    scope.$eval(attrs.ngEnter);
                });
                elm.val("")
                // $event.preventDefault();
            }
        });
    };
}]);