//PART 1

class Vehicle {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }
    honk() {
        return "BEEP!";
    }
    toString() {
        return `The vehicle is a ${this.make} ${this.model} from ${this.year}`;
    }
}

//PART 2

class Car extends Vehicle {
    constructor(make, model, year) {
        super(make, model, year);
        this.numWheels = 4;
    }
}

//PART 3

class Motorcycle extends Vehicle {
    constructor(make, model, year) {
        super(make, model, year);
        this.numWheels = 2;
    }
    revEngine() {
        return "VROOM!"
    }
}

//PART 4

class Garage {
    constructor(capacity) {
        this.capacity = capacity;
        this.vehicles = [];
    }
    add(vehicle) {
        if (this.vehicles.length === this.capacity) {
            return "Sorry, we're full!"
        } else if (vehicle instanceof Vehicle) {
            this.vehicles.push(vehicle);
            return "Vehicle Added!"
        } else {
            return "Only vehicles are allowed in here!";
        }
    }
}