angular.module('workoutApp').service('WorkoutService', function ($http, $q) {
  const API_URL = 'http://localhost:3000/workouts';

  this.getWorkouts = function () {
    return $http.get(API_URL).then(res => res.data);
  };

  this.createWorkout = function (workout) {
    workout.created_at = new Date().toISOString();
    return $http.post(API_URL, workout).then(res => res.data);
  };

  this.updateWorkout = function (workout) {
    return $http.put(`${API_URL}/${workout.id}`, workout).then(res => res.data);
  };

  this.deleteWorkout = function (id) {
    return $http.delete(`${API_URL}/${id}`).then(res => res.data);
  };
});
