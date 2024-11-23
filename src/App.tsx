import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import Belegungsplan from './pages/Belegungsplan';
import PferdeUebersicht from './pages/PferdeUebersicht';
import Koppelstatus from './pages/Koppelstatus';
import Berichte from './pages/Berichte';
import Neuigkeiten from './pages/Neuigkeiten';
import Gesundheitsakten from './pages/Gesundheitsakten';
import ReiterUebersicht from './pages/ReiterUebersicht';
import Dokumente from './pages/Dokumente';
import MeinStall from './pages/MeinStall';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/belegungsplan" element={<Belegungsplan />} />
            <Route path="/pferde" element={<PferdeUebersicht />} />
            <Route path="/koppel" element={<Koppelstatus />} />
            <Route path="/berichte" element={<Berichte />} />
            <Route path="/neuigkeiten" element={<Neuigkeiten />} />
            <Route path="/gesundheit" element={<Gesundheitsakten />} />
            <Route path="/reiter" element={<ReiterUebersicht />} />
            <Route path="/dokumente" element={<Dokumente />} />
            <Route path="/mein-stall" element={<MeinStall />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;