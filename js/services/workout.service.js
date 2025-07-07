angular.module('workoutApp').service('WorkoutService', function ($q) {
  let workouts = [
    {
      id: 1,
      title: 'Treino de Peito e Tríceps',
      type: 'forca',
      description: 'Supino reto, supino inclinado, paralelas, tríceps testa',
      duration: 90,
      intensity: 'alta',
      status: 'concluido',
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      title: 'Corrida Matinal',
      type: 'cardio',
      description: 'Corrida leve no parque',
      duration: 30,
      intensity: 'media',
      status: 'agendado',
      created_at: new Date().toISOString()
    }
  ];

  let nextId = 3;

  this.getWorkouts = function () {
    const deferred = $q.defer();
    setTimeout(() => deferred.resolve(angular.copy(workouts)), 500);
    return deferred.promise;
  };

  this.createWorkout = function (workout) {
    const deferred = $q.defer();
    setTimeout(() => {
      workout.id = nextId++;
      workout.created_at = new Date().toISOString();
      workouts.push(workout);
      deferred.resolve({ success: true, workout });
    }, 500);
    return deferred.promise;
  };

  this.updateWorkout = function (workout) {
    const deferred = $q.defer();
    setTimeout(() => {
      const index = workouts.findIndex(w => w.id === workout.id);
      if (index !== -1) {
        workouts[index] = angular.copy(workout);
        deferred.resolve({ success: true });
      } else {
        deferred.reject({ success: false, message: 'Treino não encontrado' });
      }
    }, 500);
    return deferred.promise;
  };

  this.deleteWorkout = function (id) {
    const deferred = $q.defer();
    setTimeout(() => {
      const index = workouts.findIndex(w => w.id === id);
      if (index !== -1) {
        workouts.splice(index, 1);
        deferred.resolve({ success: true });
      } else {
        deferred.reject({ success: false, message: 'Treino não encontrado' });
      }
    }, 500);
    return deferred.promise;
  };
});
