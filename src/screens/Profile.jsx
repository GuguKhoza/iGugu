import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import BottomNav from '../components/BottomNav';

const MENU = [
  { icon:'fa-user-circle',   label:'Personal Details',    sub:'Name, ID, contact info' },
  { icon:'fa-bell',          label:'Notifications',       sub:'Push & SMS preferences' },
  { icon:'fa-shield-halved', label:'Security & PIN',      sub:'Change PIN, biometrics' },
  { icon:'fa-file-invoice',  label:'Statements',          sub:'Download your statements' },
  { icon:'fa-headset',       label:'Help & Support',      sub:'Chat, call, FAQs' },
  { icon:'fa-star',          label:'Rate iGugu',          sub:'Leave us a review' },
];

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout, showToast } = useApp();
  const name = user?.name || 'Thabo Nkosi';
  const initials = name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <div style={styles.wrap}>
      <div style={styles.scroll}>
        {/* Profile card */}
        <div style={styles.profileCard}>
          <div style={styles.avatar}>{initials}</div>
          <div style={styles.profileName}>{name}</div>
          <div style={styles.profileAcct}>iGugu Everyday Account · 4001 2938 7654</div>
          <div style={styles.profileBadge}>✦ Verified Customer</div>
        </div>

        {/* Stats */}
        <div style={styles.statsRow}>
          <div style={styles.statBox}>
            <div style={styles.statVal}>680</div>
            <div style={styles.statLbl}>Credit Score</div>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.statBox}>
            <div style={styles.statVal}>R25k</div>
            <div style={styles.statLbl}>Loan Offer</div>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.statBox}>
            <div style={styles.statVal}>3</div>
            <div style={styles.statLbl}>Pockets</div>
          </div>
        </div>

        {/* Menu */}
        {MENU.map((item, i) => (
          <div key={i} style={styles.menuItem} onClick={() => showToast(`${item.label} — coming soon!`)}>
            <div style={styles.menuIcon}>
              <i className={`fa-solid ${item.icon}`} style={{ color:'var(--accent)', fontSize:16 }} />
            </div>
            <div style={styles.menuText}>
              <div style={styles.menuLabel}>{item.label}</div>
              <div style={styles.menuSub}>{item.sub}</div>
            </div>
            <i className="fa-solid fa-chevron-right" style={{ color:'#CCC', fontSize:12 }} />
          </div>
        ))}

        {/* Logout */}
        <button style={styles.logoutBtn} onClick={handleLogout}>
          <i className="fa-solid fa-right-from-bracket" style={{ marginRight:8 }} />
          Sign Out
        </button>

        <div style={styles.version}>iGugu Bank v1.0.0 · NCR Registered</div>
      </div>
      <BottomNav />
    </div>
  );
}

const styles = {
  wrap: { minHeight:'100vh', background:'var(--offwhite)', display:'flex', flexDirection:'column' },
  scroll: { flex:1, overflowY:'auto', padding:'16px 16px 90px' },
  profileCard: { background:'linear-gradient(135deg,var(--deep),var(--primary2))', borderRadius:22, padding:'28px 24px', marginBottom:14, textAlign:'center' },
  avatar: { width:72, height:72, borderRadius:'50%', background:'var(--accent)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, fontWeight:700, color:'var(--deep)', margin:'0 auto 14px' },
  profileName: { fontFamily:'var(--font-display)', fontSize:22, color:'var(--white)' },
  profileAcct: { fontSize:12, color:'rgba(255,255,255,0.4)', marginTop:4 },
  profileBadge: { display:'inline-block', background:'rgba(23,168,118,0.2)', border:'1px solid rgba(23,168,118,0.3)', borderRadius:8, padding:'4px 14px', fontSize:11, color:'var(--gold-l)', marginTop:12 },
  statsRow: { background:'var(--card)', borderRadius:18, padding:'16px 8px', marginBottom:14, display:'flex', alignItems:'center', boxShadow:'var(--sh)', border:'1px solid var(--border)' },
  statBox: { flex:1, textAlign:'center' },
  statVal: { fontFamily:'var(--font-display)', fontSize:22, color:'var(--deep)' },
  statLbl: { fontSize:11, color:'var(--muted)', marginTop:2 },
  statDivider: { width:1, height:40, background:'var(--border)' },
  menuItem: { background:'var(--card)', borderRadius:16, padding:'14px 16px', marginBottom:8, display:'flex', alignItems:'center', gap:14, cursor:'pointer', boxShadow:'var(--sh)', border:'1px solid var(--border)' },
  menuIcon: { width:40, height:40, borderRadius:12, background:'var(--accent-pale)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 },
  menuText: { flex:1 },
  menuLabel: { fontSize:14, fontWeight:500, color:'var(--txt)' },
  menuSub: { fontSize:11, color:'var(--muted)', marginTop:2 },
  logoutBtn: { width:'100%', background:'var(--red-l)', color:'var(--red)', border:'1px solid rgba(176,58,46,0.2)', borderRadius:16, padding:14, fontSize:14, fontWeight:600, marginTop:8, marginBottom:12, cursor:'pointer' },
  version: { fontSize:11, color:'var(--muted)', textAlign:'center' },
};
