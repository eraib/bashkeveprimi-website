import { createContext, useContext, useState, type ReactNode } from "react";
import type { DesignationType } from "./api";

interface DonationContextValue {
  isOpen: boolean;
  initialDesignation: DesignationType;
  initialSlug: string | undefined;
  openModal: (designation?: DesignationType, slug?: string) => void;
  closeModal: () => void;
}

const DonationContext = createContext<DonationContextValue | null>(null);

export function DonationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialDesignation, setInitialDesignation] =
    useState<DesignationType>("general");
  const [initialSlug, setInitialSlug] = useState<string | undefined>(
    undefined
  );

  const openModal = (
    designation: DesignationType = "general",
    slug?: string
  ) => {
    setInitialDesignation(designation);
    setInitialSlug(slug);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <DonationContext.Provider
      value={{ isOpen, initialDesignation, initialSlug, openModal, closeModal }}
    >
      {children}
    </DonationContext.Provider>
  );
}

export function useDonation() {
  const ctx = useContext(DonationContext);
  if (!ctx) throw new Error("useDonation must be used within DonationProvider");
  return ctx;
}
