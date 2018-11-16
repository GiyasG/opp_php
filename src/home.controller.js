(function () {
  'use strict';

  angular.module('ShopApp')
  .controller('HomeController', HomeController)
  .directive('sessionCart', SessionCartDirective)
  .directive('sessionLogin', SessionLoginDirective)
  .directive('sessionLogout', SessionLogoutDirective)
  .directive('sessionRegister', SessionRegisterDirective)
  .directive('forgottenPassword', ForgottenPassordDirective);

  HomeController.$inject = ['$scope', '$http', 'isloggedin'];

    function HomeController($scope, $http, isloggedin) {

        var hCtrl = this;

        hCtrl.isloggedin = isloggedin;
        if (hCtrl.isloggedin[0].isIn === false) {
          $scope.showLogin = true;
          $scope.showRegister = true;
          if (isloggedin[1].items === null) {
            $scope.showCart = false;
          } else {
            $scope.showCart = true;
          }
          console.log("Logged out "+hCtrl.isloggedin[1].items);
        } else {
          $scope.showLogin = false;
          $scope.showRegister = false;
          if (isloggedin[1].items === null) {
            $scope.showCart = false;
          } else {
            $scope.showCart = true;
          }
          console.log("Logged in "+hCtrl.isloggedin[0]);
        }

        $scope.rms = [
                      {rmid: 1, rmName: 'Remember (keep logged in)? — No'},
                      {rmid: 2, rmName: 'Remember (keep logged in)? — Yes'}
                    ];
        $scope.showLoginForm = false;
        $scope.user = {};
        $scope.loginWarning = "";


        $scope.showRegisterForm = false;
        $scope.ems = [
                        {emid: 1, emName: 'Require email confirmation? — No'},
                        {emid: 2, emName: 'Require email confirmation? — Yes'}
                    ];
                    // console.log($scope.ems);

        $scope.showPasswordForm = false;

// *** Console Logs ***************************** //
        // console.log("Is logged in: "+hCtrl.isloggedin);
        // console.log("Show login: "+$scope.showLogin);
        // console.log("Show login form: "+$scope.showLoginForm);

        // ***************************************** //
        $scope.showForgottenPassword = function(ev) {
          ev.preventDefault();
          console.log("Hello");
          $scope.showPasswordForm = true;
          $scope.loginWarning = "";
        };
      // ***************************************** //
      var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
      var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

      $scope.passwordStrength = {
          "color": "grey",
          "margin-left": "5px",
          "margin-top": "5px",
          "font-size": "0.9em"
      };
      $scope.disabledRegister = true;
      $scope.passwordRegister = "Use at least one an uppercase letter, a number and a special character";

      $scope.analyze = function(value) {
        if (value) {
          if(strongRegex.test(value) & value.length >= 8) {
            console.log(value.length);
            $scope.passwordStrength["color"] = "green";
            $scope.disabledRegister = false;
            $scope.passwordRegister = "Strong password";
          } else if(mediumRegex.test(value) & value.length >= 8) {
            console.log(value.length);
            $scope.passwordStrength["color"] = "orange";
            $scope.disabledRegister = false;
            $scope.passwordRegister = "Fair password";
          } else {
            console.log(value.length);
            $scope.passwordStrength["color"] = "red";
            $scope.disabledRegister = true;
            $scope.passwordRegister = "Not valid password, Use at least one an uppercase letter, a number and a special character";
          }
        } else {
          $scope.passwordStrength["color"] = "grey";
          $scope.passwordRegister = "Use at least one an uppercase letter, a number and a special character";
        }
      };
  // ***************************************** //


$scope.changepassConfirmation = function () {
var regem = ($scope.user.resend_email).replace(new RegExp('[.]', 'g'), '-dot-');
console.log(regem);
var userparams =
  {
    em: regem
  };

$http({
      method  : 'POST',
      url     : 'php/requestforpassword.php',
      data    : userparams,
      headers : { 'Content-Type': 'application/x-www-form-urlencoded'}
       })
    .then(function(response) {
        if (response.data.info[0].ConfirmationStatus) {
          $scope.showRegister = false;
          $scope.loginWarning = response.data.info[0].ConfirmationStatus;
          $scope.resend_email = "";
          $scope.showPasswordForm = false;
        } else {
          $scope.showLogin = true;
          $scope.loginWarning = response.data.info[0].ConfirmationStatus;
        }
        return response.data.info;
    });
  };

// ***************************************** //

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
                  if (response.data.isloggedin[0].isIn === false) {
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
    console.log($scope.ems.emid);
    var userparams =
      {
        em: regem,
        ps: regps,
        un: regun,
        rm: $scope.ems.emid
      };

      console.log(userparams);

  $http({
          method  : 'POST',
          url     : 'php/registersubmit.php',
          data    : userparams,
          headers : { 'Content-Type': 'application/x-www-form-urlencoded'}
           })
        .then(function(response) {
            if (response.data.sitems) {
              if (response.data.sitems[0].Info) {
                $scope.showRegister = false;
                $scope.loginWarning = response.data.sitems[0].Info;
                $scope.user = {};
                $scope.passwordStrength["color"] = "grey";
                $scope.passwordRegister = "Use at least one an uppercase letter, a number and a special character";
              } else if (response.data.sitems[0].Error) {
                $scope.showLogin = true;
                $scope.loginWarning = response.data.sitems[0].Error;
                console.log($scope.loginWarning);
              }
            }
            return response.data.sitems;
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


          $scope.openregisterForm = function() {
            // console.log("Clicked open");
            if (!($scope.showRegisterForm)) {
              $scope.loginWarning = "";
              $scope.showRegisterForm = true;
              $scope.showLoginForm = false;
              $scope.showPasswordForm = false;
              $scope.showPasswordChange = false;
            }
          };

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

    function ForgottenPassordDirective () {
      return {
        templateUrl: 'src/template/forgotten-password.html'
      }
    };

})();
