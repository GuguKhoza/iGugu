import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Toast from './components/Toast';
import LoanModal from './components/LoanModal';

import Splash       from './screens/Splash';
import Onboard      from './screens/Onboard';
import PinLogin     from './screens/PinLogin';
import Home         from './screens/Home';
import Send         from './screens/Send';
import Pockets      from './screens/Pockets';
import Loans        from './screens/Loans';
import Transactions from './screens/Transactions';
import Profile      from './screens/Profile';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"             element={<Splash />} />
          <Route path="/onboard"      element={<Onboard />} />
          <Route path="/pin-login"    element={<PinLogin />} />
          <Route path="/home"         element={<Home />} />
          <Route path="/send"         element={<Send />} />
          <Route path="/pockets"      element={<Pockets />} />
          <Route path="/loans"        element={<Loans />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/profile"      element={<Profile />} />
          <Route path="*"             element={<Navigate to="/" />} />
        </Routes>
        <LoanModal />
        <Toast />
      </BrowserRouter>
    </AppProvider>
  );
}
