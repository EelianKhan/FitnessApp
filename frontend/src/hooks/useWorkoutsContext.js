import { WorkoutContext } from "../context/WorkoutContext";
import { useContext } from "react";

export const useWorkoutsContext = () => {
    const context = useContext(WorkoutContext);

    if(!context){
        throw Error('useWorkoutContext must be used inside a workoutsContextProvider')
    }

    return context;
}