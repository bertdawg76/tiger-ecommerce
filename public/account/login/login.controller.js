'use strict';

angular.module('tigerApp')
    .controller('LoginCtrl', function(Auth, $location) {
      var vm = this;

      vm.pageHeader = {
        title: 'Sign in to Tiger Marketplace'
      };

      vm.credentials = {
        email : "",
        password : ""
      };

      vm.returnPage = $location.search().page || '/';

      vm.onSubmit = function () {
        vm.formError = "";
        if (!vm.credentials.email || !vm.credentials.password) {
          vm.formError = "All fields required, please try again";
          return false;
        } else {
          vm.doLogin();
        }
      };

      vm.doLogin = function() {
        vm.formError = "";
        Auth
            .login(vm.credentials)
            .error(function(err){
              vm.formError = err;
            })
            .then(function(){
              $location.search('page', null);
              $location.path(vm.returnPage);
            });
      };


    });