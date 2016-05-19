'use strict';

angular.module('tigerApp')
    .controller('NavbarCtrl', function ($scope, Auth, $state) {
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



    });