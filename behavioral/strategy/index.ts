interface IMedicineProduct {
  id: string;
  name: string;
  value: number;
}

const productA = { id: 'A', name: 'Medicine A', value: 15 };
const productB = { id: 'B', name: 'Medicine B', value: 50 };
const productC = { id: 'C', name: 'Medicine C', value: 85 };
const productD = { id: 'D', name: 'Medicine D', value: 99 };

const fakeDb: { [id: string]: IMedicineProduct } = {
  'A': productA,
  'B': productB,
  'C': productC,
  'D': productD,
};

class HealthInsuranceA {
  private readonly product: IMedicineProduct;

  constructor(product: IMedicineProduct) {
    this.product = product;
  }

  public discountPercentage(): number {
    return this.product.value > 50 ? 0.1 : 0.08;
  }
}

class HealthInsuranceB {

  public calculateDiscount(product: IMedicineProduct): number {
    return product.value * (product.value > 40 ? 0.09 : 0.04);
  }
}

class HealthInsuranceC {
  private readonly db: { [id: string]: IMedicineProduct };

  constructor() {
    this.db = fakeDb;
  }

  public priceWithDiscount(id: string): number {
    const product = this.db[id];
    return product.value > 45 ? product.value * 0.89 : product.value;
  }
}

interface HealthInsuranceDiscountStrategy {
  priceWithDiscount(product: IMedicineProduct): number;
}

class HealthInsuranceADiscountStrategy implements HealthInsuranceDiscountStrategy {
  public priceWithDiscount(product: IMedicineProduct): number {
    const insurance = new HealthInsuranceA(product);
    return product.value - product.value * insurance.discountPercentage()
  }
}

class HealthInsuranceBDiscountStrategy implements HealthInsuranceDiscountStrategy {
  public priceWithDiscount(product: IMedicineProduct): number {
    const insurance = new HealthInsuranceB();
    return product.value - insurance.calculateDiscount(product);
  }
}

class HealthInsuranceCDiscountStrategy implements HealthInsuranceDiscountStrategy {
  public priceWithDiscount(product: IMedicineProduct): number {
    const insurance = new HealthInsuranceC();
    return insurance.priceWithDiscount(product.id);
  }
}

class HealthInsuranceDiscountContext {
  private strategy: HealthInsuranceDiscountStrategy;

  public setStrategy(strategy: HealthInsuranceDiscountStrategy): void {
    this.strategy = strategy;
  }

  public execute(product: IMedicineProduct): number {
    return this.strategy.priceWithDiscount(product);
  }
}

enum InsuranceTypeEnum {
  A = 'A',
  B = 'B',
  C = 'C',
}

interface ShoppingCartItem {
  product: IMedicineProduct,
  insuranceType: InsuranceTypeEnum,
}

class ShoppingCart {
  private readonly shoppingCartItems: ShoppingCartItem[];
  private readonly context: HealthInsuranceDiscountContext;
  private readonly strategyA: HealthInsuranceDiscountStrategy;
  private readonly strategyB: HealthInsuranceDiscountStrategy;
  private readonly strategyC: HealthInsuranceDiscountStrategy;

  constructor(shoppingCartItems: ShoppingCartItem[]) {
    this.shoppingCartItems = shoppingCartItems;
    this.context = new HealthInsuranceDiscountContext();
    this.strategyA = new HealthInsuranceADiscountStrategy();
    this.strategyB = new HealthInsuranceBDiscountStrategy();
    this.strategyC = new HealthInsuranceCDiscountStrategy();
  }

  public total(): number {
    return this.shoppingCartItems.reduce((acc, current) => acc + this.calculate(current), 0);
  }

  private calculate(item: ShoppingCartItem): number {
    let value: number;

    switch (item.insuranceType) {
      case InsuranceTypeEnum.A:
        this.context.setStrategy(this.strategyA);
        value = this.context.execute(item.product);
        break;
      case InsuranceTypeEnum.B:
        this.context.setStrategy(this.strategyB);
        value = this.context.execute(item.product);
        break;
      case InsuranceTypeEnum.C:
        this.context.setStrategy(this.strategyC);
        value = this.context.execute(item.product);
        break;
      default:
        value = item.product.value;
        break;
    }

    return value;
  }
}

const shoppingCartItems: ShoppingCartItem[] = [{
  product: productA,
  insuranceType: InsuranceTypeEnum.A,
}, {
  product: productB,
  insuranceType: InsuranceTypeEnum.B,
}, {
  product: productC,
  insuranceType: InsuranceTypeEnum.C,
}, {
  product: productD,
  insuranceType: InsuranceTypeEnum.B,
}];

const shoppingCart = new ShoppingCart(shoppingCartItems);
const total = shoppingCart.total();
