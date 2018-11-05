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
    $scope.showLoginForm = false;
console.log("cpCtrl: "+$scope);
console.log($stateParams);
    // ***************************************** //
    $scope.changePassword = function() {
        var userparams =
          {
            sl: $stateParams.selector,
            tk: $stateParams.token,
            ps: $scope.user.new_password
          };

      $http({
              method  : 'POST',
              url     : 'php/changepassword.php',
              data    : userparams,
              headers : { 'Content-Type': 'application/x-www-form-urlencoded'}
               })
            .then(function(response) {
                if (response.data.info[0].ConfirmationStatus) {
                  $scope.loginWarning = "";
                  $scope.loginWarningResend = response.data.info[0].ConfirmationStatus;
                  $scope.user = {};
                } else {
                  $scope.loginWarning = "";
                  $scope.loginWarningResend = response.data.info[0].ConfirmationStatus;
                }
                return response.data.info;
            });
          };

    // ***************************************** //


  }

})();
