"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Mail, CheckSquare, Calendar, Newspaper, Bot, Sun, Moon, Send,
  Plus, Maximize2, Minimize2, Sparkles, AlertCircle, Inbox,
  FileText, Database, Layout, FolderOpen, MessageSquare, ArrowRight, CheckCircle, RefreshCw, Mic, MicOff
} from "lucide-react";
import {
  DURATION, STAGGER, EASE,
  fadeInUp, cardHover, liftHover,
  defaultTransition, springTransition
} from "@/lib/motion";
import { useMotionValue, useSpring, useTransform } from "framer-motion";

export default function DashboardPage() {
  const [isDark, setIsDark] = useState(false);
  const [selectedLLM, setSelectedLLM] = useState("Claude");
  const [chatInput, setChatInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Scroll locking for mobile chat
  useEffect(() => {
    if (isChatOpen && window.innerWidth < 1024) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isChatOpen]);

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
      { id: 1, category: 'COMPLAINT', urgency: 'high', summary: 'Klacht: Camera niet geleverd', suggestedAction: 'Reageer binnen 2 uur' },
      { id: 2, category: 'BUSINESS', urgency: 'high', summary: 'Vergaderverzoek: Portfolio review @ 14:00', suggestedAction: 'Bevestig aanwezigheid' },
      { id: 3, category: 'QUESTION', urgency: 'medium', summary: 'Vraag: Bruiloft pakket prijzen', suggestedAction: 'Stuur prijslijst' }
    ]
  };

  // Mock data - Emails
  const emails = [
    {
      id: 1, account: 1, sender: "Jan de Vries", subject: "Q4 Planning Meeting", time: "10:30",
      unread: true, category: 'BUSINESS', urgency: 'high',
      aiSummary: "Vergaderverzoek voor Q4 planning bespreking",
      suggestedAction: "Bevestig aanwezigheid",
      estimatedValue: null
    },
    {
      id: 2, account: 2, sender: "Sophie Bakker", subject: "Bruiloft fotografie aanvraag", time: "09:15",
      unread: true, category: 'PHOTO_REQUEST', urgency: 'medium',
      aiSummary: "Bruiloftsfotografie aanvraag voor juni 2026",
      suggestedAction: "Stuur prijzen en beschikbaarheid",
      estimatedValue: 1500
    },
    {
      id: 3, account: 1, sender: "Peter Jansen", subject: "Product bestelling #1234", time: "Gisteren",
      unread: false, category: 'ORDER', urgency: 'low',
      aiSummary: "Bevestiging bestelling camera apparatuur",
      suggestedAction: "Verwerk en verzend",
      estimatedValue: null
    },
  ];

  const tasks = [
    { id: 1, title: "Dashboard design reviewen", priority: 1, completed: false },
    { id: 2, title: "API documentatie updaten", priority: 2, completed: false },
    { id: 3, title: "Klant meeting voorbereiden", priority: 1, completed: true },
  ];

  const events = [
    { id: 1, title: "Team Standup", time: "14:00 - 14:30", status: "aankomend" },
    { id: 2, title: "Design Review", time: "15:00 - 16:00", status: "aankomend" },
    { id: 3, title: "1-op-1 met Manager", time: "Morgen 10:00", status: "gepland" },
  ];

  const news = [
    { id: 1, title: "AI Tools Hervormen Fotografie Workflow", category: "Fotografie", source: "TechCrunch", time: "2u geleden" },
    { id: 2, title: "Next.js 15 Uitgebracht met Turbopack", category: "Tech", source: "Vercel Blog", time: "5u geleden" },
    { id: 3, title: "Digitale Trends in Uitvaartdiensten", category: "Uitvaart", source: "Branche Nieuws", time: "1d geleden" },
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
    const map: Record<string, string> = {
      'ORDER': '📦',
      'PHOTO_REQUEST': '📸',
      'QUESTION': '❓',
      'COMPLAINT': '⚠️',
      'BUSINESS': '💼'
    };
    return map[category] || '📧';
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
      'high': 'bg-red-50/80 dark:bg-red-500/10 border-red-200/60 dark:border-red-400/30',
      'medium': 'bg-orange-50/80 dark:bg-orange-500/10 border-orange-200/60 dark:border-orange-400/30',
      'low': 'bg-blue-50/80 dark:bg-blue-500/10 border-blue-200/60 dark:border-blue-400/30'
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
              <button className="ml-auto glass-btn w-8 h-8 p-0 flex items-center justify-center" title="Ververs briefing">
                <RefreshCw className="w-4 h-4" />
              </button>
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
                      className={`p-3 rounded-xl border ${getUrgencyColor(item.urgency)} transition-all hover:border-opacity-70 cursor-pointer`}
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-lg">{getCategoryIcon(item.category)}</span>
                        <div className="flex-1">
                          <p className="text-sm font-medium mb-1 text-gray-900 dark:text-white">{item.summary}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            → {item.suggestedAction}
                          </p>
                        </div>
                        <span className="px-2 py-1 rounded-md text-xs font-medium bg-gray-200/80 dark:bg-white/20 text-gray-700 dark:text-gray-200 border border-gray-300/50 dark:border-white/20">
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
                  <span className="text-lg">📦</span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Bestellingen</span>
                </div>
                <p className="text-2xl font-semibold">{executiveSummary.stats.orders}</p>
              </div>

              <div className="p-3 rounded-xl bg-gray-100/50 dark:bg-white/5 border border-gray-300/50 dark:border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">📸</span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Foto Aanvragen</span>
                </div>
                <p className="text-2xl font-semibold">{executiveSummary.stats.photoRequests}</p>
              </div>

              <div className="p-3 rounded-xl bg-gray-100/50 dark:bg-white/5 border border-gray-300/50 dark:border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">❓</span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Vragen</span>
                </div>
                <p className="text-2xl font-semibold">{executiveSummary.stats.questions}</p>
              </div>

              <div className="p-3 rounded-xl bg-gray-100/50 dark:bg-white/5 border border-gray-300/50 dark:border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">💰</span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Potentieel</span>
                </div>
                <p className="text-2xl font-semibold">
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
              <div className="space-y-2">
                {emails.map((email) => (
                  <div
                    key={email.id}
                    className={`p-3 rounded-xl border transition-all cursor-pointer hover:border-gray-400/40 dark:hover:border-white/30 ${email.unread
                      ? "bg-blue-500/10 border-blue-400/30"
                      : "bg-gray-100/50 dark:bg-white/5 border-gray-300/50 dark:border-white/10"
                      }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2 flex-1">
                        <div className={`w-2 h-2 rounded-full ${getUrgencyDot(email.urgency)}`} />
                        <span className="font-medium text-sm">{email.sender}</span>
                        <span className="text-base">{getCategoryIcon(email.category)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-gray-200/80 dark:bg-white/20 text-gray-700 dark:text-gray-200 border border-gray-300/50 dark:border-white/20">Acc {email.account}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{email.time}</span>
                      </div>
                    </div>

                    <p className="text-sm font-medium mb-1">
                      {email.subject}
                    </p>

                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      {email.aiSummary}
                    </p>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1 text-xs text-blue-300">
                        <ArrowRight className="w-3 h-3" />
                        <span>{email.suggestedAction}</span>
                      </div>
                      {email.estimatedValue && (
                        <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-green-100/80 dark:bg-green-500/20 text-green-700 dark:text-green-300 border border-green-300/60 dark:border-green-400/30">
                          ~€{email.estimatedValue.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
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
                  <p className="text-sm text-gray-600 dark:text-gray-400">{tasks.filter(t => !t.completed).length} resterend</p>
                </div>
              </div>
              <div className="space-y-2">
                {tasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100/50 dark:hover:bg-white/5 transition-colors cursor-pointer"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05, ease: EASE.out }}
                    whileHover={{ x: 4, transition: { duration: 0.2 } }}
                  >
                    <motion.div
                      whileTap={{ scale: 0.8 }}
                      animate={task.completed ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.2, ease: EASE.spring }}
                    >
                      <input
                        type="checkbox"
                        checked={task.completed}
                        className="w-4 h-4 rounded border-gray-400 dark:border-white/30 text-blue-400 focus:ring-blue-400 cursor-pointer"
                        readOnly
                      />
                    </motion.div>
                    <motion.span
                      animate={task.completed ? { opacity: 0.5, x: 5 } : { opacity: 1, x: 0 }}
                      className={task.completed ? "line-through text-gray-400 dark:text-gray-500" : ""}
                    >
                      {task.title}
                    </motion.span>
                    {task.priority === 1 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto px-2 py-0.5 rounded-md text-xs font-medium bg-red-100/80 dark:bg-red-500/20 text-red-700 dark:text-red-300 border border-red-300/60 dark:border-red-400/30"
                      >
                        P1
                      </motion.span>
                    )}
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
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border border-gray-300/50 dark:border-white/10 hover:border-gray-400/60 dark:hover:border-white/20 transition-colors cursor-pointer bg-gray-100/50 dark:bg-white/5"
                  >
                    <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-gray-200/80 dark:bg-white/20 text-gray-700 dark:text-gray-200 border border-gray-300/50 dark:border-white/20 mb-2 inline-block">{item.category}</span>
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2">{item.title}</h3>
                    <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                      <span>{item.source}</span>
                      <span>{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* QUOTE WIDGET */}
            <motion.div
              className="glass-panel p-6 flex flex-col justify-center items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.normal / 1000, delay: 0.42, ease: EASE.spring }}
              whileHover={{
                y: -2,
                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)",
                transition: { duration: DURATION.fast / 1000, ease: EASE.out }
              }}
            >
              <div className="max-w-md mx-auto">
                <div className="glass-icon-container mb-4 mx-auto">
                  <Sparkles className="w-6 h-6" />
                </div>
                <blockquote className="text-lg font-medium italic mb-3">
                  "De beste tijd om een boom te planten was 20 jaar geleden. De op één na beste tijd is nu."
                </blockquote>
                <p className="text-sm text-gray-600 dark:text-gray-400">— Chinees spreekwoord</p>
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
                <div
                  key={event.id}
                  className="flex gap-3 p-3 rounded-xl border border-gray-300/50 dark:border-white/10 hover:border-gray-400/60 dark:hover:border-white/20 transition-colors bg-gray-100/50 dark:bg-white/5"
                >
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 w-28">{event.time}</div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{event.title}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-md text-xs font-medium bg-blue-100/80 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-300/60 dark:border-blue-400/30">
                      {event.status}
                    </span>
                  </div>
                </div>
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
    </div>
  );
}
