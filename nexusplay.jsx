import React, { useState, useEffect, useRef } from 'react';
import {
  Gamepad2, Menu, X, ChevronRight, Zap, LayoutGrid, MessageSquare, AlertCircle,
  Link as LinkIcon, Flag, CheckCircle2, Palette, Code2, Copy, ExternalLink, FolderOpen, Send
} from 'lucide-react';

const THEMES = {
  indigo: '#4f46e5', rose: '#e11d48', emerald: '#10b981',
  amber: '#d97706', cyan: '#0891b2', purple: '#9333ea'
};

const HTML_GAMES_FOLDER_ID = '1Gg7fmesMNF7J5hTrGl2ZOHTQVsm9V93T';
const HTML_GAMES_URL = `https://drive.google.com/drive/folders/${HTML_GAMES_FOLDER_ID}?usp=drive_link`;
const HTML_GAMES_EMBED = `https://drive.google.com/embeddedfolderview?id=${HTML_GAMES_FOLDER_ID}#grid`;

const GN = 'https://storage.googleapis.com/mathlearning/ilovessp/1klinks/';
const ELLIOT = 'https://s3.amazonaws.com/elliotslinks-tnjavxyp/';
const SVG = 'https://cdn.jsdelivr.net/gh/';

const SEED_LINK_GROUPS = [
  { id: 'g1', name: 'Nexus', urls: [
    'https://cooking-drama.hadtea.com/', 'https://country-texas.hadtea.com/',
    'https://school-anatomy.hadtea.com/', 'https://state-biology.hadtea.com/', 'https://test-anatomy.hadtea.com/',
  ]},
  { id: 'g2', name: 'Lounge', urls: [
    'https://mathfinals.s3.amazonaws.com/index.html', 'https://learnmath.s3.amazonaws.com/index.html',
  ]},
  { id: 'g3', name: 'Meximath', urls: ['https://pfchangs.store/'] },
  { id: 'g4', name: 'BQC24', urls: [
    'https://storage.googleapis.com/lilicraftzone/index.html',
    'https://storage.googleapis.com/luminacore/index.html',
    'https://storage.googleapis.com/vertexspace/index.html',
    'https://s3.amazonaws.com/novacraftzone/index.html',
    'https://s3.amazonaws.com/luminacorehi/index.html',
    'https://s3.amazonaws.com/vertexspace/index.html',
  ]},
  { id: 'g5', name: 'Axiom', urls: [
    'https://historical.eminescusm.ro', 'https://action-us.b-cdn.net', 'https://mapp-reworked.b-cdn.net',
  ]},
  { id: 'g6', name: 'Chakle', urls: ['https://academicresources.b-cdn.net/'] },
  { id: 'g7', name: 'Doge', urls: [
    'https://s3.amazonaws.com/educationate/index.html',
    'https://homework.bostoncareercounselor.com/',
    'https://learn.biology.quick.bostoncareercounselor.com/',
    'https://lunariswisp1.bostoncareercounselor.com/',
    'https://lunariswisp2.bostoncareercounselor.com/',
    'https://lunariswisp3.bostoncareercounselor.com/',
    'https://edushop.hjshop.net/',
    'https://doge452238.airlinemeals.net/',
    'https://s3.amazonaws.com/deltamath-demo/index.html',
    'https://deltamath-demo.s3.amazonaws.com/index.html',
    'https://storage.googleapis.com/canvas-lms/index.html',
    'https://s3.amazonaws.com/lsrelay-1/index.html',
    'https://lsrelay-1.s3.amazonaws.com/index.html',
    'https://storage.googleapis.com/instructure/index.html',
    'https://storage.googleapis.com/instructure/index.svg',
    'https://dogeub.storage.googleapis.com/index.html',
    'https://s3.amazonaws.com/lichgames/index.html',
    'https://muffin-clicker.s3.amazonaws.com/index.html',
    'https://s3.amazonaws.com/iogameslists/index.html',
    'https://s3.amazonaws.com/shindoisbest/index.html',
    `${SVG}dogeub/-/index.svg`,
    ...['exam14559','essay60302','exam49764','study53889','class68887','exam31610','exam25458',
        'study63409','study81410','homework52434','exam72625','homework14434','grade21246',
        'exam32760','tutor69909'].map(id => `${ELLIOT}${id}/index.html`),
  ]},
  { id: 'g8', name: 'Gn Math', urls: [
    'https://quizizz.com/_media/gn-math/3a218feb-8a3a-4d35-8022-6ac73d9f108e-v2',
    'https://wayground.com/_media/quizzes/c1d45af4-f6cf-40cd-a4e8-c4976a4b62c3-v2',
    'https://wayground.com/_media/uploadedFiles/7ec50a5e-fc28-4d08-9d60-0a8244d93e30-v2',
    'https://quizizz.com/_media/uploadedFiles/7ec50a5e-fc28-4d08-9d60-0a8244d93e30-v2',
    'https://quizizz.com/_media/quizzes/c1d45af4-f6cf-40cd-a4e8-c4976a4b62c3-v2',
    'https://quizizz.com/_media/quizzes/120166d9-62a4-4fcc-9b3c-9114f05336f9-v2',
    'https://wayground.com/_media/quizzes/120166d9-62a4-4fcc-9b3c-9114f05336f9-v2',
    'https://media.blooket.com/raw/upload/kakderenc5famkkafbqn.html',
    `${SVG}un-pkg/npm@main/bundle-min.svg`,
    'https://esm.sh/gh/un-pkg/npm@543b4c5/bundle-min.svg',
    'https://assets.editor.p5js.org/69f1348cb0834230516405d0/b6e1c18e-b379-4e00-adf1-87602c4b9f5e.svg',
    'https://assets.editor.p5js.org/69f172b37dd32ec6b4fea8b3/6aa1d475-1de8-4fc9-9a68-9bec26e16dd8.svg',
    'https://cdn.statically.io/gh/daxcodesalt/x3@main/securly.com/classlink.com/FreeBusinessEducation-Logo-Square.svg',
    `${SVG}snoopyeducation/securly.com@main/classlink.com/math.svg`,
    `${SVG}drewalow860-ctrl/securly.com@main/classlink.com/math.svg`,
    `${SVG}soonicdatguy/securly.com/classlink.com/math.svg`,
    'https://cdn.jsdmirror.com/gh/soonicdatguy/securly.com/classlink.com/math.svg',
    'https://fastly.jsdelivr.net/gh/soonicdatguy/securly.com/classlink.com/math.svg',
    'https://gcore.jsdelivr.net/gh/soonicdatguy/securly.com/classlink.com/math.svg',
    'https://testingcf.jsdelivr.net/gh/soonicdatguy/securly.com/classlink.com/math.svg',
    'https://quantil.jsdelivr.net/gh/soonicdatguy/securly.com/classlink.com/math.svg',
    'https://originfastly.jsdelivr.net/gh/soonicdatguy/securly.com/classlink.com/math.svg',
    'https://fastly.jsdelivr.net/gh/snoopyeducation/securly.com@main/classlink.com/math.svg',
    'https://gcore.jsdelivr.net/gh/snoopyeducation/securly.com@main/classlink.com/math.svg',
    'https://testingcf.jsdelivr.net/gh/snoopyeducation/securly.com@main/classlink.com/math.svg',
    'https://quantil.jsdelivr.net/gh/snoopyeducation/securly.com@main/classlink.com/math.svg',
    'https://quantil.jsdelivr.net/gh/un-pkg/npm@main/bundle-min.svg',
    `${SVG}satucat/clippy@main/FreeBusinessEducation-Logo-Square(1).svg`,
    'http://cdn.jsdelivr.net/gh/stockable/sites@main/gnmath.svg',
    'https://cdn.hcbrands.com/media/hsc/pce/uploadedImage/9krqqttss7agk2u2v874l5bt2c/03a09b979553ecb2324fgnmath.svg',
    'https://7516c3b35580b3490248629cff5e498c.heidibranlund.com/',
    'https://snoopyuniversity.heidibranlund.com/',
    'https://s3.amazonaws.com/prageru-server/mathematics.html',
    'https://prageru-server.s3.amazonaws.com/mathematics.html',
    'https://quizizz-static.s3.amazonaws.com/_media/uploadedFiles/9e0c0d18-c975-497c-b410-fc7dae5fafca-v2',
    'https://quizizz-static.s3-accelerate.amazonaws.com/_media/uploadedFiles/9e0c0d18-c975-497c-b410-fc7dae5fafca-v2',
    'https://quizizz.com/_media/uploadedFiles/9e0c0d18-c975-497c-b410-fc7dae5fafca-v2',
    'https://storage.googleapis.com/mathlearning/ilovessp/500k/gn-math_25',
    ...['gn-math_20_53','gn-math_32_54','gn-math_44_55','gn-math_56_56','gn-math_68_57','gn-math_8_58',
        'gn-math_80_59','gn-math_92_60','gn2_21_61','gn2_33_62','gn2_45_63','gn2_57_64','gn2_69_65',
        'gn2_81_66','gn2_9_67','gn2_93_68','gn3_10_69','gn3_22_70','gn3_34_71','gn3_46_72','gn3_58_73',
        'gn3_70_74','gn3_82_75','gn3_94_76','gn4_11_77','gn4_23_78','gn4_35_79','gn4_47_80','gn4_59_81',
        'gn4_71_82','gn4_83_83','gn4_95_84','gn_19_85','gn_31_86','gn_43_87','gn_55_88','gn_67_89',
        'gn_7_90','gn_79_91','gn_91_92'].map(n => `${GN}${n}`),
  ]},
];



const delay = (ms) => new Promise(r => setTimeout(r, ms));
const dbApi = {
  async getLinkGroups() { await delay(400); return SEED_LINK_GROUPS; },
};

const GlobalStyles = () => (
  <style>{`
    @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
    .animate-fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards; opacity: 0; }
    .animate-float { animation: float 6s ease-in-out infinite; }
    .delay-100 { animation-delay: 100ms; } .delay-200 { animation-delay: 200ms; } .delay-300 { animation-delay: 300ms; }
    .theme-bg { background-color: var(--theme-color); }
    .theme-text { color: var(--theme-color); }
    .theme-border { border-color: var(--theme-color); }
    .hover\\:theme-text:hover { color: var(--theme-color); }
    .hover\\:theme-border:hover { border-color: var(--theme-color); }
    .group:hover .group-hover\\:theme-text { color: var(--theme-color); }
    .group:hover .group-hover\\:theme-border { border-color: var(--theme-color); }
    .focus\\:theme-border:focus { border-color: var(--theme-color); }
  `}</style>
);

const Button = ({ variant = 'primary', size = 'md', className = '', children, ...props }) => {
  const base = "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    primary: "theme-bg text-white hover:brightness-110 shadow-lg",
    secondary: "bg-zinc-800 text-white hover:bg-zinc-700",
    outline: "bg-transparent border border-zinc-700 text-zinc-300 hover:text-white hover:theme-border",
    ghost: "bg-transparent text-zinc-400 hover:text-white hover:bg-zinc-800",
  };
  const sizes = { sm: "h-9 px-3 text-xs", md: "h-10 py-2 px-4", lg: "h-12 px-8 text-base" };
  return <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>{children}</button>;
};

const Badge = ({ children, variant = 'default', className = '' }) => {
  const v = {
    default: "bg-zinc-800 text-zinc-200 border border-zinc-700",
    primary: "bg-zinc-900 theme-text border theme-border",
  };
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${v[variant]} ${className}`}>{children}</span>;
};

const Navbar = ({ currentView, navigateTo, theme, setTheme }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showThemes, setShowThemes] = useState(false);
  const navItems = [
    { id: 'home', label: 'Welcome', icon: LayoutGrid },
    { id: 'links', label: 'Links', icon: LinkIcon },
    { id: 'html', label: 'HTML Games', icon: Code2 },
    { id: 'community', label: 'Community', icon: MessageSquare },
    { id: 'report', label: 'Report', icon: Flag },
  ];
  const go = (id) => { navigateTo(id); setMobileOpen(false); };
  const swatches = (
    Object.entries(THEMES).map(([key, color]) => (
      <button key={key} onClick={() => { setTheme(key); setShowThemes(false); }}
        className={`w-6 h-6 rounded-full border-2 ${theme === key ? 'border-white' : 'border-transparent'}`}
        style={{ backgroundColor: color }} />
    ))
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center cursor-pointer" onClick={() => go('home')}>
          <div className="w-8 h-8 rounded-lg theme-bg flex items-center justify-center mr-3"><Zap className="w-5 h-5 text-white" /></div>
          <span className="font-bold text-xl tracking-tight text-white">BORE<span className="theme-text">DOM</span></span>
        </div>

        <div className="hidden md:flex items-center space-x-1">
          {navItems.map(item => (
            <Button key={item.id} variant={currentView === item.id ? 'secondary' : 'ghost'} onClick={() => go(item.id)}>
              <item.icon className={`w-4 h-4 mr-2 ${currentView === item.id ? 'theme-text' : ''}`} />{item.label}
            </Button>
          ))}
        </div>

        <div className="flex items-center space-x-2 relative">
          <button onClick={() => setShowThemes(!showThemes)} className="p-2 text-zinc-400 hover:theme-text rounded-full hover:bg-zinc-800" title="Change Theme">
            <Palette className="w-5 h-5" />
          </button>
          {showThemes && <div className="absolute top-12 right-0 bg-zinc-900 border border-zinc-800 rounded-xl p-3 flex gap-2 z-50">{swatches}</div>}
          <button className="md:hidden p-2 text-zinc-400 rounded-md hover:bg-zinc-800" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-zinc-950 px-4 py-4 space-y-1">
          {navItems.map(item => (
            <button key={item.id} onClick={() => go(item.id)}
              className={`w-full flex items-center px-4 py-3 rounded-xl font-medium ${currentView === item.id ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:bg-zinc-800'}`}>
              <item.icon className={`w-5 h-5 mr-3 ${currentView === item.id ? 'theme-text' : ''}`} />{item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

const hostOf = (u) => { try { return new URL(u).hostname; } catch { return u; } };

const LinksPage = () => {
  const [groups, setGroups] = useState([]);
  const [open, setOpen] = useState('g1');
  const [copied, setCopied] = useState(null);

  useEffect(() => { dbApi.getLinkGroups().then(setGroups); }, []);

  const copy = (url) => {
    navigator.clipboard?.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="space-y-8 pb-16 animate-fade-in-up">
      <div className="border-b border-zinc-800 pb-6">
        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2 flex items-center">
          <LinkIcon className="w-8 h-8 mr-3 theme-text" /> Proxy Links
        </h1>
        <p className="text-zinc-400">Mirror sets. If one link is down or blocked, try another in the same set.</p>
      </div>

      <div className="space-y-4">
        {groups.map(g => (
          <div key={g.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
            <button
              onClick={() => setOpen(open === g.id ? null : g.id)}
              className="w-full flex items-center justify-between p-5 hover:bg-zinc-800/40 transition-colors"
            >
              <span className="text-xl font-bold text-white">{g.name}</span>
              <span className="flex items-center gap-3">
                <Badge variant="primary">{g.urls.length} links</Badge>
                <ChevronRight className={`w-5 h-5 text-zinc-500 transition-transform ${open === g.id ? 'rotate-90' : ''}`} />
              </span>
            </button>
            {open === g.id && (
              <div className="border-t border-zinc-800 p-3 grid grid-cols-1 lg:grid-cols-2 gap-2 max-h-[28rem] overflow-y-auto">
                {g.urls.map((url, i) => (
                  <div key={url + i} className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2">
                    <div className="min-w-0 flex-1">
                      <div className="text-sm text-zinc-200 truncate">{hostOf(url)}</div>
                      <div className="text-xs text-zinc-600 truncate">{url}</div>
                    </div>
                    <button onClick={() => copy(url)} title="Copy link" className="p-2 text-zinc-500 hover:theme-text">
                      {copied === url ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <a href={url} target="_blank" rel="noreferrer noopener" className="p-2 text-zinc-500 hover:theme-text" title="Open">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const HtmlGamesPage = () => {
  const [embedFailed, setEmbedFailed] = useState(false);

  return (
    <div className="space-y-8 pb-16 animate-fade-in-up">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2 flex items-center">
            <Code2 className="w-8 h-8 mr-3 theme-text" /> HTML Games
          </h1>
          <p className="text-zinc-400">Browse the shared folder. Download a game's .html file and open it in your browser.</p>
        </div>
        <a href={HTML_GAMES_URL} target="_blank" rel="noreferrer noopener">
          <Button variant="primary"><FolderOpen className="w-4 h-4 mr-2" /> Open in Google Drive</Button>
        </a>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
        {embedFailed ? (
          <div className="p-12 text-center">
            <AlertCircle className="w-10 h-10 text-zinc-500 mx-auto mb-3" />
            <p className="text-zinc-400">The folder can't be previewed here. Use the button above to open it.</p>
          </div>
        ) : (
          <iframe
            src={HTML_GAMES_EMBED}
            title="HTML Games folder"
            className="w-full h-[70vh] bg-white"
            onError={() => setEmbedFailed(true)}
          />
        )}
      </div>
    </div>
  );
};



const PageHeader = ({ icon: Icon, title, sub }) => (
  <div className="border-b border-zinc-800 pb-6">
    <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2 flex items-center">
      <Icon className="w-8 h-8 mr-3 theme-text" /> {title}
    </h1>
    <p className="text-zinc-400">{sub}</p>
  </div>
);

const WelcomePage = ({ navigateTo, theme, setTheme }) => (
  <div className="min-h-[80vh] flex flex-col justify-center py-12 relative overflow-hidden">
    <div className="absolute top-20 left-10 w-72 h-72 theme-bg rounded-full opacity-20 animate-float" style={{ filter: 'blur(100px)' }} />
    <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto px-4">
      <div className="animate-fade-in-up mb-6"><Badge variant="primary" className="px-4 py-1.5 text-sm uppercase tracking-wider">Version 2.0 Alpha</Badge></div>
      <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-tight animate-fade-in-up delay-100">
        The Next Generation of <br /><span className="theme-text">Web Gaming.</span>
      </h1>
      <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-12 animate-fade-in-up delay-200 leading-relaxed">
        Experience unblocked, high-performance web games with a personalized interface. Select your theme, jump into the community, and play instantly.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in-up delay-300 mb-16">
        <Button size="lg" className="w-full sm:w-48" onClick={() => navigateTo('html')}><Gamepad2 className="w-5 h-5 mr-2" />Start Playing</Button>
        <Button variant="outline" size="lg" className="w-full sm:w-48" onClick={() => navigateTo('links')}><LinkIcon className="w-5 h-5 mr-2" />Proxy Links</Button>
      </div>
      <div className="animate-fade-in-up delay-300 bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
        <p className="text-sm font-medium text-zinc-400 mb-4 uppercase tracking-widest">Select Platform Theme</p>
        <div className="flex flex-wrap justify-center gap-4">
          {Object.entries(THEMES).map(([key, color]) => (
            <button key={key} onClick={() => setTheme(key)}
              className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all hover:scale-110 ${theme === key ? 'scale-110 ring-2 ring-white' : ''}`}
              style={{ backgroundColor: color }}>
              {theme === key && <CheckCircle2 className="w-6 h-6 text-white" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ---------- GLOBAL CHAT ----------
// To make the chat truly global on your own site, create a free Supabase project, run the SQL below,
// and fill in the two constants. (Uses plain fetch + polling, so no extra packages are needed.)
//
//   create table messages (
//     id bigint generated always as identity primary key,
//     username text not null check (char_length(username) between 2 and 16),
//     text text not null check (char_length(text) between 1 and 300),
//     created_at timestamptz default now()
//   );
//   alter table messages enable row level security;
//   create policy "read" on messages for select using (true);
//   create policy "write" on messages for insert with check (true);
const SUPABASE_URL = ''; // e.g. https://abcdxyz.supabase.co
const SUPABASE_KEY = ''; // your anon public key
const MAX_MSGS = 100;

const chatMode = SUPABASE_URL ? 'supabase' : (typeof window !== 'undefined' && window.storage ? 'shared' : 'local');
const sbHeaders = { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' };
const memoryChat = [];

const chatApi = {
  async list() {
    if (chatMode === 'supabase') {
      const r = await fetch(`${SUPABASE_URL}/rest/v1/messages?select=*&order=created_at.desc&limit=${MAX_MSGS}`, { headers: sbHeaders });
      if (!r.ok) throw new Error('list failed');
      return (await r.json()).reverse();
    }
    if (chatMode === 'shared') {
      try { return JSON.parse((await window.storage.get('chat-log', true)).value); } catch { return []; }
    }
    return [...memoryChat];
  },
  async send(username, text) {
    if (chatMode === 'supabase') {
      const r = await fetch(`${SUPABASE_URL}/rest/v1/messages`, {
        method: 'POST', headers: { ...sbHeaders, Prefer: 'return=minimal' }, body: JSON.stringify({ username, text })
      });
      if (!r.ok) throw new Error('send failed');
      return;
    }
    const msg = { id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, username, text, created_at: new Date().toISOString() };
    if (chatMode === 'shared') {
      const log = await chatApi.list();
      await window.storage.set('chat-log', JSON.stringify([...log, msg].slice(-MAX_MSGS)), true);
    } else memoryChat.push(msg);
  },
};

const ChatPage = () => {
  const [username, setUsername] = useState('');
  const [draftName, setDraftName] = useState('');
  const [nameError, setNameError] = useState('');
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const listRef = useRef(null);
  const lastSent = useRef(0);

  useEffect(() => {
    if (!username) return;
    let alive = true;
    const load = async () => {
      try { const m = await chatApi.list(); if (alive) { setMessages(m); setError(''); } }
      catch { if (alive) setError('Connection lost. Retrying...'); }
    };
    load();
    const t = setInterval(load, 3000);
    return () => { alive = false; clearInterval(t); };
  }, [username]);

  useEffect(() => { const el = listRef.current; if (el) el.scrollTop = el.scrollHeight; }, [messages.length]);

  const join = () => {
    const n = draftName.trim();
    if (!/^[A-Za-z0-9_ ]{2,16}$/.test(n)) { setNameError('Use 2-16 characters: letters, numbers, spaces or underscores.'); return; }
    setNameError('');
    setUsername(n);
  };

  const send = async () => {
    const t = text.trim();
    if (!t || sending) return;
    if (Date.now() - lastSent.current < 1500) { setError('Slow down a little!'); return; }
    setSending(true);
    lastSent.current = Date.now();
    try {
      await chatApi.send(username, t.slice(0, 300));
      setText('');
      setMessages(await chatApi.list());
      setError('');
    } catch { setError('Message failed to send.'); }
    setSending(false);
  };

  const field = "w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 h-12 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:theme-border";

  return (
    <div className="space-y-6 pb-16 animate-fade-in-up max-w-3xl mx-auto">
      <PageHeader icon={MessageSquare} title="Global Chat" sub="One public room. Everyone sees everything you type." />

      {chatMode === 'local' && (
        <div className="flex items-start gap-3 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-xl p-4 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>No chat server is connected, so messages are only visible on this device. Add your Supabase URL and key at the top of the chat section to go global.</span>
        </div>
      )}

      {!username ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">Pick a username</h2>
          <p className="text-zinc-400 text-sm">You'll chat in the public room under this name.</p>
          <input
            value={draftName} maxLength={16} placeholder="Username" className={`${field} text-center`}
            onChange={e => setDraftName(e.target.value)} onKeyDown={e => e.key === 'Enter' && join()}
          />
          {nameError && <p className="text-red-400 text-sm">{nameError}</p>}
          <Button size="lg" className="w-full" onClick={join}>Join Chat</Button>
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800 text-sm">
            <span className="text-zinc-400">Chatting as <strong className="theme-text">{username}</strong></span>
            <button className="text-zinc-500 hover:text-white" onClick={() => { setUsername(''); setMessages([]); }}>Change name</button>
          </div>

          <div ref={listRef} className="h-[50vh] overflow-y-auto p-5 space-y-3">
            {messages.length === 0 && <p className="text-center text-zinc-600 text-sm pt-16">No messages yet. Say hi!</p>}
            {messages.map(m => {
              const mine = m.username === username;
              return (
                <div key={m.id} className={`flex flex-col ${mine ? 'items-end' : 'items-start'}`}>
                  <div className="text-xs text-zinc-500 mb-1">
                    {m.username} · {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2 break-words ${mine ? 'theme-bg text-white' : 'bg-zinc-800 text-zinc-200'}`}>
                    {m.text}
                  </div>
                </div>
              );
            })}
          </div>

          {error && <div className="px-5 pb-2 text-sm text-red-400">{error}</div>}
          <div className="flex gap-2 p-4 border-t border-zinc-800">
            <input
              value={text} maxLength={300} placeholder="Type a message..." className={field}
              onChange={e => setText(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()}
            />
            <Button className="h-12 px-5" disabled={sending || !text.trim()} onClick={send}><Send className="w-5 h-5" /></Button>
          </div>
        </div>
      )}
    </div>
  );
};

const ReportCenterPage = () => {
  const [status, setStatus] = useState('idle');
  const submit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => { setStatus('success'); setTimeout(() => setStatus('idle'), 3000); }, 1500);
  };
  const field = "w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:theme-border";
  return (
    <div className="space-y-8 pb-16 animate-fade-in-up max-w-3xl mx-auto">
      <PageHeader icon={Flag} title="Report Center" sub="Found a bug, blocked link, or issue? Let us know." />
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8">
        {status === 'success' ? (
          <div className="text-center py-12">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Report Submitted</h2>
            <p className="text-zinc-400">Thank you for helping keep the platform stable.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Category</label>
                <select className={`${field} h-12`}><option>Broken Game</option><option>Blocked Link</option><option>Bug / Glitch</option><option>Other</option></select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Game/Link ID (Optional)</label>
                <input type="text" placeholder="e.g. cosmic-drift" className={`${field} h-12`} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Description</label>
              <textarea rows={5} placeholder="Describe the issue in detail..." className={`${field} p-4 resize-none`} />
            </div>
            <Button size="lg" className="w-full h-14 text-lg" disabled={status === 'submitting'} onClick={submit}>
              {status === 'submitting' ? <Zap className="w-5 h-5 animate-pulse" /> : 'Submit Report'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [theme, setTheme] = useState('indigo');

  const navigateTo = (view) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 flex flex-col" style={{ '--theme-color': THEMES[theme] }}>
      <GlobalStyles />
      <Navbar currentView={currentView} navigateTo={navigateTo} theme={theme} setTheme={setTheme} />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 md:py-12">
        {currentView === 'home' && <WelcomePage navigateTo={navigateTo} theme={theme} setTheme={setTheme} />}
        {currentView === 'links' && <LinksPage />}
        {currentView === 'html' && <HtmlGamesPage />}
        {currentView === 'community' && <ChatPage />}
        {currentView === 'report' && <ReportCenterPage />}
      </main>
      <footer className="border-t border-zinc-900 py-8 text-center text-zinc-600 text-sm">
        &copy; {new Date().getFullYear()} BOREDOM Platform Alpha.
      </footer>
    </div>
  );
}
