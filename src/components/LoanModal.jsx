import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function LoanModal() {
  const { loanModalOpen, setLoanModalOpen, acceptLoan, showToast } = useApp();
  const [amount, setAmount] = useState(15000);

  if (!loanModalOpen) return null;

  const rate = 0.275 / 12, n = 24;
  const monthly  = (amount * rate * Math.pow(1+rate,n)) / (Math.pow(1+rate,n)-1);
  const initFee  = Math.max(150, Math.min(1207.50 + (amount - 10000) * 0.05, 1500));
  const total    = (monthly * n) + initFee + (69 * n);
  const pct      = ((amount - 2000) / (25000 - 2000)) * 100;

  function handleAccept() {
    acceptLoan(amount);
    setLoanModalOpen(false);
    showToast(`💎 R${amount.toLocaleString('en-ZA')} landing in your account now!`);
  }

  return (
    <div style={s.overlay} onClick={() => setLoanModalOpen(false)}>
      <div style={s.modal} onClick={e => e.stopPropagation()} className="slide-up">
        <div style={s.handle} />
        <h2 style={s.title}>Your iGugu Offer</h2>
        <p style={s.sub}>No branch visit · Funds in 15 minutes · All fees upfront</p>

        <div style={s.offerBox}>
          <div style={s.ohLabel}>Pre-Approved Amount</div>
          <div style={s.ohAmount}>R{amount.toLocaleString('en-ZA')}</div>
          <div style={s.ohRate}>27.5% p.a. · 24 months · No hidden charges</div>
        </div>

        <div style={s.sliderLabel}>Adjust your amount</div>
        <input type="range" min={2000} max={25000} step={500} value={amount}
          onChange={e => setAmount(parseInt(e.target.value))}
          style={{ ...s.slider, background:`linear-gradient(to right,var(--accent) ${pct}%,#DDD ${pct}%)` }}
        />
        <div style={s.sliderRange}><span>R2,000</span><span>R25,000</span></div>

        <div style={s.breakdown}>
          {[
            ['Monthly instalment', `R${monthly.toFixed(2)}`],
            ['Term',               '24 months'],
            ['Initiation fee',     `R${initFee.toFixed(2)}`],
            ['Monthly admin fee',  'R69.00'],
            ['Total cost of credit',`R${total.toFixed(2)}`],
          ].map(([k,v],i) => (
            <div key={i} style={{...s.bdRow, ...(i===4?s.bdTotal:{})}}>
              <span style={{color:'var(--muted)'}}>{k}</span>
              <span style={{fontWeight:i===4?700:500}}>{v}</span>
            </div>
          ))}
        </div>

        <button style={s.acceptBtn} onClick={handleAccept}>
          <i className="fa-solid fa-fingerprint" style={{marginRight:8}} />Accept with Fingerprint
        </button>
        <button style={s.cancelBtn} onClick={() => setLoanModalOpen(false)}>Decide later</button>
        <p style={s.disclaimer}>All fees shown are final. No surprises. iGugu is NCR registered.</p>
      </div>
    </div>
  );
}

const s = {
  overlay:     { position:'fixed',inset:0,background:'rgba(10,22,40,0.65)',backdropFilter:'blur(4px)',zIndex:200,display:'flex',alignItems:'flex-end',justifyContent:'center' },
  modal:       { background:'var(--white)',borderRadius:'28px 28px 0 0',width:'100%',maxWidth:420,padding:'24px 24px 40px',maxHeight:'90vh',overflowY:'auto' },
  handle:      { width:40,height:4,background:'#DDD',borderRadius:99,margin:'0 auto 20px' },
  title:       { fontFamily:'var(--font-display)',fontSize:22,color:'var(--txt)',marginBottom:4 },
  sub:         { fontSize:13,color:'var(--muted)',marginBottom:20 },
  offerBox:    { background:'linear-gradient(135deg,var(--primary3),var(--primary),var(--accent2))',borderRadius:18,padding:20,marginBottom:18,textAlign:'center' },
  ohLabel:     { fontSize:10,color:'rgba(255,255,255,0.5)',textTransform:'uppercase',letterSpacing:'0.1em' },
  ohAmount:    { fontFamily:'var(--font-display)',fontSize:44,color:'#fff',margin:'4px 0' },
  ohRate:      { fontSize:12,color:'rgba(255,255,255,0.4)' },
  sliderLabel: { fontSize:11,fontWeight:600,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'0.07em',marginBottom:8 },
  slider:      { WebkitAppearance:'none',width:'100%',height:6,borderRadius:99,outline:'none',cursor:'pointer',marginBottom:4 },
  sliderRange: { display:'flex',justifyContent:'space-between',fontSize:11,color:'var(--muted)',marginBottom:16 },
  breakdown:   { background:'var(--sky)',borderRadius:14,padding:14,marginBottom:16 },
  bdRow:       { display:'flex',justifyContent:'space-between',fontSize:13,padding:'5px 0' },
  bdTotal:     { borderTop:'1px solid rgba(26,79,191,0.15)',paddingTop:10,marginTop:4 },
  acceptBtn:   { width:'100%',background:'var(--accent)',color:'#fff',border:'none',borderRadius:14,padding:16,fontSize:15,fontWeight:700,marginBottom:10,boxShadow:'var(--sh-accent)',cursor:'pointer',fontFamily:'var(--font-body)' },
  cancelBtn:   { width:'100%',background:'transparent',color:'var(--muted)',border:'1px solid #DDD',borderRadius:14,padding:13,fontSize:13,cursor:'pointer',fontFamily:'var(--font-body)' },
  disclaimer:  { fontSize:11,color:'var(--muted)',textAlign:'center',marginTop:12,lineHeight:1.6 },
};
