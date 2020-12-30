import { Locales } from "../../enum/locales";
import { CurrencyLocale } from "../../enum/currency-locales";

export function getCurrencyLocaleStringBRL(amount: number): string {
  return amount.toLocaleString(Locales.PTBR, { style: "currency", currency: CurrencyLocale.PTBR });
}
