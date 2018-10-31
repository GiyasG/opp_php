<!doctype html>
<html lang="en" ng-app="ShopApp">
<head>
<meta charset="utf-8">
<title>Items view</title>

<link rel="stylesheet" href="css/bootstrap.min.css">
<link rel="stylesheet" href="css/main.css">

<script src="lib/angular.min.js"></script>
<script src="lib/angular-ui-router.min.js"></script>
<!-- <script src="lib/angular-route.min.js"></script> -->

<script src="lib/jquery.min.js"></script>

<script src="src/shopapp.module.js"></script>
<script src="src/data.module.js"></script>


<script src="src/shopdata.service.js"></script>

<script src="src/home.controller.js"></script>

<script src="src/items.component.js"></script>
<script src="src/items.controller.js"></script>

<script src="src/cart.component.js"></script>
<script src="src/cart.controller.js"></script>

<script src="src/checkout.component.js"></script>
<script src="src/checkout.controller.js"></script>

<script src="src/verify.component.js"></script>
<script src="src/verify.controller.js"></script>

<script src="src/routes.js"></script>

</head>
<body>

<div ui-view class="container">
  <div ui-view="content"></div>
  <div ui-view="basket"></div>
</div>


</body>
</html>
