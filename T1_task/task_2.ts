enum AnimalType {
  Dog,
  Cat,
  Bird,
  Fish,
}

function makeAnimalSound(type: AnimalType) {
  switch (type) {
    case AnimalType.Dog:
      console.log("Woof!");
      break;
    case AnimalType.Cat:
      console.log("Meow!");
      break;
    case AnimalType.Bird:
      console.log("Chirp!");
      break;
    case AnimalType.Fish:
      console.log("Blub!");
      break;
    default:
      console.log("Unknown animal type");
      break;
  }
}

/* ******************************************************************************************************************************** */

type Pet = {
  name: string;
  age: number;
  type: AnimalType;
};

function getPetDescription(pet: Pet) {
  const animal = AnimalType[pet.type];
  return `${pet.name} is a ${animal.toLowerCase()} that is ${
    pet.age
  } years old.`;
}

const myPet: Pet = {
  name: "Fluffy",
  age: 5,
  type: AnimalType.Cat,
};

console.log(getPetDescription(myPet));

/* ******************************************************************************************************************************** */

interface PetOwner {
  name: string;
  age: number;
  pets: Pet[];
}

function getPetOwnerDescription(owner: PetOwner): string {
  const pets = owner.pets.map((pet) => {
    const animal = AnimalType[pet.type];
    return `${pet.name} the ${animal.toLowerCase()}`;
  });
  return `${owner.name} is ${owner.age} years old and has ${
    pets.length
  } pets: ${pets.join(", ")}.`;
}

const myPetOwner: PetOwner = {
  name: "John Doe",
  age: 30,
  pets: [
    { name: "Fluffy", age: 5, type: AnimalType.Cat },
    { name: "Spot", age: 3, type: AnimalType.Dog },
  ],
};

console.log(getPetOwnerDescription(myPetOwner));

/* ******************************************************************************************************************************** */

function mapPetNames<T extends { name: string }>(pets: T[]): string[] {
  return pets.map((pet) => pet.name);
}

const myPets = [
  { name: "Max", age: 3, type: AnimalType.Dog },
  { name: "Fluffy", age: 1, type: AnimalType.Cat },
  { name: "Tweety", age: 2, type: AnimalType.Bird },
];

const petNames = mapPetNames(myPets);
console.log(petNames);

/* ******************************************************************************************************************************** */

function print<T>(arg: T): void {
  console.log(arg);
}

print("hello");
print(42);
print(true);

/* ******************************************************************************************************************************** */

function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

const numbers = [1, 2, 3, 4, 5];
const firstNumber = firstElement(numbers);

const strings = ["apple", "banana", "orange"];
const firstString = firstElement(strings);

/* ******************************************************************************************************************************** */

interface Pair<F, S> {
  first: F;
  second: S;
}

let pair1: Pair<string, number> = { first: "one", second: 1 };
let pair2: Pair<() => void, any[]> = { first: () => {}, second: [] };
let pair3: Pair<boolean, { x: number }> = { first: true, second: { x: 1 } };

/* ******************************************************************************************************************************** */

function log(
  target: Object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${String(propertyKey)} with arguments:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`Result:`, result);
    return result;
  };

  return descriptor;
}

class MyClass {
  @log
  myMethod(arg1: number, arg2: number) {
    return arg1 + arg2;
  }
}

const myObj = new MyClass();
myObj.myMethod(2, 3);

/* ******************************************************************************************************************************** */

type VideoConstructor<T = {}> = new (...args: any[]) => T & {
  title: string;
  url: string;
};

class RegularVideo {
  constructor(public title: string, public url: string) {}
}

class PremiumVideo {
  constructor(public title: string, public url: string) {}
}

class LiveVideo {
  constructor(public title: string, public url: string) {}
}

function Playable<TBase extends VideoConstructor>(Base: TBase) {
  return class extends Base {
    duration: number = 0;
    currentTime: number = 0;
    isPlaying: boolean = false;

    play() {
      this.isPlaying = true;
      console.log(`Playing video: ${this.title}`);
    }

    pause() {
      if (this.isPlaying) {
        this.isPlaying = false;
        console.log(`Paused video: ${this.title}`);
      }
    }

    stop() {
      this.isPlaying = false;
      this.currentTime = 0;
      console.log(`Stopped video: ${this.title}`);
    }

    getDuration() {
      return this.duration;
    }

    getCurrentTime() {
      return this.currentTime;
    }
  };
}

const PlayableRegularVideo = Playable(RegularVideo);
const PlayablePremiumVideo = Playable(PremiumVideo);
const PlayableLiveVideo = Playable(LiveVideo);

const regularVideo = new PlayableRegularVideo(
  "Regular Video",
  "http://regular.url"
);
regularVideo.duration = 120;
regularVideo.play();
console.log("Duration:", regularVideo.getDuration());
console.log("Current Time:", regularVideo.getCurrentTime());
regularVideo.pause();
regularVideo.stop();

const premiumVideo = new PlayablePremiumVideo(
  "Premium Video",
  "http://premium.url"
);
premiumVideo.duration = 240;
premiumVideo.play();

const liveVideo = new PlayableLiveVideo("Live Video", "http://live.url");
liveVideo.duration = 360;
liveVideo.play();

/* ******************************************************************************************************************************** */

type MyType = {
  name: string;
  age: number;
  isStudent: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  email?: string;
  job?: {
    title: string;
    company: string;
    salary: number;
  };
  phoneNumbers: Map<string, string>;
  birthday: Date;
};

type MyTypePartial = Partial<MyType>;

type MyTypeRequired = Required<MyType>;

type MyTypeReadonly = Readonly<MyType>;

type MyTypePicked = Pick<MyType, "name" | "age" | "isStudent" | "hobbies">;

type MyTypeOmitted = Omit<MyType, "job" | "phoneNumbers" | "birthday">;

type MyTypeKeys = keyof MyType;
