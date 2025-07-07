angular.module('workoutApp').service('AuthService', function ($q) {
  const validCredentials = {
    email: 'admin@workout.com',
    password: '123456'
  };

  this.login = function (credentials) {
    const deferred = $q.defer();
    setTimeout(() => {
      if (
        credentials.email === validCredentials.email &&
        credentials.password === validCredentials.password
      ) {
        deferred.resolve({
          success: true,
          user: { name: 'Admin', email: credentials.email }
        });
      } else {
        deferred.resolve({
          success: false,
          message: 'Email ou senha incorretos'
        });
      }
    }, 1000);
    return deferred.promise;
  };

  this.logout = function () {
    return true;
  };
});
