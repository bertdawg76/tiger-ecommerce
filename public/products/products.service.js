
angular.module('tigerApp').factory('Product', function($http, $stateParams, Auth){

  var products = {};

  products.getAllProducts = function(){
    return $http.get('/api/Products').success(function(response){
      console.log(response);
      return response.data;
    })
  };

  products.getOneProduct = function(id){
    return $http.get('/api/Products/' + id, {headers: {Authorization: 'Bearer ' + Auth.getToken()}}).success(function(response){
      console.log(response);
      return response.data;
    })
  };



  products.createProduct = function(product){
    return $http.post('/api/Products', product, {headers: {Authorization: 'Bearer ' + Auth.getToken()}}).success(function(data){
      return data;
    })
  };

  products.updateProduct = function(product){
    console.log(product);
    return $http.put('/api/Products/' + product._id, product, {headers: {Authorization: 'Bearer ' + Auth.getToken()}}).success(function(data){
      return data;
    })
  };

  products.deleteProduct = function(id){
    console.log(id);
    return $http.delete('api/Products/' + id, {headers: {Authorization: 'Bearer ' + Auth.getToken()}}).success(function(data){
      return data;
    })
  };

  return products;



});