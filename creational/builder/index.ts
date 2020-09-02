interface IManufacturer {
  name: string;
}

interface IManufacture {
  batch: string;
  manufactureDate: string;
  expireDate: string;
}

interface IPrice {
  value: number;
  currency: string;
}

interface IProduct {
  name?: string;
  price?: IPrice;
  manufacturer?: IManufacturer;
  manufacture?: IManufacture;
}

interface IProductBuilder {
  build(): IProduct;
  setName(name: string): IProductBuilder;
  setPrice(price: IPrice): IProductBuilder;
  setManufacturer(manufacturer: IManufacturer): IProductBuilder;
  setManufacture(manufacture: IManufacture): IProductBuilder;
}

class ProductBuilder implements IProductBuilder {
  private readonly product: IProduct;

  private constructor() {
    this.product = {};
  }

  public static get(): IProductBuilder {
    return new ProductBuilder();
  }

  public build(): IProduct {
    if (!this.product.name || !this.product.price || !this.product.manufacturer || !this.product.manufacture) {
      throw new Error('ProductBuilder needs all attributes to be defined');
    }

    return this.product;
  }

  public setName(name: string): IProductBuilder {
    this.product.name = name;
    return this;
  }

  public setPrice(price: IPrice): IProductBuilder {
    this.product.price = price;
    return this;
  }

  public setManufacturer(manufacturer: IManufacturer): IProductBuilder {
    this.product.manufacturer = manufacturer;
    return this;
  }

  public setManufacture(manufacture: IManufacture): IProductBuilder {
    this.product.manufacture = manufacture;
    return this;
  }
}

const manufacture = { batch: '1A23', manufactureDate: '2020-06-01', expireDate: '2022-06-01' };
const manufacturer = { name: 'ABC Manufacturer' };
const price = { value: 750, currency: 'BRL' };

const product = ProductBuilder
  .get()
  .setName('Paracetamol')
  .setPrice(price)
  .setManufacture(manufacture)
  .setManufacturer(manufacturer)
  .build();
