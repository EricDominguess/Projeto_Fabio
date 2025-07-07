angular.module('workoutApp').controller('WorkoutController', function ($scope, $rootScope, WorkoutService) {
  $scope.workouts = [];
  $scope.currentWorkout = {};
  $scope.showAddForm = false;
  $scope.editingWorkout = false;
  $scope.message = null;

  $scope.loadWorkouts = function () {
    WorkoutService.getWorkouts().then(function (workouts) {
      $scope.workouts = workouts;
    });
  };

  $scope.loadWorkouts();

  $scope.saveWorkout = function () {
    if ($scope.editingWorkout) {
      WorkoutService.updateWorkout($scope.currentWorkout).then(function () {
        $scope.showMessage('Treino atualizado com sucesso!', 'success');
        $scope.loadWorkouts();
        $scope.cancelEdit();
      });
    } else {
      WorkoutService.createWorkout($scope.currentWorkout).then(function () {
        $scope.showMessage('Treino adicionado com sucesso!', 'success');
        $scope.loadWorkouts();
        $scope.cancelEdit();
      });
    }
  };

  $scope.editWorkout = function (workout) {
    $scope.currentWorkout = angular.copy(workout);
    $scope.editingWorkout = true;
    $scope.showAddForm = false;
  };

  $scope.deleteWorkout = function (workoutId) {
    if (confirm('Tem certeza que deseja excluir este treino?')) {
      WorkoutService.deleteWorkout(workoutId).then(function () {
        $scope.showMessage('Treino removido com sucesso!', 'success');
        $scope.loadWorkouts();
      });
    }
  };

  $scope.updateStatus = function (workout, newStatus) {
    workout.status = newStatus;
    WorkoutService.updateWorkout(workout).then(function () {
      $scope.showMessage('Status atualizado!', 'success');
      $scope.loadWorkouts();
    });
  };

  $scope.cancelEdit = function () {
    $scope.currentWorkout = {};
    $scope.editingWorkout = false;
    $scope.showAddForm = false;
  };

  $scope.getWorkoutsByStatus = function (status) {
    return $scope.workouts.filter(workout => workout.status === status);
  };

  $scope.getStatusLabel = function (status) {
    const labels = {
      'agendado': 'Agendado',
      'em_andamento': 'Em Andamento',
      'concluido': 'Concluído'
    };
    return labels[status] || status;
  };

  $scope.showMessage = function (text, type) {
    $scope.message = { text: text, type: type };
    setTimeout(() => {
      $scope.$apply(() => {
        $scope.message = null;
      });
    }, 3000);
  };

  $scope.logout = function () {
    $rootScope.isAuthenticated = false;
    $rootScope.currentUser = null;
  };
});
