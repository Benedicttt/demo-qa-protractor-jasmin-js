let disableNgAnimate = function () {
        angular
            .module('disableNgAnimate', [])
            .run(['$animate', function ($animate) {
                $animate.enabled(false);
            }]);
    };

    let disableCssAnimate = function () {
        angular
            .module('disableCssAnimate', [])
            .run(function () {
                let style = document.createElement('style');
                style.type = 'text/css';
                style.innerHTML = '* {' +
                    '-webkit-transition: none !important;' +
                    '-moz-transition: none !important' +
                    '-o-transition: none !important' +
                    '-ms-transition: none !important' +
                    'transition: none !important' +
                    '}';
                document.getElementsByTagName('head')[0].appendChild(style);
            });
    };

    let dataUtilMockModule = function () {
        let utilModule = angular.module('dataUtil', ['platform']);

        utilModule.service('EntityCreation', ['EntityDataService', '$q', function (EntityDataService) {
            createEntity = function (details, type) {
                let entity = EntityDataService.Entity(details).ofType(type);
                let promise = entity.save();
                return promise;
            };
        }]);
    };

module.exports = {
    animations: function() {
        browser.addMockModule('dataUtil', dataUtilMockModule);
        browser.addMockModule('disableNgAnimate', disableNgAnimate);
        browser.addMockModule('disableCssAnimate', disableCssAnimate);
    }
};