import { useEffect, useState} from "react"
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"

import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const Home = () => {
    const {workouts,dispatch} = useWorkoutsContext();
    useEffect(() => {
        const fetchWorkouts = async () => {
           const response = await fetch('/api/workouts')
           // by default this is blocked 
           const json = await response.json() // array of workout objs
           console.log("data rev: ", json)

           if(response.ok){
                dispatch({
                    type: 'SET_WORKOUTS',
                    payload: json
                })
           }
        }
        fetchWorkouts();
    }, [dispatch]) // fire this once only on render

    return (
        <div className="home">
        <div className="workouts">
            {workouts && workouts.map((workout) => {
                // dont forget return 
               return <WorkoutDetails key={workout._id} workout= {workout}/>
            })}
        </div>

        <WorkoutForm />
        </div>
    )
}
export default Home