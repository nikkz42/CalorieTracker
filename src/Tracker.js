class CalorieTracker {
    constructor() {
        this._calorieLimit = 1200;
        this._totalCalories = 0; 
        this._meals = [];
        this._workouts = [];

        this._displayCalorieLimit();
        this._displayCaloriesTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayProgressBar();
    }

    addMeal(meal) {
        this._meals.push(meal);
        this._totalCalories = this._totalCalories + meal.calories;
        this._displayNewMeal(meal);
        this._render();
    }

    addWorkout(workout) {
        this._workouts.push(workout);
        this._totalCalories = this._totalCalories - workout.calories;
        this._displayNewWorkout(workout);
        this._render();
    }

    removeMeal(id) {
        const index = this._meals.findIndex((meal) => meal.id === id);
        if (index !== -1) {
            const meal = this._meals[index];
            this._totalCalories = this._totalCalories - meal.calories;
            this._meals.splice(index, 1);
            this._render();
        }
    }

    removeWorkout(id) {
        const index = this._meals.findIndex((meal) => meal.id === id);
        if (index !== -1) {
            const workout = this._workouts[index];
            this._totalCalories = this._totalCalories - workout.calories;
            this._meals.splice(index, 1);
            this._render();
        }
    }

    //private methods

    _displayCalorieLimit() {
        const dailyCalorieLimitElement = document.querySelector('#calories-limit');
        dailyCalorieLimitElement.innerHTML = this._calorieLimit;
    }

    _displayCaloriesConsumed() {
        const caloriesConsumedElement = document.querySelector('#calories-consumed');
        const consumed = this._meals.reduce((total, meal) => total + meal.calories, 0);
        caloriesConsumedElement.innerHTML = consumed;
    }

    _displayCaloriesBurned() {
        const caloriesBurnedElement = document.querySelector('#calories-burned');
        const burned = this._workouts.reduce((total, workout) => total + workout.calories, 0);
        caloriesBurnedElement.innerHTML = burned;
    }

    _displayCaloriesTotal() {
        const totalCaloriesToElement = document.querySelector('#calories-total');
        totalCaloriesToElement.innerHTML = this._totalCalories;
    }

    _displayCaloriesRemaining() {
        const caloriesRemainingElement = document.querySelector('#calories-remaining');
        const remaining = (this._calorieLimit - this._totalCalories);
        caloriesRemainingElement.innerHTML = remaining;

        if(remaining <= 0) {
            caloriesRemainingElement.parentElement.parentElement.classList.remove('bg-light');
            caloriesRemainingElement.parentElement.parentElement.classList.add('bg-danger');
        } else {
            caloriesRemainingElement.parentElement.parentElement.classList.remove('bg-danger');
            caloriesRemainingElement.parentElement.parentElement.classList.add('bg-light');
        }
    }

    _displayProgressBar() {
        const progressBar = document.querySelector('#calorie-progress');
        const percentage = (this._totalCalories/this._calorieLimit) * 100;
        const width = Math.min(percentage, 100);
        progressBar.style.width = `${width}%`;
    }

    _displayNewMeal(newMeal) {
        const newMealItems = document.getElementById('meal-items');
        const newMealElement = document.createElement('div');
        newMealElement.classList.add('card', 'my-2');
        newMealElement.setAttribute('data-id', newMeal.id);
        newMealElement.innerHTML = `<div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${newMeal.name}</h4>
                  <div class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5">
                    ${newMeal.calories}
                  </div>
                  <button id="delete" class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>`;
        newMealItems.appendChild(newMealElement);      
    }

    _displayNewWorkout(newWorkout) {
        const newMealItems = document.getElementById('workout-items');
        const newMealElement = document.createElement('div');
        newMealElement.classList.add('card', 'my-2');
        newMealElement.setAttribute('data-id', newWorkout.id);
        newMealElement.innerHTML = `<div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${newWorkout.name}</h4>
                  <div class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5">
                    ${newWorkout.calories}
                  </div>
                  <button id="delete" class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>`;
        newMealItems.appendChild(newMealElement);     
    }


    
    _render() {
        this._displayCaloriesTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayProgressBar();
    }
    
}

export default CalorieTracker;