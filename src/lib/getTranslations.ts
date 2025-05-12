// // lib/getTranslations.ts
// import { PortfolioJSON } from "@/types/translations";

// export async function getTranslations(language: string): Promise<PortfolioJSON> {
//   try {
//     const translationModule = await import(`@/app/translations/${language}.json`) as { default: PortfolioJSON };
//     return translationModule.default;
//   } catch (error) {
//     console.error(`Failed to load translations for ${language}:`, error);

//     // Return a default structure with empty or placeholder values
//     return {
//       header: { title: "Default Title", subtitle: "Default Subtitle" },
//       cookieConsent: { message: "This website uses cookies." },
//       main: { title: "Welcome to My Website", description: "This is the main content area." },
//       skills: [],
//       workExperience: [],
//       timeline: [],
//       footer: { text: "Default Footer Text" }
//     };
//   }
// }
