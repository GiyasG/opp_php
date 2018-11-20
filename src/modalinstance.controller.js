(function () {
  'use strict';

  angular.module('ShopApp')
  .controller('ModalInstanceController', ModalInstanceController);

  ModalInstanceController.$inject = ['$uibModalInstance', 'data', '$scope'];
  function ModalInstanceController($uibModalInstance, data, $scope) {
    var hCtrl = this;
        hCtrl.data = data;

        $scope.rms = [
                      {rmid: 1, rmName: 'Remember (keep logged in)? — No'},
                      {rmid: 2, rmName: 'Remember (keep logged in)? — Yes'}
                    ];

        hCtrl.ok = function () {
        //{...}
        alert("You clicked the ok button.");
        $uibModalInstance.close();
      };

        hCtrl.cancel = function () {
        //{...}
        alert("You clicked the cancel button.");
        $uibModalInstance.dismiss('cancel');
      };
  }

})();
