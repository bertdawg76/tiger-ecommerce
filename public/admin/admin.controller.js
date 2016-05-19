angular.module('tigerApp').controller('adminCtrl', function($scope, $stateParams, Product, filepickerService) {

  var vm = this;
  vm.items = [];
  $scope.product = {};


  init();
  function init() {
    Product.getAllProducts().then(function (response) {
      console.log(response);
      vm.items = response.data;

    });

  }


  $scope.createItem = function (product) {
    console.log($scope.product);
    Product.createProduct($scope.product).then(function (response) {
      console.log(response);
      init();
    });

  };

  $scope.removeItem = function (id) {
    console.log(id);
    Product.deleteProduct(id).then(function (response) {
      console.log(response);
      init()
    })
  };

  $scope.updateProduct = function (id, product) {
    console.log(id, product);
    Product.updateProduct(id, product).then(function (response) {
      console.log(response);
      $scope.oneProduct = '';
      $scope.editStuff = false;
      init()
    })
  };

  $scope.editProduct = function (id) {
    console.log(id);
    $scope.editStuff = true;
    Product.getOneProduct(id).then(function (response) {
      console.log(response);
      $scope.oneProduct = response.data.data;
    });
  };

  $scope.upload = function(){
    filepickerService.pick(
        {
          mimetype: 'image/*',
          language: 'en',
          services: ['COMPUTER','DROPBOX','GOOGLE_DRIVE','IMAGE_SEARCH', 'FACEBOOK', 'INSTAGRAM'],
          openTo: 'IMAGE_SEARCH'
        },
        function(Blob){
          console.log(JSON.stringify(Blob));
          $scope.product.picture = Blob;
          $scope.$apply();
        }
    );
  };
  //Multiple files upload set to 3 as max number
  $scope.uploadMultiple = function(){
    filepickerService.pickMultiple(
        {
          mimetype: 'image/*',
          language: 'en',
          maxFiles: 3,
          services: ['COMPUTER','DROPBOX','GOOGLE_DRIVE','IMAGE_SEARCH', 'FACEBOOK', 'INSTAGRAM'],
          openTo: 'IMAGE_SEARCH'
        },
        function(Blob){
          console.log(JSON.stringify(Blob));
          $scope.product.morePictures = Blob;
          $scope.$apply();
        }
    );
  };

  /*$scope.uploadFiles = function(file, errFiles) {
    $scope.f = file;
    $scope.errFile = errFiles && errFiles[0];
    if (file) {
      file.upload = Upload.upload({
        url: '/api/Products/' + $scope.product._id + '/upload',
        data: {file: file}
      });

      file.upload.then(function (response) {
        $timeout(function () {
          file.result = response.data;
        });
      }, function (response) {
        if (response.status > 0)
          $scope.errorMsg = response.status + ': ' + response.data;
      }, function (evt) {
        file.progress = Math.min(100, parseInt(100.0 *
            evt.loaded / evt.total));
      });
    }
  }*/


});