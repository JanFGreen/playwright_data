// Example of own fixtures with class with default value
import { test } from '@playwright/test';

class MyName {
  constructor(private name: string) {
    console.log(`🎒 c1.0 Class initialized with name: ${this.name}`);
  }

  printName(): void {
    console.log('🎒 c1.1 Name log');
    console.log(this.name);
  }

  changeName(name: string): void {
    this.name = name;
    console.log(`🎒 c1.2 Name was changed: ${this.name}`);
  }

  getName(): string {
    console.log('🎒 c1.3 Name return');
    return this.name;
  }
}

type Names = {
  defaultName: string;
  name: MyName;
};

const myTest = test.extend<Names>({
  defaultName: '🌳 f1 default',
  name: async ({ defaultName }, use) => {
    console.log('🌱 f2 name fixture initialized');
    await use(new MyName(defaultName));
  },
});

// Uncomment below to check change name
// myTest.use({defaultName: '❎ o1 overridden'});

myTest('ex3.1 test execute fixture', async ({ name }) => {
  console.log('🧪 t1.1 test my fixture');
  console.log('🧪 t1.2 print name');
  name.printName();
  name.changeName('🧪 Ewa');
  console.log(`🧪 t1.3 get name: ${name.getName()}`);
});

myTest('ex3.2 test execute fixture with internal use', async ({ name }) => {
  // uncommenting below will cause test error due to forbidden internal usage
  // myTest.use({defaultName: 'overridden'});
  console.log('🧪 t2.1 test my fixture');

  console.log('🧪 t2.2 print name');
  name.printName();
});
