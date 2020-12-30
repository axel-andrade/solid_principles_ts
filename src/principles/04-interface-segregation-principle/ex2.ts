import { getCurrencyLocaleStringBRL } from "../../shared/helpers/get-currency-locale-str";

/* 
 Exemplo 02 - ISP

 public abstract class Funcionario {
	
	private String nome;
	
	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public abstract double getSalario();
	
	public abstract double getComissao();
}

public class Vendedor extends Funcionario{

	private double salario;
	private int totalVendas;
	
	public Vendedor(double salario, int totalVendas) {
		this.salario = salario;
		this.totalVendas = totalVendas;
	}
	
	@Override
	public double getSalario() {
		return this.salario + this.getComissao();
	}

	@Override
	public double getComissao() {
		return this.totalVendas * 0.2;
	}

}

public class Desenvolvedor extends Funcionario{

	private double salario;
	
	public Desenvolvedor(double salario) {
		this.salario = salario;
	}
	
	@Override
	public double getSalario() {
		return this.salario;
	}

	@Override
	public double getComissao() {
		return 0d;
	}

}
*/

/* PROBLEMAS */
/* 
Duas classes estedem a classe Funcionario: o Vendedor e o Desenvolvedor. Porém a classe desenvolvedor recebe por horas 
trabalhadas e nao por vendas, logo não possui comissão. Desenvolvedor está sendo obrigado a ter um método que não irá 
utilizar, o que viola o princípio do ISP.
*/

/* SOLUÇÃO */

/* 1 - Criando interfaces para isolar comportamentos de diferentes tipos de funcionário */

interface ConventionalEmployee {
  getSalary(): number;
}

interface CommissionableEmployee extends ConventionalEmployee {
  getCommission(): number;
}

/* 2 - Criando a classe Developer que implementara a classe ConventionalEmployee */

class Developer implements ConventionalEmployee {
  private salary: number;

  constructor(salary: number) {
    this.salary = salary;
  }

  public getSalary(): number {
    return this.salary;
  }
}

/* 3 - Implementando  a classe Salesman(Vendedor) que implementa a interface CommissionableEmployee */

class Salesman implements CommissionableEmployee {
  private salary: number;
  private commission: number;

  constructor(salary: number, commission: number) {
    this.salary = salary;
    this.commission = commission;
  }

  public getSalary(): number {
    return this.salary;
  }

  public getCommission(): number {
    return this.commission;
  }
}

// Run
console.info("\nRun ISP 02: \n");

const developer = new Developer(1000);
const salesman = new Salesman(1000, 700);

console.info(`Developer with total salary of ${getCurrencyLocaleStringBRL(developer.getSalary())}`);
console.info(
  `Salesman with total salary of ${getCurrencyLocaleStringBRL(
    salesman.getSalary()
  )} and commission of ${getCurrencyLocaleStringBRL(salesman.getCommission())}`
);
