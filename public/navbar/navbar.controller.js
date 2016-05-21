'use strict';

angular.module('tigerApp')
    .controller('NavbarCtrl', function ($scope, Auth, $rootScope, $state, $window, $timeout) {
      $scope.menu = [{
        'title': 'Home',
        'state': 'main'
      },
        {
        'title': 'Products',
        'state': 'products'
      }

      ];

      $scope.isCollapsed = true;
      $scope.isLoggedIn = Auth.isLoggedIn;
      $scope.isAdmin = Auth.isAdmin;
      $scope.currentUser = Auth.currentUser;
      //$scope.logOut = Auth.logOut;
      $scope.logOut = function() {
        Auth.logOut();
        $state.go('main');
      };

      $scope.search = function () {
        $rootScope.$broadcast('search:term', $scope.serchTerm);
      };

      $scope.redirect = function (){
        $state.go('products');
        $timeout(function(){
          var searchBox = $window.document.getElementById('searchBox');
          if(searchBox){ searchBox.focus(); }
        })
      }



    });