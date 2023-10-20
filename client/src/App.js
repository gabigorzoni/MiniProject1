import { useState } from 'react';
import ExerciseList from './ExercisesList';
import FunctionalComponent from './FunctionalComponent';
import PropsAndState from './PropsAndState';
import './App.css';

const App = () => {
  const [exercises, setExercises] = useState([]);

  return (
    <div class="mainDiv">
      <h1 class="title">Exercise List</h1>
      <ExerciseList exercises={exercises} />
      <FunctionalComponent setExercises={setExercises}/>
      <PropsAndState />
    </div>
  );
};

export default App;
