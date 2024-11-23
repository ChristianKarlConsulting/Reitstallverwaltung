import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  Bike, 
  Mountain, 
  BarChart2, 
  Bell, 
  Heart, 
  Users, 
  FileText, 
  Building 
} from 'lucide-react';

const Navigation = () => {
  const navItems = [
    { path: '/', icon: Home, text: 'Übersicht' },
    { path: '/belegungsplan', icon: Calendar, text: 'Belegungsplan' },
    { path: '/pferde', icon: Bike, text: 'Pferde' },
    { path: '/koppel', icon: Mountain, text: 'Koppel' },
    { path: '/berichte', icon: BarChart2, text: 'Berichte' },
    { path: '/neuigkeiten', icon: Bell, text: 'Neuigkeiten' },
    { path: '/gesundheit', icon: Heart, text: 'Gesundheit' },
    { path: '/reiter', icon: Users, text: 'Reiter' },
    { path: '/dokumente', icon: FileText, text: 'Dokumente' },
    { path: '/mein-stall', icon: Building, text: 'Mein Stall' },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Bike className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-800">ReitStall Manager</span>
          </div>
          <div className="hidden md:block">
            <div className="flex space-x-4">
              {navItems.map(({ path, icon: Icon, text }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`
                  }
                >
                  <Icon className="h-4 w-4 mr-1" />
                  {text}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;