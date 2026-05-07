import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function PinLogin() {
  const navigate = useNavigate();
  const { showToast } = useApp();
  const [pinVal, setPinVal] = useState('');

  function press(d) {
    if (pinVal.length >= 5) return;
    const np = pinVal + d;
    setPinVal(np);
    if (np.length === 5) {
      setTimeout(() => { showToast('Welcome back! 👋'); navigate('/home'); }, 300);
    }
  }
  function del() { setPinVal(p => p.slice(0, -1)); }

  return (
    <div style={styles.wrap}>
      <div style={styles.glow} />
      <div style={{ fontSize:44, marginBottom:12, position:'relative' }}>💎</div>
      <div style={styles.name}>Welcome back</div>
      <div style={styles.user}>Thabo Nkosi</div>
      <div style={styles.dots}>
        {Array.from({length:5}).map((_,i) => (
          <div key={i} style={{...styles.dot, background: i < pinVal.length ? 'var(--accent)' : 'transparent'}} />
        ))}
      </div>
      <div style={styles.hint}>Enter your PIN</div>
      <div style={styles.pad}>
        {['1','2','3','4','5','6','7','8','9','','0','⌫'].map((k,i) => (
          <button key={i}
            style={{...styles.key, ...(k==='' ? styles.keyEmpty : {})}}
            onClick={() => k==='⌫' ? del() : k!=='' ? press(k) : null}>
            {k}
          </button>
        ))}
      </div>
      <div style={styles.finger}>
        <i className="fa-solid fa-fingerprint" style={{fontSize:28, color:'var(--accent)', opacity:0.7}} />
        <div style={{fontSize:11, color:'rgba(255,255,255,0.35)', marginTop:6}}>Use biometric</div>
      </div>
      <p style={styles.back} onClick={() => navigate('/')}>← Different account</p>
    </div>
  );
}

const styles = {
  wrap:      { minHeight:'100vh', background:'linear-gradient(160deg,#0D2E7A,#1A4FBF,#0F8A60)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:24, position:'relative', overflow:'hidden' },
  glow:      { position:'absolute', width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle,rgba(23,168,118,0.2),transparent 70%)', top:'30%', left:'50%', transform:'translateX(-50%)', pointerEvents:'none' },
  name:      { fontFamily:'var(--font-display)', fontSize:28, color:'#fff', position:'relative' },
  user:      { fontSize:13, color:'rgba(255,255,255,0.4)', marginTop:4, marginBottom:32, position:'relative' },
  dots:      { display:'flex', gap:14, marginBottom:12, position:'relative' },
  dot:       { width:18, height:18, borderRadius:'50%', border:'2px solid var(--accent)', transition:'background 0.2s' },
  hint:      { fontSize:13, color:'rgba(255,255,255,0.3)', marginBottom:28, position:'relative' },
  pad:       { display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, maxWidth:280, width:'100%', position:'relative' },
  key:       { background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:18, padding:18, fontSize:20, fontWeight:500, color:'#fff', cursor:'pointer', fontFamily:'var(--font-body)' },
  keyEmpty:  { background:'transparent', border:'none', boxShadow:'none', cursor:'default' },
  finger:    { marginTop:32, display:'flex', flexDirection:'column', alignItems:'center', cursor:'pointer', position:'relative' },
  back:      { position:'absolute', bottom:32, fontSize:12, color:'rgba(255,255,255,0.25)', cursor:'pointer' },
};
