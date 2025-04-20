// GET -> /workouts --> get all workouts
// POST -> /workouts --> create a new workout 
// ... 

// /api/workouts

const express = require('express')
const {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout

} = require('../controllers/workoutController')

const router = express.Router() // create a router 

// /api/workouts/
//to get all workouts 
router.get('/', getWorkouts)

// GET a single workout 
router.get('/:id', getWorkout)

// POST a new workout
router.post('/', createWorkout)

// DELETE a workout
router.delete('/:id', deleteWorkout)

// UPDATE a workout
router.patch('/:id', updateWorkout)

module.exports = router
