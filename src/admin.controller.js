(function () {
  'use strict';

  angular.module('ShopApp')
  .controller('AdminController', AdminController)
  .directive('adminAdd', AdminAddDirective)
  .directive('adminUpdate', AdminUpdateDirective);


  AdminController.$inject = ['$scope', '$http', 'Upload', 'items'];

    function AdminController($scope, $http, Upload, items) {

        var aCtrl = this;
        aCtrl.items = items;
        $scope.updateIndex = null;
        $scope.AddNewRecord = false;

        //**************** Data for Dbase Upload ********************//
          $scope.itemU = {};
          $scope.fElements = {};
          $scope.fElements.sizes =
          {
            "i39" : {"all": "0", "reserved": "0", "forsale": "0", "sold": "0"},
            "i40" : {"all": "0", "reserved": "0", "forsale": "0", "sold": "0"},
            "i41" : {"all": "0", "reserved": "0", "forsale": "0", "sold": "0"},
            "i42" : {"all": "0", "reserved": "0", "forsale": "0", "sold": "0"},
            "i43" : {"all": "0", "reserved": "0", "forsale": "0", "sold": "0"},
            "i44" : {"all": "0", "reserved": "0", "forsale": "0", "sold": "0"},
            "i45" : {"all": "0", "reserved": "0", "forsale": "0", "sold": "0"},
          };
          console.log($scope.fElements.sizes);
        //**********************************************************//
        //**************** File Upload *********************//
        $scope.onFileSelect = function(file) {

          console.log(file);
            $scope.message = "";
                $scope.upload = Upload.upload({
                    url: 'php/upload.php',
                    method: 'POST',
                    file: file,
                    data: {
                              'item': $scope.fElements
                          }
                }).success(function(data, status, headers, config) {
                    $scope.message = data;
                    console.log($scope.message);
                }).error(function(data, status) {
                    $scope.message = data;
                });
        };

        //************************************************//
        $scope.hasRoleAdmin = true;
        //********************************************//
        $scope.DeleteItem = function(id) {
            console.log("id is: "+id);
          $http({
                method  : 'POST',
                url     : 'php/DeleteItem.php',
                data    : {id: id},
                headers : { 'Content-Type': 'application/x-www-form-urlencoded'}
                 })
              .then(function(response) {
                  console.log(response.data.info);
                  return response.data.info;
              });
        };

        $scope.UpdateItem = function (id, sid) {
          $http({
                method  : 'POST',
                url     : 'php/getUpdateItem.php',
                data    : {id: id},
                headers : { 'Content-Type': 'application/x-www-form-urlencoded'}
                 })
              .then(function(response) {
                  $scope.itemU = response.data.item[0];
                  console.log($scope.itemU);
                  return response.data.item;
              });

          $scope.updateIndex = sid;

          //**************** File Update *********************//
          $scope.onFileUpdate = function(file) {

            console.log(file);
              $scope.message = "";
                  $scope.upload = Upload.upload({
                      url: 'php/update.php',
                      method: 'POST',
                      file: file,
                      data: {
                                'item': $scope.itemU
                            }
                  }).success(function(data, status, headers, config) {
                      $scope.message = data;
                      $scope.updateIndex = null;
                      console.log($scope.message);
                  }).error(function(data, status) {
                      $scope.message = data;
                  });
          };

          //************************************************//



        }

        $scope.AddItem = function() {
          $scope.AddNewRecord = true;
        }

        $scope.CloseAdd = function() {
          $scope.AddNewRecord = false;
        }

        $scope.CancelUpdate = function() {
          $scope.updateIndex = null;
        }
    };

    function AdminAddDirective () {
      return {
        templateUrl: 'src/template/admin-add.html'
        }
      }

    function AdminUpdateDirective () {
      return {
        templateUrl: 'src/template/admin-update.html'
                }
      }


})();
