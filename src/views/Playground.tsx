"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Send,
  Sparkles,
  Bot,
  User,
  Loader2,
  Plus,
  MessageSquare,
  Settings,
  ChevronRight,
  Zap,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  agentName?: string;
  status?: "pending" | "processing" | "complete" | "error";
}

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

const COORD_URL = (import.meta as any).env?.VITE_COORD_URL || "https://coord.nooterra.ai";

export default function Playground() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([
    { id: "1", title: "New conversation", lastMessage: "Start chatting...", timestamp: new Date() },
  ]);
  const [activeConversation, setActiveConversation] = useState("1");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Add processing message
    const processingId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      {
        id: processingId,
        role: "system",
        content: "Finding the best agent for your request...",
        timestamp: new Date(),
        status: "processing",
      },
    ]);

    try {
      // Step 1: Update status - analyzing request
      setMessages((prev) => 
        prev.map((m) => 
          m.id === processingId 
            ? { ...m, content: "🔍 Analyzing your request..." }
            : m
        )
      );
      
      // Step 2: Search for relevant agents based on intent
      const discoverRes = await fetch(`${COORD_URL}/v1/discover?q=${encodeURIComponent(userMessage.content)}&limit=10`, {
        headers: { "x-api-key": "playground-free-tier" },
      });
      
      let availableAgents: any[] = [];
      if (discoverRes.ok) {
        const discoverData = await discoverRes.json();
        availableAgents = discoverData.results || [];
      }
      
      // Step 3: Build agent context for the orchestrator
      const agentContext = availableAgents.length > 0 
        ? `Available specialized agents:\n${availableAgents.slice(0, 5).map((a: any) => 
            `- ${a.did.split(':').pop()}: ${a.description} (capability: ${a.capabilityId})`
          ).join('\n')}`
        : "";
      
      // Step 4: Update status - found agents
      setMessages((prev) => 
        prev.map((m) => 
          m.id === processingId 
            ? { ...m, content: "🤖 Processing..." }
            : m
        )
      );
      
      // Step 5: Build conversation history for context
      const conversationHistory = messages
        .filter(m => m.role === "user" || m.role === "assistant")
        .slice(-10) // Last 10 messages for context
        .map(m => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
        .join("\n\n");
      
      // Step 6: Build smart orchestration prompt with memory
      const orchestrationPrompt = `You are Nooterra's intelligent AI orchestrator with access to specialized agents. You MUST remember the conversation context and stay on topic.

CONVERSATION HISTORY:
${conversationHistory || "(This is the start of the conversation)"}

CURRENT USER MESSAGE: "${userMessage.content}"

${agentContext ? `\nAVAILABLE SPECIALIZED AGENTS:\n${agentContext}` : ""}

YOUR CAPABILITIES:
1. ESMFold Agent - Predicts 3D protein structures from amino acid sequences
   Example sequence: MKTAYIAKQRQISFVKSHFSRQLEERLGLIEVQAPILSRVGDGTQDNLSGAEKAVQVKVKALPDAQFEVVHSLAKWKRQQIAAALEHHHHHH
   Another example (Insulin B chain): FVNQHLCGSHLVEALYLVCGERGFFYTPKT
   Another example (Green Fluorescent Protein fragment): MSKGEELFTGVVPILVELDGDVNGHKFSVSGEGEGDATYGKLTLKFICTTGKLPVPWPTLVTTFSYGVQCFSRYPDHMKQHDFFKSAMPEGYVQERTIFFKDDGNYKTRAEVKFEGDTLVNRIELKGIDFKEDGNILGHKLEYNYNSHNVYIMADKQKNGIKVNFKIRHNIEDGSVQLADHYQQNTPIGDGPVLLPDNHYLSTQSALSKDPNEKRDHMVLLEFVTAAGITHGMDELYK

2. Stable Diffusion XL - Generates images from text descriptions
3. CodeLlama - Generates and explains code
4. OPUS Translator - Translates between languages
5. BART Summarizer - Summarizes long text

CRITICAL RULES:
- ALWAYS remember what the user asked before. If they asked about proteins, stay on that topic.
- If user asks for an example, PROVIDE ONE IMMEDIATELY - don't ask more questions.
- If user asks you to generate/create something, DO IT with the tools available.
- Be proactive and helpful - anticipate what the user needs.
- When discussing protein structures, always offer example sequences they can use.

Now respond to the user's current message while maintaining full context of the conversation:`;

      // Step 6: Call orchestrator (Hermes) with context
      const response = await fetch(`${COORD_URL}/v1/workflows/publish`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-api-key": "playground-free-tier",
        },
        body: JSON.stringify({
          intent: userMessage.content,
          payerDid: "did:noot:playground",
          maxCents: 0,
          nodes: {
            main: {
              capabilityId: "cap.llm.chat.v1",
              payload: { query: orchestrationPrompt },
            },
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Workflow publish failed:", response.status, errorText);
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const workflowId = data.workflowId;

      if (!workflowId) {
        throw new Error("No workflow ID returned");
      }

      // Poll for result
      let result = null;
      for (let i = 0; i < 30; i++) {
        await new Promise((r) => setTimeout(r, 1000));
        const statusRes = await fetch(`${COORD_URL}/v1/workflows/${workflowId}`, {
          headers: { "x-api-key": "playground-free-tier" },
        });
        
        if (!statusRes.ok) continue;
        
        const status = await statusRes.json();
        
        if (status.nodes?.[0]?.status === "success") {
          result = status.nodes[0].result_payload;
          break;
        } else if (status.nodes?.[0]?.status === "failed") {
          throw new Error("Agent failed to process request");
        }
      }

      // Remove processing message and add response
      setMessages((prev) => prev.filter((m) => m.id !== processingId));

      const responseText = result?.response || result?.output || result?.result || result?.text;
      
      if (responseText) {
        // Determine agent name from available agents or default
        const primaryAgent = availableAgents.length > 0 
          ? availableAgents[0].did.split(':').pop() 
          : "Nooterra";
        
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: "assistant",
            content: typeof responseText === 'string' ? responseText : JSON.stringify(responseText, null, 2),
            timestamp: new Date(),
            agentName: `Orchestrator → ${primaryAgent}`,
            status: "complete",
          },
        ]);
        
        // Update conversation title based on first message
        if (messages.length === 0) {
          const title = userMessage.content.slice(0, 30) + (userMessage.content.length > 30 ? "..." : "");
          setConversations((prev) =>
            prev.map((c) =>
              c.id === activeConversation
                ? { ...c, title, lastMessage: responseText.slice(0, 50) }
                : c
            )
          );
        }
      } else {
        throw new Error("No response received from agent");
      }
    } catch (error) {
      setMessages((prev) => prev.filter((m) => m.id !== processingId));
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "system",
          content: "Sorry, I couldn't process your request. Please try again.",
          timestamp: new Date(),
          status: "error",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const startNewConversation = () => {
    const newId = Date.now().toString();
    setConversations((prev) => [
      { id: newId, title: "New conversation", lastMessage: "Start chatting...", timestamp: new Date() },
      ...prev,
    ]);
    setActiveConversation(newId);
    setMessages([]);
  };

  return (
    <div className="h-screen bg-black flex overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full border-r border-white/10 bg-neutral-950 flex flex-col"
          >
            {/* Sidebar Header */}
            <div className="p-4 border-b border-white/10">
              <Link to="/" className="flex items-center gap-2 text-white mb-4">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back to Home</span>
              </Link>
              <button
                onClick={startNewConversation}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                New Chat
              </button>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto p-2">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setActiveConversation(conv.id)}
                  className={`w-full text-left p-3 rounded-lg mb-1 transition-colors ${
                    activeConversation === conv.id
                      ? "bg-white/10 text-white"
                      : "text-neutral-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm truncate">{conv.title}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <Zap className="w-3 h-3 text-emerald-500" />
                <span>Free tier active</span>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-14 border-b border-white/10 bg-neutral-950/50 backdrop-blur-xl flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
            >
              <ChevronRight className={`w-5 h-5 transition-transform ${sidebarOpen ? "rotate-180" : ""}`} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-medium text-white">Nooterra Playground</h1>
                <p className="text-xs text-neutral-500">Multi-agent AI coordination</p>
              </div>
            </div>
          </div>
          <Link
            to="/signup"
            className="px-4 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-colors"
          >
            Upgrade
          </Link>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-white/10 flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-2">How can I help you?</h2>
              <p className="text-neutral-400 text-center max-w-md mb-8">
                Ask me anything and I'll coordinate the right AI agents to help you.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg w-full">
                {[
                  "Explain quantum computing simply",
                  "Write a haiku about technology",
                  "Summarize the key AI trends in 2024",
                  "Help me brainstorm startup ideas",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setInput(suggestion)}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 text-left text-sm text-neutral-300 hover:bg-white/10 hover:border-white/20 transition-all"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto p-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-6 ${message.role === "user" ? "flex justify-end" : ""}`}
                >
                  {message.role === "user" ? (
                    <div className="max-w-[80%] bg-cyan-500/20 border border-cyan-500/30 rounded-2xl rounded-tr-sm px-4 py-3">
                      <p className="text-white">{message.content}</p>
                    </div>
                  ) : message.role === "assistant" ? (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        {message.agentName && (
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium text-violet-400">{message.agentName}</span>
                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          </div>
                        )}
                        <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3">
                          <p className="text-neutral-200 whitespace-pre-wrap">{message.content}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-neutral-500">
                      {message.status === "processing" && (
                        <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                      )}
                      {message.status === "error" && (
                        <AlertCircle className="w-4 h-4 text-red-400" />
                      )}
                      <span>{message.content}</span>
                    </div>
                  )}
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-white/10 bg-neutral-950/50 backdrop-blur-xl p-4">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message Nooterra..."
                rows={1}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white placeholder-neutral-500 resize-none focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                style={{ minHeight: "48px", maxHeight: "200px" }}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-cyan-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cyan-400 transition-colors"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
            <p className="text-xs text-neutral-500 mt-2 text-center">
              Free tier: Using open-source models • <Link to="/signup" className="text-cyan-400 hover:underline">Upgrade</Link> for premium agents
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
