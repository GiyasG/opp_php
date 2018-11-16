(function () {
  'use strict';

  angular.module('ShopApp')
  .controller('ItemsController', ItemsController);

  ItemsController.$inject = ['items'];

  function ItemsController(items) {
    var itemsCtrl = this;
    itemsCtrl.items = items;
    console.log("iCtrl: "+itemsCtrl.items[0].all[0]);

    itemsCtrl.sz = "";

    console.log(itemsCtrl.items);

  // itemsCtrl.isClicked = function($index){
  //       console.log($index);
  //       var color = itemsCtrl.items[0].all[$index].clicked ? 'red' : 'blue';
  //       return {color:color};
  //   }

  itemsCtrl.selectAllQuantities = function (sizeId, item_id, arr_ind) {

    itemsCtrl.sizeClicked = sizeId+arr_ind;
    console.log(itemsCtrl.sizeClicked);

      var qty = itemsCtrl.items[0].all[arr_ind][sizeId];
      // console.log("gty: "+((itemsCtrl.items[0].all[0])[arr_ind][sizeId]));
      var x = sizeId.substring(3,1);
      itemsCtrl.sz = x;
      console.log(itemsCtrl.sz);

      itemsCtrl.selectQuantities = [];
            itemsCtrl.selectQuantities.push({id1: arr_ind, id2: item_id, size: x, qtt: qty});
      itemsCtrl.oneSizeQuantities = [];
            for (var i = 0; i < qty; i++) {
              itemsCtrl.oneSizeQuantities.push({ind: arr_ind, size: i+1});
            }
      };

   itemsCtrl.changeQuantity = function(quantity) {
     console.log(quantity.size);
     itemsCtrl.itemSelected = [];
     itemsCtrl.itemSelected.push(quantity.size);
    };

    itemsCtrl.selectSizes = [
      {id: 'i39all', name: '39'}, {id: 'i40all', name: '40'}, {id: 'i41all', name: '41'}, {id: 'i42all', name: '42'},
      {id: 'i43all', name: '43'}, {id: 'i44all', name: '44'}, {id: 'i45all', name: '45'}
    ];

  }

})();
