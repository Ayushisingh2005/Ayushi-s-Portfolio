import React, { useEffect, useRef, useState } from 'react';
import profilePic from './Ayushi SIngh.png';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Terminal, 
  Cpu, 
  Layers, 
  Award, 
  Send, 
  Phone, 
  Sparkles,
  Code,
  Globe,
  Database,
  BrainCircuit,
  Wrench,
  CheckCircle
} from 'lucide-react';

export default function App() {
  const canvasRef = useRef(null);
  const [activeTab, setActiveTab] = useState('all');
  
  // --- NEW STATES FOR ANIMATIONS ---
  const [typedName, setTypedName] = useState('');
  const [typedSummary, setTypedSummary] = useState('');
  const [currentRole, setCurrentRole] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const roles = ["Software Developer", "Full Stack Developer", "AI/ML Engineer"];
  const fullDisplayName = "Ayushi Singh";
  const fullSummary = "Computer Science Engineering student dedicated to constructing high-fidelity digital ecosystems and autonomous data pipelines. Expertly navigating the intersection of Machine Learning orchestration, complex backend logic, and scalable full-stack development to transform unstructured data into high-performance computational infrastructures.Specialized in bridging the gap between complex backend logic and intuitive, data-driven user interfaces through rigorous algorithmic optimization and modern web frameworks.";

  // Typing Effect Logic
  useEffect(() => {
    let nameIdx = 0;
    let summaryIdx = 0;
    
    const nameInterval = setInterval(() => {
      setTypedName(fullDisplayName.slice(0, nameIdx));
      nameIdx++;
      if (nameIdx > fullDisplayName.length) clearInterval(nameInterval);
    }, 100);

    const summaryInterval = setInterval(() => {
      setTypedSummary(fullSummary.slice(0, summaryIdx));
      summaryIdx++;
      if (summaryIdx > fullSummary.length) clearInterval(summaryInterval);
    }, 30);

    // Role Rotation Logic
    const roleInterval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => {
      clearInterval(nameInterval);
      clearInterval(summaryInterval);
      clearInterval(roleInterval);
    };
  }, []);

  // Contact Form Handler
  const handleTransmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    
    setIsSending(true);
    // Simulate API Call
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSent(false), 5000);
    }, 2000);
  };

  // --- DATA ARRAYS ---
  const projects = [
    {
      title: "DevScope AI",
      subtitle: "Automated Code Intelligence Platform",
      description: "An automated DevOps Cockpit auditing code in real-time. Achieved sub-500ms inference for structural complexity and vulnerability hot-spot reporting.",
      metrics: { "Review Time": "-65%", "Latency": "<500ms", "Visibility": "100%" },
      tech: ["React 18", "FastAPI", "Groq LPU", "Llama 3.3", "SQLite"],
      github: "https://github.com/Ayushisingh2005/DevScope_AI",
      live: "https://devscopeai.vercel.app/",
      category: "ai"
    },
    {
      title: "NeuroSEO Engine",
      subtitle: "Enterprise Semantic Infrastructure",
      description: "High-fidelity AI-powered SEO infrastructure analyzing search intent. Simulates link value propagation and domain authority using internal knowledge graphs.",
      metrics: { "Audit Acceleration": "95%", "Model Accuracy": "88%", "Data Insights": "90% Faster" },
      tech: ["Next.js 14", "FastAPI", "BERT Transformers", "ReactFlow", "Tailwind v4"],
      github: "https://github.com/Xynash/Neuro-Search-Engine-Optimization-Engine.git",
      live: "https://neuro-search-engine-optimization-en.vercel.app/",
      category: "ai"
    },
    {
      title: "VoteChain",
      subtitle: "Blockchain Decentallized Voting",
      description: "Tamper-proof distributed election engine built on Ethereum. Eliminates consensus vulnerabilities by recording data points to immutable ledger configurations.",
      metrics: { "Central Control": "0%", "Double Voting": "Prevented", "Security": "Immutable" },
      tech: ["Solidity", "Ethereum", "Hardhat", "React", "Ethers.js"],
      github: "https://github.com/Ayushisingh2005/VoteChain-A-Blockchain-Powered-Decentralized-Voting-System",
      live: "#",
      category: "web3"
    },
    {
      title: "LexiScript Pro",
      subtitle: "Multi-Modal Audio Intelligence Engine",
      description: "State-of-the-art layout-aware document extraction framework converting unstructured data (Images/PDFs) into translation-ready neural audio streams.",
      metrics: { "Extraction Accuracy": "98%", "Latency Reduction": "60%", "Consistency": "95%" },
      tech: ["Next.js", "FastAPI", "Gemini 1.5 Flash", "Whisper-V3", "Edge-TTS"],
      github: "https://github.com/Ayushisingh2005/Multi-Modal-AI-Extraction-Audio-Intelligence-Engine",
      live: "https://lexiscript.vercel.app/",
      category: "ai"
    },
    {
      title: "Weather Bot Ecosystem",
      subtitle: "Real-Time Telemetry & Alert Stream",
      description: "A synchronized dashboard application managing asynchronous external webhooks to deliver predictive metrics to localized instant messaging systems.",
      metrics: { "Forecast Window": "5-Day", "Integration": "Instant", "Responsive": "100%" },
      tech: ["Python Flask", "JavaScript", "OpenWeather API", "Telegram API"],
      github: "https://github.com/Ayushisingh2005/Weather-Forecasting-Web-App-with-Telegram-Bot-Integration",
      live: "#",
      category: "core"
    }
  ];

  const technicalSkills = [
    {
      category: "Languages & Frameworks",
      icon: <Code className="text-blue-400" size={18} />,
      items: ["Java", "Python", "Solidity", "JavaScript", "HTML", "CSS"]
    },
    {
      category: "Backend & System Infrastructure",
      icon: <Database className="text-emerald-400" size={18} />,
      items: ["Django", "FastAPI", "REST APIs", "SQLite", "SQL", "Python Flask"]
    },
    {
      category: "Frontend Architectures",
      icon: <Globe className="text-cyan-400" size={18} />,
      items: ["React.js", "Next.js", "Tailwind CSS", "ReactFlow", "JavaScript (ES6+)"]
    },
    {
      category: "AI, Models & Core Engineering",
      icon: <BrainCircuit className="text-purple-400" size={18} />,
      items: ["ML Algorithms", "ML Models", "Transformers (BERT)", "LLM Integration", "DSA"]
    },
    {
      category: "Tools & Ecosystems",
      icon: <Wrench className="text-amber-400" size={18} />,
      items: ["Git / GitHub", "Docker", "Hardhat", "Ethers.js", "Postman", "Vite"]
    }
  ];

  const experiences = [
    {
      role: "AI-ML Engineering Intern (Internship 6.0)",
      company: "Infosys Springboard",
      duration: "Jan 2026 - Apr 2026",
      location: "Virtual Ecosystem",
      highlights: [
        "Engineered customized machine learning workflows using Python and data analytical model pipelines.",
        "Built diagnostic code checks and scripts to automate performance benchmarking assessments.",
        "Implemented data transformation sequences to optimize unstructured computational metrics."
      ],
      skills: ["Machine Learning", "Python", "Data Models", "Algorithmic Analysis"]
    },
    {
      role: "Full Stack Web Development With AI Tools",
      company: "Edunet Foundation / EY",
      duration: "Academic Year 2025 - 2026",
      location: "Hybrid Platform",
      highlights: [
        "Built and deployed end-to-end web applications combining dynamic user dashboards with robust server routing architectures.",
        "Leveraged artificial intelligence development utilities to maximize script generation accuracy and code debugging efficiency.",
        "Collaborated within structures framed by industry-standard enterprise requirements and AICTE curricular frameworks."
      ],
      skills: ["Full Stack Dev", "AI Tools Integration", "Web Frameworks", "Database Systems"]
    },
    {
      role: "Software Programmer ",
      company: "PMKVY Skill Development Program",
      duration: "Concluded 2025",
      location: "Institutional Node",
      highlights: [
        "Completed rigorous applied learning blocks specialized in computing principles and scalable digital tools.",
        "Engaged in hands-on code auditing, optimization sprint scenarios, and modern technical workflow management.",
        "Applied practical algorithmic problem-solving paradigms to meet national occupational standards."
      ],
      skills: ["Core Computing", "Problem Solving", "Applied Logic", "Technical Systems"]
    }
  ];

  const certifications = [
    { title: "Oracle Fusion Cloud HCM Foundations", issuer: "Oracle Academy", date: "2025-2026" },
    { title: "Principles of Generative AI", issuer: "Infosys Springboard", date: "Jan 2026" },
    { title: "Java Foundations", issuer: "Oracle Academy", date: "Sep 2026" },
    { title: "AWS Academy Graduate Cloud Foundations", issuer: "Amazon Web Services", date: "Apr 2026" }
  ];

  // --- CANVAS BACKGROUND LOGIC ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 0.3 + 0.05,
      opacity: Math.random()
    }));

    const skillList = [
      { name: 'Java', color: '#e2433a', size: 45 },
      { name: 'Python', color: '#3776ab', size: 48 },
      { name: 'Solidity', color: '#aa66cc', size: 45 },
      { name: 'FastAPI', color: '#009688', size: 46 },
      { name: 'React', color: '#61dafb', size: 50 },
      { name: 'Next.js', color: '#ffffff', size: 48 },
      { name: 'LLMs', color: '#a855f7', size: 52 },
      { name: 'Docker', color: '#2496ed', size: 44 },
      { name: 'SQL', color: '#00758f', size: 42 },
      { name: 'JavaScript', color: '#f7df1e', size: 45 }
    ];

    let bubbles = skillList.map((skill, index) => {
      const angle = (index / skillList.length) * Math.PI * 2;
      const radiusOffset = Math.min(canvas.width, canvas.height) * 0.25;
      return {
        x: canvas.width / 3 + Math.cos(angle) * radiusOffset,
        y: canvas.height / 2 + Math.sin(angle) * radiusOffset,
        vx: (Math.random() - 0.5) * 1.0,
        vy: (Math.random() - 0.5) * 1.0,
        baseRadius: skill.size,
        radius: skill.size,
        name: skill.name,
        color: skill.color,
        pulseTimer: Math.random() * Math.PI
      };
    });

    let mouse = { x: -1000, y: -1000, radius: 150 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#020207';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        star.y += star.speed;
        if (star.y > canvas.height) star.y = 0;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(Math.sin(star.opacity += 0.005))})`;
        ctx.fillRect(star.x, star.y, star.size, star.size);
      });

      bubbles.forEach((bubble, i) => {
        bubble.pulseTimer += 0.01;
        bubble.radius = bubble.baseRadius + Math.sin(bubble.pulseTimer) * 2.5;
        bubble.x += bubble.vx;
        bubble.y += bubble.vy;

        if (bubble.x - bubble.radius < 0 || bubble.x + bubble.radius > canvas.width) bubble.vx *= -1;
        if (bubble.y - bubble.radius < 0 || bubble.y + bubble.radius > canvas.height) bubble.vy *= -1;

        const dx = bubble.x - mouse.x;
        const dy = bubble.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius + bubble.radius) {
          const force = (mouse.radius + bubble.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          bubble.x += Math.cos(angle) * force * 3.5;
          bubble.y += Math.sin(angle) * force * 3.5;
        }

        ctx.shadowBlur = 12;
        ctx.shadowColor = bubble.color;
        ctx.strokeStyle = `${bubble.color}99`;
        ctx.lineWidth = 1.5;
        ctx.fillStyle = 'rgba(8, 8, 20, 0.75)';
        
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.shadowBlur = 0;
        ctx.fillStyle = '#ffffff';
        ctx.font = '600 12px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(bubble.name, bubble.x, bubble.y);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const filteredProjects = activeTab === 'all' ? projects : projects.filter(p => p.category === activeTab);

  return (
    <div className="relative min-h-screen text-white select-none overflow-x-hidden">
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />

      <header className="sticky top-0 w-full bg-[#020207]/80 backdrop-blur-md z-50 px-6 py-4 flex justify-between items-center border-b border-white/5">
        <div className="flex items-center space-x-2">
          <Terminal className="text-blue-500 animate-pulse" size={20} />
          <span className="text-sm font-mono tracking-widest text-slate-300">AYUSHI_SINGH // SYSTEM_PORTFOLIO</span>
        </div>
        <nav className="hidden md:flex space-x-8 text-sm font-medium tracking-wide text-slate-400">
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#skills-matrix" className="hover:text-white transition-colors">Skills</a>
          <a href="#projects-grid" className="hover:text-white transition-colors">Deployments</a>
          <a href="#credentials" className="hover:text-white transition-colors">Certifications</a>
          <a href="#contact" className="hover:text-white transition-colors">Connect</a>
        </nav>
        <div className="flex items-center space-x-4">
          <a href="https://github.com/Ayushisingh2005" className="text-slate-400 hover:text-white transition-colors"><Github size={18} /></a>
          <a href="https://www.linkedin.com/in/ayushi-singh-0773a830a/" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={18} /></a>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-32 space-y-40">
        
        {/* Section 1: Hero */}
        <section id="about" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[75vh]">
          <div className="lg:col-span-7 space-y-8 group">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
              <Cpu size={14} className="text-blue-400" />
            </div>
            
            <div className="space-y-4 min-h-[220px]">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight leading-none bg-clip-text text-white">
                {typedName}<span className="animate-ping">_</span>
              </h1>
              <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl">
                {typedSummary}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <a href="#projects-grid" className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 transition-all text-sm font-semibold shadow-lg shadow-blue-600/20">
                View Architecture Log
              </a>
              <a href="#contact" className="px-6 py-3 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] transition-all text-sm font-semibold flex items-center space-x-2">
                <Sparkles size={16} className="text-purple-400" />
                <span>Establish Connection</span>
              </a>
            </div>

            {/* NEW ROLE ROTATOR SECTION */}
            <div className="pt-4 flex items-center space-x-4">
               <div className="w-1 h-12 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
               <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500">Active System Protocol:</p>
                  <p className="text-xl font-bold text-blue-400 animate-pulse transition-all">
                    {roles[currentRole]}
                  </p>
               </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="w-full max-w-sm aspect-square rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6 flex flex-col justify-between relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-slate-600"></div>
              
              <div className="flex-1 flex flex-col justify-center items-center space-y-4 my-4 relative z-10">
                
                {/* ADDED 3D IMAGE CONTAINER */}
                <div className="relative w-84 h-84 group-hover:scale-110 transition-transform duration-500">
                  <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl "></div>
                  {/* REPLACE THIS IMG WITH YOUR ACTUAL 3D AVATAR LINK */}
                 <img 
  src={profilePic} // Use the name you defined in the import above
  alt="CS Girlie" 
  className="w-full h-full object-contain rounded-2xl animate-bounce"
  style={{ animationDuration: '3s' }} 
/>
                </div>
                
                <div className="flex flex-wrap justify-center gap-1.5 text-[10px] font-mono">
                  <span className="px-2 py-0.5 bg-zinc-900 rounded border border-white/5 text-purple-400">ML_ALGORITHMS</span>
                  <span className="px-2 py-0.5 bg-zinc-900 rounded border border-white/5 text-cyan-400">FASTAPI_REST</span>
                  <span className="px-2 py-0.5 bg-zinc-900 rounded border border-white/5 text-emerald-400">DJANGO_CORE</span>
                </div>

                <div className="w-full bg-black/50 p-2.5 rounded-lg border border-white/5 font-mono text-[9px] text-slate-500">
                  <div className="text-blue-400"></div>
                  <div></div>
                  <div className="text-purple-400"></div>
                </div>
              </div>

              <div className="border-t border-white/5 pt-3 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-slate-500 uppercase tracking-tighter">CS_GIRLIE_ACTIVE</span>
                </div>
                <span className="text-xs text-blue-400">READY</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Experience - INCREASED SIZE */}
        <section id="skills-matrix" className="space-y-16 pt-12">
          <div className="space-y-8 bg-white/[0.01] border border-white/5 rounded-2xl p-10 relative overflow-hidden backdrop-blur-sm min-h-[600px]">
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                <h3 className="font-mono text-lg tracking-[0.3em] text-slate-400 uppercase">// SYSTEM_EXPERIENCE_LEDGER</h3>
              </div>
              <span className="text-sm font-mono text-blue-400 bg-blue-500/10 px-3 py-1 rounded border border-blue-500/20">
                {experiences.length} ACTIVE_NODES
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {experiences.map((exp, index) => (
                <div key={index} className="group relative bg-black/40 border border-white/5 hover:border-blue-500/40 rounded-2xl p-8 flex flex-col justify-between space-y-6 transition-all duration-500 hover:-translate-y-3 shadow-2xl min-h-[450px]">
                  <div className="absolute top-0 right-0 w-24 h-[2px] bg-gradient-to-l from-blue-500/50 to-transparent" />
                  
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-widest">{exp.duration}</span>
                      <span className="text-xs text-slate-500 font-mono">{exp.location}</span>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-2xl font-bold text-white leading-tight group-hover:text-blue-400 transition-colors">{exp.role}</h4>
                      <p className="text-sm font-mono text-slate-400">{exp.company}</p>
                    </div>

                    <ul className="space-y-3">
                      {exp.highlights.slice(0, 2).map((h, i) => (
                        <li key={i} className="text-xs text-slate-400 leading-relaxed group-hover:text-slate-300 flex items-start">
                          <span className="text-blue-500 mr-2">▹</span>{h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-white/5 flex flex-wrap gap-2">
                    {exp.skills.map((skill, idx) => (
                      <span key={idx} className="text-[10px] font-mono px-2 py-1 rounded-md bg-zinc-900 text-slate-400 border border-white/5 group-hover:border-blue-500/20">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills Ledger */}
          <div className="border-t border-white/5 pt-16 space-y-8">
            <h3 className="text-2xl font-bold tracking-tight text-white flex items-center space-x-2">
              <Terminal size={20} className="text-blue-500" />
              <span>Technical Arsenal Ledger</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {technicalSkills.map((skillGroup, index) => (
                <div key={index} className="bg-white/[0.01] border border-white/5 rounded-xl p-6 hover:border-white/10 transition-all">
                  <div className="flex items-center space-x-2.5 border-b border-white/5 pb-4 mb-4">
                    {skillGroup.icon}
                    <h4 className="text-sm font-bold text-slate-200">{skillGroup.category}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1.5 text-xs font-mono rounded bg-zinc-900 text-slate-400 border border-white/5 hover:text-white transition-colors">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Projects */}
        <section id="projects-grid" className="space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">My Projects</h2>
              <p className="text-sm text-slate-400">Architecture-ready systems for inspection.</p>
            </div>
            <div className="flex p-1 rounded-lg bg-slate-900/60 border border-white/5 space-x-2 text-xs font-mono">
              {['all', 'ai', 'web3', 'core'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded transition-all uppercase tracking-wider ${activeTab === tab ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <div key={index} className="bg-white/[0.01] border border-white/5 rounded-xl p-6 flex flex-col justify-between space-y-6 transition-all duration-300 hover:border-blue-500/30 hover:-translate-y-2">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <p className="text-xs text-blue-400 font-mono">{project.subtitle}</p>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-4">{project.description}</p>
                </div>
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5">
                  {Object.entries(project.metrics).map(([k, v]) => (
                    <div key={k} className="text-center">
                      <div className="text-[10px] font-mono text-white font-bold">{v}</div>
                      <div className="text-[8px] uppercase tracking-tighter text-slate-500">{k}</div>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-3 pt-2">
                  <a href={project.github} className="flex-1 py-2 bg-slate-900 border border-white/10 rounded flex justify-center items-center text-xs space-x-2"><Github size={14}/><span>Source</span></a>
                  {project.live !== "#" && <a href={project.live} className="flex-1 py-2 bg-blue-600 rounded flex justify-center items-center text-xs space-x-2 text-white"><ExternalLink size={14}/><span>Launch</span></a>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Certifications */}
        <section id="credentials" className="space-y-8">
          <h2 className="text-3xl font-bold">Verified Credentials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white/[0.01] rounded-xl p-6 flex items-center space-x-6 border border-white/5 hover:border-purple-500/30 transition-all">
                <div className="p-4 rounded-full bg-purple-500/10 text-purple-400"><Award size={30} /></div>
                <div>
                  <h4 className="text-md font-bold text-white">{cert.title}</h4>
                  <p className="text-xs text-slate-400 font-mono mt-1">{cert.issuer} • {cert.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Contact - FUNCTIONAL */}
        <section id="contact" className="max-w-4xl mx-auto">
          <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-10 grid grid-cols-1 md:grid-cols-12 gap-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 via-purple-500 to-transparent" />
            
            <div className="md:col-span-5 space-y-6">
              <div className="text-xs font-mono tracking-widest text-blue-400 uppercase">// Sync Operations</div>
              <h2 className="text-3xl font-bold">Establish Link</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Open for technical collaboration avenues, algorithm research pipelines, and production backend architecture roles.
              </p>
              <div className="space-y-4 pt-4">
                <div className="flex items-center space-x-3 text-slate-300"><Mail size={16} className="text-blue-400"/><span>ayushisingh1265@gmail.com</span></div>
                <div className="flex items-center space-x-3 text-slate-300"><Phone size={16} className="text-purple-400"/><span>Inbound Node Online</span></div>
              </div>
            </div>

            <form onSubmit={handleTransmit} className="md:col-span-7 bg-black/40 p-8 rounded-2xl border border-white/5 space-y-6 shadow-2xl">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-slate-500 uppercase">Identity Node</label>
                  <input 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    type="text" placeholder="Full Name" 
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl p-3 text-xs text-white focus:border-blue-500 outline-none" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-slate-500 uppercase">Routing Endpoint</label>
                  <input 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    type="email" placeholder="Email" 
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl p-3 text-xs text-white focus:border-blue-500 outline-none" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-slate-500 uppercase">Payload Stream</label>
                <textarea 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows="4" placeholder="Message details..." 
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl p-3 text-xs text-white focus:border-blue-500 outline-none resize-none"
                ></textarea>
              </div>
              
              <button 
                type="submit"
                disabled={isSending || isSent}
                className={`w-full font-mono text-sm py-4 rounded-xl transition-all flex items-center justify-center space-x-3 ${isSent ? 'bg-emerald-600' : 'bg-blue-600 hover:bg-blue-500'}`}
              >
                {isSending ? (
                  <span className="animate-pulse">TRANSMITTING...</span>
                ) : isSent ? (
                  <>
                    <CheckCircle size={18} />
                    <span>PAYLOAD DELIVERED</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>TRANSMIT PAYLOAD</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-white/5 bg-[#030308] relative z-20 py-10 px-6 text-center text-xs font-mono text-slate-500 uppercase tracking-widest">
        <p>© 2026 AYUSHI_SINGH // DATA_LEDGER_CLOSED // ENCRYPTED_CONNECTION</p>
      </footer>
    </div>
  );
}