/*
Exemplo de classe que viola o princípio DIP 
*/

/*
use MySQLConnection;

class PasswordReminder
{
    private $dbConnection;
    
    public function __construct()
    {       
        $this->dbConnection = new MySQLConnection();           
    }
    
    // Faz alguma coisa
} 
*/

/* PROBLEMA 1 */
/* 
Para recuperar a senha, a classe PasswordReminder, precisa conectar na 
base de dados, por tanto, ela cria um instancia da classe MySQLConnection
em seu método construtor para realizar as respectivas operações. O que
gera um alto acoplamento
*/

/* SOLUÇÃO 1 */
/* 
Utilizando injeção de depedências o parâmetro dbConnection
é passado como parametro no construtor da classe PasswordReminder 
*/

// type MySQLConnection = {};
// class PasswordReminder {
//   private dbConnection: MySQLConnection;
//   constructor(dbConnection: MySQLConnection) {
//     this.dbConnection = dbConnection;
//   }
// }

/* PROBLEMA 2 */
/* 
Analisando a solução 1, é possível observar que a classe PasswordReminder 
ainda viola o DIP, por que ainda estamos dependendo da implementação e 
não da abstração;

A solução 1 também viola o OCP, pois esta atrelado ao banco MySQL.
Se for necessário trocar de banco de dados também teria que alterar 
a classe PasswordReminder.
*/

/* SOLUÇÃO 2 */
/*
No nosso exemplo ,PasswordReminder depende da classe MySQLConnection. 
Sendo assim, PasswordReminder é o módulo de alto nível e MySQLConnection 
é o módulo de baixo nível. Mas, MySQLConnection é uma implementação 
e não uma abstração! 
*/

/* 1 - Transformando o dbConnection em uma interface */

interface DBConnectionI {
  connect(): void;
}

/* 2 - Criando classes que implementam a DBConnection */

class MySQLConnection implements DBConnectionI {
  public connect(): void {
    console.info("Connecting to the MySql database ...");
  }
}

class MongoConnection implements DBConnectionI {
  public connect(): void {
    console.info("Connecting to the Mongo database ...");
  }
}

/* 3 - Reimplementando a classe PasswordReminder */

class PasswordReminder {
  private dbConnection: DBConnectionI;
  constructor(dbConnection: DBConnectionI) {
    this.dbConnection = dbConnection;
  }

  forgotPassword(email: string): void {
    console.info("Connecting to the database ... ");
    this.dbConnection.connect();
    console.info(`Send email to: ${email}`);
  }
}

// Run
console.info("\nRun DIP 01: \n");

const passwordReminderWithMySql = new PasswordReminder(new MySQLConnection());
const passwordReminderWithMongo = new PasswordReminder(new MongoConnection());
const email = "test@test.com";

passwordReminderWithMySql.forgotPassword(email);
passwordReminderWithMongo.forgotPassword(email);
