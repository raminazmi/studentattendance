import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { useSelector } from 'react-redux';
import {
  HomeIcon,
  ClipboardDocumentCheckIcon,
  UserGroupIcon,
  UsersIcon,
  BuildingLibraryIcon,
} from '@heroicons/react/24/outline';
import { translations } from '@translations';


export default function Sidebar({ role, className }) {
  const isDark = useSelector((state) => state.theme.darkMode === "dark");
  const language = useSelector((state) => state.language.current);
  const t = translations[language];
  const { url } = usePage();

 const navigation = role === "teacher"
    ? [
      { name: t['dashboard'], href: '/teacher/dashboard/home', icon: HomeIcon },
      { name: t['attendance'], href: '/teacher/dashboard/attendance', icon: ClipboardDocumentCheckIcon },
      { name: t['student_management'], href: '/teacher/dashboard/students', icon: UserGroupIcon },
    ]
    : [
      { name: t['dashboard'], href: '/admin/dashboard/home', icon: HomeIcon },
      { name: t['attendance'], href: '/admin/dashboard/attendance', icon: ClipboardDocumentCheckIcon },
      { name: t['teachers_management'], href: '/admin/dashboard/teachers', icon: UsersIcon },
      { name: t['classroom_management'], href: '/admin/dashboard/classes', icon: BuildingLibraryIcon },
      { name: t['student_management'], href: '/admin/dashboard/students', icon: UserGroupIcon },
    ];

  return (
    <div className={`flex flex-col min-w-[230px] ${className} ${isDark ? 'bg-DarkBG2' : 'bg-LightBG2'} border-gray-200`} style={{ height: "calc(100vh - 66px)" }}>
      <nav className="flex-1 px-2 py-6 space-y-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md
              ${url.startsWith(item.href) ? `text-primaryColor font-bold ${isDark ? 'bg-DarkBG1' : 'bg-LightBG3'}` : isDark ? 'text-TextLight hover:bg-DarkBG1' : 'text-TextDark hover:bg-LightBG3'}`}
          >
            <item.icon
              className={`${language === 'en' ? 'mr-3' : 'ml-3'} h-6 w-6 
                ${url.startsWith(item.href) ? 'text-primaryColor' : 'text-IconColor'}`}
              aria-hidden="true"
            />
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
