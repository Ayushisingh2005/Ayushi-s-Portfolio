import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────
   FONTS
───────────────────────────────────────── */
const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
`;

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const ROLES = [
  "Full-Stack Developer",
  "AI/ML Engineer",
  "Cloud-Native Builder",
  "LLM Integration Specialist",
  "Open to Opportunities ✦",
];

const SKILLS = {
  Languages:  ["Python","JavaScript","TypeScript","Java","C","SQL","HTML5/CSS3"],
  "AI & ML":  ["PyTorch","Scikit-learn","SpaCy","BERT","Groq LLMs","Gemini AI","Tesseract OCR","NLP"],
  Backend:    ["FastAPI","Django","Node.js","Flask","REST APIs","Docker"],
  Frontend:   ["React.js","Next.js 14","Tailwind CSS","Framer Motion","ReactFlow"],
  "Data Eng": ["NumPy","Pandas","BS4/HTTPX","ETL Pipelines","Deep Scraping"],
  Tools:      ["Git/GitHub","Vercel/Render","Agile/Scrum","CI/CD","Docker"],
};

const SKILL_COLORS = {
  Languages:  "#00F5FF",
  "AI & ML":  "#BD00FF",
  Backend:    "#00FF87",
  Frontend:   "#FF6B6B",
  "Data Eng": "#FF9F1C",
  Tools:      "#A8A8B3",
};

const PROJECTS = [
  {
    id: 0,
    name: "DevScope AI",
    sub: "Real-Time Code Auditor",
    desc: "Cloud-native code intelligence platform with instant security scoring, Big-O analysis, and persistent debt tracking — powered by Groq's Llama 3.3 70B LPU inference engine.",
    stack: ["React","FastAPI","Groq LLM","SQLite","Recharts"],
    metrics: ["65% faster reviews","500ms AI latency","90%+ speedup"],
    github: "https://github.com/Ayushisingh2005/DevScope_AI",
    live: "https://devscopeai.vercel.app/",
    icon: "🔍",
    color: "#7B61FF",
    glow: "rgba(123,97,255,0.5)",
  },
  {
    id: 1,
    name: "NeuroSEO",
    sub: "Predictive SEO Galaxy Engine",
    desc: "Enterprise SEO platform using BERT semantic analysis and an interactive Galaxy Playground visualizing internal link juice flow, rank gravity, and authority propagation as living orbits.",
    stack: ["Next.js 14","FastAPI","BERT","Groq","ReactFlow"],
    metrics: ["95% audit time cut","88% accuracy","Galaxy viz"],
    github: "https://github.com/Xynash/Neuro-Search-Engine-Optimization-Engine",
    live: "https://neuro-search-engine-optimization-en.vercel.app/",
    icon: "🌌",
    color: "#00F5FF",
    glow: "rgba(0,245,255,0.5)",
  },
  {
    id: 2,
    name: "LexiScript",
    sub: "Multi-Modal Intelligence Engine",
    desc: "Neural synthesis platform processing images, audio, video and PDFs — Gemini 1.5 Flash for vision, Groq Whisper-V3 for acoustics, Edge-TTS for multilingual neural speech output.",
    stack: ["Next.js 14","FastAPI","Gemini 1.5 Flash","Whisper-V3","Edge-TTS"],
    metrics: ["98% OCR accuracy","60% latency cut","5+ languages"],
    github: "https://github.com/Ayushisingh2005/Multi-Modal-AI-Extraction-Audio-Intelligence-Engine",
    live: "https://lexiscript.vercel.app/",
    icon: "🎧",
    color: "#FF006E",
    glow: "rgba(255,0,110,0.5)",
  },
  {
    id: 3,
    name: "WeatherBot",
    sub: "Forecast App + Telegram Bot",
    desc: "Real-time weather intelligence with 5-day city-level forecasts and a Telegram bot delivering push alerts and on-demand weather updates for any location worldwide.",
    stack: ["Python Flask","OpenWeatherMap API","Telegram Bot API","HTML/CSS/JS"],
    metrics: ["Real-time data","5-day forecast","Push alerts"],
    github: "https://github.com/Ayushisingh2005/Weather-Forecasting-Web-App-with-Telegram-Bot-Integration",
    live: null,
    icon: "⛈️",
    color: "#FF9F1C",
    glow: "rgba(255,159,28,0.5)",
  },
];

const EXP = [
  {
    role: "Infosys Springboard Intern",
    company: "Infosys Ltd.",
    period: "Nov 2025 – Jan 2026",
    color: "#7B61FF",
    pts: [
      "Developed Agile AI features, automating unit tests and cloud-native deployment pipelines.",
      "Implemented LLM-powered features for intelligent text processing and workflow automation.",
      "Built an end-to-end application: model integration (45%), UI (30%), and deployment (25%).",
    ],
  },
  {
    role: "Software Developer Trainee",
    company: "NCVET, Government of India",
    period: "Aug 2024 – Mar 2025",
    color: "#00F5FF",
    pts: [
      "Designed software modules using Java, Python, and SQL for real-world government projects.",
      "Resolved coding issues and optimized application logic through structured debugging.",
      "Managed full SDLC and system analysis, improving application reliability by 20%.",
    ],
  },
];

const CERTS = [
  { name:"Full Stack Web Dev with AI Tools", issuer:"Edunet Foundation & EY", date:"Aug 2025 – Feb 2026", icon:"🌐", color:"#00F5FF" },
  { name:"Oracle Certified Java Foundations", issuer:"Oracle Academy", date:"Jan 2026", icon:"☕", color:"#E76F00" },
  { name:"AWS Certified Cloud Practitioner", issuer:"Amazon Web Services", date:"Nov 2025", icon:"☁️", color:"#FF9F1C" },
  { name:"Deep Learning for Developers", issuer:"Infosys Springboard", date:"Jun 2025", icon:"🧠", color:"#7B61FF" },
];

const BADGE_STATES = [
  "◈ Software Engineer · Delhi, India ◈",
  "◈ Full-Stack Developer ◈",
  "◈ AI/ML Engineer ◈",
  "◈ Open to Opportunities ◈",
  "◈ BTech CSE · Class of 2027 ◈",
];

const HERO_TECH = ["Python","React","FastAPI","PyTorch","Next.js 14","Groq LLM","Docker","BERT","TypeScript","Node.js"];

const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*";

/* ─────────────────────────────────────────
   GLOBAL CSS
───────────────────────────────────────── */
const GLOBAL_CSS = `
${FONT_IMPORT}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;overflow-x:hidden}
body{background:#020209;color:#fff;font-family:'Space Grotesk',sans-serif;overflow-x:hidden;cursor:none}
::-webkit-scrollbar{width:3px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:linear-gradient(#7B61FF,#00F5FF);border-radius:3px}

/* CURSOR */
#cur-dot{position:fixed;pointer-events:none;z-index:9999;width:5px;height:5px;
  border-radius:50%;background:#00F5FF;transform:translate(-50%,-50%);transition:background .2s}
#cur-ring{position:fixed;pointer-events:none;z-index:9998;width:28px;height:28px;
  border-radius:50%;border:1px solid rgba(0,245,255,0.5);transform:translate(-50%,-50%);
  transition:width .2s,height .2s,border-color .2s}
#cur-ring.hovered{width:44px;height:44px;border-color:rgba(123,97,255,0.8)}

/* KEYFRAMES */
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes scanline{from{transform:translateY(-100%)}to{transform:translateY(100vh)}}
@keyframes rotateSlow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.7;transform:scale(0.96)}}
@keyframes pulse-ring{0%{transform:translate(-50%,-50%) scale(1);opacity:.6}100%{transform:translate(-50%,-50%) scale(2.4);opacity:0}}
@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}

/* NAV */
.nav-link{font-family:'Space Mono',monospace;font-size:.63rem;letter-spacing:.14em;text-transform:uppercase;
  color:rgba(255,255,255,0.4);background:none;border:none;cursor:pointer;transition:color .25s;padding:4px 0;position:relative}
.nav-link::after{content:'';position:absolute;bottom:-3px;left:0;right:100%;height:1px;
  background:#00F5FF;transition:right .3s}
.nav-link:hover{color:#00F5FF}
.nav-link:hover::after{right:0}

/* BUTTONS */
.btn-primary{display:inline-flex;align-items:center;gap:8px;font-family:'Space Grotesk',sans-serif;
  font-weight:600;font-size:.76rem;letter-spacing:.1em;text-transform:uppercase;
  background:linear-gradient(135deg,#7B61FF,#00F5FF);color:#020209;border:none;
  cursor:pointer;padding:12px 28px;border-radius:6px;transition:transform .2s,box-shadow .2s;text-decoration:none}
.btn-primary:hover{transform:translateY(-3px);box-shadow:0 12px 36px rgba(0,245,255,0.3)}
.btn-outline{display:inline-flex;align-items:center;gap:8px;font-family:'Space Grotesk',sans-serif;
  font-weight:500;font-size:.76rem;letter-spacing:.1em;text-transform:uppercase;
  color:#00F5FF;background:transparent;border:1px solid rgba(0,245,255,0.3);
  cursor:pointer;padding:11px 28px;border-radius:6px;transition:all .2s;text-decoration:none}
.btn-outline:hover{background:rgba(0,245,255,0.08);border-color:#00F5FF;transform:translateY(-3px)}

/* GLASS */
.glass{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);
  backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-radius:16px;
  transition:border-color .3s,box-shadow .3s}

/* SECTION */
.sec-tag{font-family:'Space Mono',monospace;font-size:.6rem;letter-spacing:.24em;
  text-transform:uppercase;color:#7B61FF}
.sec-h2{font-family:'Space Grotesk',sans-serif;font-weight:700;
  font-size:clamp(1.8rem,4.5vw,2.8rem);line-height:1.1}

/* SKILL BUBBLE */
.skill-bubble{font-family:'Space Mono',monospace;font-size:.63rem;padding:5px 13px;
  border-radius:20px;border:1px solid rgba(255,255,255,0.1);
  background:rgba(255,255,255,0.04);color:rgba(255,255,255,0.6);
  transition:all .25s;cursor:default;white-space:nowrap}
.skill-bubble:hover{color:#fff;transform:translateY(-2px)}

/* PROJECT CARD */
.proj-card{position:relative;overflow:hidden;border-radius:20px;
  border:1px solid rgba(255,255,255,0.07);background:rgba(8,6,24,0.8);
  transition:transform .4s cubic-bezier(.2,.8,.3,1),box-shadow .4s,border-color .3s;
  cursor:none}
.proj-card:hover{transform:translateY(-8px)}

/* GRID OVERLAY */
.grid-bg{
  background-image:linear-gradient(rgba(123,97,255,0.04) 1px,transparent 1px),
    linear-gradient(90deg,rgba(123,97,255,0.04) 1px,transparent 1px);
  background-size:64px 64px}

/* SCANLINE */
.scanline{position:fixed;top:0;left:0;right:0;height:1px;
  background:linear-gradient(90deg,transparent,#00F5FF,transparent);
  opacity:.04;pointer-events:none;z-index:9000;animation:scanline 14s linear infinite}

/* TECH PILL */
.tech-pill{font-family:'Space Mono',monospace;font-size:.58rem;padding:4px 11px;
  border-radius:12px;border:1px solid rgba(255,255,255,0.1);
  background:rgba(255,255,255,0.04);color:rgba(255,255,255,0.45);
  cursor:none;transition:all .25s;display:inline-block;margin:3px}
.tech-pill:hover{color:#fff;border-color:rgba(0,245,255,0.5);background:rgba(0,245,255,0.07);transform:translateY(-2px)}

/* CLICK RIPPLE */
.click-ripple{position:fixed;pointer-events:none;z-index:8999;width:6px;height:6px;border-radius:50%;
  background:rgba(0,245,255,0.6);transform:translate(-50%,-50%);animation:pulse-ring .7s ease-out forwards}

/* MOBILE */
@media(max-width:768px){.desk-only{display:none!important}.two-col{grid-template-columns:1fr!important}}
@media(min-width:769px){.mob-only{display:none!important}}

/* INTERSECTION FADE */
.reveal{opacity:0;transform:translateY(36px);transition:opacity .8s cubic-bezier(.2,.8,.3,1),transform .8s cubic-bezier(.2,.8,.3,1)}
.reveal.visible{opacity:1;transform:translateY(0)}
`;

/* ─────────────────────────────────────────
   GRADIENT MESH CANVAS
───────────────────────────────────────── */
function GradientMesh() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const blobs = [
      { x: W*0.2,  y: H*0.3,  r: 400, vx: 0.18, vy: 0.12, color: [123,97,255] },
      { x: W*0.75, y: H*0.2,  r: 360, vx:-0.14, vy: 0.16, color: [0,245,255]  },
      { x: W*0.5,  y: H*0.75, r: 430, vx: 0.10, vy:-0.13, color: [189,0,255]  },
      { x: W*0.85, y: H*0.65, r: 320, vx:-0.20, vy:-0.10, color: [255,0,110]  },
      { x: W*0.1,  y: H*0.8,  r: 290, vx: 0.16, vy:-0.18, color: [0,255,135]  },
    ];
    let raf;
    const draw = () => {
      ctx.clearRect(0,0,W,H);
      blobs.forEach(b => {
        b.x += b.vx; b.y += b.vy;
        if (b.x < -b.r || b.x > W+b.r) b.vx *= -1;
        if (b.y < -b.r || b.y > H+b.r) b.vy *= -1;
        const g = ctx.createRadialGradient(b.x,b.y,0,b.x,b.y,b.r);
        g.addColorStop(0,   `rgba(${b.color.join(',')},0.12)`);
        g.addColorStop(0.42,`rgba(${b.color.join(',')},0.06)`);
        g.addColorStop(1,   `rgba(${b.color.join(',')},0)`);
        ctx.beginPath(); ctx.arc(b.x,b.y,b.r,0,Math.PI*2);
        ctx.fillStyle = g; ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    const onR = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onR);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onR); };
  }, []);
  return <canvas ref={ref} style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0 }}/>;
}

/* ─────────────────────────────────────────
   NEURAL NETWORK CANVAS
───────────────────────────────────────── */
function NeuralNet({ mouseRef }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const nodes = Array.from({ length: 44 }, () => ({
      x: Math.random()*W, y: Math.random()*H,
      vx: (Math.random()-0.5)*0.38, vy: (Math.random()-0.5)*0.38,
      r: Math.random()*2.2+1, pulse: Math.random()*Math.PI*2,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0,0,W,H);
      const mx = mouseRef.current.x, my = mouseRef.current.y;
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        n.pulse += 0.022;
        const pull = 0.00018;
        n.vx += (mx - n.x) * pull; n.vy += (my - n.y) * pull;
        const spd = Math.hypot(n.vx, n.vy);
        if (spd > 1.1) { n.vx /= spd*1.1; n.vy /= spd*1.1; }
      });
      nodes.forEach((a,i) => {
        nodes.slice(i+1).forEach(b => {
          const d = Math.hypot(a.x-b.x, a.y-b.y);
          if (d < 155) {
            const alpha = (1-d/155)*0.22;
            ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
            ctx.strokeStyle = `rgba(123,97,255,${alpha})`; ctx.lineWidth = 0.65; ctx.stroke();
          }
        });
        const pa = 0.28 + Math.sin(a.pulse)*0.18;
        ctx.beginPath(); ctx.arc(a.x,a.y,a.r,0,Math.PI*2);
        ctx.fillStyle = `rgba(123,97,255,${pa})`; ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    const onR = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onR);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onR); };
  }, []);
  return <canvas ref={ref} style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:1, opacity:.7 }}/>;
}

/* ─────────────────────────────────────────
   FLOATING CODE SNIPPETS
───────────────────────────────────────── */
const CODE_SNIPPETS = [
  "model.fit(X_train, y_train)",
  "await fetch('/api/predict')",
  "torch.nn.Transformer()",
  "npm run build && vercel --prod",
  "SELECT * FROM embeddings",
  "git push origin main",
  "docker build -t ayushi .",
  "llm.complete(prompt)",
];
function FloatingCodes() {
  const snippets = CODE_SNIPPETS.map((s,i) => ({
    text: s, x: 5+(i*12.5)%90, y: 5+(i*13.7)%85,
    delay: i*1.3, dur: 6+(i%4)*2, opacity: 0.07+(i%3)*0.035,
  }));
  return (
    <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:1, overflow:"hidden" }}>
      {snippets.map((s,i) => (
        <div key={i} style={{
          position:"absolute", left:`${s.x}%`, top:`${s.y}%`,
          fontFamily:"'Space Mono',monospace", fontSize:".58rem",
          color:`rgba(0,245,255,${s.opacity})`,
          animation:`float ${s.dur}s ${s.delay}s ease-in-out infinite`,
          whiteSpace:"nowrap",
        }}>{s.text}</div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   TYPEWRITER
───────────────────────────────────────── */
function Typewriter({ phrases }) {
  const [idx, setIdx] = useState(0);
  const [txt, setTxt] = useState("");
  const [fwd, setFwd] = useState(true);
  useEffect(() => {
    let t;
    const cur = phrases[idx];
    if (fwd) {
      if (txt.length < cur.length) t = setTimeout(() => setTxt(cur.slice(0, txt.length+1)), 65);
      else t = setTimeout(() => setFwd(false), 2200);
    } else {
      if (txt.length > 0) t = setTimeout(() => setTxt(txt.slice(0,-1)), 30);
      else { setIdx((idx+1) % phrases.length); setFwd(true); }
    }
    return () => clearTimeout(t);
  }, [txt, fwd, idx, phrases]);
  return (
    <span>
      {txt}
      <span style={{ animation:"blink 1s step-end infinite", color:"#00F5FF" }}>█</span>
    </span>
  );
}

/* ─────────────────────────────────────────
   GLITCH TEXT HOOK
───────────────────────────────────────── */
function useGlitch(originalText) {
  const [display, setDisplay] = useState(originalText);
  const glitch = useCallback(() => {
    let iter = 0;
    const inv = setInterval(() => {
      setDisplay(
        originalText.split('').map((c, i) =>
          i < iter ? c : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
        ).join('')
      );
      if (++iter > originalText.length) { clearInterval(inv); setDisplay(originalText); }
    }, 38);
  }, [originalText]);
  return [display, glitch];
}

/* ─────────────────────────────────────────
   COUNTING STAT
───────────────────────────────────────── */
function CountStat({ target, suffix = "", label, delay = 0 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const start = performance.now();
      const dur = 1400;
      const step = (t) => {
        const p = Math.min((performance.now()-start) / dur, 1);
        setVal(Math.round(p * target));
        if (p < 1) requestAnimationFrame(step);
      };
      setTimeout(() => requestAnimationFrame(step), delay);
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, delay]);
  return (
    <div ref={ref} style={{ textAlign:"center" }}>
      <div style={{
        fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:"1.45rem",
        background:"linear-gradient(135deg,#7B61FF,#00F5FF)",
        WebkitBackgroundClip:"text", backgroundClip:"text", WebkitTextFillColor:"transparent",
      }}>
        {val}{suffix && <span style={{ fontSize:"1rem" }}>{suffix}</span>}
      </div>
      <div style={{ fontFamily:"'Space Mono',monospace", fontSize:".52rem", letterSpacing:".16em", textTransform:"uppercase", color:"rgba(255,255,255,0.25)", marginTop:2 }}>{label}</div>
    </div>
  );
}

/* ─────────────────────────────────────────
   ORBITING SKILLS PLANET
───────────────────────────────────────── */
function SkillOrbit({ activeCat }) {
  const ref = useRef(null);
  const rotRef = useRef(0);
  const rafRef = useRef(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const SIZE = Math.min(460, window.innerWidth * 0.45);
    canvas.style.width = SIZE+"px"; canvas.style.height = SIZE+"px";
    canvas.width = SIZE*dpr; canvas.height = SIZE*dpr;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    const CX = SIZE/2, CY = SIZE/2;
    const allSkills = Object.entries(SKILLS).flatMap(([cat,skills]) =>
      skills.map((name,si) => ({ name, cat, si, total: skills.length }))
    );
    const catList = Object.keys(SKILLS);
    const orbitRadii = [80,120,160,200,240,280];
    const catOrbitMap = {};
    catList.forEach((cat,i) => { catOrbitMap[cat] = orbitRadii[i] || 280; });
    const nodes = allSkills.map(sk => ({
      ...sk, r: catOrbitMap[sk.cat],
      baseAngle: (sk.si/sk.total)*Math.PI*2,
      speed: 0.003+(sk.si%3)*0.001,
    }));
    const draw = () => {
      rotRef.current += 0.004;
      ctx.clearRect(0,0,SIZE,SIZE);
      const cg = ctx.createRadialGradient(CX,CY,0,CX,CY,40);
      cg.addColorStop(0,"rgba(123,97,255,0.9)"); cg.addColorStop(0.5,"rgba(0,245,255,0.4)"); cg.addColorStop(1,"rgba(123,97,255,0)");
      ctx.beginPath(); ctx.arc(CX,CY,36,0,Math.PI*2); ctx.fillStyle = cg; ctx.fill();
      ctx.beginPath(); ctx.arc(CX,CY,22,0,Math.PI*2); ctx.fillStyle = "rgba(123,97,255,0.95)"; ctx.fill();
      ctx.font = "700 10px 'Space Grotesk',sans-serif"; ctx.textAlign = "center"; ctx.fillStyle = "#fff"; ctx.fillText("AI",CX,CY+4);
      catList.forEach((cat,ci) => {
        const orR = orbitRadii[ci]; const isAct = !activeCat || cat === activeCat;
        ctx.beginPath(); ctx.arc(CX,CY,orR,0,Math.PI*2);
        ctx.strokeStyle = isAct ? `${SKILL_COLORS[cat]}22` : "rgba(255,255,255,0.04)"; ctx.lineWidth = 1; ctx.stroke();
      });
      nodes.forEach(nd => {
        const angle = nd.baseAngle + rotRef.current*nd.speed*100;
        const x = CX+Math.cos(angle)*nd.r, y = CY+Math.sin(angle)*nd.r;
        const isAct = !activeCat || nd.cat === activeCat;
        const col = SKILL_COLORS[nd.cat];
        if (isAct) {
          const glow = ctx.createRadialGradient(x,y,0,x,y,12);
          glow.addColorStop(0,col+"33"); glow.addColorStop(1,"transparent");
          ctx.beginPath(); ctx.arc(x,y,12,0,Math.PI*2); ctx.fillStyle = glow; ctx.fill();
        }
        ctx.beginPath(); ctx.arc(x,y,isAct?4:2.5,0,Math.PI*2);
        ctx.fillStyle = isAct ? col : "rgba(255,255,255,0.15)"; ctx.fill();
        if (isAct) {
          ctx.font = "600 9px 'Space Grotesk',sans-serif"; ctx.textAlign = "center";
          ctx.fillStyle = "rgba(255,255,255,0.8)"; ctx.fillText(nd.name,x,y-10);
        }
      });
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, [activeCat]);
  return <canvas ref={ref} style={{ display:"block" }}/>;
}

/* ─────────────────────────────────────────
   PROJECT CARD
───────────────────────────────────────── */
function ProjCard({ proj, idx }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const onMove = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX-r.left)/r.width-0.5)*18;
    const y = -((e.clientY-r.top)/r.height-0.5)*18;
    el.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) translateY(-8px)`;
    el.style.boxShadow = `0 30px 70px ${proj.glow}`; el.style.borderColor = proj.color+"55";
  };
  const onLeave = () => {
    const el = ref.current; if (!el) return;
    el.style.transform = ""; el.style.boxShadow = ""; el.style.borderColor = "";
  };
  return (
    <div ref={ref} className="proj-card" onMouseMove={onMove} onMouseLeave={onLeave}
      style={{
        opacity: vis?1:0, transform: vis?"none":"translateY(60px) rotateX(15deg)",
        transition: `opacity .7s ${idx*.15}s cubic-bezier(.2,.8,.3,1), transform .7s ${idx*.15}s cubic-bezier(.2,.8,.3,1), box-shadow .4s, border-color .3s`,
      }}>
      <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,transparent,${proj.color},transparent)` }}/>
      <div style={{ position:"absolute", top:-40, right:-40, width:200, height:200, borderRadius:"50%", background:`radial-gradient(circle,${proj.glow.replace("0.5","0.12")} 0%,transparent 65%)`, pointerEvents:"none" }}/>
      <div style={{ position:"relative", zIndex:2, padding:"1.6rem" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:".7rem" }}>
          <div style={{ display:"flex", gap:".7rem", alignItems:"center" }}>
            <span style={{ fontSize:"1.6rem" }}>{proj.icon}</span>
            <div>
              <h3 style={{ fontWeight:700, fontSize:".98rem", color:"#fff", fontFamily:"'Space Grotesk',sans-serif" }}>{proj.name}</h3>
              <p style={{ fontSize:".62rem", color:proj.color, fontFamily:"'Space Mono',monospace", marginTop:2 }}>{proj.sub}</p>
            </div>
          </div>
          <div style={{ display:"flex", gap:".5rem" }}>
            <a href={proj.github} target="_blank" rel="noreferrer"
              style={{ color:"rgba(255,255,255,0.3)", transition:"color .2s", fontSize:"1rem", textDecoration:"none" }}
              onMouseEnter={e=>e.currentTarget.style.color="#fff"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.3)"}>⌘</a>
            {proj.live && (
              <a href={proj.live} target="_blank" rel="noreferrer"
                style={{ color:"rgba(255,255,255,0.3)", transition:"color .2s", fontSize:"1rem", textDecoration:"none" }}
                onMouseEnter={e=>e.currentTarget.style.color=proj.color} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.3)"}>↗</a>
            )}
          </div>
        </div>
        <p style={{ color:"rgba(255,255,255,0.52)", fontSize:".82rem", lineHeight:1.75, margin:".9rem 0" }}>{proj.desc}</p>
        <div style={{ display:"flex", gap:".4rem", flexWrap:"wrap", marginBottom:".8rem" }}>
          {proj.metrics.map(m => (
            <span key={m} style={{ fontFamily:"'Space Mono',monospace", fontSize:".58rem", padding:"3px 9px", borderRadius:4, background:proj.color+"18", border:`1px solid ${proj.color}33`, color:proj.color }}>{m}</span>
          ))}
        </div>
        <div style={{ display:"flex", gap:".32rem", flexWrap:"wrap" }}>
          {proj.stack.map(t => (
            <span key={t} style={{ fontFamily:"'Space Mono',monospace", fontSize:".58rem", padding:"3px 9px", borderRadius:20, border:"1px solid rgba(255,255,255,0.1)", background:"rgba(255,255,255,0.04)", color:"rgba(255,255,255,0.5)" }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   ROLE BANNER (marquee)
───────────────────────────────────────── */
function RoleBanner() {
  const items = ["Full-Stack Developer","AI/ML Engineer","Cloud-Native Builder","LLM Integration Specialist","React + FastAPI","Open to Opportunities"];
  const repeated = [...items,...items,...items,...items];
  return (
    <div style={{ overflow:"hidden", padding:"12px 0", borderTop:"1px solid rgba(255,255,255,0.06)", borderBottom:"1px solid rgba(255,255,255,0.06)", background:"rgba(123,97,255,0.04)" }}>
      <div style={{ display:"flex", gap:"3rem", animation:"scrollX 22s linear infinite", width:"max-content" }}>
        {repeated.map((item,i) => (
          <span key={i} style={{ fontFamily:"'Space Mono',monospace", fontSize:".65rem", letterSpacing:".16em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)", whiteSpace:"nowrap" }}>
            {item} <span style={{ color:"#7B61FF", marginLeft:"1.4rem" }}>✦</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes scrollX{from{transform:translateX(0)}to{transform:translateX(-25%)}}`}</style>
    </div>
  );
}

/* ─────────────────────────────────────────
   REVEAL HOOK
───────────────────────────────────────── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ─────────────────────────────────────────
   MAIN APP
───────────────────────────────────────── */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCat, setActiveCat] = useState(null);
  const [badgeIdx, setBadgeIdx] = useState(0);
  const [badgeFading, setBadgeFading] = useState(false);
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Glitch hooks for hero name
  const [name1, glitchName1] = useGlitch("AYUSHI");
  const [name2, glitchName2] = useGlitch("SINGH");

  // Scroll
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Custom cursor
  useEffect(() => {
    let rx=0, ry=0, raf;
    const loop = () => {
      rx += (mouseRef.current.x - rx) * 0.13;
      ry += (mouseRef.current.y - ry) * 0.13;
      if (ringRef.current) { ringRef.current.style.left = rx+"px"; ringRef.current.style.top = ry+"px"; }
      raf = requestAnimationFrame(loop);
    };
    loop();
    const onM = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) { dotRef.current.style.left = e.clientX+"px"; dotRef.current.style.top = e.clientY+"px"; }
    };
    window.addEventListener("mousemove", onM);
    return () => { window.removeEventListener("mousemove", onM); cancelAnimationFrame(raf); };
  }, []);

  // Cursor hover state
  useEffect(() => {
    const onOver = (e) => {
      const hov = e.target.closest("button, a, .tech-pill, .skill-bubble, .proj-card, .nav-link");
      if (ringRef.current) ringRef.current.classList.toggle("hovered", !!hov);
      if (dotRef.current) dotRef.current.style.background = hov ? "#7B61FF" : "#00F5FF";
    };
    document.addEventListener("mouseover", onOver);
    return () => document.removeEventListener("mouseover", onOver);
  }, []);

  // Click ripple
  useEffect(() => {
    const onClick = (e) => {
      const r = document.createElement("div");
      r.className = "click-ripple";
      r.style.left = e.clientX+"px"; r.style.top = e.clientY+"px";
      document.body.appendChild(r);
      setTimeout(() => r.remove(), 700);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); setMenuOpen(false); };
  const NAV = ["about","skills","experience","projects","contact"];

  // Section refs
  const r0 = useReveal(), r1 = useReveal(), r2 = useReveal(), r3 = useReveal(), r4 = useReveal();

  // Badge cycle
  const cycleBadge = () => {
    setBadgeFading(true);
    setTimeout(() => {
      setBadgeIdx(i => (i+1) % BADGE_STATES.length);
      setBadgeFading(false);
    }, 180);
  };

  // DNA decoration builder
  const makeDNA = (offset) => Array.from({ length: 11 }, (_, i) => {
    const shift = Math.sin(i*0.7+offset)*18;
    const w = 28+Math.sin(i*0.7+offset)*18;
    return (
      <div key={i} style={{ display:"flex", gap:"14px", marginBottom:"7px", transform:`translateX(${shift}px)` }}>
        <div style={{ width:5, height:5, borderRadius:"50%", background:"#7B61FF", flexShrink:0 }}/>
        <div style={{ width:w, height:1, background:"rgba(123,97,255,0.5)", alignSelf:"center" }}/>
        <div style={{ width:5, height:5, borderRadius:"50%", background:"#00F5FF", flexShrink:0 }}/>
      </div>
    );
  });

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <div id="cur-dot" ref={dotRef} style={{ position:"fixed", pointerEvents:"none", zIndex:9999, width:5, height:5, borderRadius:"50%", background:"#00F5FF", transform:"translate(-50%,-50%)", transition:"background .2s" }}/>
      <div id="cur-ring" ref={ringRef} style={{ position:"fixed", pointerEvents:"none", zIndex:9998, width:28, height:28, borderRadius:"50%", border:"1px solid rgba(0,245,255,0.5)", transform:"translate(-50%,-50%)", transition:"width .2s,height .2s,border-color .2s" }}/>
      <div className="scanline"/>
      <GradientMesh/>
      <NeuralNet mouseRef={mouseRef}/>
      <FloatingCodes/>

      {/* ════ NAVBAR ════ */}
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:100, height:56,
        display:"flex", alignItems:"center", padding:"0 5%",
        background: scrolled ? "rgba(2,2,9,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
        transition:"all .3s",
      }}>
        <button onClick={() => scrollTo("home")} style={{ background:"none", border:"none", cursor:"pointer", flexShrink:0 }}>
          <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:800, fontSize:"1.05rem", color:"#fff" }}>
            <span style={{ color:"#7B61FF" }}>A</span>yushi<span style={{ color:"#00F5FF" }}>.</span>
          </span>
        </button>
        <div className="desk-only" style={{ position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)", display:"flex", gap:"2.2rem", alignItems:"center" }}>
          {NAV.map(n => <button key={n} className="nav-link" onClick={() => scrollTo(n)}>{n}</button>)}
        </div>
        <div className="desk-only" style={{ display:"flex", gap:"1rem", marginLeft:"auto", alignItems:"center" }}>
          <a href="https://github.com/Ayushisingh2005" target="_blank" rel="noreferrer"
            style={{ fontFamily:"'Space Mono',monospace", fontSize:".62rem", color:"rgba(255,255,255,0.3)", textDecoration:"none", letterSpacing:".1em", transition:"color .2s" }}
            onMouseEnter={e=>e.currentTarget.style.color="#fff"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.3)"}>GitHub</a>
          <a href="https://www.linkedin.com/in/ayushi-singh-0773a830a/" target="_blank" rel="noreferrer"
            style={{ fontFamily:"'Space Mono',monospace", fontSize:".62rem", color:"rgba(255,255,255,0.3)", textDecoration:"none", letterSpacing:".1em", transition:"color .2s" }}
            onMouseEnter={e=>e.currentTarget.style.color="#00F5FF"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.3)"}>LinkedIn</a>
        </div>
        <button className="mob-only" onClick={() => setMenuOpen(!menuOpen)}
          style={{ marginLeft:"auto", background:"none", border:"none", color:"#00F5FF", fontSize:"1.2rem", cursor:"pointer" }}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {menuOpen && (
        <div className="mob-only" style={{ position:"fixed", top:56, left:0, right:0, zIndex:99, background:"rgba(2,2,9,0.97)", backdropFilter:"blur(20px)", padding:"2rem 5%", display:"flex", flexDirection:"column", gap:"1.5rem", borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
          {NAV.map(n => <button key={n} className="nav-link" onClick={() => scrollTo(n)} style={{ textAlign:"left" }}>{n}</button>)}
        </div>
      )}

      {/* ════ HERO ════ */}
      <section id="home" style={{
        minHeight:"100vh", display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center",
        padding:"70px 5% 0", position:"relative", textAlign:"center",
        background:"radial-gradient(ellipse 80% 60% at 50% 0%,rgba(123,97,255,0.11) 0%,transparent 60%)",
        zIndex:2,
      }}>
        {/* Deco rings */}
        {[550,760,980].map((s,i) => (
          <div key={s} style={{
            position:"absolute", top:"50%", left:"50%",
            transform:"translate(-50%,-50%)",
            width:s, height:s, borderRadius:"50%",
            border:`1px ${i===1?"dashed":"solid"} rgba(123,97,255,${0.055-i*0.014})`,
            pointerEvents:"none",
            animation:`rotateSlow ${28+i*12}s linear infinite${i%2?" reverse":""}`,
          }}/>
        ))}

        {/* DNA left */}
        <div style={{ position:"absolute", left:"2.5%", top:"20%", opacity:.14, pointerEvents:"none" }}>
          {makeDNA(0)}
        </div>
        <div style={{ position:"absolute", right:"2.5%", bottom:"22%", opacity:.14, pointerEvents:"none" }}>
          {makeDNA(2)}
        </div>

        <div style={{ position:"relative", zIndex:3, maxWidth:880, width:"100%" }}>
          {/* Badge — clickable to cycle */}
          <div style={{ marginBottom:"1.3rem", animation:"fadeUp .8s .1s both" }}>
            <button
              onClick={cycleBadge}
              style={{
                fontFamily:"'Space Mono',monospace", fontSize:".65rem", letterSpacing:".26em",
                textTransform:"uppercase", color:"#7B61FF",
                padding:"7px 20px", borderRadius:20,
                border:"1px solid rgba(123,97,255,0.4)",
                background:"rgba(123,97,255,0.08)",
                cursor:"pointer",
                opacity: badgeFading ? 0 : 1,
                transform: badgeFading ? "scale(.95)" : "scale(1)",
                transition:"opacity .18s,transform .18s",
              }}
            >
              {BADGE_STATES[badgeIdx]}
            </button>
          </div>

          {/* Hero name with glitch on hover */}
          <h1 style={{ fontWeight:800, lineHeight:.9, letterSpacing:"-.03em", margin:"1.1rem 0 .8rem", animation:"fadeUp .8s .2s both" }}>
            <span
              onMouseEnter={glitchName1}
              style={{ display:"block", color:"#fff", fontSize:"clamp(3rem,9vw,7rem)", fontFamily:"'Space Grotesk',sans-serif", cursor:"default" }}
            >{name1}</span>
            <span
              onMouseEnter={glitchName2}
              style={{ display:"block", fontSize:"clamp(3rem,9vw,7rem)", fontFamily:"'Space Grotesk',sans-serif", cursor:"default",
                background:"linear-gradient(135deg,#7B61FF 0%,#00F5FF 50%,#FF006E 100%)",
                WebkitBackgroundClip:"text", backgroundClip:"text", WebkitTextFillColor:"transparent",
              }}
            >{name2}</span>
          </h1>

          {/* Typewriter */}
          <div style={{
            animation:"fadeUp .8s .35s both",
            fontSize:"clamp(.88rem,2.2vw,1.4rem)",
            color:"rgba(255,255,255,0.45)",
            marginBottom:"1.2rem",
            fontFamily:"'Space Grotesk',sans-serif",
            fontWeight:500, minHeight:"1.8em",
          }}>
            <Typewriter phrases={["Building Software That Scales.","Full-Stack Web Development.","LLM-Powered Experiences.","Cloud-Native Architectures.","Clean Code. Real Impact."]}/>
          </div>

          {/* Tech pills */}
          <div style={{ animation:"fadeUp .8s .5s both", marginBottom:"1.5rem" }}>
            {HERO_TECH.map(t => (
              <span key={t} className="tech-pill">{t}</span>
            ))}
          </div>

          {/* Stats row */}
          {/* <div style={{ display:"flex", gap:"2.2rem", justifyContent:"center", flexWrap:"wrap", marginBottom:"1.8rem", alignItems:"center", animation:"fadeUp .8s .62s both" }}>
            <CountStat target={10}   label="Projects Built"   delay={0}   />
            <div style={{ width:1, height:32, background:"rgba(255,255,255,0.08)" }}/>
            <CountStat target={35}   suffix="+" label="Technologies"    delay={100} />
            <div style={{ width:1, height:32, background:"rgba(255,255,255,0.08)" }}/>
            <CountStat target={6}    label="Certifications"  delay={200} />
            <div style={{ width:1, height:32, background:"rgba(255,255,255,0.08)" }}/>
            <CountStat target={14}   suffix="+" label="Months Exp."      delay={300} />
          </div> */}

          {/* Bio */}
          <p style={{
            color:"rgba(255,255,255,0.38)", fontSize:".88rem", maxWidth:520,
            margin:"0 auto 2rem", lineHeight:1.9,
            fontFamily:"'Space Grotesk',sans-serif",
            animation:"fadeUp .8s .75s both",
          }}>
            Computer Science student building high-fidelity digital ecosystems and autonomous data pipelines. Specializing in ML orchestration, full-stack development, and LLM-powered experiences.
          </p>

          {/* CTAs */}
          <div style={{ display:"flex", gap:".9rem", justifyContent:"center", flexWrap:"wrap", animation:"fadeUp .8s .88s both" }}>
            <button className="btn-primary" onClick={() => scrollTo("projects")}>View Projects ↗</button>
            <button className="btn-outline" onClick={() => scrollTo("contact")}>Get In Touch</button>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{ position:"absolute", bottom:"1.5rem", left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:4, animation:"float 3s ease-in-out infinite" }}>
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:".48rem", letterSpacing:".2em", color:"rgba(255,255,255,0.2)" }}>SCROLL</span>
          <div style={{ width:1, height:34, background:"linear-gradient(#7B61FF,transparent)" }}/>
        </div>
      </section>

      {/* Role banner */}
      <div style={{ position:"relative", zIndex:2 }}><RoleBanner/></div>

      {/* ════ ABOUT ════ */}
      <section id="about" style={{ padding:"100px 5%", background:"rgba(8,6,24,0.95)", position:"relative", zIndex:2 }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div ref={r0} className="reveal">
            <p className="sec-tag" style={{ marginBottom:".5rem" }}>// 01. about me</p>
            <h2 className="sec-h2" style={{ marginBottom:"2.2rem" }}>Who I Am</h2>
          </div>
          <div className="glass" style={{ padding:"1.9rem", marginBottom:"1.1rem", position:"relative" }}>
            <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg,#7B61FF,#00F5FF,#FF006E)", borderRadius:"16px 16px 0 0" }}/>
            <div style={{ display:"flex", gap:"1.8rem", flexWrap:"wrap", alignItems:"flex-start" }}>
              <div style={{
                width:80, height:80, borderRadius:"50%", flexShrink:0,
                background:"linear-gradient(135deg,#7B61FF,#00F5FF)",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:"1.3rem", fontWeight:800, color:"#020209",
                fontFamily:"'Space Grotesk',sans-serif",
                boxShadow:"0 0 36px rgba(123,97,255,0.4)",
              }}>AS</div>
              <div style={{ flex:1, minWidth:220 }}>
                <h3 style={{ fontSize:"1.2rem", fontWeight:700, color:"#fff", marginBottom:".25rem", fontFamily:"'Space Grotesk',sans-serif" }}>Ayushi Singh</h3>
                <p style={{ fontFamily:"'Space Mono',monospace", color:"#00F5FF", fontSize:".65rem", marginBottom:".8rem" }}>
                  BTech CSE · Dr. A.P.J Abdul Kalam University · Class of 2027 · Delhi, India
                </p>
                <p style={{ color:"rgba(255,255,255,0.5)", lineHeight:1.85, fontSize:".86rem", fontFamily:"'Space Grotesk',sans-serif" }}>
                  Computer Science Student dedicated to constructing high-fidelity digital ecosystems and autonomous data pipelines. Expertly navigating the intersection of Machine Learning orchestration, complex backend logic, and scalable full-stack development to transform unstructured data into high-performance computational infrastructures. Specialized in bridging the gap between complex backend logic and intuitive, data-driven user interfaces through rigorous algorithmic optimization and modern web frameworks.
                </p>
              </div>
            </div>
          </div>
          <div className="two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.1rem" }}>
            <div className="glass" style={{ padding:"1.6rem" }}>
              <p className="sec-tag" style={{ marginBottom:".9rem" }}>Education</p>
              <div style={{ borderLeft:"2px solid rgba(123,97,255,0.4)", paddingLeft:"1.1rem" }}>
                <div style={{ fontWeight:700, color:"#fff", fontSize:".94rem", marginBottom:".2rem", fontFamily:"'Space Grotesk',sans-serif" }}>BTech — Computer Science Engineering</div>
                <div style={{ fontFamily:"'Space Mono',monospace", color:"#7B61FF", fontSize:".68rem", marginBottom:".14rem" }}>Dr. A.P.J Abdul Kalam University</div>
                <div style={{ fontFamily:"'Space Mono',monospace", color:"rgba(255,255,255,0.3)", fontSize:".63rem" }}>Aug 2023 – May 2027 · Delhi, India</div>
              </div>
            </div>
            <div className="glass" style={{ padding:"1.6rem" }}>
              <p className="sec-tag" style={{ marginBottom:".9rem" }}>Quick Info</p>
              {[["Status","Open to Opportunities ✦"],["Email","ayushisingh1265@gmail.com"],["Phone","+91-7827276177"],["Location","Delhi, India"]].map(([k,v]) => (
                <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:".42rem 0", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ fontFamily:"'Space Mono',monospace", color:"rgba(255,255,255,0.3)", fontSize:".64rem" }}>{k}</span>
                  <span style={{ fontFamily:"'Space Mono',monospace", color:"rgba(255,255,255,0.55)", fontSize:".64rem", textAlign:"right", maxWidth:"62%" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════ SKILLS ════ */}
      <section id="skills" style={{ padding:"100px 5%", background:"#020209", position:"relative", zIndex:2 }} className="grid-bg">
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div ref={r1} className="reveal">
            <p className="sec-tag" style={{ marginBottom:".5rem" }}>// 02. technical skills</p>
            <h2 className="sec-h2" style={{ marginBottom:"2.2rem" }}>Skill Universe</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3rem", alignItems:"start" }} className="two-col">
            <div>
              <p style={{ fontFamily:"'Space Mono',monospace", fontSize:".62rem", color:"rgba(255,255,255,0.3)", marginBottom:"1.1rem", letterSpacing:".14em" }}>INTERACTIVE ORBIT — FILTER BY CATEGORY</p>
              <div style={{ display:"flex", gap:".38rem", flexWrap:"wrap", marginBottom:"1.4rem" }}>
                {["All",...Object.keys(SKILLS)].map(cat => {
                  const isSel = cat==="All" ? activeCat===null : activeCat===cat;
                  const col = cat==="All" ? "#fff" : SKILL_COLORS[cat];
                  return (
                    <button key={cat} onClick={() => setActiveCat(cat==="All"?null:(activeCat===cat?null:cat))}
                      style={{
                        fontFamily:"'Space Mono',monospace", fontSize:".58rem",
                        padding:"4px 11px", borderRadius:20, cursor:"pointer",
                        border:`1px solid ${isSel?col:"rgba(255,255,255,0.1)"}`,
                        background:isSel?col+"18":"transparent",
                        color:isSel?col:"rgba(255,255,255,0.3)",
                        transition:"all .25s", letterSpacing:".1em",
                      }}>{cat}</button>
                  );
                })}
              </div>
              <SkillOrbit activeCat={activeCat}/>
              <div style={{ display:"flex", gap:".9rem", flexWrap:"wrap", marginTop:"1.1rem" }}>
                {Object.entries(SKILL_COLORS).map(([cat,col]) => (
                  <div key={cat} style={{ display:"flex", alignItems:"center", gap:5 }}>
                    <div style={{ width:6, height:6, borderRadius:"50%", background:col, boxShadow:`0 0 6px ${col}` }}/>
                    <span style={{ fontFamily:"'Space Mono',monospace", fontSize:".56rem", color:"rgba(255,255,255,0.3)" }}>{cat}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontFamily:"'Space Mono',monospace", fontSize:".62rem", color:"rgba(255,255,255,0.3)", marginBottom:"1.1rem", letterSpacing:".14em" }}>ALL SKILLS</p>
              {Object.entries(SKILLS).map(([cat,skills]) => (
                <div key={cat} style={{ marginBottom:"1.3rem" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:".45rem", marginBottom:".7rem" }}>
                    <div style={{ width:7, height:7, borderRadius:"50%", background:SKILL_COLORS[cat], boxShadow:`0 0 7px ${SKILL_COLORS[cat]}` }}/>
                    <span style={{ fontFamily:"'Space Mono',monospace", fontSize:".62rem", color:SKILL_COLORS[cat], letterSpacing:".11em" }}>{cat.toUpperCase()}</span>
                  </div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:".42rem" }}>
                    {skills.map(s => (
                      <span key={s} className="skill-bubble"
                        onMouseEnter={e=>{ e.currentTarget.style.borderColor=SKILL_COLORS[cat]; e.currentTarget.style.color=SKILL_COLORS[cat]; e.currentTarget.style.background=SKILL_COLORS[cat]+"12"; }}
                        onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"; e.currentTarget.style.color="rgba(255,255,255,0.6)"; e.currentTarget.style.background="rgba(255,255,255,0.04)"; }}
                      >{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════ EXPERIENCE ════ */}
      <section id="experience" style={{ padding:"100px 5%", background:"rgba(8,6,24,0.95)", position:"relative", zIndex:2 }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div ref={r2} className="reveal">
            <p className="sec-tag" style={{ marginBottom:".5rem" }}>// 03. experience</p>
            <h2 className="sec-h2" style={{ marginBottom:"2.6rem" }}>Professional Journey</h2>
          </div>
          <div style={{ position:"relative" }}>
            <div style={{ position:"absolute", left:19, top:0, bottom:0, width:1, background:"linear-gradient(180deg,rgba(123,97,255,0.5),rgba(0,245,255,0.3),transparent)" }}/>
            <div style={{ display:"flex", flexDirection:"column", gap:"1.8rem" }}>
              {EXP.map((exp,i) => (
                <div key={i} style={{ display:"flex", gap:"1.8rem", alignItems:"flex-start" }}>
                  <div style={{ width:38, height:38, borderRadius:"50%", flexShrink:0, background:"rgba(123,97,255,0.1)", border:`1px solid ${exp.color}55`, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 0 18px ${exp.color}22` }}>
                    <div style={{ width:8, height:8, borderRadius:"50%", background:exp.color, boxShadow:`0 0 9px ${exp.color}` }}/>
                  </div>
                  <div className="glass" style={{ flex:1, padding:"1.8rem", cursor:"none", position:"relative", overflow:"hidden" }}>
                    <div style={{ position:"absolute", left:0, top:0, bottom:0, width:2, background:`linear-gradient(180deg,${exp.color},transparent)` }}/>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:".9rem", flexWrap:"wrap", gap:".5rem" }}>
                      <div>
                        <h3 style={{ fontWeight:700, fontSize:".98rem", color:"#fff", marginBottom:".18rem", fontFamily:"'Space Grotesk',sans-serif" }}>{exp.role}</h3>
                        <p style={{ fontFamily:"'Space Mono',monospace", color:exp.color, fontSize:".68rem" }}>{exp.company}</p>
                      </div>
                      <span style={{ fontFamily:"'Space Mono',monospace", fontSize:".58rem", padding:"4px 11px", borderRadius:20, background:exp.color+"12", border:`1px solid ${exp.color}30`, color:exp.color, whiteSpace:"nowrap" }}>{exp.period}</span>
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", gap:".45rem" }}>
                      {exp.pts.map((pt,j) => (
                        <div key={j} style={{ display:"flex", gap:".7rem", alignItems:"flex-start" }}>
                          <div style={{ width:5, height:5, borderRadius:"50%", background:exp.color, flexShrink:0, marginTop:7, boxShadow:`0 0 7px ${exp.color}` }}/>
                          <p style={{ color:"rgba(255,255,255,0.52)", fontSize:".83rem", lineHeight:1.7, fontFamily:"'Space Grotesk',sans-serif" }}>{pt}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════ PROJECTS ════ */}
      <section id="projects" style={{ padding:"100px 5%", background:"#020209", position:"relative", zIndex:2 }} className="grid-bg">
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div ref={r3} className="reveal">
            <p className="sec-tag" style={{ marginBottom:".5rem" }}>// 04. projects</p>
            <h2 className="sec-h2" style={{ marginBottom:"2.4rem" }}>Featured Work</h2>
          </div>
          <div className="two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.4rem" }}>
            {PROJECTS.map((proj,i) => <ProjCard key={proj.id} proj={proj} idx={i}/>)}
          </div>
        </div>
      </section>

      {/* ════ CERTIFICATIONS ════ */}
      <section style={{ padding:"80px 5%", background:"rgba(8,6,24,0.95)", position:"relative", zIndex:2 }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <p className="sec-tag" style={{ marginBottom:".5rem" }}>// 05. certifications</p>
          <h2 className="sec-h2" style={{ marginBottom:"2.2rem" }}>Credentials</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:".9rem" }}>
            {CERTS.map((cert,i) => (
              <div key={i} className="glass" style={{ padding:"1.6rem 1.15rem", textAlign:"center", position:"relative", overflow:"hidden", transition:"transform .3s,box-shadow .3s" }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow=`0 16px 36px ${cert.color}22`}}
                onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=""}}>
                <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,transparent,${cert.color},transparent)` }}/>
                <div style={{ fontSize:"1.8rem", marginBottom:".65rem" }}>{cert.icon}</div>
                <p style={{ fontFamily:"'Space Grotesk',sans-serif", color:"#fff", fontWeight:600, fontSize:".82rem", lineHeight:1.4, marginBottom:".3rem" }}>{cert.name}</p>
                <p style={{ fontFamily:"'Space Mono',monospace", color:cert.color, fontSize:".6rem", marginBottom:".15rem" }}>{cert.issuer}</p>
                <p style={{ fontFamily:"'Space Mono',monospace", color:"rgba(255,255,255,0.25)", fontSize:".57rem" }}>{cert.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ CONTACT ════ */}
      <section id="contact" style={{ padding:"100px 5%", background:"#020209", textAlign:"center", position:"relative", zIndex:2 }} className="grid-bg">
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:700, height:380, borderRadius:"50%", background:"radial-gradient(ellipse,rgba(123,97,255,0.07) 0%,transparent 65%)", pointerEvents:"none" }}/>
        <div style={{ maxWidth:660, margin:"0 auto", position:"relative", zIndex:2 }}>
          <div ref={r4} className="reveal">
            <p className="sec-tag" style={{ marginBottom:".5rem" }}>// 06. contact</p>
            <h2 className="sec-h2" style={{ marginBottom:".9rem" }}>Let's Build Together</h2>
          </div>
          <p style={{ color:"rgba(255,255,255,0.38)", lineHeight:1.9, fontSize:".88rem", maxWidth:440, margin:"0 auto 2.4rem", fontFamily:"'Space Grotesk',sans-serif" }}>
            Open to software development roles, full-stack opportunities, and interesting projects. If you have an opening or an idea — reach out.
          </p>
          <div className="two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:".9rem", marginBottom:"1.3rem", textAlign:"left" }}>
            {[
              { icon:"✉", label:"Email",    val:"ayushisingh1265@gmail.com",          href:"mailto:ayushisingh1265@gmail.com",                    col:"#00F5FF" },
              { icon:"☎", label:"Phone",    val:"+91-7827276177",                      href:"tel:+917827276177",                                   col:"#7B61FF" },
              { icon:"⌘", label:"GitHub",   val:"Ayushisingh2005",                     href:"https://github.com/Ayushisingh2005",                  col:"#FF006E" },
              { icon:"⊕", label:"LinkedIn", val:"ayushi-singh-0773a830a",              href:"https://www.linkedin.com/in/ayushi-singh-0773a830a/", col:"#00F5FF" },
            ].map(item => (
              <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="glass"
                style={{ display:"flex", alignItems:"center", gap:".9rem", padding:"1.1rem 1.25rem", textDecoration:"none", borderRadius:12, transition:"all .25s", cursor:"pointer" }}
                onMouseEnter={e=>{e.currentTarget.style.boxShadow=`0 8px 28px ${item.col}22`;e.currentTarget.style.borderColor=item.col+"33"}}
                onMouseLeave={e=>{e.currentTarget.style.boxShadow="";e.currentTarget.style.borderColor=""}}>
                <div style={{ color:item.col, fontSize:"1.1rem", flexShrink:0 }}>{item.icon}</div>
                <div style={{ minWidth:0 }}>
                  <p style={{ fontFamily:"'Space Mono',monospace", color:"rgba(255,255,255,0.25)", fontSize:".57rem", textTransform:"uppercase", letterSpacing:".11em", marginBottom:".1rem" }}>{item.label}</p>
                  <p style={{ fontFamily:"'Space Mono',monospace", color:"rgba(255,255,255,0.7)", fontSize:".7rem", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{item.val}</p>
                </div>
              </a>
            ))}
          </div>
          <a href="mailto:ayushisingh1265@gmail.com" className="btn-primary"
            style={{ width:"100%", justifyContent:"center", padding:"14px", fontSize:".78rem", display:"flex", borderRadius:6, textDecoration:"none" }}>
            ✉ Send Me a Message
          </a>
        </div>
      </section>

      {/* ════ FOOTER ════ */}
      <footer style={{ padding:"1.3rem 5%", background:"rgba(8,6,24,0.98)", borderTop:"1px solid rgba(255,255,255,0.07)", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:".7rem", position:"relative", zIndex:2 }}>
        <button onClick={() => scrollTo("home")} style={{ background:"none", border:"none", cursor:"pointer" }}>
          <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:800, fontSize:".95rem", color:"#fff" }}>
            <span style={{ color:"#7B61FF" }}>A</span>yushi<span style={{ color:"#00F5FF" }}>.</span>
          </span>
        </button>
        <p style={{ fontFamily:"'Space Mono',monospace", color:"rgba(255,255,255,0.2)", fontSize:".6rem" }}>
          © 2026 Ayushi Singh &nbsp;·&nbsp; Building What Matters
        </p>
        <div style={{ display:"flex", gap:".85rem" }}>
          {[["⌘","https://github.com/Ayushisingh2005"],["⊕","https://www.linkedin.com/in/ayushi-singh-0773a830a/"],["✉","mailto:ayushisingh1265@gmail.com"]].map(([icon,href],i) => (
            <a key={i} href={href} target="_blank" rel="noreferrer"
              style={{ color:"rgba(255,255,255,0.2)", transition:"color .2s", fontSize:".95rem", textDecoration:"none" }}
              onMouseEnter={e=>e.currentTarget.style.color="#00F5FF"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.2)"}>{icon}</a>
          ))}
        </div>
      </footer>
    </>
  );
}