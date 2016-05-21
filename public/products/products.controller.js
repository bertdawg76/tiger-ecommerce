'use strict';

angular.module('tigerApp')
    /*.controller('ProductsCtrl', function ($scope, Product) {
      $scope.products = Product.getProducts(data);
      console.log(data)
    })*/




.controller('ProductsCtrl', function(Product) {
    var vm = this;
    init();
    function init(){
      Product.getAllProducts().then(function(products){
        console.log(products);
        vm.items = products.data;
      })

      }
    })



    .controller('ProductViewCtrl', function ($stateParams, Product, $scope) {



      Product.getOneProduct($stateParams.id)
          .then(function (response) {
            console.log(response);
            $scope.product = response.data;

          })
    })



          .controller('ProductNewCtrl', function ($scope, $state, Product) {
            $scope.product = {}; // create a new instance
            $scope.addProduct = function (product) {
              Product.createProduct($scope.product);
              $state.go('products');
            }
          })

          .controller('ProductEditCtrl', function ($scope, $state, $stateParams, Product) {
            $scope.product = Product.get({id: $stateParams.id});

            $scope.editProduct = function (product) {
              Product.updateProduct($scope.product);
              $state.go('products');
            }
          })

    .constant('clientTokenPath', '/api/braintree/client_token')

    .controller('ProductCheckoutCtrl',
        function($scope, $http, $state, ngCart){
          $scope.errors = '';

          $scope.paymentOptions = {
            onPaymentMethodReceived: function(payload) {
              angular.merge(payload, ngCart.toObject());
              payload.total = payload.totalCost;
              $http.post('/api/orders', payload)
                  .then(function success () {
                    ngCart.empty(true);
                    $state.go('products');
                  }, function error (res) {
                    $scope.errors = res;
                  });
            }
          };
        });
