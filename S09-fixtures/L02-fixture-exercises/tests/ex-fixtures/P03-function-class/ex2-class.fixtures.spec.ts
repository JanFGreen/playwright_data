// Example of own fixtures with class
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

// <{ name: MyName }> it is not needed but interface for fixture can be added
const myTest = test.extend<{ name: MyName }>({
  name: async ({}, use) => {
    console.log('🌱 f1 name fixture initialized');
    await use(new MyName('🌳 not-set'));
  },
});

myTest('ex2.1 test execute fixture', async ({ name }) => {
  console.log('🧪 t1.1 execute fixture in test, print name');
  name.printName();
  name.changeName('🧪 Ewa');
  console.log(`🧪 t1.2 get name: ${name.getName()}`);
});
