"use client";
import { useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";
import { Button } from "./ui/button";
import { LayoutContext } from "@/components/context"; // Adjust path as needed

const CookieConsent = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("LayoutContext must be used within a LayoutContext.Provider");
  }

  const { translations, isRTL } = context;

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = Cookies.get("cookieConsent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    Cookies.set("cookieConsent", "accepted", { expires: 365 });
    setVisible(false);
  };

  const rejectCookies = () => {
    Cookies.set("cookieConsent", "rejected", { expires: 365 });
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="fixed bottom-4 left-4 right-4 max-w-3xl mx-auto bg-gray-900 dark:bg-white text-gray-100 dark:text-gray-900 shadow-lg rounded-lg p-6 z-50 transition-all duration-300 animate-fadeIn"
    >
      <h2 className="text-xl font-semibold mb-2">{translations.cookieConsent.title}</h2>
      <p className="mb-4 text-sm leading-relaxed">{translations.cookieConsent.message}</p>
      <div>
      <div className={`flex gap-3 ${isRTL ? "justify-start flex-row-reverse" : "justify-end"}`}>
        <Button
          className="bg-gray-700 hover:bg-gray-800 text-white dark:bg-gray-300 dark:hover:bg-gray-400 dark:text-black"
        >
          Reject
        </Button>
        <Button
          className="bg-orange-500 hover:bg-orange-600 text-white dark:bg-orange-400 dark:hover:bg-orange-500 dark:text-black"
        >
          Accept
        </Button>
      </div>
      </div>
    </div>
  );
};

export default CookieConsent;
