abstract class Vehicle {}

class Car extends Vehicle {
  constructor(private speed = 0) {
    super();
  }

  speedUp(kmh: number) {
    this.speed += kmh;
  }

  toString() {
    return `A car with a speed of ${this.speed}km/h`;
  }
}

class CarWithSpoiler extends Vehicle {
  constructor(private vehicle, private spoiler) {
    super();
  }

  toString() {
    return `${this.vehicle.toString()}` + ` and has ${this.spoiler} spoiler`;
  }
}

class CarWithSunroof extends Vehicle {
  constructor(private vehicle, private sunroof) {
    super();
  }

  toString() {
    return `${this.vehicle.toString()}` + ` and has ${this.sunroof} sunroof`;
  }
}

let car = new Car();
console.log(car.toString());

let carWithSpoiler = new CarWithSpoiler(car, 'lighted');
console.log(carWithSpoiler.toString());

let carWithSunroof = new CarWithSunroof(car, 'moonlight');
console.log(carWithSunroof.toString());

let carWithSpoilerAndSunroof = new CarWithSunroof(carWithSpoiler, 'moonlight');
console.log(carWithSpoilerAndSunroof.toString());
