import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { faqs } from '../../constants/data';
import Reveal from '../../components/common/Reveal';
import TiltCard from '../../components/common/TiltCard';

const categories = ['All', 'Donations', 'Volunteering', 'Corporate', 'General'];

const categorized = faqs.map((f, i) => ({
  ...f,
  cat: ['Donations', 'Donations', 'Volunteering', 'Corporate', 'General', 'General'][i] || 'General',
}));

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
};

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);
  const [activeCat, setActiveCat] = useState('All');
  const navigate = useNavigate();

  const filtered = activeCat === 'All' ? categorized : categorized.filter(f => f.cat === activeCat);

  return (
    <>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(145deg, #003d6b 0%, var(--blue) 50%, var(--teal) 100%)',
        padding: '5rem 0 4rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position:'absolute', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(244,197,66,0.18), transparent 70%)', top:'-20%', right:'-5%', animation:'floatY 10s ease-in-out infinite', pointerEvents:'none' }} />
        <div style={{ position:'absolute', width:250, height:250, borderRadius:'50%', background:'radial-gradient(circle, rgba(0,184,148,0.18), transparent 70%)', bottom:'-25%', left:'5%', animation:'floatYSlow 12s ease-in-out infinite', pointerEvents:'none' }} />
        <motion.div className="container" style={{ position:'relative', zIndex:1 }}
          initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.12 } } }}>
          <motion.div variants={fadeUp} style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', background:'rgba(255,255,255,0.12)', border:'1px solid rgba(255,255,255,0.2)', backdropFilter:'blur(10px)', padding:'0.4rem 1rem', borderRadius:'999px', fontSize:'0.75rem', fontWeight:700, letterSpacing:'1px', textTransform:'uppercase', color:'rgba(255,255,255,0.9)', marginBottom:'1rem' }}>
            ❓ FAQ
          </motion.div>
          <motion.h1 variants={fadeUp} style={{ color:'white', fontFamily:'var(--font-heading)', fontSize:'clamp(2rem,5vw,3.2rem)', fontWeight:900, marginBottom:'1rem', lineHeight:1.1 }}>
            Frequently Asked <span style={{ color:'var(--gold)' }}>Questions</span>
          </motion.h1>
          <motion.p variants={fadeUp} style={{ color:'rgba(255,255,255,0.75)', fontSize:'1rem', maxWidth:520, lineHeight:1.7 }}>
            Quick answers to help you understand and engage with Banshri. Can't find what you're looking for? Contact us directly.
          </motion.p>
        </motion.div>
      </section>

      {/* Category Filter */}
      <div style={{ background:'white', borderBottom:'1px solid rgba(0,91,154,0.08)', padding:'1rem 0', position:'sticky', top:0, zIndex:100, boxShadow:'0 2px 16px rgba(0,91,154,0.06)' }}>
        <div className="container" style={{ display:'flex', gap:'0.5rem', justifyContent:'center', flexWrap:'wrap' }}>
          {categories.map(cat => (
            <motion.button key={cat} onClick={() => { setActiveCat(cat); setOpenIdx(null); }}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              style={{
                padding: '0.5rem 1.2rem',
                borderRadius: '999px',
                border: activeCat === cat ? 'none' : '1.5px solid rgba(0,91,154,0.15)',
                background: activeCat === cat ? 'var(--blue)' : 'transparent',
                color: activeCat === cat ? 'white' : 'var(--dark)',
                fontWeight: 700,
                fontSize: '0.83rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}>
              {cat}
            </motion.button>
          ))}
        </div>
      </div>

      {/* FAQ List */}
      <section className="section">
        <div className="container" style={{ maxWidth: '760px' }}>
          <AnimatePresence mode="wait">
            <motion.div key={activeCat}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
              {filtered.map((f, i) => (
                <div key={i} style={{
                  background: 'white',
                  borderRadius: 18,
                  border: openIdx === i ? '1.5px solid rgba(0,91,154,0.2)' : '1.5px solid rgba(0,91,154,0.08)',
                  overflow: 'hidden',
                  boxShadow: openIdx === i ? '0 6px 28px rgba(0,91,154,0.1)' : '0 2px 12px rgba(0,91,154,0.05)',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}>
                  <div onClick={() => setOpenIdx(openIdx === i ? null : i)} style={{
                    display:'flex', alignItems:'center', justifyContent:'space-between',
                    padding:'1.2rem 1.5rem', cursor:'pointer', gap:'1rem', userSelect:'none',
                  }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'0.9rem' }}>
                      <div style={{ width:32, height:32, borderRadius:9, background:'rgba(0,91,154,0.07)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:'0.75rem', fontWeight:800, color:'var(--blue)', fontFamily:'var(--font-num)' }}>
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <span style={{ fontSize:'0.95rem', fontWeight:700, color:'var(--dark)', lineHeight:1.4 }}>{f.q}</span>
                    </div>
                    <motion.div animate={{ rotate: openIdx === i ? 45 : 0 }} transition={{ duration: 0.25 }}
                      style={{ width:32, height:32, borderRadius:'50%', background: openIdx === i ? 'var(--blue)' : 'rgba(0,91,154,0.08)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke={openIdx === i ? 'white' : 'var(--blue)'} strokeWidth="2.5" strokeLinecap="round">
                        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                      </svg>
                    </motion.div>
                  </div>
                  <AnimatePresence>
                    {openIdx === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: 'hidden' }}>
                        <div style={{ padding:'0 1.5rem 1.5rem 1.5rem', paddingLeft: '4.4rem', fontSize:'0.87rem', color:'var(--light)', lineHeight:1.8, borderTop:'1px solid rgba(0,91,154,0.06)', paddingTop:'1rem' }}>
                          {f.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Still Have Questions CTA */}
          <Reveal direction="up" delay={200}>
            <TiltCard max={5} scale={1.02} style={{ marginTop:'3rem', borderRadius:'24px' }}>
              <div style={{ background:'white', borderRadius:24, padding:'2.5rem', boxShadow:'0 8px 40px rgba(0,91,154,0.1)', border:'1px solid rgba(0,91,154,0.07)', textAlign:'center', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:4, background:'linear-gradient(90deg, var(--blue), var(--teal))' }} />
                <div style={{ width:60, height:60, borderRadius:'50%', background:'rgba(0,91,154,0.08)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 1.2rem', fontSize:'1.6rem' }}>💬</div>
                <h3 style={{ fontFamily:'var(--font-heading)', fontSize:'1.3rem', color:'var(--dark)', marginBottom:'0.6rem' }}>Still Have Questions?</h3>
                <p style={{ color:'var(--light)', marginBottom:'1.5rem', fontSize:'0.9rem', maxWidth:360, margin:'0 auto 1.5rem' }}>Our team is ready to personally help you with any questions not covered here.</p>
                <motion.button className="btn-primary" onClick={() => navigate('/contact')}
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem' }}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                  Contact Us Directly
                </motion.button>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </section>
    </>
  );
}