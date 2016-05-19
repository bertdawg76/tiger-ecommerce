'use strict';

angular.module('tigerApp')
    .controller('SignupCtrl', function($location, Auth) {
      var vm = this;
      vm.pageHeader = {
        title: 'Create a new Tiger Marketplace account'
      };

      vm.credentials = {
        name : "",
        email : "",
        password : ""
      };

      vm.returnPage = $location.search().page || '/';

      vm.onSubmit = function (){
        vm.formError = "";
        Auth.register(vm.credentials)
            .error(function(err){
              vm.formError = err;
            })
            .then(function(){
              $location.search('page', null);
              $location.path(vm.returnPage);
            });
      }

    });
