"use client";

import { useState, useEffect, useContext } from "react";
import { LayoutContext } from "@/components/context";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const CookieConsent = () => {
  const context = useContext(LayoutContext);
  const router = useRouter();

  const [visible, setVisible] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    try {
      const consent = localStorage.getItem("cookieConsent");
      console.log("🎯 CookieConsent localStorage:", consent); // ✅ DEBUG LOG

      if (consent === "accepted") {
        setVisible(false);
      } else {
        setVisible(true);
      }
    } catch (err) {
      console.error("❌ Error accessing localStorage:", err);
    }
  }, [hasMounted]);

  const acceptCookies = () => {
    try {
      localStorage.setItem("cookieConsent", "accepted");
      setVisible(false);
      console.log("✅ Cookie set to accepted");
    } catch (err) {
      console.error("❌ Error setting localStorage:", err);
    }
  };

  const goToTerms = () => {
    router.push("/cookies-policy");
  };

  if (!context || !visible) return null;

  const { translations, isRTL } = context;

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="fixed bottom-4 left-4 right-4 max-w-3xl mx-auto bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-lg rounded-lg p-6 z-50 transition-all duration-300"
    >
      <h2 className="text-xl font-semibold mb-2">
        {translations.cookieConsent.title}
      </h2>
      <p className="mb-4 text-sm">{translations.cookieConsent.message}</p>
      <div className={`flex gap-3 ${isRTL ? "justify-start flex-row-reverse" : "justify-between"}`}>
        <Button
          onClick={acceptCookies}
          className="bg-orange-500 hover:bg-orange-600 text-white dark:bg-orange-400 dark:text-black"
        >
          {translations.cookieConsent.accept}
        </Button>
        <Button
          onClick={goToTerms}
          className="bg-gray-700 hover:bg-gray-800 text-white dark:bg-gray-200 dark:text-black"
        >
          {translations.cookieConsent.terms || "Terms & Conditions"}
        </Button>
      </div>
    </div>
  );
};

export default CookieConsent;
