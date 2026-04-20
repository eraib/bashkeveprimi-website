import { useTranslation } from "react-i18next";
import clsx from "clsx";

const LANGS = [
  { code: "sq", label: "SQ" },
  { code: "en", label: "EN" },
] as const;

type Props = {
  variant?: "header" | "drawer";
};

const LanguageSwitcher = ({ variant = "header" }: Props) => {
  const { i18n } = useTranslation();
  const current = i18n.language;

  return (
    <div
      className={clsx(
        "flex items-center rounded-full border",
        variant === "header"
          ? "border-[#00CFD0]/30 bg-white/60"
          : "border-[#00CFD0]/30 bg-white/40",
      )}>
      {LANGS.map(({ code, label }, idx) => (
        <button
          key={code}
          onClick={() => i18n.changeLanguage(code)}
          aria-pressed={current === code}
          className={clsx(
            "text-[11px] font-bold tracking-widest transition-all duration-200 select-none",
            "px-2.5 py-1 rounded-full",
            current === code
              ? "bg-[#00CFD0] text-white shadow-sm"
              : "text-[#3A1700]/50 hover:text-[#3A1700]/80",
            idx === 0 ? "ml-0.5" : "mr-0.5",
          )}>
          {label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
