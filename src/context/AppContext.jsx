import React, { createContext, useContext, useState } from 'react';
import { TRANSACTIONS, POCKETS, BENEFICIARIES } from '../data/transactions';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null); // null = not logged in
  const [balance, setBalance] = useState(4230.85);
  const [transactions, setTransactions] = useState(TRANSACTIONS);
  const [pockets] = useState(POCKETS);
  const [beneficiaries] = useState(BENEFICIARIES);
  const [pin, setPin] = useState(null);
  const [loanModalOpen, setLoanModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  function showToast(msg, type = 'success') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }

  function register(name, idNumber, incomeType) {
    setUser({ name, idNumber, incomeType, creditScore: 680, preApproval: 25000 });
  }

  function login(pinAttempt) {
    // Demo: any 5-digit PIN works
    return pinAttempt.length === 5;
  }

  function logout() {
    setUser(null);
  }

  function sendMoney(to, amount) {
    const fee = 2;
    const total = amount + fee;
    if (total > balance) return false;
    setBalance(prev => parseFloat((prev - total).toFixed(2)));
    setTransactions(prev => [{
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      name: `PayShap — ${to}`,
      cat: 'payshap', type: 'debit',
      amt: amount, fee,
      icon: '⚡', bg: '#E3EEFB', ic: '#1A5FA8',
      ref: `PSP-${Math.floor(Math.random()*9000)+1000}`,
      channel: 'PayShap'
    }, ...prev]);
    return true;
  }

  function acceptLoan(amount) {
    setBalance(prev => parseFloat((prev + amount).toFixed(2)));
    setTransactions(prev => [{
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      name: `iGugu Loan Disbursement`,
      cat: 'salary', type: 'credit',
      amt: amount, fee: 0,
      icon: '🏦', bg: '#D4EDE7', ic: '#1A6B5A',
      ref: `LON-${Math.floor(Math.random()*9000)+1000}`,
      channel: 'iGugu'
    }, ...prev]);
  }

  return (
    <AppContext.Provider value={{
      user, balance, transactions, pockets, beneficiaries,
      pin, setPin, loanModalOpen, setLoanModalOpen, toast,
      register, login, logout, sendMoney, acceptLoan, showToast
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
