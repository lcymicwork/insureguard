import React from 'react';
import { Shield, FileText, ClipboardList, User, HelpCircle, LogOut, Home, FileCheck, ToggleLeft, ToggleRight, PieChart, Users } from 'lucide-react';
import { useEnvironment } from '../context/EnvironmentContext';
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from './LanguageToggle';

interface SidebarProps {
  onNavigate: (page: 'dashboard' | 'policies' | 'claims' | 'analysis' | 'documents' | 'profile' | 'help' | 'family-link') => void;
  currentPage: string;
}

export default function Sidebar({ onNavigate, currentPage }: SidebarProps) {
  const { environment, toggleEnvironment } = useEnvironment();

  const navigationItems = [
    { icon: Home, label: 'Dashboard', value: 'dashboard' },
    { icon: Shield, label: 'Policies', value: 'policies' },
    { icon: ClipboardList, label: 'Claim Cases', value: 'claims' },
    { icon: PieChart, label: 'Analysis', value: 'analysis' },
    { icon: FileText, label: 'Documents', value: 'documents' },
    { icon: Users, label: 'Family Link', value: 'family-link' },
    { icon: User, label: 'My Profile', value: 'profile' },
    { icon: HelpCircle, label: 'Help', value: 'help' },
  ];

  return (
    <div className="bg-white border-r border-gray-200 text-secondary-600 w-64 min-h-screen p-4">
      <div className="flex items-center gap-2 mb-8">
        <Shield className="w-8 h-8 text-primary-600" />
        <div>
          <span className="text-xl font-bold text-primary-600">InsureGuard</span>
          <span className="text-xs block text-secondary-500">Insurance Manager</span>
        </div>
      </div>
      
      <nav className="space-y-1">
        {navigationItems.map(({ icon: Icon, label, value }) => (
          <button
            key={label}
            onClick={() => onNavigate(value as any)}
            className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
              currentPage === value
                ? 'bg-primary-50 text-primary-700 font-medium'
                : 'hover:bg-gray-50 text-secondary-600'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-8 pt-8 border-t border-gray-200">
        <LanguageToggle />
        
        {/* Environment Toggle */}
        <button
          onClick={toggleEnvironment}
          className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-50 mb-4"
        >
          {environment === 'demo' ? (
            <ToggleLeft className="w-5 h-5 text-secondary-400" />
          ) : (
            <ToggleRight className="w-5 h-5 text-primary-600" />
          )}
          <span className="text-sm font-medium">
            {environment === 'demo' ? 'Demo Mode' : 'Live Mode'}
          </span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 mb-6 px-3">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=40&h=40"
            alt="User profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium text-secondary-900">John Chan</p>
            <p className="text-xs text-secondary-500">Premium Member</p>
          </div>
        </div>

        <button className="flex items-center gap-3 w-full p-3 text-secondary-600 hover:bg-gray-50 rounded-lg transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
