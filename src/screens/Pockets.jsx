import React from 'react';
import { useApp } from '../context/AppContext';
import BottomNav from '../components/BottomNav';

export default function Pockets() {
  const { pockets, showToast } = useApp();
  const total = pockets.reduce((a, p) => a + p.saved, 0);
  const avgRate = (pockets.reduce((a, p) => a + p.rate, 0) / pockets.length).toFixed(1);

  return (
    <div style={styles.wrap}>
      <div style={styles.scroll}>
        {/* Summary */}
        <div style={styles.summary}>
          <div>
            <div style={styles.sumLbl}>Total Savings</div>
            <div style={styles.sumVal}>R{total.toLocaleString('en-ZA')}</div>
          </div>
          <div style={styles.rateChip}>{avgRate}% p.a. avg</div>
        </div>

        {/* Pocket Cards */}
        {pockets.map(p => {
          const pct = Math.round((p.saved / p.goal) * 100);
          const monthlyInterest = ((p.saved * (p.rate / 100)) / 12).toFixed(0);
          return (
            <div key={p.id} style={styles.pocketCard}>
              <div style={styles.pckTop}>
                <div style={styles.pckLeft}>
                  <div style={{ ...styles.pckIcon, background: p.bg, color: p.ic }}>{p.icon}</div>
                  <div>
                    <div style={styles.pckName}>{p.name}</div>
                    <div style={styles.pckType}>{p.type} Savings · {p.rate}% p.a.</div>
                  </div>
                </div>
                <div style={{ textAlign:'right' }}>
                  <div style={styles.pckAmt}>R{p.saved.toLocaleString('en-ZA')}</div>
                  <div style={styles.pckInterest}>+R{monthlyInterest} this month</div>
                </div>
              </div>
              <div style={styles.pckBarBg}>
                <div style={{ ...styles.pckBarFill, width: `${pct}%`, background: p.ic }} />
              </div>
              <div style={styles.pckMeta}>
                <span>{pct}% of goal</span>
                <span>Goal: R{p.goal.toLocaleString('en-ZA')}</span>
              </div>
              <div style={styles.pckActions}>
                <button style={styles.pckBtnPrimary} onClick={() => showToast(`Added to ${p.name} 💰`)}>+ Add Funds</button>
                <button style={styles.pckBtnSecondary} onClick={() => showToast(`Withdrew from ${p.name}`)}>Withdraw</button>
              </div>
            </div>
          );
        })}

        {/* Add Pocket */}
        <button style={styles.addPocket} onClick={() => showToast('New Pocket created! 🎯')}>
          + Create New Pocket
        </button>

        {/* Info */}
        <div style={styles.infoCard}>
          <div style={styles.infoTitle}>💡 How Pockets work</div>
          <div style={styles.infoText}>
            Pockets are separate savings goals linked to your iGugu account. Your money earns interest daily.
            Fixed Pockets earn more but have a notice period. Flexi Pockets can be accessed anytime.
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

const styles = {
  wrap: { minHeight:'100vh', background:'var(--offwhite)', display:'flex', flexDirection:'column' },
  scroll: { flex:1, overflowY:'auto', padding:'16px 16px 90px' },
  summary: { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 },
  sumLbl: { fontSize:12, color:'var(--muted)' },
  sumVal: { fontFamily:'var(--font-display)', fontSize:30, color:'var(--deep)' },
  rateChip: { background:'var(--accent-l)', color:'var(--accent)', fontSize:12, fontWeight:600, padding:'6px 14px', borderRadius:99 },
  pocketCard: { background:'var(--card)', borderRadius:20, padding:18, marginBottom:12, boxShadow:'var(--sh)', border:'1px solid var(--border)' },
  pckTop: { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 },
  pckLeft: { display:'flex', alignItems:'center', gap:10 },
  pckIcon: { width:42, height:42, borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 },
  pckName: { fontSize:15, fontWeight:600, color:'var(--txt)' },
  pckType: { fontSize:11, color:'var(--muted)' },
  pckAmt: { fontSize:16, fontWeight:700, color:'var(--txt)' },
  pckInterest: { fontSize:11, color:'var(--accent)', fontWeight:500 },
  pckBarBg: { height:6, background:'#EEE', borderRadius:99, overflow:'hidden', marginBottom:8 },
  pckBarFill: { height:'100%', borderRadius:99, transition:'width 0.5s ease' },
  pckMeta: { display:'flex', justifyContent:'space-between', fontSize:12, color:'var(--muted)', marginBottom:12 },
  pckActions: { display:'flex', gap:8 },
  pckBtnPrimary: { flex:1, background:'linear-gradient(135deg,var(--accent),#E8B86D)', color:'var(--deep)', border:'none', borderRadius:10, padding:'10px 0', fontSize:13, fontWeight:600 },
  pckBtnSecondary: { flex:1, background:'transparent', color:'var(--muted)', border:'1px solid #DDD', borderRadius:10, padding:'10px 0', fontSize:13 },
  addPocket: { width:'100%', background:'var(--card)', border:'2px dashed rgba(23,168,118,0.3)', borderRadius:20, padding:20, fontSize:14, color:'var(--accent)', fontWeight:500, marginBottom:14, cursor:'pointer' },
  infoCard: { background:'var(--accent-pale)', border:'1px solid rgba(23,168,118,0.2)', borderRadius:16, padding:16 },
  infoTitle: { fontSize:13, fontWeight:600, color:'var(--deep)', marginBottom:6 },
  infoText: { fontSize:12, color:'var(--muted)', lineHeight:1.7 },
};
