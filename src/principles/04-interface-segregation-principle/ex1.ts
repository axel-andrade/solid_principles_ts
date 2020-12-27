/* 
Em um cenário fictício para criação de um game de animais, teremos algumas aves 
que serão tratadas como personagens dentro do jogo. Sendo assim, criaremos uma 
interface Aves para abstrair o comportamento desses animais, depois faremos que 
nossas classes implementem essa interface, veja: */

/* 
interface Aves
{
    public function setLocalizacao($longitude, $latitude);
    public function setAltitude($altitude);
    public function renderizar();
}

class Papagaio implements Aves
{
    public function setLocalizacao($longitude, $latitude)
    {
        //Faz alguma coisa
    }
    
    public function setAltitude($altitude)
    {
        //Faz alguma coisa   
    }
    
    public function renderizar()
    {
        //Faz alguma coisa
    }
}

class Pinguim implements Aves
{
    public function setLocalizacao($longitude, $latitude)
    {
        //Faz alguma coisa
    }
    
    // A Interface Aves está forçando a Classe Pinguim a implementar esse método.
    // Isso viola o príncipio ISP
    public function setAltitude($altitude)
    {
        //Não faz nada...  Pinguins são aves que não voam!
    }
    
    public function renderizar()
    {
        //Faz alguma coisa
    }
}
*/

/* PROBLEMA */
/* 
Ao criar a interface Aves, atribuímos comportamentos genéricos, o que força a 
classe Pinguim a implementar o método setAltitude()do qual ela não deveria ter, 
pois pinguins não voam! Dessa forma, estamos violando o ISP e o LSP também! 
*/

/* SOLUÇÃO */

/*
 1 - Criando uma inteface com os métodos genéricos, ou seja, os métodos que 
 todas as aves realmente vão ter 
 */

interface Birds {
  setLocation(lat: number, long: number): void;
  render(): void;
}

/* 
2 - Criando uma interface específica que contenha os métodos genéricos e os métodos necessários 
para um determinado tipo de ave (Pinguim)
 */

interface FlyingBirds extends Birds {
  setHeight(height: number): void;
}

/* 3 - Criando a classe papagaio que implementa a interface FlyingBirds */

class Parrot implements FlyingBirds {
  private lat: number;
  private long: number;
  private height: number;

  constructor() {
    this.lat = 0;
    this.long = 0;
    this.height = 0;
  }

  setLocation(lat: number, long: number): void {
    this.lat = lat;
    this.long = long;
  }

  setHeight(height: number): void {
    this.height = height;
  }

  render(): void {
    console.info(`The bird is in the location(${this.lat}, ${this.long}) and flying at the height ${this.height}`);
  }
}

/* 4 - Criando a classe Pinguim que implementa a interface Birds */

class Penguin implements Birds {
  private lat: number;
  private long: number;

  constructor() {
    this.lat = 0;
    this.long = 0;
  }

  setLocation(lat: number, long: number): void {
    this.lat = lat;
    this.long = long;
  }

  render(): void {
    console.info(`The bird is in the location(${this.lat}, ${this.long}).`);
  }
}

/* 5 - É possível adicionar uma novo tipo de ave, as que voam e mergulham */

interface BirdsThatFlyAndDive extends Birds {
  setHeight(height: number): void;
  setDiveTime(diveTime: number): void;
}

/* 6 - Criando classe gaivota que voa e mergulha */

class Seagull implements BirdsThatFlyAndDive {
  private lat: number;
  private long: number;
  private height: number;
  private diveTime: number;

  constructor() {
    this.lat = 0;
    this.long = 0;
    this.height = 0;
    this.diveTime = 0;
  }

  setLocation(lat: number, long: number): void {
    this.lat = lat;
    this.long = long;
  }

  setHeight(height: number): void {
    this.height = height;
  }

  setDiveTime(diveTime: number): void {
    this.diveTime = diveTime;
  }

  render(): void {
    console.info(
      `The bird is in the location(${this.lat}, ${this.long}), flying at the height ${this.height} and dive time ${this.diveTime}.`
    );
  }
}

// Run
console.info("\nRun ISP 01: \n");

const parrot = new Parrot();
parrot.setHeight(5.6);
parrot.setLocation(122334, 123445);

const penguim = new Penguin();
penguim.setLocation(12334, 123412);

const seagull = new Seagull();
seagull.setHeight(5.6);
seagull.setLocation(122334, 123445);
seagull.setDiveTime(80);

parrot.render();
penguim.render();
seagull.render();
