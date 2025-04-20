// define functions we can refer to in the router files 
const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts  = async (req,res) =>{
    const workouts = await Workout.find({}).sort({createdAt:-1}) // finds all that match 
    try{
        res.status(200).json(workouts);
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

// get a single workout
const getWorkout = async (req,res) => {
    const { id } = req.params
    // check if the id is a valid mongo db type id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Workout'})
    };

    const workout = await Workout.findById(id);

    if(!workout){
        return res.status(404).json({error: 'No such workout'})
    }
    res.status(200).json(workout)
}

// create new workout
const createWorkout = async (req,res) => {
    // add doc to db 
    const {title,load,reps} = req.body

    let emptyFields = []
    if(!title)
    {
        emptyFields.push('title')
    }
    if(!load)
    {
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    
    if(emptyFields.length > 0){
        return res.status(400).json({
            error: 'Please fill in all the fields',
            emptyFields
        })
    }
    try{
        const workout = await Workout.create({title,load,reps});
        res.status(200).json(workout)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}


// delete a workout
const deleteWorkout = async (req,res) => {
    const {id} = req.params
     // check if the id is a valid mongo db type id
     if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Workout'})
    };
    // find the workout with this id and delete it 
    const workout = await Workout.findOneAndDelete({_id: id})
    
    if(!workout){
        return res.status(404).json({error: 'No such workout'})
    }
    res.status(200).json(workout)

}

//update a workout
const updateWorkout = async (req, res)=> {
    const {id} = req. params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Workout'})
    };
    const workout = await Workout.findOneAndUpdate({_id: id},{
        ...req.body
    })
    if(!workout){
        return res.status(404).json({error: 'No such workout'})
    }
    res.status(200).json(workout)

}   




module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}