interface Prototype {
  clone();
}

class House implements Prototype{
  address: string;
  floors: Floor[];

  clone(){
    const house = new House();
    house.address = this.address;
    house.floors = this.floors.map(floor => {
      return new Floor(floor.m2, floor.roomsAmount);
    });
    return house;
  }
}

class Floor {
  m2: number;
  roomsAmount: number;

  constructor(m2: number, roomsAmount: number){
    this.m2 = m2;
    this.roomsAmount = roomsAmount;
  }
}