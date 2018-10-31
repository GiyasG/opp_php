(function () {
  'use strict';

  angular.module('ShopApp')
  .controller('VerifyController', VerifyController);

  VerifyController.$inject = ['info'];
  function VerifyController(info) {
    var vCtrl = this;
    vCtrl.info = info;
    console.log(vCtrl.info);

  }

})();
