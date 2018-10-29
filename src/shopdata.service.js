(function () {
  'use strict'

  angular.module('data')
  .service('ShopDataService', ShopDataService);

  ShopDataService.$inject = ['$http', '$stateParams'];
    function ShopDataService($http, $stateParams) {
      var service = this;

      service.isLoggedIn = function () {
        return $http.get("php/isloggedin.php")
          .then(function (response) {
          return response.data.isloggedin;
        });
      };

       service.getAllItems = function () {
        return $http.get("php/data.php")
          .then(function (response) {
            console.log("all items:"+response.data);
          return response.data.items;
        });
      };

      service.getCartItems = function (id, qty, siz) {
        // console.log($stateParams);
        return $http.get("php/cart.php?id="+id+"&qty="+qty+"&sz="+siz)
          .then(function (response) {
          console.log(response.data.items);
          return response.data.items;
        });
      };

      service.CheckoutItems = function (basket) {
        console.log("basket in service: "+basket);
        var basketitems = basket;
        return basketitems
        };


      }
})();
