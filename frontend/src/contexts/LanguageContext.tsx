
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'fr' | 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    'nav.services': 'Services',
    'nav.pricing': 'Tarifs',
    'nav.contact': 'Contact',
    'nav.login': 'Connexion',
    'nav.register': 'Inscription',
    'nav.dashboard': 'Tableau de bord',
    'nav.createLetter': 'Créer une lettre',
    'nav.tracking': 'Suivi',
    'nav.history': 'Historique',
    'nav.profile': 'Profil',
    'nav.logout': 'Se déconnecter',
    'hero.title': 'Service de Lettres Recommandées',
    'hero.subtitle': 'Envoyez vos lettres importantes en toute sécurité',
    'hero.getStarted': 'Commencer',
    'footer.rights': 'Tous droits réservés',
    '404.title': 'Page non trouvée',
    '404.description': 'La page que vous recherchez semble avoir été déplacée, supprimée ou n\'existe pas.',
    '404.backHome': 'Retour à l\'accueil',
    'admin.title': 'Administration',
    'admin.users': 'Utilisateurs',
    'admin.letters': 'Lettres',
    'admin.statistics': 'Statistiques',
    'services.title': 'Nos Services',
    'pricing.title': 'Nos Tarifs',
    'contact.title': 'Contactez-nous',
    'letter.model': 'Modèle de lettre',
    'letter.object': 'Objet',
    'letter.recipient': 'Destinataire',
    'letter.writeWithAudio': 'Écrire avec audio',
    'letter.generateWithAI': 'Générer avec IA'
  },
  en: {
    'nav.services': 'Services',
    'nav.pricing': 'Pricing',
    'nav.contact': 'Contact',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.dashboard': 'Dashboard',
    'nav.createLetter': 'Create Letter',
    'nav.tracking': 'Tracking',
    'nav.history': 'History',
    'nav.profile': 'Profile',
    'nav.logout': 'Logout',
    'hero.title': 'Registered Letter Service',
    'hero.subtitle': 'Send your important letters securely',
    'hero.getStarted': 'Get Started',
    'footer.rights': 'All rights reserved',
    '404.title': 'Page Not Found',
    '404.description': 'The page you are looking for seems to have been moved, deleted or does not exist.',
    '404.backHome': 'Back to Home',
    'admin.title': 'Administration',
    'admin.users': 'Users',
    'admin.letters': 'Letters',
    'admin.statistics': 'Statistics',
    'services.title': 'Our Services',
    'pricing.title': 'Our Pricing',
    'contact.title': 'Contact Us',
    'letter.model': 'Letter Model',
    'letter.object': 'Subject',
    'letter.recipient': 'Recipient',
    'letter.writeWithAudio': 'Write with Audio',
    'letter.generateWithAI': 'Generate with AI'
  },
  ar: {
    'nav.services': 'الخدمات',
    'nav.pricing': 'الأسعار',
    'nav.contact': 'اتصل بنا',
    'nav.login': 'تسجيل الدخول',
    'nav.register': 'التسجيل',
    'nav.dashboard': 'لوحة التحكم',
    'nav.createLetter': 'إنشاء رسالة',
    'nav.tracking': 'التتبع',
    'nav.history': 'التاريخ',
    'nav.profile': 'الملف الشخصي',
    'nav.logout': 'تسجيل الخروج',
    'hero.title': 'خدمة الرسائل المسجلة',
    'hero.subtitle': 'أرسل رسائلك المهمة بأمان',
    'hero.getStarted': 'ابدأ الآن',
    'footer.rights': 'جميع الحقوق محفوظة',
    '404.title': 'الصفحة غير موجودة',
    '404.description': 'يبدو أن الصفحة التي تبحث عنها قد تم نقلها أو حذفها أو غير موجودة.',
    '404.backHome': 'العودة للرئيسية',
    'admin.title': 'الإدارة',
    'admin.users': 'المستخدمون',
    'admin.letters': 'الرسائل',
    'admin.statistics': 'الإحصائيات',
    'services.title': 'خدماتنا',
    'pricing.title': 'أسعارنا',
    'contact.title': 'اتصل بنا',
    'letter.model': 'نموذج الرسالة',
    'letter.object': 'الموضوع',
    'letter.recipient': 'المستلم',
    'letter.writeWithAudio': 'الكتابة بالصوت',
    'letter.generateWithAI': 'إنشاء بالذكاء الاصطناعي'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['fr']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
