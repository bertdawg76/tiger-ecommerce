'use strict';

angular.module('tigerApp')
    .directive('navbar', function () {
      return {
        templateUrl: 'navbar/navbar.html',
        restrict: 'E',
        controller: 'NavbarCtrl'
      };
    });