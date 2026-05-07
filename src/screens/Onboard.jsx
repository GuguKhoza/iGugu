import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const TOTAL = 5;

export default function Onboard() {
  const navigate = useNavigate();
  const { register, setPin, showToast } = useApp();
  const [step, setStep] = useState(1);
  const [idNumber, setIdNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [income, setIncome] = useState('');
  const [pinVal, setPinVal] = useState('');
  const [idValid, setIdValid] = useState(false);

  function handleID(val) {
    setIdNumber(val);
    if (/^\d{13}$/.test(val)) {
      setIdValid(true);
      if (!fullName) setFullName('Thabo Nkosi');
    } else {
      setIdValid(false);
    }
  }

  function next() {
    if (step === 2 && otp !== '123456') { showToast('Incorrect OTP. Try 123456', 'error'); return; }
    if (step < TOTAL) setStep(s => s + 1);
  }
  function back() { if (step > 1) setStep(s => s - 1); }

  function pressPin(d) {
    if (pinVal.length >= 5) return;
    const newPin = pinVal + d;
    setPinVal(newPin);
    if (newPin.length === 5) {
      setTimeout(() => {
        setPin(newPin);
        register(fullName, idNumber, income);
        showToast('🎉 Welcome to iGugu, ' + fullName.split(' ')[0] + '!');
        navigate('/home');
      }, 400);
    }
  }
  function delPin() { setPinVal(p => p.slice(0, -1)); }

  const incomeOpts = [
    { key:'salaried', icon:'🏢', label:'Salaried Employee' },
    { key:'self',     icon:'🛒', label:'Self-Employed' },
    { key:'casual',   icon:'🔧', label:'Casual / Part-time' },
    { key:'grant',    icon:'🏛️', label:'Government Grant' },
  ];

  return (
    <div style={styles.wrap}>
      {/* Progress dots */}
      <div style={styles.dots}>
        {Array.from({ length: TOTAL }).map((_, i) => (
          <div key={i} style={{ ...styles.dot, background: i < step ? 'var(--accent)' : '#EEE' }} />
        ))}
      </div>

      <div style={styles.body}>
        {/* STEP 1 — ID */}
        {step === 1 && (
          <div className="fade-up">
            <div style={styles.icon}>🪪</div>
            <h2 style={styles.title}>Let's start with your ID</h2>
            <p style={styles.sub}>Just your SA ID number — that's all we need to check your eligibility and find your best offer.</p>
            <Label>SA ID Number</Label>
            <input style={styles.field} type="tel" maxLength={13} placeholder="13-digit ID number"
              value={idNumber} onChange={e => handleID(e.target.value)} />
            {idValid && <p style={styles.idOk}>✓ Valid SA ID — pulling your details...</p>}
            <Label>Full Name</Label>
            <input style={styles.field} placeholder="As on your ID" value={fullName} onChange={e => setFullName(e.target.value)} />
            <Btn onClick={next} disabled={!idNumber || !fullName}>Continue →</Btn>
          </div>
        )}

        {/* STEP 2 — Contact */}
        {step === 2 && (
          <div className="fade-up">
            <div style={styles.icon}>📱</div>
            <h2 style={styles.title}>Your contact details</h2>
            <p style={styles.sub}>We'll send your OTP and account notifications here.</p>
            <Label>Mobile Number</Label>
            <input style={styles.field} type="tel" placeholder="07X XXX XXXX" value={phone} onChange={e => setPhone(e.target.value)} />
            <Label>Email (optional)</Label>
            <input style={styles.field} type="email" placeholder="your@email.com" />
            <Label>OTP</Label>
            <input style={styles.field} type="tel" maxLength={6} placeholder="6-digit OTP" value={otp} onChange={e => setOtp(e.target.value)} />
            <p style={styles.hint}>Demo: use <strong>123456</strong></p>
            <Btn onClick={next}>Verify & Continue →</Btn>
            <BackBtn onClick={back} />
          </div>
        )}

        {/* STEP 3 — Income */}
        {step === 3 && (
          <div className="fade-up">
            <div style={styles.icon}>💼</div>
            <h2 style={styles.title}>How do you earn?</h2>
            <p style={styles.sub}>One tap — this helps us calculate your instant pre-approval.</p>
            <div style={styles.incomeGrid}>
              {incomeOpts.map(o => (
                <div key={o.key} style={{ ...styles.incomeOpt, ...(income === o.key ? styles.incomeOptSel : {}) }}
                  onClick={() => setIncome(o.key)}>
                  <div style={styles.incomeIcon}>{o.icon}</div>
                  <div style={styles.incomeLabel}>{o.label}</div>
                </div>
              ))}
            </div>
            <Btn onClick={next} disabled={!income}>Continue →</Btn>
            <BackBtn onClick={back} />
          </div>
        )}

        {/* STEP 4 — Credit Result */}
        {step === 4 && (
          <div className="fade-up">
            <div style={styles.icon}>⚡</div>
            <h2 style={styles.title}>Here's your instant result</h2>
            <p style={styles.sub}>Based on your ID and credit bureau — no waiting, no paperwork.</p>
            <div style={styles.creditBox}>
              <div style={styles.crLabel}>Bureau Credit Score</div>
              <div style={styles.crScore}>680 <span style={styles.crBadge}>Good</span></div>
              <div style={styles.crSub}>TransUnion · Updated today</div>
            </div>
            <div style={styles.offerPill}>
              <div style={styles.opLabel}>✦ Pre-Approved Loan Offer</div>
              <div style={styles.opAmount}>R5,000 → R25,000</div>
              <div style={styles.opSub}>Adjust the amount later · 27.5% p.a.</div>
            </div>
            <Btn onClick={next}>Set Up My PIN →</Btn>
          </div>
        )}

        {/* STEP 5 — PIN */}
        {step === 5 && (
          <div className="fade-up" style={{ textAlign: 'center' }}>
            <div style={styles.icon}>🔐</div>
            <h2 style={styles.title}>Create your PIN</h2>
            <p style={styles.sub}>5-digit PIN to secure your iGugu account</p>
            <div style={styles.pinDots}>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} style={{ ...styles.pinDot, background: i < pinVal.length ? 'var(--accent)' : 'transparent' }} />
              ))}
            </div>
            <div style={styles.pinPad}>
              {['1','2','3','4','5','6','7','8','9','','0','⌫'].map((k, i) => (
                <button key={i} style={{ ...styles.pinKey, ...(k==='' ? {background:'transparent',border:'none',boxShadow:'none'} : {}) }}
                  onClick={() => k === '⌫' ? delPin() : k !== '' ? pressPin(k) : null}>
                  {k}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Label({ children }) {
  return <div style={{ fontSize:12,fontWeight:600,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'0.07em',marginBottom:6 }}>{children}</div>;
}
function Btn({ children, onClick, disabled }) {
  return (
    <button style={{ width:'100%',background: disabled ? '#CCC' : 'linear-gradient(135deg,var(--accent),#E8B86D)',color:'var(--deep)',border:'none',borderRadius:18,padding:15,fontSize:15,fontWeight:700,marginTop:8,boxShadow: disabled ? 'none' : 'var(--sh-gold)',cursor: disabled ? 'default' : 'pointer' }}
      onClick={disabled ? undefined : onClick} disabled={disabled}>{children}</button>
  );
}
function BackBtn({ onClick }) {
  return <button style={{ width:'100%',background:'none',border:'none',fontSize:13,color:'var(--muted)',padding:12,cursor:'pointer' }} onClick={onClick}>← Back</button>;
}

const styles = {
  wrap: { minHeight:'100vh',background:'var(--white)',display:'flex',flexDirection:'column' },
  dots: { display:'flex',gap:6,padding:'20px 24px 0' },
  dot: { height:4,flex:1,borderRadius:99,transition:'background 0.3s' },
  body: { flex:1,padding:24,display:'flex',flexDirection:'column' },
  icon: { fontSize:48,marginBottom:20 },
  title: { fontFamily:'var(--font-display)',fontSize:26,color:'var(--deep)',marginBottom:8,lineHeight:1.3 },
  sub: { fontSize:14,color:'var(--muted)',lineHeight:1.7,marginBottom:24 },
  field: { width:'100%',border:'1.5px solid #E5E0D8',borderRadius:12,padding:'14px 16px',fontSize:15,color:'var(--txt)',background:'var(--white)',outline:'none',marginBottom:14,transition:'border-color 0.2s' },
  idOk: { fontSize:12,color:'var(--accent)',marginTop:-10,marginBottom:14 },
  hint: { fontSize:12,color:'var(--muted)',marginTop:-10,marginBottom:16 },
  incomeGrid: { display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:20 },
  incomeOpt: { border:'1.5px solid #E5E0D8',borderRadius:12,padding:'16px 12px',textAlign:'center',cursor:'pointer',transition:'all 0.2s' },
  incomeOptSel: { borderColor:'var(--accent)',background:'var(--accent-pale)' },
  incomeIcon: { fontSize:26,marginBottom:6 },
  incomeLabel: { fontSize:13,fontWeight:500,color:'var(--txt)' },
  creditBox: { background:'linear-gradient(135deg,var(--accent),#0F4A3C)',borderRadius:18,padding:20,color:'var(--white)',marginBottom:16 },
  crLabel: { fontSize:11,color:'rgba(255,255,255,0.5)',textTransform:'uppercase',letterSpacing:'0.1em' },
  crScore: { fontFamily:'var(--font-display)',fontSize:44,color:'var(--white)',margin:'4px 0' },
  crBadge: { fontSize:14,background:'rgba(255,255,255,0.15)',borderRadius:8,padding:'3px 12px',fontFamily:'var(--font-body)' },
  crSub: { fontSize:12,color:'rgba(255,255,255,0.4)' },
  offerPill: { background:'var(--accent-pale)',border:'1.5px solid rgba(23,168,118,0.3)',borderRadius:16,padding:16,marginBottom:16 },
  opLabel: { fontSize:11,color:'var(--accent2)',textTransform:'uppercase',letterSpacing:'0.08em' },
  opAmount: { fontFamily:'var(--font-display)',fontSize:32,color:'var(--deep)' },
  opSub: { fontSize:12,color:'var(--muted)' },
  pinDots: { display:'flex',justifyContent:'center',gap:14,margin:'28px 0' },
  pinDot: { width:18,height:18,borderRadius:'50%',border:'2px solid var(--accent)',transition:'background 0.2s' },
  pinPad: { display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,maxWidth:280,margin:'0 auto' },
  pinKey: { background:'var(--white)',border:'1.5px solid var(--border)',borderRadius:18,padding:18,fontSize:20,fontWeight:500,color:'var(--txt)',cursor:'pointer',boxShadow:'var(--sh)',transition:'all 0.15s' },
};
