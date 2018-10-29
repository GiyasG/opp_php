(function () {
  'use strict';
  angular.module('ShopApp')
  .controller('CheckoutController', CheckoutController);
  CheckoutController.$inject = ['basketitems'];
  function CheckoutController(basketitems) {
    var bCtrl = this;
    bCtrl.basketitems = basketitems;
    console.log("bCtrl: "+bCtrl.basketitems);
    console.log(bCtrl.basketitems);
  }
})();
