angular.module('workoutApp').controller('AuthController', function ($scope, $rootScope, AuthService) {
  $scope.credentials = {
    email: '',
    password: ''
  };
  $scope.loginError = '';

  $scope.login = function () {
    AuthService.login($scope.credentials).then(function (response) {
      if (response.success) {
        $rootScope.isAuthenticated = true;
        $rootScope.currentUser = response.user;
        $scope.loginError = '';
      } else {
        $scope.loginError = response.message;
      }
    });
  };

  $scope.logout = function () {
    AuthService.logout();
    $rootScope.isAuthenticated = false;
    $rootScope.currentUser = null;
  };
});
