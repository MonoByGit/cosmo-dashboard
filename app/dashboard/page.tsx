"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Mail, CheckSquare, Calendar, Newspaper, Bot, Sun, Moon, Send,
  Plus, Maximize2, Minimize2, Sparkles, AlertCircle, Inbox,
  FileText, Database, Layout, FolderOpen, MessageSquare, ArrowRight, CheckCircle, RefreshCw, Mic, MicOff,
  Package, Camera, HelpCircle, AlertTriangle, Briefcase
} from "lucide-react";
import {
  DURATION, STAGGER, EASE,
  fadeInUp, cardHover, liftHover,
  defaultTransition, springTransition
} from "@/lib/motion";
import { useMotionValue, useSpring, useTransform } from "framer-motion";

export default function DashboardPage() {
  const [selectedItem, setSelectedItem] = useState<{
    type: 'email' | 'task' | 'news' | 'urgent';
    data: any;
  } | null>(null);

  const [isDark, setIsDark] = useState(false);
  const [selectedLLM, setSelectedLLM] = useState("Claude");
  const [chatInput, setChatInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Scroll locking for modals
  useEffect(() => {
    if ((isChatOpen && window.innerWidth < 1024) || selectedItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isChatOpen, selectedItem]);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.body.classList.toggle("dark");
  };

  // Parallax effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(springY, [-300, 300], [2, -2]);
  const rotateY = useTransform(springX, [-300, 300], [-2, 2]);

  function handleMouseMove(event: React.MouseEvent) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  }

  // Mock data - Executive Summary
  const executiveSummary = {
    briefing: "Goedemorgen Dusty! 🌟 Dit heeft vandaag je aandacht nodig:\n\n🔥 3 urgente items vereisen directe actie\n💼 2 nieuwe fotografie aanvragen ter waarde van ~€2.500\n📦 1 bestelling te verwerken\n\nTop prioriteiten: Reageer op klacht, bekijk fotoprojecten, bereid Team Standup voor.",
    stats: {
      totalEmails: 5,
      orders: 1,
      photoRequests: 2,
      questions: 2,
      complaints: 1,
      urgent: 3,
      potentialRevenue: 2500
    },
    urgentItems: [
      { id: 1, category: 'COMPLAINT', urgency: 'high', summary: 'Klacht: Camera niet geleverd', suggestedAction: 'Reageer binnen 2 uur', sourceUrl: 'https://mail.google.com' },
      { id: 2, category: 'BUSINESS', urgency: 'high', summary: 'Vergaderverzoek: Portfolio review @ 14:00', suggestedAction: 'Bevestig aanwezigheid', sourceUrl: 'https://calendar.google.com' },
      { id: 3, category: 'QUESTION', urgency: 'medium', summary: 'Vraag: Bruiloft pakket prijzen', suggestedAction: 'Stuur prijslijst', sourceUrl: 'https://mail.google.com' }
    ]
  };

  // Mock data - Emails
  const emails = [
    {
      id: 1, account: 1, sender: "Jan de Vries", subject: "Q4 Planning Meeting", time: "10:30",
      unread: true, category: 'BUSINESS', urgency: 'high',
      aiSummary: "Vergaderverzoek voor Q4 planning bespreking",
      fullContent: "Beste Dusty,\n\nKunnen we deze week de Q4 planning doornemen? Ik heb woensdag om 14:00 tijd.\n\nGroet,\nJan",
      suggestedAction: "Bevestig aanwezigheid",
      estimatedValue: null,
      link: "https://mail.google.com"
    },
    {
      id: 2, account: 2, sender: "Sophie Bakker", subject: "Bruiloft fotografie aanvraag", time: "09:15",
      unread: true, category: 'PHOTO_REQUEST', urgency: 'medium',
      aiSummary: "Bruiloftsfotografie aanvraag voor juni 2026",
      fullContent: "Hoi! We zijn op zoek naar een fotograaf voor onze bruiloft op 12 juni 2026 in Utrecht. Ben jij nog beschikbaar?\n\nBedankt, Sophie",
      suggestedAction: "Stuur prijzen en beschikbaarheid",
      estimatedValue: 1500,
      link: "https://mail.google.com"
    },
    {
      id: 3, account: 1, sender: "Peter Jansen", subject: "Product bestelling #1234", time: "Gisteren",
      unread: false, category: 'ORDER', urgency: 'low',
      aiSummary: "Bevestiging bestelling camera apparatuur",
      fullContent: "Je bestelling #1234 is succesvol geplaatst. We verwachten deze morgen te verzenden.",
      suggestedAction: "Verwerk en verzend",
      estimatedValue: null,
      link: "https://mail.google.com"
    },
  ];

  const [localTasks, setLocalTasks] = useState([
    { id: 1, title: "Dashboard design reviewen", priority: 1, completed: false, link: "https://todoist.com" },
    { id: 2, title: "API documentatie updaten", priority: 2, completed: false, link: "https://todoist.com" },
    { id: 3, title: "Klant meeting voorbereiden", priority: 1, completed: true, link: "https://todoist.com" },
  ]);

  const toggleTask = (id: number) => {
    setLocalTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const events = [
    { id: 1, title: "Team Standup", time: "14:00 - 14:30", status: "aankomend", link: "https://calendar.google.com" },
    { id: 2, title: "Design Review", time: "15:00 - 16:00", status: "aankomend", link: "https://calendar.google.com" },
    { id: 3, title: "1-op-1 met Manager", time: "Morgen 10:00", status: "gepland", link: "https://calendar.google.com" },
  ];

  const news = [
    {
      id: 1, title: "AI Tools Hervormen Fotografie Workflow", category: "Fotografie", source: "TechCrunch", time: "2u geleden",
      summary: "Nieuwe AI-gedreven tools maken het bewerken van duizenden foto's in enkele minuten mogelijk. Adobe en Skylum lopen voorop.",
      sources: ["https://techcrunch.com", "https://perplexity.ai"],
      link: "https://perplexity.ai"
    },
    {
      id: 2, title: "Next.js 15 Uitgebracht met Turbopack", category: "Tech", source: "Vercel Blog", time: "5u geleden",
      summary: "Vercel heeft Next.js 15 aangekondigd met Turbopack als standaard dev engine, wat zorgt voor 70% snellere herlaadtijden.",
      sources: ["https://vercel.com/blog"],
      link: "https://perplexity.ai"
    },
    {
      id: 3, title: "Digitale Trends in Uitvaartdiensten", category: "Uitvaart", source: "Branche Nieuws", time: "1d geleden",
      summary: "De uitvaartbranche ziet een stijging in digitale gedenkpagina's en live-streaming diensten.",
      sources: ["https://example.com"],
      link: "https://perplexity.ai"
    },
  ];

  const llmOptions = ["Claude", "GPT-4", "Gemini", "Perplexity"];

  const quickActions = [
    { id: 1, icon: FileText, label: "Maak een bestand" },
    { id: 2, icon: Database, label: "Analyseer data" },
    { id: 3, icon: Layout, label: "Maak een prototype" },
    { id: 4, icon: FolderOpen, label: "Organiseer bestanden" },
    { id: 5, icon: Calendar, label: "Bereid meeting voor" },
    { id: 6, icon: MessageSquare, label: "Schrijf bericht" },
  ];

  const getCategoryIcon = (category: string) => {
    const map: Record<string, any> = {
      'ORDER': <Package className="w-4 h-4" />,
      'PHOTO_REQUEST': <Camera className="w-4 h-4" />,
      'QUESTION': <HelpCircle className="w-4 h-4" />,
      'COMPLAINT': <AlertTriangle className="w-4 h-4" />,
      'BUSINESS': <Briefcase className="w-4 h-4" />
    };
    return map[category] || <Mail className="w-4 h-4" />;
  };

  const getUrgencyDot = (urgency: string) => {
    const map: Record<string, string> = {
      'high': 'bg-red-400',
      'medium': 'bg-orange-400',
      'low': 'bg-blue-400'
    };
    return map[urgency] || 'bg-white/40';
  };

  const getUrgencyColor = (urgency: string) => {
    // Apple-style: subtle backgrounds with high text contrast
    const map: Record<string, string> = {
      'high': 'bg-red-50 dark:bg-red-500/10 border-red-200/60 dark:border-red-400/30',
      'medium': 'bg-orange-50 dark:bg-orange-500/10 border-orange-200/60 dark:border-orange-400/30',
      'low': 'bg-blue-50 dark:bg-blue-500/10 border-blue-200/60 dark:border-blue-400/30'
    };
    return map[urgency] || 'bg-gray-50/80 dark:bg-white/5 border-gray-200/60 dark:border-white/10';
  };

  return (
    <div
      className="min-h-screen p-6 lg:p-8"
      onMouseMove={handleMouseMove}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">COSMO</h1>
          <p className="text-gray-600 dark:text-gray-400">Hé Dusty! 👋 Hier is je overzicht</p>
        </div>
        <div className="flex gap-2">
          {/* Mobile Chat Toggle */}
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="glass-btn w-12 h-12 p-0 flex items-center justify-center lg:hidden"
          >
            <MessageSquare className="w-5 h-5" />
          </button>
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="glass-btn w-12 h-12 p-0 flex items-center justify-center"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Main Layout: 2 columns (content + sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
        {/* LEFT COLUMN: Main Content (2/3 width) */}
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="lg:col-span-2 space-y-6"
        >
          {/* EXECUTIVE SUMMARY (FULL WIDTH) */}

          {/* EXECUTIVE SUMMARY (FULL WIDTH) */}
          <motion.div
            className="glass-panel p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: DURATION.normal / 1000,
              delay: 0.1,
              ease: EASE.spring
            }}
            whileHover={{
              y: -2,
              transition: { duration: DURATION.fast / 1000, ease: EASE.out }
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="glass-icon-container">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Executive Samenvatting</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Je dagelijkse briefing</p>
              </div>
            </div>

            {/* AI Generated Briefing */}
            <div className="mb-6 p-4 rounded-xl bg-gray-100/50 dark:bg-white/5 border border-gray-300/50 dark:border-white/10">
              <p className="text-sm leading-relaxed whitespace-pre-line text-gray-800 dark:text-gray-200">
                {executiveSummary.briefing}
              </p>
            </div>

            {/* Urgent Items */}
            {executiveSummary.urgentItems.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  Urgente Items ({executiveSummary.urgentItems.length})
                </h3>
                <div className="space-y-2">
                  {executiveSummary.urgentItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedItem({ type: 'urgent', data: item })}
                      className={`p-3 rounded-xl border ${getUrgencyColor(item.urgency)} transition-all hover:border-opacity-70 cursor-pointer active:scale-[0.98]`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg bg-white/20 dark:bg-white/10 ${item.urgency === 'high' ? 'text-red-500' : item.urgency === 'medium' ? 'text-orange-500' : 'text-blue-500'}`}>
                          {getCategoryIcon(item.category)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold mb-1 text-gray-900 dark:text-white">{item.summary}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-300">
                            → {item.suggestedAction}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${item.urgency === 'high'
                          ? 'bg-red-100/80 dark:bg-red-500/20 text-red-700 dark:text-red-300 border-red-200'
                          : item.urgency === 'medium'
                            ? 'bg-orange-100/80 dark:bg-orange-500/20 text-orange-700 dark:text-orange-300 border-orange-200'
                            : 'bg-blue-100/80 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-200'
                          }`}>
                          {item.urgency}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 rounded-xl bg-gray-100/50 dark:bg-white/5 border border-gray-300/50 dark:border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <Package className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                  <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">Bestellingen</span>
                </div>
                <p className="text-2xl font-bold">{executiveSummary.stats.orders}</p>
              </div>

              <div className="p-3 rounded-xl bg-gray-100/50 dark:bg-white/5 border border-gray-300/50 dark:border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <Camera className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                  <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">Foto Aanvragen</span>
                </div>
                <p className="text-2xl font-bold">{executiveSummary.stats.photoRequests}</p>
              </div>

              <div className="p-3 rounded-xl bg-gray-100/50 dark:bg-white/5 border border-gray-300/50 dark:border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <HelpCircle className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                  <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">Vragen</span>
                </div>
                <p className="text-2xl font-bold">{executiveSummary.stats.questions}</p>
              </div>

              <div className="p-3 rounded-xl bg-gray-100/50 dark:bg-white/5 border border-gray-300/50 dark:border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <Briefcase className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                  <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">Potentieel</span>
                </div>
                <p className="text-2xl font-bold">
                  €{executiveSummary.stats.potentialRevenue.toLocaleString()}
                </p>
              </div>
            </div>


          </motion.div>

          {/* INBOX & TASKS (Side by Side) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* EMAIL WIDGET */}
            <motion.div
              className="glass-panel p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.normal / 1000, delay: 0.18, ease: EASE.spring }}
              whileHover={{ y: -2, transition: { duration: DURATION.fast / 1000, ease: EASE.out } }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="glass-icon-container">
                  <Inbox className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Actie Inbox</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {emails.filter(e => e.unread).length} ongelezen · Gefilterd door AI
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                {emails.map((email) => (
                  <motion.div
                    key={email.id}
                    onClick={() => setSelectedItem({ type: 'email', data: email })}
                    whileHover={{ scale: 1.01, x: 2 }}
                    className={`p-3 rounded-xl border transition-all cursor-pointer hover:border-gray-400/40 dark:hover:border-white/30 active:scale-[0.98] ${email.unread
                      ? "bg-blue-500/10 border-blue-400/30"
                      : "bg-gray-100/50 dark:bg-white/5 border-gray-300/50 dark:border-white/10"
                      }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2 flex-1">
                        <div className={`w-2 h-2 rounded-full ${getUrgencyDot(email.urgency)}`} />
                        <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">{email.sender}</span>
                        <span className="text-base">{getCategoryIcon(email.category)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-gray-200/80 dark:bg-white/20 text-gray-700 dark:text-gray-200 border border-gray-300/50 dark:border-white/20">Acc {email.account}</span>
                        <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">{email.time}</span>
                      </div>
                    </div>

                    <p className="text-sm font-bold mb-1 text-gray-900 dark:text-white">
                      {email.subject}
                    </p>

                    <p className="text-xs text-gray-700 dark:text-gray-400 mb-2 line-clamp-1">
                      {email.aiSummary}
                    </p>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                        <ArrowRight className="w-3 h-3" />
                        <span>{email.suggestedAction}</span>
                      </div>
                      {email.estimatedValue && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-green-100/80 dark:bg-green-500/20 text-green-700 dark:text-green-300 border border-green-300/60 dark:border-green-400/30">
                          ~€{email.estimatedValue.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* TASKS WIDGET */}
            <motion.div
              className="glass-panel p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.normal / 1000, delay: 0.26, ease: EASE.spring }}
              whileHover={{ y: -2, transition: { duration: DURATION.fast / 1000, ease: EASE.out } }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="glass-icon-container">
                  <CheckSquare className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Vandaag's Taken</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{localTasks.filter(t => !t.completed).length} resterend</p>
                </div>
              </div>
              <div className="space-y-2">
                {localTasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100/50 dark:hover:bg-white/5 transition-colors cursor-pointer group"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05, ease: EASE.out }}
                    whileHover={{ x: 4, transition: { duration: 0.2 } }}
                    onClick={() => toggleTask(task.id)}
                  >
                    <motion.div
                      whileTap={{ scale: 0.8 }}
                      animate={task.completed ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.2, ease: EASE.spring }}
                      className="flex items-center"
                    >
                      <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-colors ${task.completed ? 'bg-green-500 border-green-500' : 'border-gray-400 dark:border-white/30'}`}>
                        {task.completed && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                      </div>
                    </motion.div>
                    <motion.span
                      animate={task.completed ? { opacity: 0.5, x: 5 } : { opacity: 1, x: 0 }}
                      className={`text-sm font-semibold flex-1 ${task.completed ? "line-through text-gray-400 dark:text-gray-500" : "text-gray-900 dark:text-gray-100"}`}
                    >
                      {task.title}
                    </motion.span>
                    <div className="flex items-center gap-2">
                      {task.priority === 1 && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-red-100/80 dark:bg-red-500/20 text-red-700 dark:text-red-300 border border-red-300/60 dark:border-red-400/30"
                        >
                          P1
                        </motion.span>
                      )}
                      <a
                        href={task.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-0 group-hover:opacity-100 glass-btn py-1 px-2 text-[10px] uppercase tracking-wider transition-all bg-white/50 dark:bg-white/10"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Open
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* INTELLIGENCE & QUOTE (Side by Side) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* NEWS/INTELLIGENCE WIDGET */}
            <motion.div
              className="glass-panel p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.normal / 1000, delay: 0.34, ease: EASE.spring }}
              whileHover={{ y: -2, transition: { duration: DURATION.fast / 1000, ease: EASE.out } }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="glass-icon-container">
                  <Newspaper className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-semibold">Branche Nieuws</h2>
              </div>
              <div className="space-y-3">
                {news.map((item) => (
                  <motion.div
                    key={item.id}
                    onClick={() => setSelectedItem({ type: 'news', data: item })}
                    whileHover={{ scale: 1.01, x: 2 }}
                    className="p-4 rounded-xl border border-gray-300/50 dark:border-white/10 hover:border-gray-400/60 dark:hover:border-white/20 transition-all cursor-pointer bg-gray-100/30 dark:bg-white/5 group active:scale-[0.98]"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                        {item.category}
                      </span>
                      <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">{item.time}</span>
                    </div>
                    <h3 className="font-bold text-sm mb-2 line-clamp-2 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors uppercase tracking-tight">{item.title}</h3>
                    <div className="flex justify-between items-center text-[10px] font-semibold text-gray-600 dark:text-gray-400">
                      <span>{item.source}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* QUOTE WIDGET */}
            <motion.div
              className="glass-panel p-8 flex flex-col justify-center items-center text-center relative overflow-hidden min-h-[220px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.normal / 1000, delay: 0.42, ease: EASE.spring }}
              whileHover={{
                y: -2,
                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)",
                transition: { duration: DURATION.fast / 1000, ease: EASE.out }
              }}
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 z-0">
                <img
                  src="/quote_bg_tree.png"
                  alt="Tree background"
                  className="w-full h-full object-cover opacity-40 dark:opacity-30"
                />
                <div className="absolute inset-0 bg-white/10 dark:bg-black/20" />
              </div>

              <div className="relative z-10 max-w-md">
                <div className="glass-icon-container mb-6 mx-auto bg-white/50 dark:bg-black/50 backdrop-blur-md">
                  <Sparkles className="w-6 h-6 text-blue-500" />
                </div>
                <blockquote className="text-xl font-bold italic mb-4 text-gray-900 dark:text-white leading-tight drop-shadow-sm">
                  "De beste tijd om een boom te planten was 20 jaar geleden. De op één na beste tijd is nu."
                </blockquote>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-300 drop-shadow-sm">— Chinees spreekwoord</p>
              </div>
            </motion.div>
          </div>

          {/* CALENDAR WIDGET */}
          <motion.div
            className="glass-panel p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.normal / 1000, delay: 0.5, ease: EASE.spring }}
            whileHover={{ y: -2, transition: { duration: DURATION.fast / 1000, ease: EASE.out } }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="glass-icon-container">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Agenda</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Vandaag & Aankomend</p>
              </div>
            </div>
            <div className="space-y-3">
              {events.map((event) => (
                <a
                  key={event.id}
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-3 p-4 rounded-xl border border-gray-300/50 dark:border-white/10 hover:border-gray-400/60 dark:hover:border-white/20 transition-all bg-gray-100/50 dark:bg-white/5 group active:scale-[0.98]"
                >
                  <div className="text-sm font-bold text-gray-900 dark:text-gray-100 w-28 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {event.time}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="font-bold text-sm text-gray-900 dark:text-gray-100">{event.title}</p>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${event.status === 'aankomend'
                        ? 'bg-purple-100/80 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-200/50'
                        : 'bg-emerald-100/80 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-200/50'
                        }`}>
                        {event.status}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: Chat Sidebar (1/3 width on desktop, overlay on mobile) */}
        <div className={`lg:col-span-1 ${isChatOpen ? 'fixed inset-0 z-50 lg:relative' : 'hidden lg:block'}`}>
          {/* Mobile backdrop */}
          {isChatOpen && (
            <div
              className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[90] lg:hidden"
              onClick={() => setIsChatOpen(false)}
            />
          )}

          {/* Chat container */}
          <motion.div
            className={`glass-panel p-6 flex flex-col ${isChatOpen ? 'fixed inset-0 z-[100] rounded-none bg-white/95 dark:bg-gray-900/95 lg:h-[calc(100vh-8rem)] lg:w-auto lg:relative lg:inset-auto lg:z-auto lg:rounded-2xl lg:bg-transparent lg:sticky lg:top-8' : 'h-[calc(100vh-8rem)] lg:sticky lg:top-8'}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: DURATION.normal / 1000, delay: 0.58, ease: EASE.spring }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="glass-icon-container">
                  <Bot className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-semibold">AI Assistent</h2>
              </div>
              {/* Close button for mobile */}
              {isChatOpen && (
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="glass-btn w-10 h-10 p-0 flex items-center justify-center lg:hidden"
                >
                  <Minimize2 className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Quick Action Chips */}
            <div className="flex flex-wrap gap-2 mb-4">
              {quickActions.slice(0, 3).map((action) => (
                <button key={action.id} className="glass-chip text-xs">
                  <action.icon className="w-3.5 h-3.5" />
                  <span>{action.label}</span>
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto mb-4 space-y-3">
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, ease: EASE.spring }}
                className="p-3 rounded-xl bg-white/10 dark:bg-black/10 border border-gray-400/20 dark:border-white/10"
              >
                <p className="text-sm">Hoi Dusty! 🎯 Ik ben COSMO, je orchestrator. Stel me een vraag of upload een afbeelding voor analyse.</p>
              </motion.div>

              {/* Unified Listening Visualizer */}
              {isListening && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-2 ml-2"
                >
                  <div className="flex gap-1">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        animate={{
                          height: [6, 16, 6],
                        }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.1,
                          ease: "easeInOut"
                        }}
                        className="w-1 bg-blue-400/60 rounded-full"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-blue-400 font-medium">COSMO luistert...</span>
                </motion.div>
              )}
            </div>

            {/* Input Area with Model Selector */}
            <div className="space-y-3 mt-auto">
              <div className="relative">
                <div className="flex items-center gap-2 p-3 border border-gray-400/30 dark:border-white/20 rounded-xl bg-white/10 dark:bg-black/10">
                  <button className="p-1.5 hover:bg-white/10 dark:hover:bg-black/10 rounded transition-colors" title="Voeg bestand toe">
                    <Plus className="w-5 h-5" />
                  </button>

                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder={isListening ? "Ik luister naar je..." : "Hoe kan ik je helpen vandaag, Dusty?"}
                    className="flex-1 outline-none text-sm bg-transparent placeholder:text-gray-500 dark:placeholder:text-white/50"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        // Handle send logic here
                        setChatInput("");
                      }
                    }}
                  />

                  <div className="flex items-center gap-1">
                    <motion.button
                      onClick={() => setIsListening(!isListening)}
                      animate={isListening ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                      transition={isListening ? { duration: 1, repeat: Infinity, ease: "easeInOut" } : {}}
                      className={`p-1.5 rounded transition-colors ${isListening ? 'text-blue-500 bg-blue-500/10' : 'hover:bg-white/10 dark:hover:bg-black/10'}`}
                      title={isListening ? "Stop met praten" : "Begin met praten"}
                    >
                      {isListening ? <Mic className="w-5 h-5 text-blue-500" /> : <Mic className="w-5 h-5" />}
                    </motion.button>

                    <button
                      className="p-1.5 hover:bg-white/10 dark:hover:bg-black/10 rounded transition-colors"
                      onClick={() => setChatInput("")}
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Model selector */}
              <div className="flex justify-end">
                <select
                  value={selectedLLM}
                  onChange={(e) => setSelectedLLM(e.target.value)}
                  className="glass-chip text-sm px-3 py-1.5 cursor-pointer bg-white/20 dark:bg-black/20 appearance-none outline-none border-none"
                >
                  {llmOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-lg glass-panel p-8 shadow-2xl"
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              <Minimize2 className="w-4 h-4" />
            </button>

            {selectedItem.type === 'email' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="glass-icon-container">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{selectedItem.data.sender}</h2>
                    <p className="text-sm text-gray-500">{selectedItem.data.subject}</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm leading-relaxed whitespace-pre-line">
                  {selectedItem.data.fullContent}
                </div>
                <div className="flex justify-end pt-4">
                  <a
                    href={selectedItem.data.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-btn flex items-center gap-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
                  >
                    Open in Gmail <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )}

            {selectedItem.type === 'news' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="glass-icon-container">
                    <Newspaper className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{selectedItem.data.title}</h2>
                    <p className="text-sm text-gray-500">{selectedItem.data.source} • {selectedItem.data.time}</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm leading-relaxed">
                  <h3 className="font-semibold mb-2 text-blue-500">Perplexity Samenvatting</h3>
                  {selectedItem.data.summary}
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Bronnen</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.data.sources.map((src: string, i: number) => (
                      <a
                        key={i}
                        href={src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-500 hover:underline bg-blue-500/5 px-2 py-1 rounded"
                      >
                        Source {i + 1}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <a
                    href={selectedItem.data.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-btn flex items-center gap-2"
                  >
                    Bekijk op Perplexity <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )}

            {selectedItem.type === 'urgent' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 rounded-xl bg-opacity-20 flex items-center justify-center ${selectedItem.data.urgency === 'high' ? 'bg-red-500' : selectedItem.data.urgency === 'medium' ? 'bg-orange-500' : 'bg-blue-500'}`}>
                    {selectedItem.data.urgency === 'high' ? <AlertTriangle className="w-6 h-6 text-red-500" /> : selectedItem.data.urgency === 'medium' ? <HelpCircle className="w-6 h-6 text-orange-500" /> : <AlertCircle className="w-6 h-6 text-blue-500" />}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Urgente Actie Vereist</h2>
                    <p className={`text-sm font-bold uppercase tracking-wider ${selectedItem.data.urgency === 'high' ? 'text-red-500' : selectedItem.data.urgency === 'medium' ? 'text-orange-500' : 'text-blue-500'}`}>
                      {selectedItem.data.urgency}
                    </p>
                  </div>
                </div>
                <div className={`p-6 rounded-2xl border text-sm leading-relaxed ${selectedItem.data.urgency === 'high' ? 'bg-red-500/5 border-red-500/10' : selectedItem.data.urgency === 'medium' ? 'bg-orange-500/5 border-orange-500/10' : 'bg-blue-500/5 border-blue-500/10'}`}>
                  <p className="font-bold text-lg mb-2 text-gray-900 dark:text-white leading-tight">{selectedItem.data.summary}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-base font-medium">Deze taak heeft direct aandacht nodig en vereist jouw expertise.</p>
                </div>
                <div className="flex justify-end pt-4">
                  <a
                    href={selectedItem.data.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`glass-btn flex items-center gap-2 text-white border-none transition-all shadow-lg font-bold px-6 py-3 ${selectedItem.data.urgency === 'high' ? 'bg-red-500 hover:bg-red-600' : selectedItem.data.urgency === 'medium' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-500 hover:bg-blue-600'}`}
                  >
                    Actie ondernemen <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
