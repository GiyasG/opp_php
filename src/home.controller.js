(function () {
  'use strict';

  angular.module('ShopApp')
  .controller('HomeController', HomeController)
  .directive('sessionCart', SessionCartDirective)
  .directive('sessionLogin', SessionLoginDirective)
  .directive('sessionRegister', SessionRegisterDirective)
  .directive('forgottenPassword', ForgottenPassordDirective);

  HomeController.$inject = ['$scope', '$http', 'isloggedin', '$uibModal', '$log'];

    function HomeController($scope, $http, isloggedin, $uibModal, $log) {

        var hCtrl = this;

        //****************** MODAL ****************//
        hCtrl.data = false;

          hCtrl.open = function () {
            var modalInstance = $uibModal.open({
              // animation: true,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: 'src/template/myModalContent.html',
              controller: 'ModalInstanceController',
              controllerAs: 'hCtrl',
              // size: size,
              resolve: {
                data: function () {
                  return hCtrl.data;
                }
              }
            });

            modalInstance.result.then(function () {
              $scope.showLogin = false;
              alert($scope.showLogin);
            });
          };
        //*****************************************//

        hCtrl.isloggedin = isloggedin;
        if (hCtrl.isloggedin[0].isIn === false) {
          $scope.showLogin = true;
          $scope.showRegister = true;
          hCtrl.data = false;
          if (isloggedin[1].items === null) {
            $scope.showCart = false;
          } else {
            $scope.showCart = true;
          }
          console.log("Logged out "+hCtrl.isloggedin[1].items);
        } else {
          $scope.showLogin = false;
          $scope.showRegister = false;
          hCtrl.data = true;
          if (isloggedin[1].items === null) {
            $scope.showCart = false;
          } else {
            $scope.showCart = true;
          }
          console.log("Logged in "+hCtrl.isloggedin[0]);
        }

        $scope.showLoginForm = false;
        $scope.loginWarning = "";

//**********************************************************//
        $scope.logoutForm = function() {
          var userparams = "logOut";
          $http({
                  method  : 'POST',
                  url     : 'php/logoutsubmit.php',
                  data    : userparams,
                  headers : { 'Content-Type': 'application/x-www-form-urlencoded'},
                   })
                .then(function(response) {
                  if (response.data.isloggedin[0].isIn === false) {
                    $scope.showLogin = true;
                  }
                    return response.data;
                  });
        };

// ***************************************** //
hCtrl.emptyCart = function () {
$http({
      method  : 'POST',
      url     : 'php/emptyCart.php'
       })
    .then(function(response) {
        hCtrl.isloggedin[1].items = response.data.cart;
        $scope.showCart = false;
        return response.data.cart;
    });
  };


// ***************************************** //
          $scope.openloginForm = function() {
            // console.log("Clicked open");
            if (!($scope.showLoginForm)) {
              $scope.pwarnings = "";
              $scope.loginWarning = "";
              $scope.showLoginForm = true;
              $scope.showRegisterForm = false;
              $scope.showPasswordChange = false;
              $scope.showPasswordForm = false;
            }
          };

          $scope.closeloginForm = function() {
            // console.log("Clicked close");
            if ($scope.showLoginForm) {
              $scope.loginWarning = "";
              $scope.showLoginForm = false;
              $scope.showPasswordForm = false;
              $scope.showPasswordChange = false;
            }
          };


          // $scope.openregisterForm = function() {
          //   // console.log("Clicked open");
          //   if (!($scope.showRegisterForm)) {
          //     $scope.loginWarning = "";
          //     $scope.showRegisterForm = true;
          //     $scope.showLoginForm = false;
          //     $scope.showPasswordForm = false;
          //     $scope.showPasswordChange = false;
          //   }
          // };

          $scope.closeregisterForm = function() {
            // console.log("Clicked close");
            if ($scope.showRegisterForm) {
              $scope.loginWarning = "";
              $scope.showRegisterForm = false;
              $scope.showPasswordForm = false;
              $scope.showPasswordChange = false;
            }
          };
};


    function SessionCartDirective () {
      return {
        templateUrl: 'src/template/session-cart.html'
      }
    };

    function SessionLoginDirective () {
      return {
        templateUrl: 'src/template/session-login.html'
      }
    };

    function SessionRegisterDirective () {
      return {
        templateUrl: 'src/template/session-register.html'
      }
    };

    function ForgottenPassordDirective () {
      return {
        templateUrl: 'src/template/forgotten-password.html'
      }
    };

})();
