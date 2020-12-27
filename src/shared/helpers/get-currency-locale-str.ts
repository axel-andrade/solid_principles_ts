import { Locales } from "../../enum/locales";
import { CurrencyLocale } from "../../enum/currency-locales";

export function getCurrencyLocaleString(amount: number, locale: Locales, currencyLocale: CurrencyLocale): string {
  return amount.toLocaleString(locale, { style: "currency", currency: currencyLocale });
}
