abstract class AbstractModernChair {
  abstract rest(): void;
  abstract toSit(): void;
}

abstract class AbstractAntiqueChair {
  abstract rest(): void;
  abstract toSit(): void;
}

abstract class AbstractFactory {
  abstract createModernChair(): AbstractModernChair;
  abstract createAntiqueChair(): AbstractAntiqueChair;
}

class ModernChair extends AbstractModernChair {
  constructor(value: String) {
    super();
    console.log(value);
  }
  rest(): void {}
  toSit(): void {}
}

class AntiqueChair extends AbstractAntiqueChair {
  constructor(value: String) {
    super();
    console.log(value);
  }
  rest(): void {}
  toSit(): void {}
}

class NewYorkFactory extends AbstractFactory {
  createModernChair(): ModernChair {
    return new ModernChair("Cadeira moderna made in New York");
  }

  createAntiqueChair(): AntiqueChair {
    return new AntiqueChair("Cadeira antiga made in New York");
  }
}

class ChinaFactory extends AbstractFactory {
  createModernChair(): ModernChair {
    return new ModernChair("Cadeira moderna made in China");
  }

  createAntiqueChair(): AntiqueChair {
    return new AntiqueChair("Cadeira antiga made in China");
  }
}

/* Example of use */

(function main() {
  const CadeiraNY = new NewYorkFactory();
  CadeiraNY.createAntiqueChair();
  CadeiraNY.createModernChair();

  const CadeiraChina = new ChinaFactory();
  CadeiraChina.createAntiqueChair();
  CadeiraChina.createModernChair();
})();
