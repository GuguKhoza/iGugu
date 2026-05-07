import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import BottomNav from '../components/BottomNav';

export default function Send() {
  const navigate = useNavigate();
  const { beneficiaries, balance, sendMoney, showToast } = useApp();
  const [selectedBene, setSelectedBene] = useState(beneficiaries[0]);
  const [amtStr, setAmtStr] = useState('');

  const amt = parseFloat(amtStr) || 0;
  const fee = amt > 0 ? 2 : 0;
  const lowBal = amt > 0 && (balance - amt - fee) < 100;

  function pressNum(k) {
    if (k === 'del') { setAmtStr(s => s.slice(0, -1)); return; }
    if (k === '.' && amtStr.includes('.')) return;
    if (amtStr.length >= 8) return;
    setAmtStr(s => s + k);
  }

  function handleSend() {
    if (!amt) { showToast('Please enter an amount', 'warning'); return; }
    if (amt + fee > balance) { showToast('Insufficient funds ❌', 'error'); return; }
    const ok = sendMoney(selectedBene.name, amt);
    if (ok) {
      setAmtStr('');
      showToast(`💸 R${amt.toFixed(2)} sent to ${selectedBene.name}!`);
      setTimeout(() => navigate('/home'), 1000);
    }
  }

  return (
    <div style={styles.wrap}>
      <div style={styles.body}>
        {/* Header */}
        <div style={styles.hdr}>
          <button style={styles.backBtn} onClick={() => navigate('/home')}>
            <i className="fa-solid fa-arrow-left" />
          </button>
          <div style={styles.title}>Send Money</div>
        </div>

        {/* Beneficiaries */}
        <div style={styles.beneLabel}>Recent Beneficiaries</div>
        <div style={styles.beneList}>
          {beneficiaries.map(b => (
            <div key={b.id} style={styles.beneItem} onClick={() => setSelectedBene(b)}>
              <div style={{ ...styles.beneAvatar, background: `linear-gradient(135deg,${b.color1},${b.color2})`, boxShadow: selectedBene.id===b.id ? `0 0 0 2px var(--accent)` : 'none' }}>
                {b.initials}
              </div>
              <div style={styles.beneName}>{b.name.split(' ')[0]}</div>
            </div>
          ))}
          <div style={styles.beneItem} onClick={() => showToast('Beneficiary saved! ☁️')}>
            <div style={styles.addBene}><i className="fa-solid fa-plus" /></div>
            <div style={styles.beneName}>Add New</div>
          </div>
        </div>

        <div style={styles.sendingTo}>
          Sending to: <span style={{ color:'var(--accent)', fontWeight:600 }}>{selectedBene.name}</span>
          <div style={{ fontSize:11, color:'var(--muted)', marginTop:2 }}>{selectedBene.bank} · {selectedBene.acct}</div>
        </div>

        {/* Amount */}
        <div style={styles.amtDisplay}>
          <span style={{ fontSize:22, color:'var(--muted)', fontWeight:300 }}>R </span>
          <span style={{ fontFamily:'var(--font-display)', fontSize:56, color:'var(--deep)', letterSpacing:-2 }}>{amtStr || '0'}</span>
        </div>

        {/* Fee warning */}
        {lowBal && (
          <div style={styles.feeWarn}>
            ⚠️ This will leave your balance below R100. A R{fee} PayShap fee applies.
          </div>
        )}
        {amt > 0 && !lowBal && (
          <div style={styles.feeInfo}>PayShap fee: R{fee}.00 · Total deducted: R{(amt+fee).toFixed(2)}</div>
        )}

        {/* Numpad */}
        <div style={styles.numpad}>
          {['1','2','3','4','5','6','7','8','9','.','0','del'].map((k) => (
            <button key={k} style={styles.numKey} onClick={() => pressNum(k)}>
              {k === 'del' ? <i className="fa-solid fa-delete-left" style={{ color:'var(--red)' }} /> : k}
            </button>
          ))}
        </div>

        <button style={{ ...styles.sendBtn, opacity: !amt ? 0.5 : 1 }} onClick={handleSend}>
          Send to {selectedBene.name} →
        </button>
      </div>
      <BottomNav />
    </div>
  );
}

const styles = {
  wrap: { minHeight:'100vh', background:'var(--white)', display:'flex', flexDirection:'column' },
  body: { flex:1, padding:24, overflowY:'auto', paddingBottom:90 },
  hdr: { display:'flex', alignItems:'center', gap:12, marginBottom:24 },
  backBtn: { width:36, height:36, borderRadius:10, background:'var(--offwhite)', border:'none', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', fontSize:14, color:'var(--txt)' },
  title: { fontFamily:'var(--font-display)', fontSize:22, color:'var(--deep)' },
  beneLabel: { fontSize:12, fontWeight:600, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:10 },
  beneList: { display:'flex', gap:12, overflowX:'auto', paddingBottom:6, marginBottom:16 },
  beneItem: { display:'flex', flexDirection:'column', alignItems:'center', gap:6, cursor:'pointer', minWidth:56 },
  beneAvatar: { width:50, height:50, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, fontWeight:600, color:'var(--deep)', transition:'box-shadow 0.2s' },
  beneName: { fontSize:10, color:'var(--muted)', textAlign:'center' },
  addBene: { width:50, height:50, borderRadius:'50%', border:'2px dashed rgba(23,168,118,0.4)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:'var(--accent)', fontSize:18 },
  sendingTo: { fontSize:13, color:'var(--txt)', marginBottom:8 },
  amtDisplay: { textAlign:'center', margin:'20px 0' },
  feeWarn: { background:'#FFF8EC', border:'1px solid rgba(23,168,118,0.3)', borderRadius:10, padding:'10px 14px', fontSize:12, color:'var(--accent2)', marginBottom:12 },
  feeInfo: { fontSize:12, color:'var(--muted)', textAlign:'center', marginBottom:8 },
  numpad: { display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, maxWidth:300, margin:'0 auto 20px' },
  numKey: { background:'var(--offwhite)', border:'none', borderRadius:14, padding:16, fontSize:20, fontWeight:500, color:'var(--txt)', cursor:'pointer', fontFamily:'var(--font-body)' },
  sendBtn: { width:'100%', background:'linear-gradient(135deg,var(--accent),#E8B86D)', color:'var(--deep)', border:'none', borderRadius:18, padding:16, fontSize:15, fontWeight:700, boxShadow:'var(--sh-gold)' },
};
