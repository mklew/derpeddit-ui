angular.module('dpt.directives', []).directive('dptSimilar', function () {

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

});