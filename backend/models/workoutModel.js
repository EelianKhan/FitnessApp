const mongoose =  require ('mongoose');

const Schema = mongoose.Schema;

// define the structure of the scheme 
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, { timestamps: true });

// a model that we can import
module.exports = mongoose.model('Workout', workoutSchema)
