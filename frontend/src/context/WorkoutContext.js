import { Children, createContext, useReducer } from "react";

export const WorkoutContext = createContext();
const initialState = {workouts: null}

export const workoutReducer = (state,action) => {
    switch(action.type){
        case 'SET_WORKOUTS': 
            return {
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return {
                workouts: [action.payload, ...state.workouts]
            }    

        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter(workout => workout._id !== action.payload._id)
            }
        default: 
            return state
    }
}


const WorkoutContextProvider = ({children}) => {
  
    // dispatch({type: 'create_workouts', payload: [{} {}]})
    const [state,dispatch] = useReducer(workoutReducer,initialState)
    return (
        <WorkoutContext.Provider value={ {...state,dispatch} }>
            { children }
        </WorkoutContext.Provider>
    )
}


export default WorkoutContextProvider