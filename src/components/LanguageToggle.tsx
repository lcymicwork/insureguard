import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'zh-HK' : 'en')}
      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100"
    >
      <Globe className="w-4 h-4" />
      <span>{language === 'en' ? 'English' : '繁體中文'}</span>
    </button>
  );
}
