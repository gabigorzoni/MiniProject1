import React from 'react';
import { useEffect } from 'react';
import './App.css';

// A functional component
function Button({setExercises}) {
  const fetchExercises = async () => {
    console.log("fetchExercises");
    try {
      const response = await fetch('/api/exercises');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(setExercises);
      setExercises(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleRefresh = () => {
    console.log("handleRefresh");
    fetchExercises();
  };

  useEffect(() => {
    fetchExercises();
  }, []);


  return (
    <div class="divButton">
      <button onClick={handleRefresh} class="button">Refresh</button>
    </div>
  );
}

export default Button;