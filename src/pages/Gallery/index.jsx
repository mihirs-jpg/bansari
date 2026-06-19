import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PageHeader from '../../components/common/PageHeader';
import Reveal from '../../components/common/Reveal';
import TiltCard from '../../components/common/TiltCard';
import CountUp from '../../components/common/CountUp';
import { useParallax } from '../../hooks/useTilt3D';
import './Gallery.css';

/* ── Real images for gallery items ─────────────────────────── */
const galleryImages = [
  { label: 'Classroom session',      cat: 'Education',   img: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600&h=400&fit=crop&q=80',  height: 280 },
  { label: 'Art workshop',           cat: 'Education',   img: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&h=340&fit=crop&q=80',  height: 230 },
  { label: 'Computer lab',           cat: 'Education',   img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=440&fit=crop&q=80',  height: 310 },
  { label: 'Health camp',            cat: 'Health',      img: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&h=380&fit=crop&q=80',  height: 260 },
  { label: 'Medicine distribution',  cat: 'Health',      img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop&q=80',  height: 280 },
  { label: 'Skills training',        cat: 'Women',       img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=360&fit=crop&q=80',  height: 240 },
  { label: 'Tailoring unit',         cat: 'Women',       img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=420&fit=crop&q=80',  height: 300 },
  { label: 'Plantation drive',       cat: 'Environment', img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=380&fit=crop&q=80',  height: 260 },
  { label: 'Graduation day',         cat: 'Events',      img: 'https://images.unsplash.com/photo-1544531585-9847b68c8c86?w=600&h=440&fit=crop&q=80',  height: 310 },
  { label: 'Award ceremony',         cat: 'Events',      img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=340&fit=crop&q=80',  height: 230 },
  { label: 'Reading club',           cat: 'Education',   img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=380&fit=crop&q=80',  height: 260 },
  { label: 'Village community meeting', cat: 'Events',   img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop&q=80',  height: 280 },
];

const videoGallery = [
  { img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=340&fit=crop&q=80', title: 'Shiksha Daan – A Year in Review',          duration: '4:32', cat: 'Education',   views: '2.1K' },
  { img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=340&fit=crop&q=80', title: 'Rekha\'s Journey: From Training to Business', duration: '6:15', cat: 'Women',       views: '3.4K' },
  { img: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&h=340&fit=crop&q=80', title: 'Nirogi Gaon: Doctors in the Village',        duration: '3:58', cat: 'Health',      views: '1.8K' },
  { img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=340&fit=crop&q=80', title: '50,000 Trees: Harit Bharat Campaign',        duration: '5:20', cat: 'Environment', views: '2.7K' },
];

const beforeAfter = [
  {
    img1: 'https://images.unsplash.com/photo-1545126913-c8d4b53e3820?w=700&h=460&fit=crop&q=80',
    img2: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=700&h=460&fit=crop&q=80',
    label: 'Patan Village School',
    before: 'Tin-shed with 30 students, no electricity',
    after:  'Digital classroom, 120 students, broadband',
  },
  {
    img1: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=700&h=460&fit=crop&q=80',
    img2: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=700&h=460&fit=crop&q=80',
    label: 'Banaskantha Watershed',
    before: 'Barren land, drought-prone for 15 years',
    after:  '2,000 trees planted, water table restored',
  },
  {
    img1: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=700&h=460&fit=crop&q=80',
    img2: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&h=460&fit=crop&q=80',
    label: 'Mehsana Health Camp',
    before: 'No doctor within 40 km for 6 villages',
    after:  'Monthly mobile camps, 800+ patients served',
  },
];

const impactMoments = [
  { img: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&h=360&fit=crop&q=80', title: 'Sunita Tops District Exam',         desc: 'A Shiksha Daan student, once a dropout, topped the district essay competition.',             cat: 'Education'   },
  { img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=360&fit=crop&q=80', title: 'Shakti SHG Earns ₹5L Together',     desc: '12 women from one village collectively earned ₹5 lakhs from their food business.',             cat: 'Women'       },
  { img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=360&fit=crop&q=80', title: '10,000th Tree Planted',             desc: 'Volunteers and school children celebrated the milestone with the Forest Department.',          cat: 'Environment' },
  { img: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=360&fit=crop&q=80', title: 'Zero Malaria in Participating Villages', desc: 'Three villages reported zero malaria cases after our health camp series.',                  cat: 'Health'      },
];

const featuredAlbums = [
  { img: 'https://images.unsplash.com/photo-1544531585-9847b68c8c86?w=600&h=360&fit=crop&q=80', title: 'Annual Convocation 2025',    count: 48, tag: 'Events'      },
  { img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=360&fit=crop&q=80', title: 'Green Gujarat Drive 2025',  count: 62, tag: 'Environment' },
  { img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=360&fit=crop&q=80', title: 'Digital Classrooms Launch', count: 35, tag: 'Education'   },
];

const galleryStats = [
  { n: '1,200+', l: 'Photos Archived' },
  { n: '85',     l: 'Field Videos' },
  { n: '8',      l: 'Districts Covered' },
  { n: '7 yrs',  l: 'Documented' },
];

const cats = ['All', 'Education', 'Health', 'Environment', 'Events', 'Women'];

const catColors = {
  Education: 'var(--blue)', Health: 'var(--teal)', Environment: 'var(--green)',
  Events: 'var(--gold)', Women: '#e84393',
};

const TABS = [
  { key: 'photos',       label: 'Photos',          icon: (
    <svg viewBox="0 0 24 24" fill="none" className="gtab-icon"><rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.8"/><circle cx="8.5" cy="10" r="1.6" stroke="currentColor" strokeWidth="1.8"/><path d="M21 16.5l-5.4-5.2a2 2 0 0 0-2.7 0L5 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ) },
  { key: 'videos',       label: 'Videos',          icon: (
    <svg viewBox="0 0 24 24" fill="none" className="gtab-icon"><rect x="2.5" y="5.5" width="14" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.8"/><path d="M16.5 10.2l4.4-2.7a.6.6 0 0 1 .9.5v8a.6.6 0 0 1-.9.5l-4.4-2.7" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>
  ) },
  { key: 'before-after', label: 'Before & After',  icon: (
    <svg viewBox="0 0 24 24" fill="none" className="gtab-icon"><path d="M4 7a8 8 0 0 1 13-6.2M20 17a8 8 0 0 1-13 6.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M17 0.5v3.8h-3.8M7 23.5v-3.8h3.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ) },
  { key: 'moments',      label: 'Impact Moments',  icon: (
    <svg viewBox="0 0 24 24" fill="none" className="gtab-icon"><path d="M12 2l1.8 5.6L19.5 9l-5.7 1.4L12 16l-1.8-5.6L4.5 9l5.7-1.4L12 2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M19 15l.7 2.1L22 18l-2.3.9L19 21l-.7-2.1L16 18l2.3-.9L19 15z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>
  ) },
  { key: 'albums',       label: 'Albums',          icon: (
    <svg viewBox="0 0 24 24" fill="none" className="gtab-icon"><path d="M3 8a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>
  ) },
];

const panelVariants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -12, transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } },
};

/* ── Icons ─────────────────────────────────────────────────── */
const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="gvid-eye"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/></svg>
);
const PhotosIcon = () => (
  <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2.5" stroke="white" strokeWidth="1.8"/><circle cx="8.5" cy="10" r="1.6" stroke="white" strokeWidth="1.8"/><path d="M21 16.5l-5.4-5.2a2 2 0 0 0-2.7 0L5 19" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const ChevronIcon = ({ dir = 'left' }) => (
  <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
    <path d={dir === 'left' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'} stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M6 6l12 12M18 6L6 18" stroke="white" strokeWidth="2.2" strokeLinecap="round"/></svg>
);
const DragIcon = () => (
  <svg viewBox="0 0 24 24" fill="none"><path d="M9 6l-4 6 4 6M15 6l4 6-4 6" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

/* ── Before/After draggable slider ───────────────────────────── */
function BeforeAfterSlider({ item }) {
  const wrapRef = useRef(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(98, Math.max(2, pct)));
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      updateFromClientX(clientX);
    };
    const onUp = () => { dragging.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [updateFromClientX]);

  return (
    <div
      ref={wrapRef}
      className="gba-slider-wrap"
      onMouseDown={(e) => { dragging.current = true; updateFromClientX(e.clientX); }}
      onTouchStart={(e) => { dragging.current = true; updateFromClientX(e.touches[0].clientX); }}
    >
      <div className="gba-img-base">
        <img src={item.img2} alt="After" draggable={false} />
      </div>
      <div className="gba-img-clip" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={item.img1} alt="Before" draggable={false} />
      </div>

      <span className="gba-tag gba-tag-before">BEFORE</span>
      <span className="gba-tag gba-tag-after">AFTER</span>

      <div className="gba-handle" style={{ left: `${pos}%` }}>
        <div className="gba-handle-grip"><DragIcon /></div>
      </div>
    </div>
  );
}

/* ── Animated photo tile ──────────────────────────────────────── */
function PhotoTile({ item, index, onOpen }) {
  return (
    <Reveal direction="scale" delay={Math.min(index, 10) * 55}>
      <div
        className="gphoto-tile"
        onClick={onOpen}
      >
        <div className="gphoto-inner" style={{ height: item.height }}>
          <img className="gphoto-img" src={item.img} alt={item.label} loading="lazy" />
          <div className="gphoto-shine" />
          <span className="gphoto-badge" style={{ background: catColors[item.cat] || 'var(--blue)', animationDelay: `${0.2 + index * 0.03}s` }}>
            {item.cat}
          </span>
          <button className="gphoto-expand" aria-label="Expand photo" onClick={(e) => { e.stopPropagation(); onOpen(); }}>
            <svg viewBox="0 0 24 24" fill="none" width="14" height="14"><path d="M9 3H3v6M15 3h6v6M3 15v6h6M21 15v6h-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div className="gphoto-overlay">
            <span className="gphoto-label">{item.label}</span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Gallery() {
  const [active, setActive] = useState('All');
  const [tab, setTab]       = useState('photos');
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const orb1 = useParallax(0.4);
  const orb2 = useParallax(-0.3);

  useEffect(() => {
    const handlers = [orb1.handleScroll, orb2.handleScroll];
    const onScroll = () => handlers.forEach((h) => h());
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [orb1, orb2]);

  const filtered = active === 'All'
    ? galleryImages
    : galleryImages.filter(i => i.cat === active);

  const openLightbox = (item) => {
    const idx = filtered.findIndex(i => i === item);
    setLightboxIdx(idx);
  };
  const closeLightbox = () => setLightboxIdx(null);
  const stepLightbox = useCallback((dir) => {
    setLightboxIdx((prev) => {
      if (prev === null) return prev;
      const next = (prev + dir + filtered.length) % filtered.length;
      return next;
    });
  }, [filtered.length]);

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') stepLightbox(-1);
      if (e.key === 'ArrowRight') stepLightbox(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIdx, stepLightbox]);

  const lightboxItem = lightboxIdx !== null ? filtered[lightboxIdx] : null;

  return (
    <>
      <div className="gallery-header">
        <div className="gallery-header-orb gallery-header-orb-1" ref={orb1.ref}></div>
        <div className="gallery-header-orb gallery-header-orb-2" ref={orb2.ref}></div>
        <PageHeader
          title="Gallery"
          subtitle="Real moments, real impact — windows into the lives we touch together"
          crumb="Gallery"
        />
      </div>

      {/* ── TAB NAV ── */}
      <section className="gtabs-wrap">
        <div className="container">
          <div className="gtabs">
            {TABS.map(({ key, label, icon }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`gtab-btn${tab === key ? ' active' : ''}`}
              >
                {icon}
                {label}
                {tab === key && (
                  <motion.span layoutId="gtab-indicator" className="gtab-indicator" transition={{ type: 'spring', stiffness: 420, damping: 38 }} />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence mode="wait">
        {/* ════════════ PHOTOS TAB ════════════ */}
        {tab === 'photos' && (
          <motion.section
            key="photos"
            className="section gtab-panel"
            variants={panelVariants}
            initial="initial" animate="animate" exit="exit"
          >
            <div className="container">
              <div className="gfilter-row">
                {cats.map(c => (
                  <button
                    key={c}
                    className={`gfilter-pill${active === c ? ' active' : ''}`}
                    onClick={() => setActive(c)}
                  >
                    {active === c && (
                      <motion.span
                        layoutId="gfilter-bg"
                        className="gfilter-pill-bg"
                        style={{ background: c === 'All' ? 'linear-gradient(135deg, var(--blue), var(--teal))' : (catColors[c] || 'var(--blue)') }}
                        transition={{ type: 'spring', stiffness: 450, damping: 36 }}
                      />
                    )}
                    <span>{c}</span>
                  </button>
                ))}
              </div>
              <div className="gcount-row">
                <span className="gcount-dot" />
                {filtered.length} photos
              </div>

              <div className="ggrid">
                <AnimatePresence>
                  {filtered.map((item, i) => (
                    <PhotoTile key={item.label} item={item} index={i} onOpen={() => openLightbox(item)} />
                  ))}
                </AnimatePresence>
              </div>

              <div className="gstat-strip">
                {galleryStats.map((s, i) => (
                  <Reveal direction="up" delay={i * 80} key={s.l}>
                    <div className="gstat-item">
                      <div className="gstat-num"><CountUp target={s.n} /></div>
                      <div className="gstat-lbl">{s.l}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* ════════════ VIDEOS TAB ════════════ */}
        {tab === 'videos' && (
          <motion.section
            key="videos"
            className="section gtab-panel"
            variants={panelVariants}
            initial="initial" animate="animate" exit="exit"
          >
            <div className="container">
              <Reveal direction="up" className="section-header center">
                <div className="section-tag">Video Gallery</div>
                <h2 className="section-title">Stories in Motion</h2>
                <p className="section-sub" style={{ margin: '0 auto' }}>Watch the journeys of communities we serve, in their own words.</p>
              </Reveal>
              <div className="cards-grid">
                {videoGallery.map((v, i) => (
                  <Reveal direction="up" delay={i * 80} key={v.title}>
                    <TiltCard max={5} scale={1.012} className="gvid-card">
                      <div className="gvid-thumb-wrap">
                        <img className="gvid-thumb" src={v.img} alt={v.title} loading="lazy" />
                        <div className="gvid-tint" />
                        <span className="gvid-cat-badge" style={{ background: catColors[v.cat] || 'var(--blue)' }}>{v.cat}</span>
                        <div className="gvid-play">
                          <div className="gvid-play-btn">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--blue)"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                          </div>
                        </div>
                        <span className="gvid-duration">{v.duration}</span>
                      </div>
                      <div className="gvid-body">
                        <div className="card-tag">{v.cat}</div>
                        <h3 className="gvid-title">{v.title}</h3>
                        <p className="gvid-views"><EyeIcon />{v.views} views</p>
                        <div className="gvid-progress"><div className="gvid-progress-fill" /></div>
                      </div>
                    </TiltCard>
                  </Reveal>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* ════════════ BEFORE & AFTER TAB ════════════ */}
        {tab === 'before-after' && (
          <motion.section
            key="before-after"
            className="section gtab-panel"
            variants={panelVariants}
            initial="initial" animate="animate" exit="exit"
          >
            <div className="container">
              <Reveal direction="up" className="section-header center">
                <div className="section-tag">Transformation Stories</div>
                <h2 className="section-title">Before &amp; After</h2>
                <p className="section-sub" style={{ margin: '0 auto' }}>Drag the slider — seeing is believing.</p>
              </Reveal>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {beforeAfter.map((b, i) => (
                  <Reveal direction="up" delay={i * 90} key={b.label}>
                    <div className="gba-card">
                      <div className="gba-label-row">
                        <span className="gba-label">{b.label}</span>
                      </div>
                      <BeforeAfterSlider item={b} />
                      <div className="gba-caption-row">
                        <p className="gba-caption gba-caption-before">{b.before}</p>
                        <p className="gba-caption gba-caption-after">{b.after}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* ════════════ IMPACT MOMENTS TAB ════════════ */}
        {tab === 'moments' && (
          <motion.section
            key="moments"
            className="section gtab-panel"
            variants={panelVariants}
            initial="initial" animate="animate" exit="exit"
          >
            <div className="container">
              <Reveal direction="up" className="section-header center">
                <div className="section-tag">Impact Moments</div>
                <h2 className="section-title">Moments That Define Us</h2>
                <p className="section-sub" style={{ margin: '0 auto' }}>Milestones, breakthroughs, and everyday victories from the field.</p>
              </Reveal>
              <div className="cards-grid">
                {impactMoments.map((m, i) => (
                  <Reveal direction="up" delay={i * 80} key={m.title}>
                    <TiltCard max={6} scale={1.015} className="gmoment-card">
                      <div className="gmoment-img-wrap">
                        <img className="gmoment-img" src={m.img} alt={m.title} loading="lazy" />
                        <div className="gmoment-glow" />
                        <div className="gmoment-spark">
                          <svg viewBox="0 0 24 24" fill="none" width="15" height="15"><path d="M12 2l1.8 5.6L19.5 9l-5.7 1.4L12 16l-1.8-5.6L4.5 9l5.7-1.4L12 2z" fill="var(--gold)" /></svg>
                        </div>
                        <span className="gvid-cat-badge" style={{ background: catColors[m.cat] || 'var(--blue)', top: 'auto', bottom: 10, left: 'auto', right: 10 }}>{m.cat}</span>
                      </div>
                      <div className="gmoment-body">
                        <h3 className="gmoment-title">{m.title}</h3>
                        <p className="gmoment-desc">{m.desc}</p>
                      </div>
                    </TiltCard>
                  </Reveal>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* ════════════ ALBUMS TAB ════════════ */}
        {tab === 'albums' && (
          <motion.section
            key="albums"
            className="section gtab-panel"
            variants={panelVariants}
            initial="initial" animate="animate" exit="exit"
          >
            <div className="container">
              <Reveal direction="up" className="section-header center">
                <div className="section-tag">Featured Albums</div>
                <h2 className="section-title">Photo Collections</h2>
                <p className="section-sub" style={{ margin: '0 auto' }}>Curated albums from our most memorable moments and milestones.</p>
              </Reveal>
              <div className="cards-grid">
                {featuredAlbums.map((a, i) => (
                  <Reveal direction="up" delay={i * 80} key={a.title}>
                    <TiltCard max={6} scale={1.015} className="galbum-card">
                      <div className="galbum-cover">
                        <img className="galbum-img" src={a.img} alt={a.title} loading="lazy" />
                        <div className="galbum-fade" />
                        <span className="galbum-count"><PhotosIcon />{a.count} photos</span>
                        <span className="galbum-tag" style={{ background: catColors[a.tag] || 'var(--blue)' }}>{a.tag}</span>
                      </div>
                      <div className="galbum-body">
                        <h3 className="galbum-title">{a.title}</h3>
                        <span className="galbum-link">View Album <ChevronIcon dir="right" /></span>
                      </div>
                    </TiltCard>
                  </Reveal>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            className="glb-backdrop"
            onClick={closeLightbox}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button className="glb-close" onClick={closeLightbox} aria-label="Close"><CloseIcon /></button>
            {filtered.length > 1 && (
              <>
                <button className="glb-nav glb-prev" onClick={(e) => { e.stopPropagation(); stepLightbox(-1); }} aria-label="Previous"><ChevronIcon dir="left" /></button>
                <button className="glb-nav glb-next" onClick={(e) => { e.stopPropagation(); stepLightbox(1); }} aria-label="Next"><ChevronIcon dir="right" /></button>
              </>
            )}
            <motion.div
              className="glb-card"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={lightboxItem.img}
                  className="glb-img-wrap"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <img className="glb-img" src={lightboxItem.img} alt={lightboxItem.label} />
                </motion.div>
              </AnimatePresence>
              <div className="glb-footer">
                <div>
                  <div className="glb-meta-title">{lightboxItem.label}</div>
                  <div className="glb-meta-sub">{lightboxIdx + 1} of {filtered.length}</div>
                </div>
                <span className="glb-tag-badge" style={{ background: catColors[lightboxItem.cat] || 'var(--blue)' }}>{lightboxItem.cat}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
