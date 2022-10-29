export interface CountryDataType {
    name: string;
    topLevelDomain?: (string)[] | null;
    alpha2Code: string;
    alpha3Code: string;
    callingCodes?: (string)[] | null;
    capital?: string | null;
    altSpellings?: (string)[] | null;
    subregion: string;
    region: string;
    population: number;
    latlng?: (number)[] | null;
    demonym: string;
    area?: number | null;
    timezones?: (string)[] | null;
    borders?: (string)[] | null;
    nativeName: string;
    numericCode: string;
    flags: Flags;
    currencies?: (CurrenciesEntity)[] | null;
    languages?: (LanguagesEntity)[] | null;
    translations: Translations;
    flag: string;
    regionalBlocs?: (RegionalBlocsEntity)[] | null;
    cioc?: string | null;
    independent: boolean;
    gini?: number | null;
  }
  export interface Flags {
    svg: string;
    png: string;
  }
  export interface CurrenciesEntity {
    code: string;
    name: string;
    symbol: string;
  }
  export interface LanguagesEntity {
    iso639_1?: string | null;
    iso639_2: string;
    name: string;
    nativeName?: string | null;
  }
  export interface Translations {
    br: string;
    pt: string;
    nl: string;
    hr: string;
    fa?: string | null;
    de: string;
    es: string;
    fr: string;
    ja: string;
    it: string;
    hu: string;
  }
  export interface RegionalBlocsEntity {
    acronym: string;
    name: string;
    otherAcronyms?: (string)[] | null;
    otherNames?: (string)[] | null;
  }
  