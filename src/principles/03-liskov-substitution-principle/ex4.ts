/* Example 04 */

/* 1 - Criando interface Animal com método getNome */

interface Animal {
  getName(): string;
}

/* 2 - Criando classe Gato que implementa a interface Animal */

class Cat implements Animal {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }
}

/* 3 - Criando a classe MaineCoon que é um (herança) um tipo de gato(Cat). */

class MaineCoon extends Cat {}

/* 4 - Verificando se MaineCoon é um subclasse de Cat */

console.info("MaineCoon is subclass of Cat:", MaineCoon.prototype instanceof Cat || MaineCoon === Cat);

/* 5 - Criando uma interface de abrigo de animais (AnimalShelter) */

interface AnimalShelter {
  register(animal: Animal): void;
  getAnimalForAdoption(): Animal;
}

/* 6 - Criando classes de abrigos para animais mistos, para gatos e para gatos da raça MaineCoon */

class MixedShelter implements AnimalShelter {
  private animals: Animal[];

  register(animal: Animal): void {
    console.info("Registering animal:", animal.getName());
  }

  getAnimalForAdoption(): Animal {
    return this.animals.pop();
  }
}

class CatShelter implements AnimalShelter {
  private cats: Cat[];

  register(cat: Cat): void {
    console.info("Registering cat:", cat.getName());
  }

  getAnimalForAdoption(): MaineCoon {
    return this.cats.pop();
  }
}

class MaineCoonShelter implements AnimalShelter {
  private maineCoons: MaineCoon[];

  register(maineCoon: MaineCoon): void {
    console.info("Registering maine coon:", maineCoon.getName());
  }

  getAnimalForAdoption(): MaineCoon {
    return this.maineCoons.pop();
  }
}

/* CONSIDERAÇÕES: */
/* 
- Um gato implementa animal.
- Um maineCoon é um gato, ou seja uma subclasse de Cat.
- Um abrigo misto deve aceitar somente objetos de classe que implementem a interface Animal. 
- Um abrigo de gatos deve aceitar somente objetos da classe Cat.
- Um abrigo de gatos maine coon deve aceitar somente objetos da classe MaineCoon.
*/

// Run
console.info("\nRun LSP 04: \n");

const cats = [new Cat("gato1"), new Cat("gato2"), new Cat("gato3")];
const maineCoons = [new MaineCoon("gatoMaineCoon1"), new MaineCoon("gatoMaineCoon2")];

const animalShelter = new MixedShelter();
const catShelter = new CatShelter();
const maineCoonShelter = new MaineCoonShelter();

console.info("\n Case 1: Add cats and maine coon in animal shelter: \n");
animalShelter.register(cats[0]);
animalShelter.register(maineCoons[0]);

console.info("\nCase 2: Add cats in cat shelter: \n");
cats.forEach((cat) => catShelter.register(cat));

console.info("\nCase 3: Add maine coons in maine coon shelter: \n");
maineCoons.forEach((maineCoon) => maineCoonShelter.register(maineCoon));

console.info("\nCase 4: Add cats in maine coon shelter: \n");
cats.forEach((cat) => maineCoonShelter.register(cat));

console.info("\nCase 5: Add maine coons in cat shelter: \n");
maineCoons.forEach((maineCoon) => catShelter.register(maineCoon));
