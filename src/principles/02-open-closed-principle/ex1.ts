import { Locales } from "../../enum/locales";
import { CurrencyLocale } from "../../enum/currency-locales";
import { getCurrencyLocaleString } from "../../shared/helpers/get-currency-locale-str";
/* 
 Example 01:
 
 Em um sistema hipotético de RH, temos duas classes que representam os contratos 
 de trabalhos dos funcionários de uma pequena empresa, contratados e estágiários. 
 Além de uma classe para processar a folha de pagamento.

 Exemplo de classes que não seguem o príncipio OCP: 

 class ContratoClt
{
    public function salario()
    {
        //...
    }
}

class Estagio
{
    public function bolsaAuxilio()
    {
        //...
    }
}

class FolhaDePagamento
{
    protected $saldo;
    
    public function calcular($funcionario)
    {
        if ( $funcionario instanceof ContratoClt ) {
            $this->saldo = $funcionario->salario();
        } else if ( $funcionario instanceof Estagio) {
            $this->saldo = $funcionario->bolsaAuxilio();
        }
    }
}

PROBLEMA: 

A classe FolhaDePagamento precisa verificar o funcionário para aplicar a regra de negócio 
correta na hora do pagamento. Supondo que a empresa cresceu e resolveu trabalhar com funcionários PJ, 
obviamente seria necessário modificar essa classe! Sendo assim, estaríamos quebrando o princípio Open-Closed do SOLID.

Qual o problema de se alterar a classe FolhaDePagamento?
Não seria mais fácil apenas acrescentar mais um IF e verificar o novo tipo de funcionário PJ aplicando as respectivas regras? 
Sim, e provavelmente essa seria a solução que programadores menos experientes iriam fazer. Mas, esse é exatamente o problema! 
Alterar uma classe já existente para adicionar um novo comportamento, corremos um sério risco de introduzir bugs em algo que 
já estava funcionando.

*/

/* SOLUÇÃO */

/* 1 - Separando o comportamento extensível (cálculo da remuneração) em uma interface */

export interface EmployeeRemuneration {
  getRemunerationValue(): number;
}

/* 2 - Criando 2 tipos de funcionarios: CLT e estagiario */
class CLTEmployee implements EmployeeRemuneration {
  private salary: number;
  private discountAmount: number;

  constructor(salary: number, discountAmount: number) {
    this.salary = salary;
    this.discountAmount = discountAmount;
  }

  getRemunerationValue(): number {
    return this.salary - this.discountAmount;
  }
}

class TraineeEmployee implements EmployeeRemuneration {
  private aid: number;

  constructor(aid: number) {
    this.aid = aid;
  }

  getRemunerationValue(): number {
    return this.aid;
  }
}

/* 3 - Criando a classe de folha de pagamento */

class Payroll {
  public calculate(employee: EmployeeRemuneration): number {
    return employee.getRemunerationValue();
  }
}

/* 4 - Adicionando um novo tipo de funcionário (PJ) sem impactar a classe folha de pagamento (Payroll) */

class PJEmployee implements EmployeeRemuneration {
  private cost: number;
  private fees: number;
  private bonus: number;

  constructor(cost: number, fees: number, bonus: number) {
    this.cost = cost;
    this.fees = fees;
    this.bonus = bonus;
  }

  getRemunerationValue(): number {
    return this.cost - this.fees + this.bonus;
  }
}

// Run
console.info("\nRun OCP 01: \n");

const payroll = new Payroll();
const employees: EmployeeRemuneration[] = [
  new CLTEmployee(750, 100),
  new TraineeEmployee(500),
  new PJEmployee(1000, 40, 0.2),
];

console.info("Show payroll: ");
employees.forEach((employee, index) => {
  const remunerationValue = payroll.calculate(employee);
  const remunerationValueFormatted = getCurrencyLocaleString(remunerationValue, Locales.PTBR, CurrencyLocale.PTBR);
  console.info(`Employee ${index + 1} remuneration value: ${remunerationValueFormatted}`);
});
