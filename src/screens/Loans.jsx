import React from 'react';
import { useApp } from '../context/AppContext';
import BottomNav from '../components/BottomNav';

const LOAN_TYPES = [
  { icon:'🏠', name:'Home Loan',       range:'R50k – R1.5m', rate:'From 11.5% p.a.' },
  { icon:'🚗', name:'Vehicle Finance', range:'R30k – R500k', rate:'From 12.0% p.a.' },
  { icon:'📱', name:'Device Loan',     range:'R500 – R15k',  rate:'From 24.0% p.a.' },
  { icon:'🎓', name:'Study Loan',      range:'R2k – R80k',   rate:'From 18.5% p.a.' },
];

export default function Loans() {
  const { setLoanModalOpen, showToast } = useApp();

  return (
    <div style={styles.wrap}>
      <div style={styles.scroll}>
        <div style={styles.pageHdr}>
          <div style={styles.pageSub}>Loan Centre</div>
          <div style={styles.pageTitle}>Your iGugu Offers</div>
        </div>

        {/* Pre-approved offer */}
        <div style={styles.offerCard}>
          <div style={styles.offerGlow} />
          <div style={styles.offerBadge}>✦ Pre-Approved — No Paperwork</div>
          <div style={styles.offerName}>Personal Loan</div>
          <div style={styles.offerSub}>Based on your account history & credit score</div>
          <div style={styles.offerAmt}>R25,000</div>
          <div style={styles.offerDetail}>27.5% p.a. · 12–60 months · Funds in 15 minutes</div>
          <button style={styles.offerBtn} onClick={() => setLoanModalOpen(true)}>
            Apply Now — 1 Tap →
          </button>
        </div>

        {/* Active loans */}
        <div style={styles.sectionTitle}>Your Active Loans</div>
        <div style={styles.activeLoan}>
          <div style={styles.alTop}>
            <div>
              <div style={styles.alName}>Personal Loan</div>
              <div style={styles.alDate}>Opened Mar 2025 · 15 months left</div>
            </div>
            <div style={{ textAlign:'right' }}>
              <div style={styles.alAmt}>R18,500</div>
              <div style={styles.alSub}>outstanding</div>
            </div>
          </div>
          <div style={styles.alBarBg}><div style={styles.alBarFill} /></div>
          <div style={styles.alMeta}>
            <span>Next payment: R1,200 on 1 Jun</span>
            <span style={{ color:'var(--accent)' }}>55% paid</span>
          </div>
        </div>

        {/* More products */}
        <div style={styles.sectionTitle}>More Products</div>
        <div style={styles.typeGrid}>
          {LOAN_TYPES.map(lt => (
            <div key={lt.name} style={styles.typeCard} onClick={() => showToast(`${lt.name} — coming soon!`)}>
              <div style={styles.typeIcon}>{lt.icon}</div>
              <div style={styles.typeName}>{lt.name}</div>
              <div style={styles.typeRange}>{lt.range}</div>
              <div style={styles.typeRate}>{lt.rate}</div>
            </div>
          ))}
        </div>

        {/* NCA Disclaimer */}
        <div style={styles.disclaimer}>
          <i className="fa-solid fa-shield-halved" style={{ marginRight:6, color:'var(--accent)' }} />
          iGugu is a registered credit provider (NCR). All loans are subject to affordability assessment and credit approval. Responsible lending is our commitment.
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

const styles = {
  wrap: { minHeight:'100vh', background:'var(--offwhite)', display:'flex', flexDirection:'column' },
  scroll: { flex:1, overflowY:'auto', padding:'16px 16px 90px' },
  pageHdr: { marginBottom:16 },
  pageSub: { fontSize:12, color:'var(--muted)' },
  pageTitle: { fontFamily:'var(--font-display)', fontSize:26, color:'var(--deep)' },
  offerCard: { background:'linear-gradient(135deg,var(--deep),var(--primary2))', borderRadius:22, padding:22, marginBottom:16, position:'relative', overflow:'hidden' },
  offerGlow: { position:'absolute', bottom:-30, right:-30, width:150, height:150, background:'radial-gradient(circle,rgba(23,168,118,0.25),transparent 70%)', borderRadius:'50%' },
  offerBadge: { display:'inline-block', background:'rgba(23,168,118,0.2)', border:'1px solid rgba(23,168,118,0.3)', borderRadius:8, padding:'4px 12px', fontSize:11, color:'var(--gold-l)', marginBottom:12 },
  offerName: { fontFamily:'var(--font-display)', fontSize:24, color:'var(--white)', marginBottom:4 },
  offerSub: { fontSize:12, color:'rgba(255,255,255,0.4)', marginBottom:18 },
  offerAmt: { fontFamily:'var(--font-display)', fontSize:42, color:'var(--white)', marginBottom:4 },
  offerDetail: { fontSize:12, color:'rgba(255,255,255,0.4)' },
  offerBtn: { background:'var(--accent)', color:'var(--deep)', border:'none', borderRadius:12, padding:'12px 24px', fontSize:14, fontWeight:700, marginTop:16, cursor:'pointer' },
  sectionTitle: { fontSize:12, fontWeight:600, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:10, marginTop:4 },
  activeLoan: { background:'var(--card)', borderRadius:18, padding:16, marginBottom:16, boxShadow:'var(--sh)', border:'1px solid var(--border)' },
  alTop: { display:'flex', justifyContent:'space-between', marginBottom:12 },
  alName: { fontSize:14, fontWeight:600, color:'var(--txt)' },
  alDate: { fontSize:11, color:'var(--muted)', marginTop:2 },
  alAmt: { fontSize:18, fontWeight:700, color:'var(--txt)' },
  alSub: { fontSize:11, color:'var(--muted)' },
  alBarBg: { height:6, background:'#EEE', borderRadius:99, overflow:'hidden', marginBottom:8 },
  alBarFill: { height:'100%', width:'55%', background:'linear-gradient(to right,var(--accent),#6EDBB8)', borderRadius:99 },
  alMeta: { display:'flex', justifyContent:'space-between', fontSize:12, color:'var(--muted)' },
  typeGrid: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:16 },
  typeCard: { background:'var(--card)', borderRadius:18, padding:16, boxShadow:'var(--sh)', border:'1px solid var(--border)', cursor:'pointer', transition:'transform 0.2s' },
  typeIcon: { fontSize:26, marginBottom:8 },
  typeName: { fontSize:13, fontWeight:600, color:'var(--txt)' },
  typeRange: { fontSize:11, color:'var(--muted)', marginTop:2 },
  typeRate: { fontSize:11, color:'var(--accent)', fontWeight:500, marginTop:4 },
  disclaimer: { fontSize:11, color:'var(--muted)', lineHeight:1.7, background:'var(--card)', borderRadius:14, padding:14, border:'1px solid var(--border)' },
};
