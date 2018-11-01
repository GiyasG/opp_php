(function () {
  'use strict';

  angular.module('ShopApp')
  .controller('HomeController', HomeController)
  .directive('sessionLogin', SessionLoginDirective)
  .directive('sessionLogout', SessionLogoutDirective)
  .directive('sessionRegister', SessionRegisterDirective);

  HomeController.$inject = ['$scope', '$http', 'isloggedin'];

    function HomeController($scope, $http, isloggedin) {

        var hCtrl = this;

        hCtrl.isloggedin = isloggedin;
        if (hCtrl.isloggedin === false) {
          $scope.showLogin = true;
          $scope.showRegister = true;
          console.log("Logged out");
        } else {
          $scope.showLogin = false;
          $scope.showRegister = false;
          console.log("Logged in");
        }

        $scope.rms = [
                      {rmid: 1, rmName: 'Remember (keep logged in)? — No'},
                      {rmid: 2, rmName: 'Remember (keep logged in)? — Yes'},
                    ];
        $scope.showLoginForm = false;
        $scope.user = {};
        $scope.loginWarning = "";


        $scope.showRegisterForm = false;
        $scope.ems = [
                      {emid: 1, emName: 'Require email confirmation? — No'},
                      {emid: 2, emName: 'Require email confirmation? — Yes'},
                    ];

// *** Console Logs ***************************** //
        console.log("Is logged in: "+hCtrl.isloggedin);
        console.log("Show login: "+$scope.showLogin);
        console.log("Show login form: "+$scope.showLoginForm);
        console.log("sitems: "+hCtrl.sitems);

        // ***************************************** //
        $scope.forgottenPassword = function(ev) {
          ev.preventDefault();
          console.log("Hello there");
        };

// ***************************************** //
        $scope.logoutForm = function() {
          var userparams = "logOut";
          $http({
                  method  : 'POST',
                  url     : 'php/logoutsubmit.php',
                  data    : userparams,
                  headers : { 'Content-Type': 'application/x-www-form-urlencoded'},
                   })
                .then(function(response) {
                  if (response.data.isloggedin === false) {
                    $scope.showLogin = true;
                  }
                    return response.data;
                  });
        };

// ***************************************** //
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
                  $scope.loginWarning = response.data.sitems[0].Error;
                  console.log($scope.loginWarning);
                }
                return response.data.sitems;
            });
          };
// ***************************************** //
$scope.registerForm = function() {
    var regem = ($scope.user.em).replace(new RegExp('[.]', 'g'), '-dot-');
    if ($scope.user.ps) {
    var regps = ($scope.user.ps).replace(new RegExp('[.]', 'g'), '-dot-').replace(new RegExp('\\[', 'g'), '-sqbl-');
    }
    if ($scope.user.un) {
    var regun = ($scope.user.un).replace(new RegExp('[.]', 'g'), '-dot-').replace(new RegExp('\\[', 'g'), '-sqbl-');
    }
    // console.log($scope.rms[0].rmid);
    var userparams =
      {
        em: regem,
        ps: regps,
        un: regun,
        rm: $scope.ems[0].emid
      };

      console.log(userparams);

  $http({
          method  : 'POST',
          url     : 'php/registersubmit.php',
          data    : userparams,
          headers : { 'Content-Type': 'application/x-www-form-urlencoded'}
           })
        .then(function(response) {
            if (response.data.sitems[0].Info) {
              $scope.showRegister = false;
              // $scope.showRegisterForm = false;
              $scope.loginWarning = response.data.sitems[0].Info;
              $scope.user = {};
            } else {
              $scope.showLogin = true;
              $scope.loginWarning = response.data.sitems[0].Error;
              console.log($scope.loginWarning);
            }
            return response.data.sitems;
        });
      };

// ***************************************** //
          $scope.openloginForm = function() {
            // console.log("Clicked open");
            if (!($scope.showLoginForm)) {
              $scope.loginWarning = "";
              $scope.showLoginForm = true;
              $scope.showRegisterForm = false;
            }
          };

          $scope.closeloginForm = function() {
            // console.log("Clicked close");
            if ($scope.showLoginForm) {
              $scope.loginWarning = "";
              $scope.showLoginForm = false;
            }
          };


          $scope.openregisterForm = function() {
            // console.log("Clicked open");
            if (!($scope.showRegisterForm)) {
              $scope.loginWarning = "";
              $scope.showRegisterForm = true;
              $scope.showLoginForm = false;
            }
          };

          $scope.closeregisterForm = function() {
            // console.log("Clicked close");
            if ($scope.showRegisterForm) {
              $scope.loginWarning = "";
              $scope.showRegisterForm = false;
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

    function SessionRegisterDirective () {
      return {
        templateUrl: 'src/template/session-register.html'
      }
    };

})();
