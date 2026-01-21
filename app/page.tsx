import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-10">
      <div className="z-10 max-w-5xl w-full items-center justify-center">
        <h1 className="text-4xl font-semibold mb-4 text-center text-gray-100">
          🤖 Alfred Dashboard
        </h1>
        <p className="text-center text-gray-70 mb-8 text-base">
          Je persoonlijke assistent voor emails, taken, en agenda
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-carbon-3">
          <div className="p-carbon-4 bg-white border border-gray-20 rounded hover:border-blue-60 transition-colors">
            <h3 className="font-medium mb-carbon-2 text-gray-100">📧 Unified Inbox</h3>
            <p className="text-sm text-gray-70">
              2 Gmail accounts in één overzicht
            </p>
          </div>
          <div className="p-carbon-4 bg-white border border-gray-20 rounded hover:border-blue-60 transition-colors">
            <h3 className="font-medium mb-carbon-2 text-gray-100">✅ Taken</h3>
            <p className="text-sm text-gray-70">
              Todoist integratie voor dagelijks werk
            </p>
          </div>
          <div className="p-carbon-4 bg-white border border-gray-20 rounded hover:border-blue-60 transition-colors">
            <h3 className="font-medium mb-carbon-2 text-gray-100">📅 Agenda</h3>
            <p className="text-sm text-gray-70">
              Google Calendar sync
            </p>
          </div>
          <div className="p-carbon-4 bg-white border border-gray-20 rounded hover:border-blue-60 transition-colors">
            <h3 className="font-medium mb-carbon-2 text-gray-100">📰 Nieuws</h3>
            <p className="text-sm text-gray-70">
              Branche trends via Perplexity
            </p>
          </div>
          <div className="p-carbon-4 bg-white border border-gray-20 rounded hover:border-blue-60 transition-colors">
            <h3 className="font-medium mb-carbon-2 text-gray-100">💬 Telegram</h3>
            <p className="text-sm text-gray-70">
              2x daags samenvattingen
            </p>
          </div>
          <div className="p-carbon-4 bg-white border border-gray-20 rounded hover:border-blue-60 transition-colors">
            <h3 className="font-medium mb-carbon-2 text-gray-100">🤖 AI Summaries</h3>
            <p className="text-sm text-gray-70">
              Slimme dagelijkse briefings
            </p>
          </div>
        </div>
        <div className="mt-carbon-5 text-center">
          <Link href="/dashboard">
            <Button size="lg" className="bg-blue-60 hover:bg-blue-70 text-white">
              Open Dashboard 🚀
            </Button>
          </Link>
          <p className="text-sm text-gray-70 mt-carbon-3">
            Powered by IBM Carbon Design System
          </p>
        </div>
      </div>
    </main>
  );
}
