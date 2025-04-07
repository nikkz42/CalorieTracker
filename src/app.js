import './css/bootstrap.css'
import './css/style.css'
import '@fortawesome/fontawesome-free/js/all'
import { Modal, Collapse } from 'bootstrap';
import CalorieTracker from './Tracker';
import { Meal, Workout } from './Item';

class App {
    constructor() {
        this._tracker = new CalorieTracker();
        document.getElementById('meal-form').addEventListener('submit', this._newMeal.bind(this));
        document.getElementById('workout-form').addEventListener('submit', this._newWorkout.bind(this));
        document.getElementById('meal-items').addEventListener('click', this._removeMealItem.bind(this)); 
        document.getElementById('workout-items').addEventListener('click', this._removeWorkoutItem.bind(this));
    }

    _newMeal(e) {
        e.preventDefault();
        const item = document.getElementById('meal-name');
        const calories = document.getElementById('meal-calories');

        //validation
        if('' === item.value || '' === calories.value) {
            alert('Please add a meal item');
            return;
        }

        const meal = new Meal(item.value, +calories.value);
        this._tracker.addMeal(meal);
        item.value = '';
        calories.value = '';

    }

    _newWorkout(e) {
        e.preventDefault();
        const workoutName = document.getElementById('workout-name');
        const calories = document.getElementById('workout-calories');

        //validation
        if('' === workoutName.value || '' === calories.value) {
            alert('Please add a workout item');
            return;
        }

        const workout = new Workout(workoutName.value, +calories.value);
        this._tracker.addWorkout(workout);
        workoutName.value = '';
        calories.value = '';

    }

    _removeMealItem(e) {
        if(e.target.classList.contains('delete') || e.target.classList.contains('fa-xmark')) {
           if(confirm('Are you sure you want to remove the meal item ?')) {
                const id = e.target.closest('.card').getAttribute('data-id');
                this._tracker.removeMeal(id);
                e.target.closest('.card').remove();
           }
        }
    }

    _removeWorkoutItem(e) {
        if(e.target.classList.contains('delete') || e.target.classList.contains('fa-xmark')) {
           if(confirm('Are you sure you want to remove the meal item ?')) {
                const id = e.target.closest('.card').getAttribute('data-id');
                this._tracker.removeWorkout(id);
                e.target.closest('.card').remove();
           }
        }
    }

}

const app = new App();