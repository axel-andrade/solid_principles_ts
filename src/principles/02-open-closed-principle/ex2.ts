import { getCurrencyLocaleStringBRL } from "../../shared/helpers/get-currency-locale-str";

/*

Exemplo de violação ao OCP

public class CalculadoraDePrecos {

    public double calcula(Produto produto) {

        Frete frete = new Frete();
        double desconto = 0d;
        
        int regra = produto.getMeioPagamento();
        
        switch(regra) {
	        case 1:
	        	System.out.println("Venda à vista");
	        	TabelaDePrecoAVista tabela1 = new TabelaDePrecoAVista();
	        	desconto = tabela1.calculaDesconto(produto.getValor());
	        	break;
	        case 2:
	        	System.out.println("Venda à prazo");
	        	TabelaDePrecoAPrazo tabela2 = new TabelaDePrecoAPrazo();
	        	desconto = tabela2.calculaDesconto(produto.getValor());
	        	break;
        }
        
        double valorFrete = frete.calculaFrete(produto.getEstado());
        return produto.getValor() * (1 - desconto) + valorFrete;
    }
}

public class TabelaDePrecoAVista {
	
	public double calculaDesconto(double valor) {
		if(valor > 100.0) {
			return 0.05;
		}else if(valor > 500.0) {
			return 0.07;
		}else if(valor > 1000.0) {
			return 0.10;
		}else {
			return 0d;
		}
	}

}

public class TabelaDePrecoAPrazo {
	
	public double calculaDesconto(double valor) {
		if(valor > 100.0) {
			return 0.01;
		}else if(valor > 500.0) {
			return 0.02;
		}else if(valor > 1000.0) {
			return 0.05;
		}else {
			return 0d;
		}
	}

}

public class Frete {
	
	public double calculaFrete(String estado) {
		
		if("SAO PAULO".equals(estado.toUpperCase())) {
			return 7.5;
	    }else if("MINAS GERAIS".equals(estado.toUpperCase())){
	    	return 12.5;
	    }else if("RIO DE JANEIRO".equals(estado.toUpperCase())) {
	    	return 10.5;
	    }else {
	    	return 10.0;
	    }
	}
}
*/

/* PROBLEMA */
/*
Em caso de adição de um novo método de pagamento, a classe Calculadora também teria que ser alterada. 
*/

/* SOLUÇÃO */

/* 1 - Criação de uma interface de tabela de preços com método de calcular desconto */

interface PriceTable {
  calculateDiscount(amount: number): number;
}

/* 2 - Criando classes de tabela de preço */

class CashPriceTable implements PriceTable {
  public calculateDiscount(amount: number): number {
    if (amount > 100.0) {
      return 0.05;
    } else if (amount > 500.0) {
      return 0.07;
    } else if (amount > 1000.0) {
      return 0.1;
    } else {
      return 0;
    }
  }
}

class InstallmentPriceTable implements PriceTable {
  public calculateDiscount(amount: number): number {
    if (amount > 100.0) {
      return 0.01;
    } else if (amount > 500.0) {
      return 0.02;
    } else if (amount > 1000.0) {
      return 0.05;
    } else {
      return 0;
    }
  }
}

/* 3 - Criando interface para Servico de Frete */

interface FreightService {
  calculate(state: string): number;
}

class CommonFreight implements FreightService {
  public calculate(state: string): number {
    switch (state.toUpperCase()) {
      case "SP":
        return 7.5;
      case "MG":
        return 12.5;
      case "RJ":
        return 10.5;
      default:
        return 10.0;
    }
  }
}

/* 4 - Reescrevendo classe Calculadora de Precos */

class Product {
  private value: number;
  private state: string;

  constructor(value: number, state: string) {
    this.value = value;
    this.state = state;
  }

  public getValue(): number {
    return this.value;
  }

  public getState(): string {
    return this.state;
  }
}

class PriceCalculator {
  private priceTable: PriceTable;
  private freightService: FreightService;

  constructor(priceTable: PriceTable, freightService: FreightService) {
    this.priceTable = priceTable;
    this.freightService = freightService;
  }

  public calculate(product: Product): number {
    const discount = this.priceTable.calculateDiscount(product.getValue());
    const freightValue = this.freightService.calculate(product.getState());

    return product.getValue() * (1 - discount) + freightValue;
  }
}

// Run
console.info("\nRun OCP 02: \n");

const commonFreight = new CommonFreight();
const cashPriceTable = new CashPriceTable();
const priceCalculator = new PriceCalculator(cashPriceTable, commonFreight);
const product = new Product(400, "MG");

const productFinalValue = priceCalculator.calculate(product);
console.info(`Product final value: ${getCurrencyLocaleStringBRL(productFinalValue)}`);
