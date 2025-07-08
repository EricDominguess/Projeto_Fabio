angular.module('workoutApp').controller('AuthController', function ($scope, $rootScope, AuthService) {
  $scope.credentials = {
    email: '',
    password: ''
  };
  $scope.loginError = '';

  // Carregar sessão ao iniciar
  const storedUser = localStorage.getItem('currentUser');
  if (storedUser) {
    $rootScope.isAuthenticated = true;
    $rootScope.currentUser = JSON.parse(storedUser);
  }

  $scope.login = function () {
    AuthService.login($scope.credentials).then(function (response) {
      if (response.success) {
        $rootScope.isAuthenticated = true;
        $rootScope.currentUser = response.user;
        localStorage.setItem('currentUser', JSON.stringify(response.user)); // << SALVA A SESSÃO
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
    localStorage.removeItem('currentUser'); // << LIMPA A SESSÃO
  };
});
