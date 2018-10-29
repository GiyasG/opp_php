(function () {
  'use strict';

  angular.module('ShopApp')
  .controller('HomeController', HomeController)
  .directive('sessionLogin', SessionLoginDirective)
  .directive('sessionLogout', SessionLogoutDirective);

  HomeController.$inject = ['$scope', '$http', 'isloggedin'];

    function HomeController($scope, $http, isloggedin) {

        var hCtrl = this;

        hCtrl.isloggedin = isloggedin;

        if (hCtrl.isloggedin === false) {
          $scope.showLogin = true;
          console.log("Logged out");
        } else {
          $scope.showLogin = false;
          console.log("Logged in");
        }

        $scope.rms = [
                      {rmid: 1, rmName: 'Remember (keep logged in)? — No'},
                      {rmid: 2, rmName: 'Remember (keep logged in)? — Yes'},
                    ];
        $scope.showLoginForm = false;
        $scope.user = {};

        console.log("Is logged in: "+hCtrl.isloggedin);
        console.log("Show login: "+$scope.showLogin);
        console.log("Show login form: "+$scope.showLoginForm);

        $scope.logoutForm = function() {
          var userparams = "logOut";
          $http({
                  method  : 'POST',
                  url     : 'php/logoutsubmit.php',
                  data    : userparams,
                  headers : { 'Content-Type': 'application/x-www-form-urlencoded'},
                   })
                .then(function(response) {
                  if (response.data == "Logged out") {
                    $scope.showLogin = true;
                  }
                    return response.data;
                  });
        };

    $scope.loginForm = function() {
        var regem = ($scope.user.em).replace(new RegExp('[.]', 'g'), '-dot-');
        if ($scope.user.ps) {
        var regps = ($scope.user.ps).replace(new RegExp('[.]', 'g'), '-dot-').replace(new RegExp('\\[', 'g'), '-sqbl-');
        }
        // console.log($scope.rms[0].rmid);
        var userparams =
          {
            em: regem,
            ps: regps,
            rm: $scope.rms[0].rmid
          };

          console.log(userparams);

      $http({
              method  : 'POST',
              url     : 'php/loginsubmit.php',
              data    : userparams,
              headers : { 'Content-Type': 'application/x-www-form-urlencoded'}
               })
            .then(function(response) {
                if (response.data.sitems[0].isLoggedIn === "1") {
                  $scope.showLogin = false;
                  $scope.showLoginForm = false;
                  $scope.user = {};
                } else {
                  $scope.showLogin = true;
                }
                return response.data.sitems;
            });
          };
          $scope.openloginForm = function() {
            console.log("Clicked open");
            if (!($scope.showLoginForm)) {
              $scope.showLoginForm = true;
            }
          };

          $scope.closeloginForm = function() {
            console.log("Clicked close");
            if ($scope.showLoginForm) {
              $scope.showLoginForm = false;
            }
          };
};


    function SessionLoginDirective () {
      return {
        templateUrl: 'src/template/session-login.html'
      }
    };

    function SessionLogoutDirective () {
      return {
        templateUrl: 'src/template/session-logout.html'
      }
    };

})();
