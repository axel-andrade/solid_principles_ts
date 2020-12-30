import { getCurrencyLocaleStringBRL } from "../../shared/helpers/get-currency-locale-str";

/*
public class ContaCorrenteComum {

    protected double saldo;

    public ContaCorrenteComum() {
        this.saldo = 0;
    }

    public void deposita(double valor) {
        this.saldo += valor;
    }
    
    public void saca(double valor) {
    	if(valor <= this.saldo) {
    	     this.saldo -= valor;
    	}else{
    	     throw new IllegalArgumentException("Saldo insuficiente.");
    	}
    }

    public double getSaldo() {
        return saldo;
    }

    public void rende()      {
        this.saldo*= 0.02;
    }  
}

public class ContaSalario extends ContaCorrenteComum {
	
	public void rende() {
        throw new Exception("Essa conta não possui rendimento");
  }
  
}

*/

/* PROBLEMA */
/* 
Uma ContaSalario é idêntica a classe ContaCorrenteComum, exceto pelo método rende(). A conta salário 
não tem rendimento, é só para recebimento. Outro problema e que a conta salário extendendo e lançado uma 
excessão viola o LSP. Pois ao estender o método deve se manter o mesmo comportamento. Do jeito que esta 
a classe ContaSalario não pode subistituir a classe ContaCorrenteComun. Pois se o método rende for chamado 
um erro será lançado.
 */

/* SOLUÇÃO */

/* 1 - Criar uma classe responsável por gerenciar operação de uma conta */

class AccountManager {
  private balance: number;

  constructor() {
    this.balance = 0;
  }

  public deposit(value: number): void {
    this.balance += value;
  }

  public withdraw(value: number): void {
    if (value <= this.balance) {
      this.balance -= value;
    } else {
      throw new Error("Saldo insuficiente.");
    }
  }

  public getBalance(): number {
    return this.balance;
  }

  public profit(fee: number): void {
    this.balance = this.balance + this.balance * fee;
  }
}

/* 2 - Criando uma classe CurrentAccount que utiliza os métodos da classe AccountManager */

class CurrentAccount {
  private accountManager: AccountManager;
  constructor(accountManager: AccountManager) {
    this.accountManager = accountManager;
  }

  public deposit(value: number): void {
    this.accountManager.deposit(value);
  }

  public withdraw(value: number): void {
    this.accountManager.withdraw(value);
  }

  public getBalance(): number {
    return this.accountManager.getBalance();
  }

  public profit(fee: number): void {
    this.accountManager.profit(fee);
  }
}

/* 
3 - Criando uma classe SalaryAccount que utiliza os métodos da classe AccountManager para realizar operações, exceto a operação profit.
*/

class SalaryAccount {
  private accountManager: AccountManager;
  constructor(accountManager: AccountManager) {
    this.accountManager = accountManager;
  }

  public deposit(value: number): void {
    this.accountManager.deposit(value);
  }

  public withdraw(value: number): void {
    this.accountManager.withdraw(value);
  }

  public getBalance(): number {
    return this.accountManager.getBalance();
  }
}

// Run
console.info("\nRun LSP 02: \n");
const accountManager1 = new AccountManager();
const accountManager2 = new AccountManager();
const currentAccount = new CurrentAccount(accountManager1);
const salaryAccount = new SalaryAccount(accountManager2);

console.info("Operations in current account ...");
currentAccount.deposit(1000);
currentAccount.withdraw(500);
currentAccount.profit(0.1);
console.info("Current account balance: ", getCurrencyLocaleStringBRL(currentAccount.getBalance()));

console.info("Operations in salary account ...");
salaryAccount.deposit(1000);
salaryAccount.withdraw(500);
console.info("Salary account balance: ", getCurrencyLocaleStringBRL(salaryAccount.getBalance()));
