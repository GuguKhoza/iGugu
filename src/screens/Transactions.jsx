import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import BottomNav from '../components/BottomNav';

const FILTERS = ['All','Money In','Money Out','Salary','PayShap','Bills','Airtime','Fees'];
const FILTER_MAP = { 'All':null,'Money In':'credit','Money Out':'debit','Salary':'salary','PayShap':'payshap','Bills':'bill','Airtime':'airtime','Fees':'fee' };

function groupByMonth(txns) {
  const groups = {};
  txns.forEach(t => {
    const key = new Date(t.date).toLocaleString('en-ZA', { month:'long', year:'numeric' });
    if (!groups[key]) groups[key] = [];
    groups[key].push(t);
  });
  return groups;
}

export default function Transactions() {
  const navigate = useNavigate();
  const { transactions, showToast } = useApp();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [openId, setOpenId] = useState(null);

  const filtered = useMemo(() => {
    return transactions.filter(t => {
      const fv = FILTER_MAP[filter];
      const matchFilter = !fv || (fv==='credit'&&t.type==='credit') || (fv==='debit'&&t.type==='debit') || t.cat===fv.toLowerCase();
      const q = search.toLowerCase();
      const matchSearch = !q || t.name.toLowerCase().includes(q) || t.ref?.toLowerCase().includes(q) || t.amt.toString().includes(q);
      return matchFilter && matchSearch;
    });
  }, [transactions, filter, search]);

  const groups = useMemo(() => groupByMonth(filtered), [filtered]);
  const totalIn  = filtered.filter(t=>t.type==='credit').reduce((a,t)=>a+t.amt,0);
  const totalOut = filtered.filter(t=>t.type==='debit').reduce((a,t)=>a+t.amt,0);
  const net = totalIn - totalOut;

  function exportCSV() {
    const rows = [['Date','Name','Category','Type','Amount','Fee','Reference']];
    transactions.forEach(t => rows.push([t.date,t.name,t.cat,t.type,t.amt,t.fee||0,t.ref||'']));
    const csv = rows.map(r=>r.join(',')).join('\n');
    const blob = new Blob([csv], { type:'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href=url; a.download='iGugu_statement.csv'; a.click();
    showToast('📥 Statement downloaded');
  }

  return (
    <div style={styles.wrap}>
      {/* Sticky Header */}
      <div style={styles.stickyHdr}>
        <div style={styles.hdrTop}>
          <button style={styles.backBtn} onClick={() => navigate('/home')}>
            <i className="fa-solid fa-arrow-left" style={{ color:'rgba(255,255,255,0.7)' }} />
          </button>
          <div style={styles.hdrTitle}>Transaction History</div>
          <button style={styles.exportBtn} onClick={exportCSV}>
            <i className="fa-solid fa-download" style={{ color:'var(--gold-l)' }} />
          </button>
        </div>

        {/* Summary strip */}
        <div style={styles.summaryStrip}>
          {[['Money In', `R${totalIn.toLocaleString('en-ZA')}`, '#6EDBB8'],
            ['Money Out', `R${totalOut.toLocaleString('en-ZA')}`, '#F0948A'],
            ['Net', `${net>=0?'+':''}R${Math.abs(net).toLocaleString('en-ZA')}`, net>=0?'#6EDBB8':'#F0948A']
          ].map(([lbl,val,color]) => (
            <div key={lbl} style={styles.sumBox}>
              <div style={styles.sumLbl}>{lbl}</div>
              <div style={{ ...styles.sumVal, color }}>{val}</div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div style={styles.searchBox}>
          <i className="fa-solid fa-magnifying-glass" style={{ color:'rgba(255,255,255,0.35)', fontSize:14 }} />
          <input style={styles.searchInput} placeholder="Search transactions..."
            value={search} onChange={e => setSearch(e.target.value)} />
          {search && <i className="fa-solid fa-xmark" style={{ color:'rgba(255,255,255,0.4)', cursor:'pointer' }} onClick={() => setSearch('')} />}
        </div>

        {/* Filter tabs */}
        <div style={styles.filterTabs}>
          {FILTERS.map(f => (
            <button key={f} style={{ ...styles.ftab, ...(filter===f ? styles.ftabActive : {}) }} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
      </div>

      {/* Body */}
      <div style={styles.body}>
        {filtered.length === 0 ? (
          <div style={styles.empty}>
            <div style={{ fontSize:48, marginBottom:12 }}>🔍</div>
            <div style={styles.emptyTitle}>Nothing found</div>
            <div style={styles.emptySub}>Try a different search or filter</div>
          </div>
        ) : (
          Object.entries(groups).map(([month, txns]) => {
            const mnet = txns.reduce((a,t)=>t.type==='credit'?a+t.amt:a-t.amt,0);
            return (
              <div key={month} style={styles.monthGroup}>
                <div style={styles.monthLabel}>
                  <span>{month}</span>
                  <span style={{ color: mnet>=0?'var(--accent)':'var(--red)', fontWeight:600 }}>
                    {mnet>=0?'+':''}R{Math.abs(mnet).toLocaleString('en-ZA')}
                  </span>
                </div>
                {txns.map(t => (
                  <div key={t.id} style={styles.txnCard} onClick={() => setOpenId(openId===t.id ? null : t.id)}>
                    <div style={styles.txnMain}>
                      <div style={{ ...styles.txnIco, background:t.bg, color:t.ic }}>{t.icon}</div>
                      <div style={styles.txnInfo}>
                        <div style={styles.txnName}>{t.name}</div>
                        <div style={styles.txnMeta}>
                          {new Date(t.date).toLocaleDateString('en-ZA',{day:'numeric',month:'short',year:'numeric'})} · {t.channel}
                          {t.fee>0 && <span style={styles.feeBadge}>R{t.fee} fee</span>}
                        </div>
                      </div>
                      <div style={{ textAlign:'right' }}>
                        <div style={{ ...styles.txnAmt, color:t.type==='credit'?'var(--accent)':'var(--red)' }}>
                          {t.type==='credit'?'+':'-'}R{t.amt.toLocaleString('en-ZA',{minimumFractionDigits:2})}
                        </div>
                        <div style={styles.txnBal}>Bal: R{(4230 + Math.random()*500).toFixed(2)}</div>
                      </div>
                    </div>
                    {openId===t.id && (
                      <div style={styles.txnDetail} className="fade-in">
                        {[
                          ['Reference', t.ref || `TXN-${t.id}`],
                          ['Channel', t.channel],
                          ['Category', t.cat],
                          ['Amount', `${t.type==='credit'?'+':'-'}R${t.amt.toFixed(2)}`],
                          ['Service Fee', t.fee>0 ? `R${t.fee.toFixed(2)}` : 'R0.00 — Free ✓'],
                        ].map(([k,v]) => (
                          <div key={k} style={styles.detailRow}>
                            <span style={{ color:'var(--muted)' }}>{k}</span>
                            <span style={{ fontWeight:500, color: k==='Service Fee'&&t.fee>0?'var(--accent2)':k==='Service Fee'?'var(--accent)':'var(--txt)' }}>{v}</span>
                          </div>
                        ))}
                        {t.fee>0 && (
                          <div style={styles.feeExplain}>
                            ⓘ This R{t.fee} fee covers secure payment processing. No hidden charges — all fees are disclosed upfront by iGugu.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            );
          })
        )}
      </div>
      <BottomNav />
    </div>
  );
}

const styles = {
  wrap: { minHeight:'100vh', background:'var(--offwhite)', display:'flex', flexDirection:'column' },
  stickyHdr: { background:'var(--deep)', position:'sticky', top:0, zIndex:50 },
  hdrTop: { display:'flex', alignItems:'center', gap:12, padding:'16px 16px 0' },
  backBtn: { width:36,height:36,borderRadius:10,background:'rgba(255,255,255,0.08)',border:'none',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',fontSize:14 },
  hdrTitle: { fontFamily:'var(--font-display)', fontSize:20, color:'var(--white)', flex:1 },
  exportBtn: { width:36,height:36,borderRadius:10,background:'rgba(23,168,118,0.15)',border:'1px solid rgba(23,168,118,0.3)',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer' },
  summaryStrip: { display:'flex', gap:8, padding:'12px 16px' },
  sumBox: { flex:1, background:'rgba(255,255,255,0.06)', borderRadius:10, padding:'8px 10px', border:'1px solid rgba(23,168,118,0.1)' },
  sumLbl: { fontSize:10, color:'rgba(255,255,255,0.4)', textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:2 },
  sumVal: { fontSize:14, fontWeight:600 },
  searchBox: { background:'rgba(255,255,255,0.08)', border:'1px solid rgba(23,168,118,0.2)', borderRadius:12, display:'flex', alignItems:'center', gap:10, padding:'10px 14px', margin:'0 16px 10px' },
  searchInput: { background:'none', border:'none', outline:'none', color:'var(--white)', fontSize:14, flex:1, fontFamily:'var(--font-body)' },
  filterTabs: { display:'flex', gap:6, overflowX:'auto', padding:'0 16px 14px' },
  ftab: { flexShrink:0, padding:'6px 14px', borderRadius:99, fontSize:12, fontWeight:500, cursor:'pointer', border:'1px solid rgba(255,255,255,0.12)', color:'rgba(255,255,255,0.5)', background:'transparent', fontFamily:'var(--font-body)', whiteSpace:'nowrap' },
  ftabActive: { background:'var(--accent)', color:'var(--deep)', borderColor:'var(--accent)' },
  body: { flex:1, padding:'14px 14px 90px', overflowY:'auto' },
  empty: { textAlign:'center', padding:'48px 24px' },
  emptyTitle: { fontFamily:'var(--font-display)', fontSize:20, color:'var(--deep)', marginBottom:6 },
  emptySub: { fontSize:13, color:'var(--muted)' },
  monthGroup: { marginBottom:20 },
  monthLabel: { fontSize:11, fontWeight:600, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:8, display:'flex', justifyContent:'space-between' },
  txnCard: { background:'var(--card)', borderRadius:14, marginBottom:8, overflow:'hidden', boxShadow:'var(--sh)', border:'1px solid var(--border)', cursor:'pointer' },
  txnMain: { display:'flex', alignItems:'center', gap:12, padding:14 },
  txnIco: { width:38, height:38, borderRadius:11, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, flexShrink:0 },
  txnInfo: { flex:1, minWidth:0 },
  txnName: { fontSize:14, fontWeight:500, color:'var(--txt)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' },
  txnMeta: { fontSize:11, color:'var(--muted)', marginTop:2, display:'flex', gap:6, alignItems:'center' },
  feeBadge: { background:'#FFF3CD', color:'#856404', fontSize:10, padding:'1px 7px', borderRadius:99, fontWeight:500 },
  txnAmt: { fontSize:14, fontWeight:600 },
  txnBal: { fontSize:10, color:'var(--muted)', marginTop:2 },
  txnDetail: { background:'#F9F6EF', padding:'12px 14px', borderTop:'1px solid rgba(23,168,118,0.1)' },
  detailRow: { display:'flex', justifyContent:'space-between', fontSize:12, padding:'4px 0' },
  feeExplain: { background:'#FFF8EC', border:'1px solid rgba(23,168,118,0.25)', borderRadius:8, padding:'8px 10px', marginTop:8, fontSize:11, color:'var(--accent2)', lineHeight:1.6 },
};
