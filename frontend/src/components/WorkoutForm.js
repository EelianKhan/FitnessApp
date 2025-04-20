import React, { useEffect, useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

function WorkoutForm() {
    const {dispatch} = useWorkoutsContext();

    const [title,setTitle] = useState('')
    const [reps,setReps] = useState('')
    const [load,setLoad] = useState('')
    const [error,setError] = useState(null)
    const [emptyFields,setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const workout = {title,load,reps}

        const response = await fetch('/api/workouts', {
            method : 'post',
            body: JSON.stringify(workout),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const json = await response.json();

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            setTitle('')
            setLoad('')
            setReps('')

            setError(null);
            setEmptyFields([]);

            console.log('new workout added' , json);

            dispatch({
                type: 'CREATE_WORKOUT',
                payload: json
            })

        }
    
    }
  return (                         
   <form className='create' onSubmit={handleSubmit}>
        <h3>Add a New Workout</h3>
        <label>Excercise Title:</label>

        <   input onChange={(event) => setTitle(event.target.value)} 
            value= {title}
            className={emptyFields.includes('title')? 'error': ''}
        />

        <label>Load (Kg):</label>
        <input onChange={(event) => setLoad(event.target.value)} 
            value = {load} 
            className={emptyFields.includes('load')? 'error': ''}
        />

        <label>Reps:</label>
        <input onChange={(event) => setReps(event.target.value)} 
            value = {reps} 
            className={emptyFields.includes('reps')? 'error': ''}
        />
            
        <button>Add workout</button>
        {error && <div className='error'>{error}</div>}
   </form>
  )
}

export default WorkoutForm
    