(function () {
'use strict'
angular.module('ShopApp', ['ui.router', 'data', 'ui.bootstrap'])
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
