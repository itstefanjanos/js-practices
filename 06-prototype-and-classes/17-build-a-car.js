// https://www.codewars.com/kata/5832d6e2565e120ae60000bb/javascript

function Car(length, doors) {
    
    if (length < 7) {
        throw new Exception('We cannot build that small car.');
    }
    if (doors < 1){
        throw new Exception('We cannot enter a doorless car.');
    } 
    if (doors * 2 > length - 3) {
        throw new Exception('We cannot fit that number of doors in the given length.');
    }
    this.length = length;
    this.doors = doors;
    this.axles = Math.max(2, Math.floor((this.length - 10) / 2) + 2);
    this.body = {
        component: ` ${'_'.repeat(this.length-3)}\n|${'[]'.repeat(Math.floor(this.doors / 2))}${' '.repeat(this.length - 3 - this.doors*2)}${'[]'.repeat(Math.ceil(this.doors / 2))}\\\n`
    }
    this.chassis = {
        component: `-${Array(Math.ceil(this.axles/2)).fill('o').join('-')}${'-'.repeat(this.length - 2 * this.axles - 1)}${Array(Math.floor(this.axles/2)).fill('o').join('-')}-'`
    }
  }

  const testCar = new Car(50, 5);
  console.log(testCar.body.component + testCar.chassis.component);