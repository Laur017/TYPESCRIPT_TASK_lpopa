function addNumbers(a: number, b: number): number {
  return a + b;
}

function multiplyNumbers(a: number, b: number): number {
  return a * b;
}

function findLargest(numbers: number[]): number {
  let largest: number = -Infinity;

  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > largest) {
      largest = numbers[i];
    }
  }

  return largest;
}

function getLetterCount(str: string): { [key: string]: number } {
  let letterCount: { [key: string]: number } = {};

  for (let i = 0; i < str.length; i++) {
    let letter: string = str[i].toLowerCase();
    if (letterCount[letter]) {
      letterCount[letter]++;
    } else {
      letterCount[letter] = 1;
    }
  }

  return letterCount;
}

const myNumber: number = 42;
const myString: string = "Hello, TypeScript!";
const myBoolean: boolean = true;
const myArray: number[] = [1, 2, 3, 4, 5];
const myObject: { name: string; age: number } = { name: "John Doe", age: 30 };

let myAny: any = 42;
myAny = "Hello, TypeScript!";
myAny = { name: "Jane Doe", age: 25 };

function linearSearch<T>(array: T[], target: T): number {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === target) {
      return i;
    }
  }
  return -1;
}

function binarySearch<T>(array: T[], target: T): number {
  let left: number = 0;
  let right: number = array.length - 1;

  while (left <= right) {
    let mid: number = Math.floor((left + right) / 2);
    if (array[mid] === target) {
      return mid;
    } else if (array[mid] < (target as any)) {
      // Type assertion needed for comparison
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}

// changed from Node to MyNode because I had a naming conflict
class MyNode<T> {
  value: T;
  children: MyNode<T>[];

  constructor(value: T) {
    this.value = value;
    this.children = [];
  }

  addChild(node: MyNode<T>): void {
    this.children.push(node);
  }
}

function depthFirstSearch<T>(root: MyNode<T>, target: T): MyNode<T> | null {
  let stack: MyNode<T>[] = [root];

  while (stack.length > 0) {
    let node: MyNode<T> = stack.pop()!; // Non-null assertion
    if (node.value === target) {
      return node;
    }
    for (let i = node.children.length - 1; i >= 0; i--) {
      stack.push(node.children[i]);
    }
  }

  return null;
}

let root: MyNode<number> = new MyNode(1);
let child1: MyNode<number> = new MyNode(2);
let child2: MyNode<number> = new MyNode(3);
let grandchild1: MyNode<number> = new MyNode(4);
let grandchild2: MyNode<number> = new MyNode(5);

root.addChild(child1);
root.addChild(child2);
child1.addChild(grandchild1);
child2.addChild(grandchild2);

interface IBurger {
  patty: string;
  cheese?: string;
  sauce?: string;
  toppings?: string[];
}

interface IBurgerBuilder {
  addPatty(type: string): BurgerBuilder;
  addCheese(type: string): BurgerBuilder;
  addSauce(type: string): BurgerBuilder;
  addToppings(toppings: string[]): BurgerBuilder;
  build(): Burger;
}

class BurgerBuilder implements IBurgerBuilder {
  private burger: Partial<IBurger>;

  constructor() {
    this.burger = {};
  }

  addPatty(type: string): BurgerBuilder {
    this.burger.patty = type;
    return this;
  }

  addCheese(type: string): BurgerBuilder {
    this.burger.cheese = type;
    return this;
  }

  addSauce(type: string): BurgerBuilder {
    this.burger.sauce = type;
    return this;
  }

  addToppings(toppings: string[]): BurgerBuilder {
    this.burger.toppings = toppings;
    return this;
  }

  build(): Burger {
    if (!this.burger.patty) {
      throw new Error("Burger must have a patty.");
    }
    return new Burger(this.burger as IBurger);
  }
}

class Burger implements IBurger {
  patty: string;
  cheese?: string;
  sauce?: string;
  toppings?: string[];

  constructor(burger: IBurger) {
    this.patty = burger.patty;
    this.cheese = burger.cheese;
    this.sauce = burger.sauce;
    this.toppings = burger.toppings;
  }

  describe(): string {
    let description = `Burger with ${this.patty} patty`;
    if (this.cheese) {
      description += `, ${this.cheese} cheese`;
    }
    if (this.sauce) {
      description += `, ${this.sauce} sauce`;
    }
    if (this.toppings && this.toppings.length > 0) {
      description += `, ${this.toppings.join(", ")} toppings`;
    }
    return description + ".";
  }
}

let burger: Burger = new BurgerBuilder()
  .addPatty("beef")
  .addCheese("cheddar")
  .addSauce("ketchup")
  .addToppings(["lettuce", "tomato"])
  .build();
console.log(burger.describe());

interface IPerson {
  name: string;
  age: number;
  introduce(): void;
  celebrateBirthday(): void;
}

class Person implements IPerson {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  introduce(): void {
    console.log(`Hi, my name is ${this.name} and I'm ${this.age} years old.`);
  }

  celebrateBirthday(): void {
    this.age++;
    console.log(
      `Happy birthday, ${this.name}! You are now ${this.age} years old.`
    );
  }
}

interface IBankAccount {
  owner: string;
  balance: number;
  deposit(amount: number): void;
  withdraw(amount: number): void;
}

class BankAccount implements IBankAccount {
  owner: string;
  balance: number;

  constructor(owner: string, balance: number) {
    this.owner = owner;
    this.balance = balance;
  }

  deposit(amount: number): void {
    this.balance += amount;
    console.log(`${amount} deposited. Current balance is ${this.balance}.`);
  }

  withdraw(amount: number): void {
    if (amount > this.balance) {
      console.log(`Insufficient funds. Current balance is ${this.balance}.`);
    } else {
      this.balance -= amount;
      console.log(`${amount} withdrawn. Current balance is ${this.balance}.`);
    }
  }
}

interface IRectangle {
  width: number;
  height: number;
  readonly area: number;
  readonly perimeter: number;
}

class Rectangle implements IRectangle {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  get area(): number {
    return this.width * this.height;
  }

  get perimeter(): number {
    return 2 * (this.width + this.height);
  }
}

interface ITodoList {
  tasks: string[];
  addTask(task: string): void;
  removeTask(task: string): void;
}

class TodoList implements ITodoList {
  tasks: string[];

  constructor() {
    this.tasks = [];
  }

  addTask(task: string): void {
    this.tasks.push(task);
    console.log(`Task "${task}" added. Total tasks: ${this.tasks.length}.`);
  }

  removeTask(task: string): void {
    let index: number = this.tasks.indexOf(task);
    if (index === -1) {
      console.log(`Task "${task}" not found.`);
    } else {
      this.tasks.splice(index, 1);
      console.log(`Task "${task}" removed. Total tasks: ${this.tasks.length}.`);
    }
  }
}

interface IBook {
  id: number;
  title: string;
  author: string;
  publishedYear: number;
}

class Book implements IBook {
  id: number;
  title: string;
  author: string;
  publishedYear: number;

  constructor(
    id: number,
    title: string,
    author: string,
    publishedYear: number
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.publishedYear = publishedYear;
  }
}

interface IBookCollection {
  books: IBook[];
  fetchData(): Promise<void>;
  logBooks(): void;
  findBookById(id: number): IBook | undefined;
  addBook(book: IBook): void;
  removeBookById(id: number): void;
}

class BookCollection implements IBookCollection {
  books: IBook[];

  constructor() {
    this.books = [];
  }

  async fetchData(): Promise<void> {
    try {
      const response = await fetch("https://my-book-api.com/books");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: any[] = await response.json();
      this.books = data.map(
        (book: any) =>
          new Book(book.id, book.title, book.author, book.publishedYear)
      );
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  }

  logBooks(): void {
    console.log(this.books);
  }

  findBookById(id: number): IBook | undefined {
    return this.books.find((book: IBook) => book.id === id);
  }

  addBook(book: IBook): void {
    this.books.push(book);
  }

  removeBookById(id: number): void {
    this.books = this.books.filter((book: IBook) => book.id !== id);
  }
}
