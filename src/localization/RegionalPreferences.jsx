import { createContext, useContext, useState } from 'react';

const storageKey = 'nyxr.website.region.v1';
// Currency identifiers come from this browser's bundled internationalization data.
const availableCurrencies = (() => {
  try {
    return Intl.supportedValuesOf('currency');
  } catch {
    return [
      'USD',
      'INR',
      'GBP',
      'EUR',
      'AUD',
      'CAD',
      'NZD',
      'CHF',
      'JPY',
      'CNY',
      'SGD',
      'AED',
      'BRL',
      'ZAR',
      'KRW',
      'HKD',
      'MYR',
      'IDR',
      'PHP',
      'PKR',
      'BDT',
    ];
  }
})();
// Display preferences only. Never treat a locale guess as verified billing residence.
const currencyRegions = {
  USD: 'US EC SV',
  INR: 'IN',
  GBP: 'GB',
  EUR: 'AT BE CY DE EE ES FI FR GR HR IE IT LT LU LV MT NL PT SI SK',
  AUD: 'AU',
  CAD: 'CA',
  NZD: 'NZ',
  CHF: 'CH LI',
  JPY: 'JP',
  CNY: 'CN',
  HKD: 'HK',
  TWD: 'TW',
  KRW: 'KR',
  SGD: 'SG',
  MYR: 'MY',
  IDR: 'ID',
  PHP: 'PH',
  THB: 'TH',
  VND: 'VN',
  BDT: 'BD',
  PKR: 'PK',
  LKR: 'LK',
  NPR: 'NP',
  BTN: 'BT',
  MVR: 'MV',
  AED: 'AE',
  SAR: 'SA',
  QAR: 'QA',
  KWD: 'KW',
  BHD: 'BH',
  OMR: 'OM',
  ILS: 'IL',
  JOD: 'JO',
  TRY: 'TR',
  NOK: 'NO',
  SEK: 'SE',
  DKK: 'DK',
  PLN: 'PL',
  CZK: 'CZ',
  HUF: 'HU',
  RON: 'RO',
  ISK: 'IS',
  UAH: 'UA',
  RSD: 'RS',
  RUB: 'RU',
  GEL: 'GE',
  AMD: 'AM',
  AZN: 'AZ',
  KZT: 'KZ',
  BRL: 'BR',
  MXN: 'MX',
  ARS: 'AR',
  CLP: 'CL',
  COP: 'CO',
  PEN: 'PE',
  UYU: 'UY',
  CRC: 'CR',
  ZAR: 'ZA',
  EGP: 'EG',
  NGN: 'NG',
  KES: 'KE',
  GHS: 'GH',
  MAD: 'MA',
  TND: 'TN',
  DZD: 'DZ',
  TZS: 'TZ',
  UGX: 'UG',
  ETB: 'ET',
  XOF: 'SN CI',
  XAF: 'CM',
  MUR: 'MU',
  DOP: 'DO',
  GTQ: 'GT',
};
const regionCurrency = Object.fromEntries(
  Object.entries(currencyRegions).flatMap(([currency, codes]) =>
    codes.split(' ').map((country) => [country, currency]),
  ),
);
const zoneRegions = {
  'Asia/Calcutta': 'IN',
  'Asia/Kolkata': 'IN',
  'Asia/Kathmandu': 'NP',
  'Asia/Katmandu': 'NP',
  'Asia/Dhaka': 'BD',
  'Asia/Karachi': 'PK',
  'Asia/Colombo': 'LK',
  'Asia/Dubai': 'AE',
  'Asia/Riyadh': 'SA',
  'Asia/Qatar': 'QA',
  'Asia/Tokyo': 'JP',
  'Asia/Seoul': 'KR',
  'Asia/Shanghai': 'CN',
  'Asia/Hong_Kong': 'HK',
  'Asia/Taipei': 'TW',
  'Asia/Singapore': 'SG',
  'Asia/Kuala_Lumpur': 'MY',
  'Asia/Jakarta': 'ID',
  'Asia/Manila': 'PH',
  'Asia/Bangkok': 'TH',
  'Asia/Ho_Chi_Minh': 'VN',
  'Asia/Saigon': 'VN',
  'Europe/London': 'GB',
  'Europe/Paris': 'FR',
  'Europe/Berlin': 'DE',
  'Europe/Rome': 'IT',
  'Europe/Madrid': 'ES',
  'Europe/Amsterdam': 'NL',
  'Europe/Dublin': 'IE',
  'Europe/Zurich': 'CH',
  'Europe/Stockholm': 'SE',
  'Europe/Oslo': 'NO',
  'Europe/Warsaw': 'PL',
  'Europe/Prague': 'CZ',
  'Europe/Istanbul': 'TR',
  'America/Toronto': 'CA',
  'America/Vancouver': 'CA',
  'America/New_York': 'US',
  'America/Chicago': 'US',
  'America/Denver': 'US',
  'America/Los_Angeles': 'US',
  'America/Phoenix': 'US',
  'America/Mexico_City': 'MX',
  'America/Sao_Paulo': 'BR',
  'America/Argentina/Buenos_Aires': 'AR',
  'Africa/Johannesburg': 'ZA',
  'Africa/Cairo': 'EG',
  'Africa/Lagos': 'NG',
  'Africa/Nairobi': 'KE',
  'Australia/Sydney': 'AU',
  'Australia/Melbourne': 'AU',
  'Australia/Perth': 'AU',
  'Australia/Brisbane': 'AU',
  'Pacific/Auckland': 'NZ',
};
const countryCodes =
  'AF AL DZ AS AD AO AI AQ AG AR AM AW AU AT AZ BS BH BD BB BY BE BZ BJ BM BT BO BQ BA BW BV BR IO BN BG BF BI CV KH CM CA KY CF TD CL CN CX CC CO KM CG CD CK CR CI HR CU CW CY CZ DK DJ DM DO EC EG SV GQ ER EE SZ ET FK FO FJ FI FR GF PF TF GA GM GE DE GH GI GR GL GD GP GU GT GG GN GW GY HT HM VA HN HK HU IS IN ID IR IQ IE IM IL IT JM JP JE JO KZ KE KI KP KR KW KG LA LV LB LS LR LY LI LT LU MO MG MW MY MV ML MT MH MQ MR MU YT MX FM MD MC MN ME MS MA MZ MM NA NR NP NL NC NZ NI NE NG NU NF MK MP NO OM PK PW PS PA PG PY PE PH PN PL PT PR QA RE RO RU RW BL SH KN LC MF PM VC WS SM ST SA SN RS SC SL SG SX SK SI SB SO ZA GS SS ES LK SD SR SJ SE CH SY TW TJ TZ TH TL TG TK TO TT TN TR TM TC TV UG UA AE GB US UM UY UZ VU VE VN VG VI WF EH YE ZM ZW'.split(
    ' ',
  );

function inferRegion() {
  let country = '';
  try {
    country = zoneRegions[Intl.DateTimeFormat().resolvedOptions().timeZone] || '';
  } catch {
    /* fall through */
  }
  if (!country)
    for (const language of navigator.languages || [navigator.language]) {
      try {
        const region = new Intl.Locale(language).region;
        if (countryCodes.includes(region)) {
          country = region;
          break;
        }
      } catch {
        /* invalid browser locale */
      }
    }
  return {
    country,
    currency: regionCurrency[country] || 'USD',
    source: country ? 'suggested' : 'default',
  };
}
function loadPreference() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (
      saved?.version === 1 &&
      (saved.country === '' || countryCodes.includes(saved.country)) &&
      availableCurrencies.includes(saved.currency)
    ) {
      new Intl.NumberFormat('en', { style: 'currency', currency: saved.currency });
      return { country: saved.country, currency: saved.currency, source: 'selected' };
    }
  } catch {
    /* storage unavailable or invalid */
  }
  return inferRegion();
}
const RegionalContext = createContext(null);
export function RegionalPreferences({ children }) {
  const [preference, setPreference] = useState(loadPreference);
  const update = (values) => {
    const next = { ...preference, ...values, source: 'selected' };
    setPreference(next);
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ version: 1, country: next.country, currency: next.currency }),
      );
    } catch {
      /* session-only fallback */
    }
  };
  const formatMoney = (amount, currency = preference.currency) =>
    new Intl.NumberFormat(navigator.language || 'en', {
      style: 'currency',
      currency,
      ...(amount === 0 ? { minimumFractionDigits: 0, maximumFractionDigits: 0 } : {}),
    }).format(amount);
  return (
    <RegionalContext.Provider value={{ ...preference, update, formatMoney }}>
      {children}
    </RegionalContext.Provider>
  );
}
export const useRegion = () => useContext(RegionalContext);

export function RegionSelector({ compact = false }) {
  const { country, currency, source, update } = useRegion();
  let names;
  try {
    names = new Intl.DisplayNames(navigator.languages, { type: 'region' });
  } catch {
    names = new Intl.DisplayNames(['en'], { type: 'region' });
  }
  const countries = countryCodes
    .map((code) => ({ code, name: names.of(code) || code }))
    .sort((a, b) => a.name.localeCompare(b.name));
  const currencies = availableCurrencies;
  return (
    <div className={`region-preference ${compact ? 'is-compact' : ''}`}>
      <div className="region-controls">
        <label>
          <span>Country / region</span>
          <select
            aria-label="Country / region"
            value={country}
            onChange={(e) =>
              update({ country: e.target.value, currency: regionCurrency[e.target.value] || 'USD' })
            }
          >
            <option value="">Choose your region</option>
            {countries.map(({ code, name }) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Display currency</span>
          <select
            aria-label="Display currency"
            value={currency}
            onChange={(e) => update({ currency: e.target.value })}
          >
            {currencies.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p>
        {source === 'suggested'
          ? 'Suggested from browser settings. You can change it.'
          : source === 'selected'
            ? 'Your display preference, saved on this device.'
            : 'Choose a region to personalize your display.'}
        {!compact && ' No GPS or third-party IP lookup. This does not set billing residence.'}
      </p>
    </div>
  );
}
