/* 
Exemplo de bom uso do LSP:
*/

/* 1 - Criação de um instrumento musical que toca uma nota */

interface MusicalInstrument {
  playANote(): void;
}

/* 2 - Criação de uma classe Piano que implementa a classe de instrumento musical e toca uma nota apertando uma tecla. */

class Piano implements MusicalInstrument {
  private pressKey(): void {
    console.info("Pressing key of piano ...");
  }

  public playANote(): void {
    this.pressKey();
  }
}

/* 2 - Criação de uma classe Saxophone que implementa a classe de instrumento musical e toca uma nota com um sopro. */

class Saxophone implements MusicalInstrument {
  private Blow(): void {
    console.info("Browing saxophone ...");
  }

  public playANote(): void {
    this.Blow();
  }
}

/* 4 - Criação da função playMusic que é respoonsavél por tocar notas de uma lista de instrumentos */
const playMusic = (instruments: MusicalInstrument[]): void => {
  instruments.forEach((i) => i.playANote());
};

/* 
A função playMusic consegue tocar notas de piano ou de saxophone. Uma classe pode ser substítuida pela outra sem erros. 
Portando o exemplo implementando atende ao princípio LSP 
*/

// Run
console.info("\nRun LSP 03: \n");
const piano = new Piano();
const saxophone = new Saxophone();

const instruments: MusicalInstrument[] = [piano, piano, piano];

console.info("Music 1: ");
playMusic(instruments);

instruments[0] = saxophone;
instruments[1] = saxophone;

console.info("\nMusic 2: ");
playMusic(instruments);
