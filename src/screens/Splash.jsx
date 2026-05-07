import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Splash() {
  const navigate = useNavigate();
  return (
    <div style={styles.wrap}>
      <div style={styles.circle1} />
      <div style={styles.circle2} />
      <div style={styles.logo}>💎</div>
      <h1 style={styles.name}>iGugu</h1>
      <p style={styles.tag}>Your Treasure Bank</p>
      <button style={styles.btn} onClick={() => navigate('/onboard')}>Open Your Account</button>
      <p style={styles.login}>
        Already have an account?{' '}
        <span style={styles.loginLink} onClick={() => navigate('/pin-login')}>Sign in</span>
      </p>
    </div>
  );
}

const styles = {
  wrap: {
    minHeight: '100vh',
    background: 'linear-gradient(160deg, #0D2E7A 0%, #1A4FBF 50%, #0F8A60 100%)',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    position: 'relative', overflow: 'hidden',
  },
  circle1: { position:'absolute', width:320, height:320, borderRadius:'50%', background:'rgba(23,168,118,0.18)', top:-60, right:-60, pointerEvents:'none' },
  circle2: { position:'absolute', width:200, height:200, borderRadius:'50%', background:'rgba(255,255,255,0.06)', bottom:80, left:-50, pointerEvents:'none' },
  logo: { fontSize:72, animation:'pulse 2.2s ease-in-out infinite', marginBottom:16, position:'relative' },
  name: { fontFamily:'var(--font-display)', fontSize:52, color:'#fff', letterSpacing:3, position:'relative' },
  tag:  { fontSize:13, color:'rgba(255,255,255,0.55)', letterSpacing:'0.22em', textTransform:'uppercase', margin:'8px 0 56px', position:'relative' },
  btn:  { background:'var(--accent)', color:'#fff', border:'none', borderRadius:18, padding:'16px 52px', fontSize:16, fontWeight:700, fontFamily:'var(--font-body)', boxShadow:'var(--sh-accent)', cursor:'pointer', position:'relative' },
  login:     { marginTop:18, fontSize:13, color:'rgba(255,255,255,0.35)', position:'relative' },
  loginLink: { color:'#7DDFB8', textDecoration:'underline', cursor:'pointer' },
};
