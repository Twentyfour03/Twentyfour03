/**
 * Display currencies. Every price on the site is set, and charged, in
 * Ghana cedis; the others are shown as a guide for visitors in the markets
 * the agency works in.
 */
export const currencies = [
  { code: "GHS", label: "Ghana cedi", flag: "/flags/gh.svg", place: "Ghana", locale: "en-GH" },
  { code: "CNY", label: "Chinese yuan", flag: "/flags/cn.svg", place: "China", locale: "zh-CN" },
  { code: "AED", label: "UAE dirham", flag: "/flags/ae.svg", place: "UAE", locale: "en-AE" },
  { code: "EUR", label: "Euro", flag: "/flags/eu.svg", place: "Europe", locale: "en-IE" },
  { code: "GBP", label: "Pound sterling", flag: "/flags/gb.svg", place: "UK", locale: "en-GB" },
  { code: "USD", label: "US dollar", flag: "/flags/us.svg", place: "Elsewhere", locale: "en-US" },
] as const;

export type CurrencyCode = (typeof currencies)[number]["code"];
export type Rates = Record<CurrencyCode, number>;

/** One cedi in each currency on 9 October 2026. Used only if the live rates cannot be fetched. */
export const FALLBACK_RATES: Rates = {
  GHS: 1,
  CNY: 0.576669,
  AED: 0.315352,
  EUR: 0.0755,
  GBP: 0.064635,
  USD: 0.085875,
};

/** Live rates, refreshed twice a day. Never throws: falls back to the table above. */
export async function getRates(): Promise<Rates> {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/GHS", { next: { revalidate: 43200 } });
    const body = (await res.json()) as { result?: string; rates?: Record<string, number> };
    if (body.result !== "success" || !body.rates) return FALLBACK_RATES;
    const rates = { ...FALLBACK_RATES };
    for (const { code } of currencies) {
      const rate = body.rates[code];
      if (typeof rate === "number" && rate > 0) rates[code] = rate;
    }
    rates.GHS = 1;
    return rates;
  } catch {
    return FALLBACK_RATES;
  }
}

/** The currency a visitor most likely thinks in, read from their device's time zone. */
export function currencyForTimeZone(zone: string): CurrencyCode {
  if (zone === "Africa/Accra") return "GHS";
  if (zone === "Asia/Shanghai" || zone === "Asia/Hong_Kong" || zone === "Asia/Macau" || zone === "Asia/Urumqi") return "CNY";
  if (zone === "Asia/Dubai") return "AED";
  if (zone === "Europe/London" || zone === "Europe/Belfast") return "GBP";
  if (zone.startsWith("Europe/")) return "EUR";
  if (zone.startsWith("America/")) return "USD";
  return "GHS";
}

export function formatMoney(ghs: number, code: CurrencyCode, rates: Rates): string {
  const currency = currencies.find((c) => c.code === code) ?? currencies[0];
  const amount = ghs * (rates[code] ?? 1);
  if (code === "GHS") {
    return `GHS ${amount.toLocaleString("en-GH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return new Intl.NumberFormat(currency.locale, { style: "currency", currency: code, maximumFractionDigits: 0 }).format(amount);
}
