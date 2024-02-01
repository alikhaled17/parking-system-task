// [10:56 AM] peter sherif
// Requirements:

// 1. Store the `Vehicle` entering the parking system

// 2. Handle the state of a parking space on entry and exit of a vehicle

// 3. Upon exit, the customer is charged a parking fee and make space for new vehicles

// Vehicles are charged:

// ● $3 from 6am to 10am

// ● $1 from 10am to Midnight.

// ● Parking is free from Midnight to 6am

// Examples:

// ● Vehicles that use the car park from 3am to 9am are charged - $9

// ● Vehicles that use the car park from 11am to 9pm are charged - $10

const DayHours = Array.from({ length: 24 }, (value, index) => index + 1);

class Car {
  constructor(carName, timeStart, timeEnd) {
    this.carId = Math.random().toString() * new Date().getTime();
    this.carName = carName;
    this.timeStart = timeStart;
    this.timeEnd = timeEnd;
  }

  calcFee() {
    let Fee = 0;
    const timeCharged =
      this.timeStart > this.timeEnd
        ? [
            ...DayHours.slice(this.timeStart),
            ...DayHours.slice(0, this.timeEnd),
          ]
        : [...DayHours.slice(this.timeStart, this.timeEnd)];

    timeCharged.forEach((i, index) => {
      if (i > 6 && i <= 10) {
        Fee += 3;
      } else if (i > 10 && i <= 24) {
        Fee = i === 24 && index === 0 ? Fee : Fee + 1;
      }
    });
    return Fee;
  }
}

class Garag {
  existedCars;
  constructor(numOfAvailableCars, existedCars = []) {
    this.existedCars = existedCars;
    this.numOfAvailableCars = numOfAvailableCars - this.existedCars.length;
  }

  availabilityTime() {
    const times = this.existedCars.map((c) => c.timeEnd);
    return Math.min(...times);
  }

  park(car) {
    if (this.existedCars.map((c) => c.carId).includes(car.carId)) {
      console.log(`${car.carName} is already parked!`);
      return false;
    }
    if (this.numOfAvailableCars > 0) {
      this.numOfAvailableCars--;
      this.existedCars.push(car);
      console.log(`${car.carName} is parked`);
      return true;
    } else {
      console.log(
        `All parking spaces are currently occupied, availability will resume at ${this.availabilityTime()} o'clock.`
      );
      return false;
    }
  }
  unpark(car) {
    this.numOfAvailableCars++;
    this.existedCars.filter((c) => c.carId !== car.carId);
    console.log(`${car.carName} is unparked`);
  }

  getExistedCars() {
    return {
      cars: this.existedCars,
      count: this.existedCars.length,
    };
  }

  getCarFee(car) {
    return `Fee for ${car.carName} is ${car.calcFee()}$`;
  }
}

const car1 = new Car("Toyota1", 3, 9);
const car2 = new Car("Toyota2", 11, 21);
const car3 = new Car("Toyota3", 22, 21);
const car4 = new Car("Toyota4", 23, 21);

const GaragOne = new Garag(3, [car1, car2]);
GaragOne.park(car2);
GaragOne.park(car4);

console.log(GaragOne.getCarFee(car1));

// console.log(GaragOne.getExistedCars());
