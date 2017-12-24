type Names = 'petya' | 'misha' | 'sasha' | 'sergey';

// const hisname: Names = 'vanya';

class Person {
  static myname: Names;

  constructor(name: Names) {
    Person.myname = name;
  }

  public getName(): string {
    return Person.myname;
  }
}

const person: Person = new Person('misha');
person.getName()
const arr: Array<string> = [];

// arr['abracadabra']

class Group {
  static group: Person[] = [];

  constructor(private prn: Person) {
    Group.group.push(this.prn)
    // console.log(this.prn.getName());
  }
}


const group = new Group(new Person('misha'));


class Temp {
  constructor(
    private name: string,
    private age: number) { }

  getName() {
    return this.name;
  }

  getAge() {
    return this.age;
  }
}


const temp = new Temp('vasa', 23);
// console.log(temp.getName());

class Monoid<T> {
  private value: T[] | T;

  constructor(value?: T | T[]) {
    this.value =
      value !== undefined ?
      Array.isArray(value) ? value : [value] : [];
  }

  static empty<B>(): Monoid<B> {
    return new Monoid();
  }

  concat<B, C>(monoid: Monoid<B>): Monoid<C> {
    return new Monoid(this.value['concat'](monoid.value))
  }

}

const mon1: Monoid<number> = new Monoid(23);
const mon2: Monoid<string> = new Monoid('hello');
// const mon3: Monoid<number> = mon1.concat(Monoid.empty());
const mon3: Monoid<[number, string]> = mon1.concat(mon2);
console.log(mon3);
console.log(mon1.concat(Monoid.empty()) === mon1);

const div: Element = document.createElement('div');

const clst: DOMTokenList = div.classList;

const subscr = div.addEventListener('click', (e: Event) => {
  console.log(e);
  e
});
