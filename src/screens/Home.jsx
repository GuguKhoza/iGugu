import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import BottomNav from '../components/BottomNav';

const ACTIONS = [
  { icon:'fa-paper-plane',   label:'Send',     bg:'var(--accent-pale)', ic:'var(--accent)',  path:'/send' },
  { icon:'fa-arrow-down',    label:'Receive',  bg:'var(--sky)',         ic:'var(--primary)', path:'/home' },
  { icon:'fa-bolt',          label:'PayShap',  bg:'var(--accent-pale)', ic:'var(--accent2)', path:'/send' },
  { icon:'fa-mobile-screen', label:'Airtime',  bg:'var(--sky)',         ic:'var(--primary)', path:'/home' },
  { icon:'fa-receipt',       label:'Pay Bill', bg:'var(--red-l)',       ic:'var(--red)',      path:'/home' },
];

export default function Home() {
  const navigate = useNavigate();
  const { user, balance, transactions, pockets, setLoanModalOpen, showToast } = useApp();

  const name     = user?.name || 'Thabo Nkosi';
  const firstName= name.split(' ')[0];
  const initials = name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase();
  const today    = new Date().toLocaleDateString('en-ZA', { weekday:'long', day:'numeric', month:'long' });
  const fmtBal   = balance.toLocaleString('en-ZA', { minimumFractionDigits:2, maximumFractionDigits:2 });
  const recent   = transactions.slice(0, 4);

  return (
    <div style={styles.wrap}>
      <div style={styles.scroll}>
        {/* Header */}
        <div style={styles.hdr}>
          <div>
            <div style={styles.hdrDate}>{today}</div>
            <div style={styles.hdrGreeting}>Good morning, <span style={{color:'var(--accent)'}}>{firstName}</span> 👋</div>
          </div>
          <div style={styles.hdrBtns}>
            <div style={styles.hdrBtn} onClick={() => showToast('No new notifications')}>
              <i className="fa-regular fa-bell" style={{color:'var(--primary)'}} />
              <div style={styles.notifDot} />
            </div>
            <div style={{...styles.hdrBtn, background:'var(--accent)', border:'none', color:'#fff', fontWeight:700, fontSize:14}}>
              {initials}
            </div>
          </div>
        </div>

        {/* Balance Card */}
        <div style={styles.balCard}>
          <div style={styles.balWave} />
          <div style={styles.balChip}>VISA ···· 4872</div>
          <div style={styles.balName}>{name}</div>
          <div style={styles.balLabel}>Available Balance</div>
          <div style={styles.balAmount}><span style={{fontSize:20,fontWeight:300,color:'rgba(255,255,255,0.7)'}}>R</span>{fmtBal}</div>
          <div style={styles.balAcct}>4001 2938 7654 · Updated just now</div>
        </div>

        {/* Pre-Approval Banner */}
        <div style={styles.paBanner} onClick={() => setLoanModalOpen(true)}>
          <div>
            <div style={styles.paBadge}>✦ Pre-Approved</div>
            <div style={styles.paTitle}>You qualify for R25,000</div>
            <div style={styles.paSub}>No paperwork · No branch visit</div>
          </div>
          <button style={styles.paBtn}>View →</button>
        </div>

        {/* Quick Actions */}
        <div style={styles.qaGrid}>
          {ACTIONS.map(a => (
            <div key={a.label} style={styles.qaBtn} onClick={() => navigate(a.path)}>
              <div style={{...styles.qaIcon, background:a.bg, color:a.ic}}>
                <i className={`fa-solid ${a.icon}`} style={{fontSize:15}} />
              </div>
              <div style={styles.qaLabel}>{a.label}</div>
            </div>
          ))}
        </div>

        {/* Credit Score */}
        <div style={styles.scoreCard}>
          <div style={styles.scoreRow}>
            <div><div style={styles.scoreLbl}>Credit Score</div><div style={styles.scoreVal}>680</div></div>
            <div style={styles.scoreBadge}>Good ↑</div>
          </div>
          <div style={styles.scoreBarBg}><div style={styles.scoreBarFill} /></div>
          <div style={styles.scoreRange}><span>300</span><span>850</span></div>
          <div style={styles.scoreTip}>↑ Up 22 pts this month · Pay 1 more debit order on time to unlock a better rate</div>
        </div>

        {/* Pockets preview */}
        <div style={styles.card}>
          <div style={styles.cardHdr}>
            <div style={styles.cardTitle}>My Pockets</div>
            <div style={styles.cardMore} onClick={() => navigate('/pockets')}>View all →</div>
          </div>
          {pockets.slice(0,2).map(p => (
            <div key={p.id} style={styles.pocketRow}>
              <div style={styles.pocketL}>
                <div style={{...styles.pocketIcon, background:p.bg, color:p.ic}}>{p.icon}</div>
                <div>
                  <div style={styles.pocketName}>{p.name}</div>
                  <div style={styles.pocketGoal}>Goal: R{p.goal.toLocaleString('en-ZA')}</div>
                </div>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={styles.pocketAmt}>R{p.saved.toLocaleString('en-ZA')}</div>
                <div style={styles.pocketBar}>
                  <div style={{...styles.pocketFill, width:`${Math.round(p.saved/p.goal*100)}%`, background:p.ic}} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Transactions */}
        <div style={styles.card}>
          <div style={styles.cardHdr}>
            <div style={styles.cardTitle}>Recent Transactions</div>
            <div style={styles.cardMore} onClick={() => navigate('/transactions')}>View all →</div>
          </div>
          {recent.map(t => (
            <div key={t.id} style={styles.txnRow}>
              <div style={styles.txnL}>
                <div style={{...styles.txnIcon, background:t.bg, color:t.ic}}>{t.icon}</div>
                <div>
                  <div style={styles.txnName}>{t.name}</div>
                  <div style={styles.txnDate}>{new Date(t.date).toLocaleDateString('en-ZA',{day:'numeric',month:'short'})}</div>
                </div>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{...styles.txnAmt, color:t.type==='credit'?'var(--accent)':'var(--red)'}}>
                  {t.type==='credit'?'+':'-'}R{t.amt.toLocaleString('en-ZA')}
                </div>
                {t.fee>0 && <div style={styles.txnFee}>R{t.fee} fee</div>}
              </div>
            </div>
          ))}
        </div>

        {/* Refer */}
        <div style={styles.refer}>
          <div>
            <div style={{fontSize:14,fontWeight:500,color:'var(--txt)'}}>💚 Invite a friend to iGugu</div>
            <div style={{fontSize:11,color:'var(--muted)',marginTop:2}}>Both get R50 when they open an account</div>
          </div>
          <button style={styles.referBtn} onClick={() => showToast('Share link copied! 🔗')}>Share Link</button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

const styles = {
  wrap:        { minHeight:'100vh', background:'var(--offwhite)', display:'flex', flexDirection:'column' },
  scroll:      { flex:1, overflowY:'auto', padding:'16px 16px 90px' },
  hdr:         { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 },
  hdrDate:     { fontSize:12, color:'var(--muted)' },
  hdrGreeting: { fontFamily:'var(--font-display)', fontSize:22, color:'var(--txt)' },
  hdrBtns:     { display:'flex', gap:8 },
  hdrBtn:      { width:36, height:36, borderRadius:10, background:'var(--card)', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', fontSize:14, boxShadow:'var(--sh)', position:'relative' },
  notifDot:    { position:'absolute', top:6, right:6, width:7, height:7, background:'var(--red)', borderRadius:'50%' },
  balCard:     { background:'linear-gradient(135deg,var(--primary3) 0%,var(--primary) 55%,#2060D0 100%)', borderRadius:22, padding:24, marginBottom:14, position:'relative', overflow:'hidden' },
  balWave:     { position:'absolute', bottom:-20, right:-20, width:160, height:160, background:'rgba(23,168,118,0.18)', borderRadius:'50%' },
  balChip:     { position:'absolute', top:20, right:20, background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.2)', borderRadius:8, padding:'4px 12px', fontSize:11, color:'rgba(255,255,255,0.85)' },
  balName:     { fontFamily:'var(--font-display)', fontSize:16, color:'rgba(255,255,255,0.9)', marginBottom:18 },
  balLabel:    { fontSize:10, color:'rgba(255,255,255,0.5)', textTransform:'uppercase', letterSpacing:'0.1em' },
  balAmount:   { fontSize:38, fontWeight:600, color:'#fff', letterSpacing:-1, margin:'3px 0' },
  balAcct:     { fontSize:11, color:'rgba(255,255,255,0.35)' },
  paBanner:    { background:'linear-gradient(135deg,var(--accent),var(--accent2))', borderRadius:18, padding:'16px 20px', display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14, cursor:'pointer', boxShadow:'var(--sh-accent)' },
  paBadge:     { fontSize:10, background:'rgba(255,255,255,0.25)', color:'#fff', padding:'3px 10px', borderRadius:99, fontWeight:600, textTransform:'uppercase', display:'inline-block', marginBottom:5 },
  paTitle:     { fontFamily:'var(--font-display)', fontSize:17, color:'#fff' },
  paSub:       { fontSize:11, color:'rgba(255,255,255,0.65)', marginTop:2 },
  paBtn:       { background:'rgba(255,255,255,0.2)', color:'#fff', border:'none', borderRadius:10, padding:'10px 14px', fontSize:13, fontWeight:600 },
  qaGrid:      { display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:8, marginBottom:14 },
  qaBtn:       { background:'var(--card)', border:'1px solid var(--border)', borderRadius:14, padding:'14px 6px', display:'flex', flexDirection:'column', alignItems:'center', gap:7, cursor:'pointer', boxShadow:'var(--sh)' },
  qaIcon:      { width:36, height:36, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center' },
  qaLabel:     { fontSize:10, fontWeight:500, color:'var(--txt)', textAlign:'center' },
  scoreCard:   { background:'linear-gradient(135deg,var(--primary),var(--primary2))', borderRadius:20, padding:18, marginBottom:14 },
  scoreRow:    { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 },
  scoreLbl:    { fontSize:10, color:'rgba(255,255,255,0.45)', textTransform:'uppercase', letterSpacing:'0.1em' },
  scoreVal:    { fontFamily:'var(--font-display)', fontSize:38, color:'#fff' },
  scoreBadge:  { background:'rgba(255,255,255,0.15)', borderRadius:8, padding:'4px 10px', fontSize:11, color:'rgba(255,255,255,0.8)' },
  scoreBarBg:  { height:5, background:'rgba(255,255,255,0.15)', borderRadius:99, overflow:'hidden', marginBottom:6 },
  scoreBarFill:{ height:'100%', width:'72%', background:'linear-gradient(to right,#7DDFB8,var(--accent))', borderRadius:99 },
  scoreRange:  { display:'flex', justifyContent:'space-between', fontSize:10, color:'rgba(255,255,255,0.35)' },
  scoreTip:    { fontSize:11, color:'rgba(255,255,255,0.5)', marginTop:10, lineHeight:1.6 },
  card:        { background:'var(--card)', borderRadius:20, padding:18, marginBottom:14, boxShadow:'var(--sh)', border:'1px solid var(--border)' },
  cardHdr:     { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 },
  cardTitle:   { fontSize:12, fontWeight:600, color:'var(--txt)', textTransform:'uppercase', letterSpacing:'0.08em' },
  cardMore:    { fontSize:12, color:'var(--primary)', cursor:'pointer', fontWeight:500 },
  pocketRow:   { display:'flex', alignItems:'center', justifyContent:'space-between', padding:'9px 0', borderBottom:'1px solid rgba(26,79,191,0.07)' },
  pocketL:     { display:'flex', alignItems:'center', gap:10 },
  pocketIcon:  { width:32, height:32, borderRadius:9, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14 },
  pocketName:  { fontSize:13, fontWeight:500, color:'var(--txt)' },
  pocketGoal:  { fontSize:10, color:'var(--muted)' },
  pocketAmt:   { fontSize:13, fontWeight:600, color:'var(--txt)' },
  pocketBar:   { height:3, width:56, background:'#EEE', borderRadius:99, marginTop:3, overflow:'hidden' },
  pocketFill:  { height:'100%', borderRadius:99 },
  txnRow:      { display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid rgba(26,79,191,0.07)' },
  txnL:        { display:'flex', alignItems:'center', gap:10 },
  txnIcon:     { width:34, height:34, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14 },
  txnName:     { fontSize:13, fontWeight:500, color:'var(--txt)' },
  txnDate:     { fontSize:10, color:'var(--muted)' },
  txnAmt:      { fontSize:13, fontWeight:600 },
  txnFee:      { fontSize:10, color:'var(--muted)' },
  refer:       { background:'var(--accent-pale)', border:'1px solid rgba(23,168,118,0.2)', borderRadius:18, padding:'16px 18px', display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 },
  referBtn:    { background:'var(--accent)', color:'#fff', border:'none', borderRadius:10, padding:'8px 14px', fontSize:12, fontWeight:600 },
};
