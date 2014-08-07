'use strict';
angular.module('dpt.directives', ['utils'])
    .directive('dptSimilar', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {

                var checkEquality = function validate() {

                    if (element.val() == attrs.dptSimilar) {
                        ctrl.$setValidity('similar', true);
                        return element.val();
                    }
                    else {
                        ctrl.$setValidity('similar', false);
                        return element.val();
                    }
                };

                scope.$watch(function () {
                    return attrs.similar;
                }, function () {
                    checkEquality();
                });

                ctrl.$parsers.unshift(checkEquality);
            }
        };

    })
    .filter('created', ['Moment', function (Moment) {
        return function (text) {
            var d = Date.parse(text);
            return Moment(d).fromNow();
        }
    }]);