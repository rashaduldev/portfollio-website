"use client";
import { useEffect, useState, useContext } from "react";
import { Button } from "./ui/button";
import { LayoutContext } from "@/components/context"; // Adjust path as needed
import Link from "next/link";
import { useRouter } from "next/navigation";

const CookieConsent = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("LayoutContext must be used within a LayoutContext.Provider");
  }

  const { translations, isRTL } = context;
  const router = useRouter();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (consent !== "accepted") {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setVisible(false);
  };

  const goToTerms = () => {
    router.push("/cookies-policy");
  };

  if (!visible) return null;

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="fixed bottom-4 left-4 right-4 max-w-3xl mx-auto bg-gray-900 dark:bg-white text-gray-100 dark:text-gray-900 shadow-lg rounded-lg p-6 z-50 transition-all duration-300 animate-fadeIn"
    >
      <h2 className="text-xl font-semibold mb-2">{translations.cookieConsent.title}</h2>
      <p className="mb-4 text-sm leading-relaxed">{translations.cookieConsent.message}</p>

      <div className={`flex gap-3 ${isRTL ? "justify-start flex-row-reverse" : "justify-between"}`}>
        {/* Accept Button */}
        <Button
          onClick={acceptCookies}
          className="bg-orange-500 hover:bg-orange-600 text-white cursor-pointer dark:bg-orange-400 dark:hover:bg-orange-500 dark:text-black"
        >
          {translations.cookieConsent.accept}
        </Button>

        {/* Terms and Conditions Button */}
        <Button
        onClick={goToTerms}
        className="bg-gray-700 hover:bg-gray-800 text-white cursor-pointer dark:bg-gray-300 dark:hover:bg-gray-400 dark:text-black"
      >
        {translations?.cookieConsent?.terms || "Terms and Condition"}
      </Button>
      </div>
    </div>
  );
};

export default CookieConsent;
