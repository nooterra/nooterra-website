import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Bot, User, Loader2, Settings2, ChevronDown } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  agents?: string[];
  timestamp: Date;
};

const suggestions = [
  "Analyze this dataset and find patterns",
  "Write a Python script to automate...",
  "Research the latest developments in...",
  "Generate a marketing strategy for...",
];

export default function Chat() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const coordUrl = (import.meta as any).env?.VITE_COORD_URL || "https://coord.nooterra.ai";
      const token = localStorage.getItem("token");

      const res = await fetch(`${coordUrl}/v1/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) throw new Error("Failed to get response");

      const data = await res.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.choices?.[0]?.message?.content || data.content || "I processed your request through the network.",
        agents: data.agents_used || ["network-orchestrator"],
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      // Demo fallback
      const demoResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `I've routed your request through the Nooterra network. Here's what the coordinated agents found:\n\n**Analysis Summary:**\nYour query "${userMessage.content.slice(0, 50)}..." was processed by 3 specialized agents in the network.\n\n*This is a demo response. Connect to the live network for real AI coordination.*`,
        agents: ["discovery-agent", "reasoning-agent", "synthesis-agent"],
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, demoResponse]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestion = (suggestion: string) => {
    setInput(suggestion);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {messages.length === 0 ? (
        /* Empty state */
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#4f7cff]/20 to-[#a855f7]/20 border border-[#4f7cff]/20 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-[#4f7cff]" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-3">How can I help you today?</h1>
            <p className="text-[#707090] mb-8">
              Ask anything. Nooterra coordinates specialized AI agents to find the best answer.
            </p>

            <div className="grid sm:grid-cols-2 gap-3">
              {suggestions.map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestion(suggestion)}
                  className="p-4 text-left bg-[#0a0a12] border border-[#4f7cff]/10 rounded-xl text-sm text-[#909098] hover:text-white hover:border-[#4f7cff]/30 transition-all"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      ) : (
        /* Messages */
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="max-w-3xl mx-auto space-y-6">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex gap-4 ${message.role === "user" ? "justify-end" : ""}`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4f7cff] to-[#a855f7] flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className={`flex-1 max-w-[80%] ${message.role === "user" ? "text-right" : ""}`}>
                    <div
                      className={`inline-block px-4 py-3 rounded-2xl text-sm ${
                        message.role === "user"
                          ? "bg-[#4f7cff] text-white rounded-br-md"
                          : "bg-[#0f0f18] border border-[#4f7cff]/10 text-[#e0e0e8] rounded-bl-md"
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{message.content}</div>
                    </div>
                    {message.agents && message.agents.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {message.agents.map((agent) => (
                          <span
                            key={agent}
                            className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] bg-[#4f7cff]/10 text-[#4f7cff] rounded-full"
                          >
                            <span className="w-1 h-1 bg-[#4f7cff] rounded-full" />
                            {agent}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-lg bg-[#4f7cff]/20 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-[#4f7cff]" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-4"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4f7cff] to-[#a855f7] flex items-center justify-center">
                  <Loader2 className="w-4 h-4 text-white animate-spin" />
                </div>
                <div className="flex items-center gap-2 text-sm text-[#707090]">
                  <span>Coordinating agents</span>
                  <span className="flex gap-1">
                    <span className="w-1 h-1 bg-[#4f7cff] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1 h-1 bg-[#4f7cff] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1 h-1 bg-[#4f7cff] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </span>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="border-t border-[#4f7cff]/10 bg-[#0a0a12] px-4 py-4">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="relative flex items-end gap-3">
            <div className="flex-1 bg-[#0f0f18] border border-[#4f7cff]/20 rounded-2xl focus-within:border-[#4f7cff]/40 transition-all">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message Nooterra..."
                rows={1}
                className="w-full bg-transparent px-4 py-3 text-white placeholder-[#505060] resize-none focus:outline-none text-sm max-h-32"
                style={{ minHeight: "48px" }}
              />
              <div className="flex items-center justify-between px-3 pb-2">
                <button
                  type="button"
                  onClick={() => setShowSettings(!showSettings)}
                  className="flex items-center gap-1 text-xs text-[#505060] hover:text-[#707090] transition-colors"
                >
                  <Settings2 className="w-3 h-3" />
                  <span>Settings</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${showSettings ? "rotate-180" : ""}`} />
                </button>
                <span className="text-[10px] text-[#404050]">
                  Press Enter to send, Shift+Enter for new line
                </span>
              </div>
            </div>
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="w-12 h-12 flex items-center justify-center bg-[#4f7cff] hover:bg-[#4f7cff]/90 disabled:bg-[#4f7cff]/30 rounded-xl transition-all disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>

          {showSettings && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 p-4 bg-[#0f0f18] border border-[#4f7cff]/10 rounded-xl"
            >
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="block text-[#707090] mb-2">Preferred Model</label>
                  <select className="w-full bg-[#0a0a12] border border-[#4f7cff]/20 rounded-lg px-3 py-2 text-white focus:outline-none">
                    <option>Auto (Network Choice)</option>
                    <option>GPT-4</option>
                    <option>Claude</option>
                    <option>Llama 3</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#707090] mb-2">Budget per query</label>
                  <select className="w-full bg-[#0a0a12] border border-[#4f7cff]/20 rounded-lg px-3 py-2 text-white focus:outline-none">
                    <option>Standard (up to 100 NCR)</option>
                    <option>Economy (up to 50 NCR)</option>
                    <option>Premium (unlimited)</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </form>
      </div>
    </div>
  );
}

