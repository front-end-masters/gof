interface IProduct {
  name: string;
  price: number;
  discount: number;
  totalPrice(): number;
}

interface IPackage {
  items: Array<IProduct | IPackage>;
  totalPrice(): number;
}

class Product implements IProduct {
  name: string;
  price: number;
  discount: number;

  constructor(name: string, value: number, discount: number = 0) {
    this.name = name;
    this.price = value;
    this.discount = discount;
  }

  totalPrice(): number {
    return this.price - this.discount;
  }
}

class PackageComposite implements IPackage {
  items: Array<IProduct | IPackage>;

  constructor(items: Array<IProduct | IPackage> = []) {
    this.items = items;
  }

  totalPrice(): number {
    return this.items.reduce((prev, curr) => prev + curr.totalPrice(), 0)
  }
}

const book: IProduct = new Product('book', 20, 2);
const laptop: IProduct = new Product('laptop', 1000);
const keyboard: IProduct = new Product('keyboard', 50, 5);
const smartphone: IProduct = new Product('smartphone', 250, 20);
const headphone: IProduct = new Product('headphone', 25);

const packageItems: Array<IProduct | IPackage> = [
  book,
  new PackageComposite([laptop]),
  new PackageComposite([keyboard]),
  new PackageComposite([
    new PackageComposite([smartphone]),
    new PackageComposite([headphone]),
  ]),
];

const package = new PackageComposite(packageItems);
const totalPrice = package.totalPrice();
