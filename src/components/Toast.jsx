import React from 'react';
import { useApp } from '../context/AppContext';

export default function Toast() {
  const { toast } = useApp();
  if (!toast) return null;
  const bg = toast.type === 'error' ? 'var(--red)' : toast.type === 'warning' ? 'var(--accent)' : 'var(--teal)';
  return (
    <div style={{
      position: 'fixed', bottom: 90, left: '50%', transform: 'translateX(-50%)',
      background: bg, color: 'white',
      padding: '12px 22px', borderRadius: 14,
      fontSize: 13, fontWeight: 500,
      zIndex: 999, boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
      whiteSpace: 'nowrap', animation: 'fadeIn 0.2s ease',
      maxWidth: '90vw', textAlign: 'center',
    }}>
      {toast.msg}
    </div>
  );
}
