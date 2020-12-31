/* Example 02 */
/* 
public class Interruptor
{
  private Ventilador _ventilador;
  
  public void Acionar()
  {
    if(!_ventilador.Ligado)
      _ventilador.Ligar();
    else
      _ventilador.Desligar();
  }
}

public class Ventilador
{  
  public bool Ligado {get; set; }
  
  public void Ligar() { ... }
  
  public void Desligar() { ... }
}
/*

/* PROBLEMA */
/* 
No exemplo, podemos perceber que além de quebrar outros princípios do SOLID, a classe 
concreta Interruptor depende de uma outra classe concreta (Ventilador). O Interruptor 
deveria ser capaz de acionar qualquer dispositivo independente de ser um ventilador uma 
lâmpada ou até mesmo um carro.
*/

/* SOLUÇÃO */

/* 1 - Criando um interface Device e adiciona o método trigger que fica com a responsabilidade de verificar se o dispositivo esta ligado ou não.*/

interface Device {
  isOn(): boolean;
  trigger(): void;
  turnOn(): void;
  turnOff(): void;
}

/* 2 - Criando a classe Fan (Ventilador) que implementa a interface Device */

class Fan implements Device {
  private status: boolean;

  constructor() {
    this.status = false;
  }

  public isOn(): boolean {
    return this.status;
  }

  public turnOff(): void {
    this.status = false;
  }

  public turnOn(): void {
    this.status = true;
  }

  public trigger(): void {
    this.status ? this.turnOff() : this.turnOn();
  }

  public getDeviceStatus(): string {
    return this.status ? "ON" : "OFF";
  }
}

/* 3 - Criando outro device lamp (Lampâda) */

class Lamp implements Device {
  private status: boolean;

  constructor() {
    this.status = false;
  }

  public isOn(): boolean {
    return this.status;
  }

  public turnOff(): void {
    this.status = false;
  }

  public turnOn(): void {
    this.status = true;
  }

  public trigger(): void {
    this.status ? this.turnOff() : this.turnOn();
  }

  public getDeviceStatus(): string {
    return this.status ? "ON" : "OFF";
  }
}

/* 4 - Reescrevendo a classe interruptor para aceitar qualquer Device */

class Switch {
  private device: Device;

  constructor(device: Device) {
    this.device = device;
  }

  press(): void {
    this.device.trigger();
  }
}

// Run
console.info("\nRun DIP 02: \n");

const fan = new Fan();
const lamp = new Lamp();

const switchForFan = new Switch(fan);
const switchForLamp = new Switch(lamp);

console.info(`\nFan status: ${fan.getDeviceStatus()}`);
console.info("Turning on the fan ...");
switchForFan.press();
console.info(`Fan status: ${fan.getDeviceStatus()}\n`);

console.info(`\nLamp status: ${lamp.getDeviceStatus()}`);
console.info("Turning on the lamp ...");
switchForLamp.press();
console.info(`Lamp status: ${lamp.getDeviceStatus()}\n`);
