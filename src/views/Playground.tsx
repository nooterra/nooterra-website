import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Loader2,
  Bot,
  User,
  CheckCircle,
  AlertCircle,
  Clock,
  Zap,
  Search,
  ArrowRight,
  MessageSquare,
  Sparkles,
  Play,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Network,
  DollarSign,
  Lock,
  Unlock,
} from "lucide-react";
import { Link } from "react-router-dom";

const COORD_URL = (import.meta as any).env?.VITE_COORD_URL || "https://coord.nooterra.ai";

interface Agent {
  did: string;
  name: string;
  capability: string;
  description: string;
  price: number;
  status: "idle" | "searching" | "working" | "waiting" | "done" | "error";
  result?: any;
  question?: string;
}

interface Message {
  id: string;
  type: "user" | "system" | "agent" | "question";
  content: string;
  agent?: Agent;
  timestamp: Date;
}

interface WorkflowNode {
  id: string;
  name: string;
  capability: string;
  agent?: Agent;
  status: "pending" | "ready" | "running" | "waiting_input" | "success" | "failed";
  dependsOn: string[];
  result?: any;
  question?: string;
}

// Simulated free agents for demo
const FREE_AGENTS: Agent[] = [
  {
    did: "did:noot:hf:sentence_transformers_minilm",
    name: "MiniLM Embeddings",
    capability: "cap.embedding.encode.minilm.v1",
    description: "Fast semantic search embeddings",
    price: 0,
    status: "idle",
  },
  {
    did: "did:noot:hf:facebook_bart_cnn",
    name: "BART Summarizer",
    capability: "cap.text.summarize.bart.v1",
    description: "Summarize long texts",
    price: 0,
    status: "idle",
  },
  {
    did: "did:noot:hf:google_flan_t5",
    name: "Flan-T5",
    capability: "cap.text.generate.flan.v1",
    description: "Text generation and Q&A",
    price: 0,
    status: "idle",
  },
  {
    did: "did:noot:hf:distilbert_sentiment",
    name: "DistilBERT Sentiment",
    capability: "cap.text.sentiment.distilbert.v1",
    description: "Analyze text sentiment",
    price: 0,
    status: "idle",
  },
  {
    did: "did:noot:hf:helsinki_opus_translate",
    name: "OPUS Translator",
    capability: "cap.translate.opus.v1",
    description: "Translate between languages",
    price: 0,
    status: "idle",
  },
  {
    did: "did:noot:hf:bert_ner",
    name: "BERT NER",
    capability: "cap.text.ner.bert.v1",
    description: "Extract named entities",
    price: 0,
    status: "idle",
  },
];

const PREMIUM_AGENTS: Agent[] = [
  {
    did: "did:noot:hf:openai_whisper",
    name: "Whisper Large",
    capability: "cap.audio.transcribe.whisper.v1",
    description: "Speech recognition (99+ languages)",
    price: 10,
    status: "idle",
  },
  {
    did: "did:noot:hf:stability_sdxl",
    name: "Stable Diffusion XL",
    capability: "cap.creative.generate.sdxl.v1",
    description: "Generate images from text",
    price: 25,
    status: "idle",
  },
  {
    did: "did:noot:hf:facebook_detr",
    name: "DETR Object Detection",
    capability: "cap.vision.detect.detr.v1",
    description: "Detect objects in images",
    price: 15,
    status: "idle",
  },
];

export default function Playground() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [workflow, setWorkflow] = useState<WorkflowNode[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [showWorkflowDetails, setShowWorkflowDetails] = useState(true);
  const [pendingQuestion, setPendingQuestion] = useState<{ nodeId: string; question: string } | null>(null);
  const [questionAnswer, setQuestionAnswer] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [searchingPhase, setSearchingPhase] = useState<string | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (msg: Omit<Message, "id" | "timestamp">) => {
    setMessages(prev => [...prev, {
      ...msg,
      id: `msg-${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
    }]);
  };

  const updateWorkflowNode = (nodeId: string, updates: Partial<WorkflowNode>) => {
    setWorkflow(prev => prev.map(node => 
      node.id === nodeId ? { ...node, ...updates } : node
    ));
  };

  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

  const findAgentsForQuery = async (query: string): Promise<Agent[]> => {
    const lowerQuery = query.toLowerCase();
    const availableAgents = isPremium ? [...FREE_AGENTS, ...PREMIUM_AGENTS] : FREE_AGENTS;
    
    // Simple keyword matching for demo
    const matched: Agent[] = [];
    
    if (lowerQuery.includes("summarize") || lowerQuery.includes("summary") || lowerQuery.includes("tldr")) {
      matched.push(availableAgents.find(a => a.capability.includes("summarize"))!);
    }
    if (lowerQuery.includes("translate") || lowerQuery.includes("spanish") || lowerQuery.includes("french") || lowerQuery.includes("german")) {
      matched.push(availableAgents.find(a => a.capability.includes("translate"))!);
    }
    if (lowerQuery.includes("sentiment") || lowerQuery.includes("feeling") || lowerQuery.includes("positive") || lowerQuery.includes("negative")) {
      matched.push(availableAgents.find(a => a.capability.includes("sentiment"))!);
    }
    if (lowerQuery.includes("entity") || lowerQuery.includes("names") || lowerQuery.includes("people") || lowerQuery.includes("places")) {
      matched.push(availableAgents.find(a => a.capability.includes("ner"))!);
    }
    if (lowerQuery.includes("search") || lowerQuery.includes("find") || lowerQuery.includes("similar")) {
      matched.push(availableAgents.find(a => a.capability.includes("embedding"))!);
    }
    if (lowerQuery.includes("answer") || lowerQuery.includes("question") || lowerQuery.includes("explain") || lowerQuery.includes("what is")) {
      matched.push(availableAgents.find(a => a.capability.includes("generate"))!);
    }
    if (isPremium && (lowerQuery.includes("image") || lowerQuery.includes("picture") || lowerQuery.includes("generate"))) {
      matched.push(availableAgents.find(a => a.capability.includes("creative"))!);
    }
    if (isPremium && (lowerQuery.includes("audio") || lowerQuery.includes("transcribe") || lowerQuery.includes("speech"))) {
      matched.push(availableAgents.find(a => a.capability.includes("whisper"))!);
    }
    
    // If no specific match, use general text generation
    if (matched.length === 0) {
      matched.push(availableAgents.find(a => a.capability.includes("generate"))!);
    }
    
    return matched.filter(Boolean);
  };

  const createWorkflow = (agents: Agent[], query: string): WorkflowNode[] => {
    const nodes: WorkflowNode[] = [];
    
    agents.forEach((agent, idx) => {
      nodes.push({
        id: `node-${idx}`,
        name: agent.name,
        capability: agent.capability,
        agent: { ...agent, status: "idle" },
        status: idx === 0 ? "ready" : "pending",
        dependsOn: idx > 0 ? [`node-${idx - 1}`] : [],
      });
    });
    
    return nodes;
  };

  const simulateAgentExecution = async (node: WorkflowNode, query: string) => {
    updateWorkflowNode(node.id, { status: "running", agent: { ...node.agent!, status: "working" } });
    
    addMessage({
      type: "agent",
      content: `🤖 **${node.name}** is processing...`,
      agent: node.agent,
    });

    await sleep(1500 + Math.random() * 1500);

    // Some agents might ask follow-up questions
    if (node.capability.includes("translate") && !query.toLowerCase().includes("spanish") && !query.toLowerCase().includes("french")) {
      updateWorkflowNode(node.id, { 
        status: "waiting_input", 
        question: "What language would you like me to translate to?",
        agent: { ...node.agent!, status: "waiting" }
      });
      
      setPendingQuestion({
        nodeId: node.id,
        question: "What language would you like me to translate to?"
      });
      
      addMessage({
        type: "question",
        content: `❓ **${node.name}** needs more information: What language would you like me to translate to?`,
        agent: node.agent,
      });
      
      return false; // Workflow paused
    }

    // Simulate success
    const fakeResults: Record<string, string> = {
      "summarize": "📝 **Summary:** The text discusses key points about AI coordination and multi-agent systems...",
      "sentiment": "😊 **Sentiment Analysis:** Positive (85% confidence) - The text expresses optimistic views about the future...",
      "translate": "🌍 **Translation:** El texto habla sobre la coordinación de inteligencia artificial...",
      "ner": "👤 **Entities Found:** Organizations: Nooterra, HuggingFace | Concepts: AI agents, workflows | Technologies: neural networks",
      "generate": "💡 **Answer:** Based on my analysis, this involves coordinating multiple specialized AI models to work together on complex tasks...",
      "embedding": "🔍 **Semantic Search:** Found 3 relevant documents with similarity scores > 0.85",
    };

    const resultKey = Object.keys(fakeResults).find(k => node.capability.includes(k)) || "generate";
    const result = fakeResults[resultKey];

    updateWorkflowNode(node.id, { 
      status: "success", 
      result,
      agent: { ...node.agent!, status: "done" }
    });

    addMessage({
      type: "agent",
      content: `✅ **${node.name}** completed!\n\n${result}`,
      agent: node.agent,
    });

    return true;
  };

  const runWorkflow = async (nodes: WorkflowNode[], query: string) => {
    for (const node of nodes) {
      const shouldContinue = await simulateAgentExecution(node, query);
      if (!shouldContinue) {
        return; // Paused for user input
      }
      await sleep(500);
    }
    
    addMessage({
      type: "system",
      content: "🎉 **Workflow Complete!** All agents have finished processing your request.",
    });
    
    setIsProcessing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const query = input.trim();
    setInput("");
    setIsProcessing(true);
    setWorkflow([]);

    addMessage({ type: "user", content: query });

    // Phase 1: Searching for agents
    setSearchingPhase("Searching for available agents...");
    addMessage({
      type: "system",
      content: `🔍 Searching the Nooterra network for ${isPremium ? "all" : "free"} agents that can help...`,
    });
    
    await sleep(1000);

    const matchedAgents = await findAgentsForQuery(query);
    
    setSearchingPhase("Building workflow...");
    addMessage({
      type: "system",
      content: `✨ Found **${matchedAgents.length} agents** that can help!\n\n${matchedAgents.map(a => `• **${a.name}** - ${a.description}`).join("\n")}`,
    });

    await sleep(800);

    // Phase 2: Create workflow
    const workflowNodes = createWorkflow(matchedAgents, query);
    setWorkflow(workflowNodes);
    setSearchingPhase(null);

    addMessage({
      type: "system",
      content: `📋 **Workflow created!** ${workflowNodes.length} agent${workflowNodes.length > 1 ? "s" : ""} will work together to complete your request.`,
    });

    await sleep(500);

    // Phase 3: Execute workflow
    await runWorkflow(workflowNodes, query);
  };

  const handleQuestionAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionAnswer.trim() || !pendingQuestion) return;

    const answer = questionAnswer.trim();
    setQuestionAnswer("");
    
    addMessage({ type: "user", content: answer });

    // Update the node and continue
    const node = workflow.find(n => n.id === pendingQuestion.nodeId);
    if (node) {
      updateWorkflowNode(node.id, { status: "running", question: undefined, agent: { ...node.agent!, status: "working" } });
      
      await sleep(1500);

      // Simulate success with the answer
      const result = `🌍 **Translation (to ${answer}):** El texto habla sobre la coordinación de inteligencia artificial y sistemas multi-agente...`;
      
      updateWorkflowNode(node.id, { 
        status: "success", 
        result,
        agent: { ...node.agent!, status: "done" }
      });

      addMessage({
        type: "agent",
        content: `✅ **${node.name}** completed!\n\n${result}`,
        agent: node.agent,
      });

      setPendingQuestion(null);

      // Continue with remaining nodes
      const nodeIndex = workflow.findIndex(n => n.id === node.id);
      const remainingNodes = workflow.slice(nodeIndex + 1);
      
      if (remainingNodes.length > 0) {
        await sleep(500);
        await runWorkflow(remainingNodes, "");
      } else {
        addMessage({
          type: "system",
          content: "🎉 **Workflow Complete!** All agents have finished processing your request.",
        });
        setIsProcessing(false);
      }
    }
  };

  const exampleQueries = [
    "Summarize this article and analyze its sentiment",
    "Translate this text to Spanish and extract named entities",
    "What is multi-agent AI coordination?",
    "Find similar documents and summarize them",
  ];

  return (
    <div className="min-h-screen bg-[#050508]">
      {/* Header */}
      <header className="border-b border-[#4f7cff]/10 bg-[#0a0a12]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.svg" alt="Nooterra" className="w-8 h-8" />
            <span className="font-semibold text-white">Nooterra Playground</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPremium(!isPremium)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isPremium 
                  ? "bg-gradient-to-r from-[#a855f7] to-[#6366f1] text-white"
                  : "bg-[#0f0f18] border border-[#4f7cff]/20 text-[#909098]"
              }`}
            >
              {isPremium ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              {isPremium ? "Premium Mode" : "Free Tier"}
            </button>
            
            <Link to="/signup" className="btn-neural px-4 py-2 text-sm">
              <Sparkles className="w-4 h-4" />
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Chat Area */}
          <div className="lg:col-span-2 flex flex-col h-[calc(100vh-140px)]">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#4f7cff]/20 to-[#00d4ff]/20 flex items-center justify-center mx-auto mb-6">
                    <Network className="w-10 h-10 text-[#4f7cff]" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3">
                    Try the Nooterra Network
                  </h2>
                  <p className="text-[#909098] mb-6 max-w-md mx-auto">
                    Ask anything and watch specialized AI agents collaborate in real-time to answer your question.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 justify-center">
                    {exampleQueries.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => setInput(q)}
                        className="px-4 py-2 bg-[#0f0f18] border border-[#4f7cff]/20 rounded-lg text-sm text-[#909098] hover:text-white hover:border-[#4f7cff]/40 transition-all"
                      >
                        {q}
                      </button>
                    ))}
                  </div>

                  {!isPremium && (
                    <div className="mt-8 p-4 bg-[#0f0f18] border border-[#4f7cff]/10 rounded-xl max-w-md mx-auto">
                      <div className="flex items-center gap-2 text-[#a855f7] mb-2">
                        <Lock className="w-4 h-4" />
                        <span className="font-medium text-sm">Free Tier</span>
                      </div>
                      <p className="text-[#707090] text-sm">
                        You have access to 6 free agents. Upgrade for image generation, audio transcription, and more!
                      </p>
                    </div>
                  )}
                </div>
              )}

              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      msg.type === "user"
                        ? "bg-[#4f7cff] text-white"
                        : msg.type === "question"
                        ? "bg-[#f59e0b]/10 border border-[#f59e0b]/30 text-white"
                        : msg.type === "agent"
                        ? "bg-[#0f0f18] border border-[#4f7cff]/20 text-white"
                        : "bg-[#0f0f18] border border-[#4f7cff]/10 text-[#909098]"
                    }`}
                  >
                    {msg.type !== "user" && (
                      <div className="flex items-center gap-2 mb-2 text-xs text-[#707090]">
                        {msg.type === "agent" && <Bot className="w-3 h-3" />}
                        {msg.type === "system" && <Zap className="w-3 h-3" />}
                        {msg.type === "question" && <HelpCircle className="w-3 h-3 text-[#f59e0b]" />}
                        <span>{msg.type === "system" ? "System" : msg.agent?.name || "Agent"}</span>
                      </div>
                    )}
                    <div 
                      className="text-sm whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{ 
                        __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                      }}
                    />
                  </div>
                </motion.div>
              ))}

              {searchingPhase && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-[#0f0f18] border border-[#4f7cff]/20 rounded-2xl px-4 py-3 flex items-center gap-3">
                    <Loader2 className="w-4 h-4 animate-spin text-[#4f7cff]" />
                    <span className="text-sm text-[#909098]">{searchingPhase}</span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            {pendingQuestion ? (
              <form onSubmit={handleQuestionAnswer} className="flex gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={questionAnswer}
                    onChange={(e) => setQuestionAnswer(e.target.value)}
                    placeholder="Answer the agent's question..."
                    className="w-full bg-[#0f0f18] border border-[#f59e0b]/30 rounded-xl px-4 py-3 text-white placeholder-[#707090] focus:outline-none focus:border-[#f59e0b]"
                    autoFocus
                  />
                  <HelpCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#f59e0b]" />
                </div>
                <button
                  type="submit"
                  disabled={!questionAnswer.trim()}
                  className="px-6 py-3 bg-[#f59e0b] hover:bg-[#f59e0b]/80 text-black rounded-xl font-medium transition-all disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask anything... AI agents will collaborate to help"
                    className="w-full bg-[#0f0f18] border border-[#4f7cff]/20 rounded-xl px-4 py-3 text-white placeholder-[#707090] focus:outline-none focus:border-[#4f7cff]"
                    disabled={isProcessing}
                  />
                </div>
                <button
                  type="submit"
                  disabled={!input.trim() || isProcessing}
                  className="btn-neural px-6 py-3"
                >
                  {isProcessing ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Workflow Sidebar */}
          <div className="bg-[#0a0a12] border border-[#4f7cff]/10 rounded-xl p-4 h-fit sticky top-24">
            <div 
              className="flex items-center justify-between mb-4 cursor-pointer"
              onClick={() => setShowWorkflowDetails(!showWorkflowDetails)}
            >
              <h3 className="text-white font-semibold flex items-center gap-2">
                <Network className="w-5 h-5 text-[#4f7cff]" />
                Workflow Status
              </h3>
              {showWorkflowDetails ? <ChevronUp className="w-5 h-5 text-[#707090]" /> : <ChevronDown className="w-5 h-5 text-[#707090]" />}
            </div>

            <AnimatePresence>
              {showWorkflowDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  {workflow.length === 0 ? (
                    <p className="text-[#707090] text-sm text-center py-6">
                      Submit a query to see the workflow
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {workflow.map((node, idx) => (
                        <motion.div
                          key={node.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className={`p-3 rounded-lg border ${
                            node.status === "success"
                              ? "bg-[#39ff8e]/5 border-[#39ff8e]/30"
                              : node.status === "running"
                              ? "bg-[#4f7cff]/5 border-[#4f7cff]/30"
                              : node.status === "waiting_input"
                              ? "bg-[#f59e0b]/5 border-[#f59e0b]/30"
                              : node.status === "failed"
                              ? "bg-[#ff6b6b]/5 border-[#ff6b6b]/30"
                              : "bg-[#0f0f18] border-[#4f7cff]/10"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              node.status === "success"
                                ? "bg-[#39ff8e]/20 text-[#39ff8e]"
                                : node.status === "running"
                                ? "bg-[#4f7cff]/20 text-[#4f7cff]"
                                : node.status === "waiting_input"
                                ? "bg-[#f59e0b]/20 text-[#f59e0b]"
                                : "bg-[#4f7cff]/10 text-[#707090]"
                            }`}>
                              {node.status === "success" && <CheckCircle className="w-4 h-4" />}
                              {node.status === "running" && <Loader2 className="w-4 h-4 animate-spin" />}
                              {node.status === "waiting_input" && <HelpCircle className="w-4 h-4" />}
                              {node.status === "pending" && <Clock className="w-4 h-4" />}
                              {node.status === "ready" && <Play className="w-4 h-4" />}
                              {node.status === "failed" && <AlertCircle className="w-4 h-4" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-white text-sm font-medium truncate">
                                {node.name}
                              </div>
                              <div className="text-[#707090] text-xs truncate">
                                {node.status === "running" ? "Processing..." :
                                 node.status === "waiting_input" ? "Needs your input" :
                                 node.status === "success" ? "Complete" :
                                 node.status === "pending" ? "Waiting..." :
                                 node.status === "ready" ? "Ready" : "Failed"}
                              </div>
                            </div>
                            {node.agent?.price === 0 && (
                              <span className="text-[10px] px-2 py-0.5 bg-[#39ff8e]/10 text-[#39ff8e] rounded">
                                FREE
                              </span>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Available Agents */}
            <div className="mt-6 pt-4 border-t border-[#4f7cff]/10">
              <h4 className="text-white font-medium text-sm mb-3 flex items-center gap-2">
                <Bot className="w-4 h-4 text-[#4f7cff]" />
                Available Agents
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {(isPremium ? [...FREE_AGENTS, ...PREMIUM_AGENTS] : FREE_AGENTS).map(agent => (
                  <div key={agent.did} className="flex items-center gap-2 text-xs">
                    <div className={`w-2 h-2 rounded-full ${agent.price === 0 ? "bg-[#39ff8e]" : "bg-[#a855f7]"}`} />
                    <span className="text-[#909098] flex-1 truncate">{agent.name}</span>
                    {agent.price === 0 ? (
                      <span className="text-[#39ff8e]">Free</span>
                    ) : (
                      <span className="text-[#a855f7]">{agent.price}¢</span>
                    )}
                  </div>
                ))}
              </div>
              
              {!isPremium && (
                <button
                  onClick={() => setIsPremium(true)}
                  className="w-full mt-4 py-2 text-xs text-[#a855f7] border border-[#a855f7]/30 rounded-lg hover:bg-[#a855f7]/10 transition-all"
                >
                  Unlock {PREMIUM_AGENTS.length} more agents →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

