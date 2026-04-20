import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import sq from "./locales/sq.json";

export const SUPPORTED_LANGUAGES = [
  { code: "en", label: "English" },
  { code: "sq", label: "Shqip" },
] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]["code"];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      sq: { translation: sq },
    },
    fallbackLng: "sq",
    supportedLngs: ["en", "sq"],
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "lang",
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
