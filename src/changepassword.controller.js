(function () {
  'use strict';

  angular.module('ShopApp')
  .controller('ChangepasswordController', ChangepasswordController);

  ChangepasswordController.$inject = ['$scope', '$http', '$stateParams', 'info'];
  function ChangepasswordController($scope, $http, $stateParams, info) {
    var cpCtrl = this;
    cpCtrl.info = info;
    $scope.user = {};
    $scope.loginWarningResend = "";
console.log("cpCtrl: "+$scope);
console.log($stateParams);
    // ***************************************** //
    $scope.changePassword = function() {
        var regem = ($scope.user.resend_email).replace(new RegExp('[.]', 'g'), '-dot-');
        console.log(regem);
        var userparams =
          {
            em: regem
          };

      $http({
              method  : 'POST',
              url     : 'php/resendconfirmation.php',
              data    : userparams,
              headers : { 'Content-Type': 'application/x-www-form-urlencoded'}
               })
            .then(function(response) {
                if (response.data.info[0].ConfirmationStatus) {
                  $scope.showRegister = false;
                  // $scope.showRegisterForm = false;
                  $scope.loginWarning = "";
                  $scope.loginWarningResend = response.data.info[0].ConfirmationStatus;
                  $scope.resend_email = "";
                } else {
                  $scope.showLogin = true;
                  $scope.loginWarning = "";
                  $scope.loginWarningResend = response.data.info[0].ConfirmationStatus;
                }
                return response.data.info;
            });
          };

    // ***************************************** //


  }

})();
