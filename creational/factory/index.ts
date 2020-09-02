interface Transporter {
  delivery(): void;
  fillUpTank(): void;
}

class Car implements Transporter {
  delivery() {
    console.log('Delivering by car');
  }

  fillUpTank() {}
}

class Boat implements Transporter {
  delivery() {
    console.log('Delivering by boat');
  }

  fillUpTank() {}

  paddle() {}
}

class TransporterFactory {
  getTransporter(type: string): Transporter {
    switch (type) {
      case 'Street': {
        return new Car();
      }
      case 'Sea': {
        return new Boat();
      }
    }
  }
}
