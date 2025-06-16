import { translations } from "../i18n/translations";

export const languages = {
  fr: "Français",
  en: "English",
} as const;

export type Language = keyof typeof languages;

export const defaultLanguage: Language = "fr";

export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split("/");
  if (lang in languages) return lang as Language;
  return defaultLanguage;
}

export function getLocalizedPath(path: string, lang: Language): string {
  if (lang === defaultLanguage) {
    return path;
  }
  return `/${lang}${path}`;
}

export function t(lang: Language, key: string): string {
  const keys = key.split(".");
  let value: any = translations[lang];

  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = value[k];
    } else {
      return key; // Retourne la clé si la traduction n'est pas trouvée
    }
  }

  return value;
}
