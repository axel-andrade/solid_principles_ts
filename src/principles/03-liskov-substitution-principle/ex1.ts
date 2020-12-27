/* Exemplo de aplicação da substituição de liskov */

/* Criando uma classe base */
class BaseClassUser {
  public getName(): void {
    console.info("My name is base class.");
  }
}

/* Criando uma classe derivada da classe base (herança). */
class DerivedClassUser extends BaseClassUser {
  public getName(): void {
    console.info("My name is derived class.");
  }
}

// Criando uma função que imprime o nome, passando como parâmetro um objeto do tipo da classe base.
const showName = (user: BaseClassUser): void => {
  return user.getName();
};

const user1 = new BaseClassUser();
const user2 = new DerivedClassUser();

// Run
console.info("\nRun LSP 01: \n");
showName(user1);
showName(user2);

/* Exemplos de violação do LSP */

/* 
# - Sobrescrevendo um método que não faz nada...
class Voluntario extends ContratoDeTrabalho
{
    public function remuneracao()
    {
        // não faz nada
    }
}


# - Lançando uma exceção inesperada...
class MusicPlay
{
    public function play($file)
    {
        // toca a música   
    }
}

class Mp3MusicPlay extends MusicPlay
{
    public function play($file)
    {
        if (pathinfo($file, PATHINFO_EXTENSION) !== 'mp3') {
            throw new Exception;
        }
        
        // toca a música
    }
}


# - Retornando valores de tipos diferentes...
class Auth
{
    public function checkCredentials($login, $password)
    {
        // faz alguma coisa
        
        return true;
    }
}

class AuthApi extends Auth
{
    public function checkCredentials($login, $password)
    {
        // faz alguma coisa
        
        return ['auth' => true, 'status' => 200];
    }
}
*/
