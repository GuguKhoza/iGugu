import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NAV = [
  { icon:'fa-house',                  path:'/home',         label:'Home' },
  { icon:'fa-arrow-right-arrow-left', path:'/send',         label:'Transact' },
  { icon:'fa-piggy-bank',             path:'/pockets',      label:'Pockets' },
  { icon:'fa-chart-line',             path:'/loans',        label:'Loans' },
  { icon:'fa-user',                   path:'/profile',      label:'Profile' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav style={styles.nav}>
      {NAV.map(item => {
        const active = pathname === item.path || (item.path==='/send' && pathname==='/transactions');
        return (
          <div key={item.path} style={styles.item} onClick={() => navigate(item.path)}>
            <i className={`fa-solid ${item.icon}`}
               style={{...styles.icon, color: active ? '#7DDFB8' : 'rgba(255,255,255,0.3)'}} />
            <span style={{...styles.label, color: active ? '#7DDFB8' : 'rgba(255,255,255,0.3)'}}>
              {item.label}
            </span>
          </div>
        );
      })}
    </nav>
  );
}

const styles = {
  nav:   { position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',width:'100%',maxWidth:420,background:'#0D2E7A',borderRadius:'20px 20px 0 0',padding:'12px 20px 22px',display:'flex',justifyContent:'space-around',zIndex:100 },
  item:  { display:'flex',flexDirection:'column',alignItems:'center',gap:3,cursor:'pointer',padding:'0 8px' },
  icon:  { fontSize:18,transition:'color 0.2s' },
  label: { fontSize:10,transition:'color 0.2s' },
};
