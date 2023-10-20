import React from 'react';
import './App.css';

function ExercisesList ({exercises}){
  return (
    <div class="exercisesList">
      <ul>
        {exercises.map(exercise => (
          <li key={exercise.id}>{exercise.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ExercisesList;
