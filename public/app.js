

angular.module('tigerApp', ['ui.router', 'btford.socket-io', 'angular-filepicker', 'ngCart', 'braintree-angular']);

angular.module('tigerApp').config(function($urlRouterProvider, $stateProvider, filepickerProvider) {

  filepickerProvider.setKey('AoHr3MTuJSKSvxEwnAxvEz');
  $urlRouterProvider.otherwise('/');
  $stateProvider

      .state('login', {
        url: '/login',
        templateUrl: 'account/login/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'vm'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'account/signup/signup.html',
        controller: 'SignupCtrl',
        controllerAs: 'vm'
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      })
      .state('admin', {
        url: '/admin',
        templateUrl: 'admin/admin.html',
        controller: 'adminCtrl',
        controllerAs: 'admin'
      })
      .state('main', {
        url: '/',
        templateUrl: 'Main/main.html',
        controller: 'MainCtrl'
      })
      .state('products', {
        url: '/products',
        templateUrl: 'products/templates/product-list.html',
        controller: 'ProductsCtrl',
        controllerAs: 'display'
      })
      .state('newProduct', {
        url: '/products/new',
        templateUrl: 'products/templates/product-new.html',
        controller: 'ProductNewCtrl'
      })
      .state('viewProduct', {
        url: '/products/:id',
        templateUrl: 'products/templates/product-view.html',
        controller: 'ProductViewCtrl',
        controllerAs: 'view'
      })
      .state('editProduct', {
        url: '/products/:id/edit',
        templateUrl: 'products/templates/product-edit.html',
        controller: 'ProductEditCtrl'
      })
      .state('checkout', {
        url: '/checkout',
        templateUrl: 'products/templates/product-checkout.html',
        controller: 'ProductCheckoutCtrl'
      });


});

angular.module('tigerApp').run(function($rootScope, $state, Auth){
  $rootScope.$on('$stateChangeStart', function(event, next){
    if(next.authenticate){
      Auth.isLoggedIn(function(loggedIn){
        if(!loggedIn){
          event.preventDefault();
          $state.go('login');
        }
      })
    }
  })
});





