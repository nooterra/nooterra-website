import React, { useState, useEffect, useRef, useCallback } from "react";
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
  Mic,
  MicOff,
  Upload,
  Image,
  FileText,
  X,
  Share2,
  Copy,
  Check,
  Link as LinkIcon,
  Download,
  Volume2,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

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
  type: "user" | "system" | "agent" | "question" | "file";
  content: string;
  agent?: Agent;
  timestamp: Date;
  file?: UploadedFile;
}

interface WorkflowNode {
  id: string;
  name: string;
  capability: string;
  agent?: Agent;
  status: "pending" | "ready" | "running" | "waiting_input" | "success" | "failed" | "needs_data";
  dependsOn: string[];
  result?: any;
  question?: string;
  missingInputs?: InputRequirement[];
}

interface UploadedFile {
  name: string;
  type: string;
  size: number;
  preview?: string;
  data?: string;
}

// Input schema system for non-conversational agents
interface InputRequirement {
  field: string;
  type: "text" | "image" | "audio" | "file" | "number" | "select";
  description: string;
  required: boolean;
  options?: string[];  // For select type
  examples?: string[];
  placeholder?: string;
}

// Input schemas for agents that CAN'T ask for data themselves
const AGENT_INPUT_SCHEMAS: Record<string, InputRequirement[]> = {
  "cap.vision.detect.detr.v1": [
    {
      field: "image",
      type: "image",
      description: "Image to analyze for object detection",
      required: true,
      placeholder: "Upload or drag-drop an image",
    },
  ],
  "cap.vision.classify.vit.v1": [
    {
      field: "image",
      type: "image",
      description: "Image to classify",
      required: true,
    },
  ],
  "cap.document.ocr.trocr.v1": [
    {
      field: "image",
      type: "image",
      description: "Document image to extract text from",
      required: true,
    },
  ],
  "cap.audio.transcribe.whisper.v1": [
    {
      field: "audio",
      type: "audio",
      description: "Audio file to transcribe",
      required: true,
    },
    {
      field: "language",
      type: "select",
      description: "Language (auto-detect if not specified)",
      required: false,
      options: ["Auto", "English", "Spanish", "French", "German", "Chinese", "Japanese"],
    },
  ],
  "cap.translate.opus.v1": [
    {
      field: "text",
      type: "text",
      description: "Text to translate",
      required: true,
    },
    {
      field: "target_language",
      type: "select",
      description: "Target language",
      required: true,
      options: ["Spanish", "French", "German", "Italian", "Portuguese", "Chinese", "Japanese", "Korean", "Russian", "Arabic"],
    },
  ],
  "cap.creative.generate.sdxl.v1": [
    {
      field: "prompt",
      type: "text",
      description: "Describe the image you want to generate",
      required: true,
      placeholder: "A beautiful sunset over mountains, digital art style...",
      examples: ["A cyberpunk cityscape at night", "A serene forest with magical creatures"],
    },
    {
      field: "size",
      type: "select",
      description: "Output image size",
      required: false,
      options: ["512x512", "768x768", "1024x1024"],
    },
  ],
  "cap.embedding.encode.minilm.v1": [
    {
      field: "text",
      type: "text",
      description: "Text to convert to embeddings",
      required: true,
    },
  ],
};

// Check if an agent needs specific input types
function getAgentInputRequirements(capability: string): InputRequirement[] | null {
  return AGENT_INPUT_SCHEMAS[capability] || null;
}

// Check if we have the required inputs for an agent
function validateAgentInputs(
  capability: string,
  inputs: { text?: string; image?: UploadedFile | null; audio?: UploadedFile | null; selectedOptions?: Record<string, string> }
): { valid: boolean; missing: InputRequirement[] } {
  const schema = AGENT_INPUT_SCHEMAS[capability];
  
  if (!schema) {
    // No schema = text-based agent, just needs text input
    return { valid: !!inputs.text, missing: [] };
  }
  
  const missing: InputRequirement[] = [];
  
  for (const req of schema) {
    if (!req.required) continue;
    
    if (req.type === "image" && !inputs.image) {
      missing.push(req);
    } else if (req.type === "audio" && !inputs.audio) {
      missing.push(req);
    } else if (req.type === "text" && !inputs.text) {
      missing.push(req);
    } else if (req.type === "select" && !inputs.selectedOptions?.[req.field]) {
      missing.push(req);
    }
  }
  
  return { valid: missing.length === 0, missing };
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
  {
    did: "did:noot:hf:trocr_ocr",
    name: "TrOCR",
    capability: "cap.document.ocr.trocr.v1",
    description: "Extract text from images",
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
  const [searchParams, setSearchParams] = useSearchParams();
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
  
  // Voice input state
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const recognitionRef = useRef<any>(null);
  
  // File upload state
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Share state
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  
  // Premium upgrade modal
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  
  // Data request state (for non-conversational agents)
  const [pendingDataRequest, setPendingDataRequest] = useState<{
    nodeId: string;
    nodeName: string;
    requirements: InputRequirement[];
  } | null>(null);
  const [pendingDataResponses, setPendingDataResponses] = useState<Record<string, string>>({});
  const [dataInputValues, setDataInputValues] = useState<Record<string, string>>({});

  // Check for shared session on mount
  useEffect(() => {
    const sharedSession = searchParams.get("session");
    if (sharedSession) {
      loadSharedSession(sharedSession);
    }
    
    // Check voice support
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setVoiceSupported(true);
    }
  }, []);

  const loadSharedSession = async (sessionId: string) => {
    // In a real implementation, this would load from backend
    // For demo, we'll show a message
    addMessage({
      type: "system",
      content: `📎 Loaded shared session: ${sessionId.slice(0, 8)}...`,
    });
  };

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

  // Voice input handling
  const startListening = () => {
    if (!voiceSupported) return;
    
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';
    
    recognitionRef.current.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join('');
      setInput(transcript);
    };
    
    recognitionRef.current.onend = () => {
      setIsListening(false);
    };
    
    recognitionRef.current.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };
    
    recognitionRef.current.start();
    setIsListening(true);
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  // File upload handling
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const result = e.target?.result as string;
      const uploadedFile: UploadedFile = {
        name: file.name,
        type: file.type,
        size: file.size,
        data: result,
      };
      
      // Generate preview for images
      if (file.type.startsWith('image/')) {
        uploadedFile.preview = result;
      }
      
      setUploadedFile(uploadedFile);
      
      addMessage({
        type: "file",
        content: `📎 Uploaded: ${file.name} (${formatFileSize(file.size)})`,
        file: uploadedFile,
      });
    };
    
    if (file.type.startsWith('image/')) {
      reader.readAsDataURL(file);
    } else {
      reader.readAsText(file);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const clearFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Share handling
  const generateShareUrl = () => {
    const newSessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setSessionId(newSessionId);
    
    // In a real implementation, save session to backend here
    const url = `${window.location.origin}/playground?session=${newSessionId}`;
    setShareUrl(url);
    setShowShareModal(true);
  };

  const copyShareUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadTranscript = () => {
    const transcript = messages
      .map(m => `[${m.timestamp.toLocaleTimeString()}] ${m.type.toUpperCase()}: ${m.content}`)
      .join('\n\n');
    
    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nooterra-session-${new Date().toISOString().slice(0,10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const findAgentsForQuery = async (query: string, hasFile?: boolean): Promise<Agent[]> => {
    try {
      // Try to discover real agents from the coordinator
      const response = await fetch(`${COORD_URL}/v1/discover?query=${encodeURIComponent(query)}&limit=10`);
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
          // Filter by price if not premium (only free agents for non-premium)
          const filteredResults = isPremium 
            ? data.results 
            : data.results.filter((r: any) => r.price_cents === 0 || r.price_cents === undefined);
          
          return filteredResults.slice(0, 5).map((r: any, idx: number) => ({
            did: r.did,
            name: r.did.split(':').pop() || `Agent ${idx + 1}`,
            capability: r.capabilityId,
            description: r.description || "AI Agent",
            price: r.price_cents || 0,
            status: "idle" as const,
          }));
        }
      }
    } catch (err) {
      console.warn("Could not discover real agents, using demo agents:", err);
    }
    
    // Fallback to demo agents if coordinator unreachable
    const lowerQuery = query.toLowerCase();
    const availableAgents = isPremium ? [...FREE_AGENTS, ...PREMIUM_AGENTS] : FREE_AGENTS;
    
    const matched: Agent[] = [];
    
    // If file is uploaded, add relevant agents
    if (hasFile && uploadedFile) {
      if (uploadedFile.type.startsWith('image/')) {
        matched.push(availableAgents.find(a => a.capability.includes("ocr"))!);
        if (isPremium) {
          matched.push(availableAgents.find(a => a.capability.includes("detect"))!);
        }
      }
    }
    
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
    if (isPremium && (lowerQuery.includes("image") || lowerQuery.includes("picture") || lowerQuery.includes("generate") || lowerQuery.includes("create"))) {
      matched.push(availableAgents.find(a => a.capability.includes("creative"))!);
    }
    if (isPremium && (lowerQuery.includes("audio") || lowerQuery.includes("transcribe") || lowerQuery.includes("speech"))) {
      matched.push(availableAgents.find(a => a.capability.includes("whisper"))!);
    }
    if (lowerQuery.includes("ocr") || lowerQuery.includes("text from image") || lowerQuery.includes("read image")) {
      matched.push(availableAgents.find(a => a.capability.includes("ocr"))!);
    }
    
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
    // FIRST: Check if this agent has specific input requirements (non-conversational agents)
    const inputRequirements = getAgentInputRequirements(node.capability);
    
    if (inputRequirements && inputRequirements.length > 0) {
      // Check what inputs we have vs what we need
      const validation = validateAgentInputs(node.capability, {
        text: query,
        image: uploadedFile?.type.startsWith('image/') ? uploadedFile : null,
        audio: uploadedFile?.type.startsWith('audio/') ? uploadedFile : null,
        selectedOptions: pendingDataResponses,
      });
      
      if (!validation.valid) {
        // Agent needs specific data it can't ask for!
        updateWorkflowNode(node.id, { 
          status: "needs_data", 
          missingInputs: validation.missing,
          agent: { ...node.agent!, status: "waiting" }
        });
        
        setPendingDataRequest({
          nodeId: node.id,
          nodeName: node.name,
          requirements: validation.missing,
        });
        
        const requirementsList = validation.missing.map(r => {
          let req = `• **${r.field}** (${r.type}): ${r.description}`;
          if (r.options) {
            req += `\n  Options: ${r.options.join(", ")}`;
          }
          if (r.examples) {
            req += `\n  Examples: ${r.examples.join(", ")}`;
          }
          return req;
        }).join("\n");
        
        addMessage({
          type: "question",
          content: `⚠️ **${node.name}** requires specific input:\n\n${requirementsList}\n\n*This agent cannot process without the required data.*`,
          agent: node.agent,
        });
        
        return false; // Workflow paused
      }
    }
    
    updateWorkflowNode(node.id, { status: "running", agent: { ...node.agent!, status: "working" } });
    
    addMessage({
      type: "agent",
      content: `🤖 **${node.name}** is processing...`,
      agent: node.agent,
    });

    await sleep(1500 + Math.random() * 1500);

    // Conversational agents (like translators) can ask follow-up questions
    if (node.capability.includes("translate") && !query.toLowerCase().includes("spanish") && !query.toLowerCase().includes("french") && !pendingDataResponses?.target_language) {
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
      
      return false;
    }

    // Simulate success with contextual results
    const fakeResults: Record<string, string> = {
      "summarize": "📝 **Summary:** The text discusses key points about AI coordination and multi-agent systems. Main themes include distributed intelligence, workflow orchestration, and the future of autonomous AI collaboration.",
      "sentiment": "😊 **Sentiment Analysis:** Positive (87% confidence)\n\n• Overall tone: Optimistic and forward-looking\n• Key emotions: Excitement, curiosity, trust\n• No negative indicators detected",
      "translate": "🌍 **Translation (Spanish):**\n\nEl texto analiza puntos clave sobre la coordinación de IA y sistemas multi-agente. Los temas principales incluyen inteligencia distribuida, orquestación de flujos de trabajo y el futuro de la colaboración autónoma de IA.",
      "ner": "👤 **Entities Extracted:**\n\n**Organizations:** Nooterra, HuggingFace, OpenAI\n**Technologies:** Neural networks, LLMs, Transformers\n**Concepts:** Multi-agent coordination, Workflow DAGs\n**People:** None detected",
      "generate": "💡 **Response:**\n\nBased on my analysis, multi-agent AI coordination involves orchestrating multiple specialized AI models to work together on complex tasks. Each agent contributes its unique capabilities:\n\n1. **Discovery** - Agents find each other based on needed capabilities\n2. **Orchestration** - A coordinator chains agents into workflows\n3. **Execution** - Each agent processes its part and passes results\n4. **Settlement** - Payments flow to agents that contributed",
      "embedding": "🔍 **Semantic Search Results:**\n\n1. \"Multi-agent systems in practice\" (similarity: 0.94)\n2. \"Coordinating AI workflows at scale\" (similarity: 0.89)\n3. \"The future of autonomous agents\" (similarity: 0.86)",
      "ocr": "📄 **Extracted Text:**\n\nDocument successfully processed. Found 247 words across 3 paragraphs. Main topics detected: Technology, AI, Innovation.",
      "detect": "👁️ **Objects Detected:**\n\n• Person (confidence: 0.96) - bounding box: [120, 45, 380, 520]\n• Laptop (confidence: 0.92) - bounding box: [200, 300, 450, 480]\n• Coffee cup (confidence: 0.87) - bounding box: [50, 350, 100, 400]",
      "creative": "🎨 **Image Generated:**\n\n[A stunning visualization of interconnected AI agents, glowing nodes connected by streams of data, cosmic neural network aesthetic]",
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
    // Try to publish real workflow to coordinator
    try {
      const workflowPayload = {
        goal: query,
        budget_cents: isPremium ? 100 : 0, // Free users get 0 budget = free agents only
        payer: "did:noot:playground-user",
        nodes: nodes.map((node, idx) => ({
          id: node.id,
          capabilityId: node.capability,
          dependsOn: node.dependsOn,
        })),
      };
      
      const publishResponse = await fetch(`${COORD_URL}/v1/workflows/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(workflowPayload),
      });
      
      if (publishResponse.ok) {
        const { workflowId } = await publishResponse.json();
        
        addMessage({
          type: "system",
          content: `⚡ **Workflow submitted!** ID: \`${workflowId.slice(0, 8)}...\`\n\nWatching for agent responses...`,
        });
        
        // Poll for workflow status
        let completed = false;
        let attempts = 0;
        const maxAttempts = 30; // 30 seconds max
        
        while (!completed && attempts < maxAttempts) {
          await sleep(1000);
          attempts++;
          
          try {
            const statusResponse = await fetch(`${COORD_URL}/v1/workflows/${workflowId}`);
            if (statusResponse.ok) {
              const statusData = await statusResponse.json();
              
              // Update node statuses
              for (const nodeStatus of statusData.nodes || []) {
                const matchingNode = nodes.find(n => n.id === nodeStatus.id || n.capability === nodeStatus.capabilityId);
                if (matchingNode) {
                  let uiStatus: WorkflowNode["status"] = "pending";
                  if (nodeStatus.status === "running") uiStatus = "running";
                  else if (nodeStatus.status === "done") uiStatus = "success";
                  else if (nodeStatus.status === "failed") uiStatus = "failed";
                  
                  updateWorkflowNode(matchingNode.id, { 
                    status: uiStatus,
                    result: nodeStatus.result,
                    agent: { ...matchingNode.agent!, status: nodeStatus.status === "done" ? "done" : "working" }
                  });
                  
                  if (nodeStatus.status === "done" && nodeStatus.result) {
                    addMessage({
                      type: "agent",
                      content: `✅ **${matchingNode.name}** completed!\n\n${JSON.stringify(nodeStatus.result, null, 2)}`,
                      agent: matchingNode.agent,
                    });
                  }
                }
              }
              
              // Check if workflow is complete
              if (statusData.status === "done" || statusData.status === "settled") {
                completed = true;
                addMessage({
                  type: "system",
                  content: "🎉 **Workflow Complete!** All agents have finished processing your request.\n\n💡 *Tip: Click \"Share\" to save and share this session!*",
                });
              } else if (statusData.status === "failed") {
                completed = true;
                addMessage({
                  type: "system",
                  content: `❌ **Workflow failed:** ${statusData.error || "Unknown error"}`,
                });
              }
            }
          } catch (pollErr) {
            console.warn("Poll error:", pollErr);
          }
        }
        
        if (!completed) {
          addMessage({
            type: "system",
            content: "⏳ Workflow is still processing... Results will appear when agents complete.",
          });
        }
        
        setIsProcessing(false);
        return;
      }
    } catch (err) {
      console.warn("Could not publish to coordinator, using simulation:", err);
    }
    
    // Fallback to simulation if coordinator fails
    for (const node of nodes) {
      const shouldContinue = await simulateAgentExecution(node, query);
      if (!shouldContinue) {
        return;
      }
      await sleep(500);
    }
    
    addMessage({
      type: "system",
      content: "🎉 **Workflow Complete!** All agents have finished processing your request.\n\n💡 *Tip: Click \"Share\" to save and share this session!*",
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

    const hasFile = uploadedFile !== null;
    addMessage({ type: "user", content: hasFile ? `${query}\n\n📎 With file: ${uploadedFile?.name}` : query });

    // Phase 1: Searching for agents
    setSearchingPhase("Searching for available agents...");
    addMessage({
      type: "system",
      content: `🔍 Searching the Nooterra network for ${isPremium ? "all" : "free"} agents that can help...${hasFile ? "\n📎 Analyzing uploaded file..." : ""}`,
    });
    
    await sleep(1000);

    const matchedAgents = await findAgentsForQuery(query, hasFile);
    
    setSearchingPhase("Building workflow...");
    addMessage({
      type: "system",
      content: `✨ Found **${matchedAgents.length} agents** that can help!\n\n${matchedAgents.map(a => `• **${a.name}** - ${a.description} ${a.price === 0 ? '(FREE)' : `(${a.price}¢)`}`).join("\n")}`,
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
    clearFile();

    // Phase 3: Execute workflow
    await runWorkflow(workflowNodes, query);
  };

  const handleQuestionAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionAnswer.trim() || !pendingQuestion) return;

    const answer = questionAnswer.trim();
    setQuestionAnswer("");
    
    addMessage({ type: "user", content: answer });

    const node = workflow.find(n => n.id === pendingQuestion.nodeId);
    if (node) {
      // Store the response for validation
      setPendingDataResponses(prev => ({ ...prev, target_language: answer }));
      
      updateWorkflowNode(node.id, { status: "running", question: undefined, agent: { ...node.agent!, status: "working" } });
      
      await sleep(1500);

      const result = `🌍 **Translation (to ${answer}):**\n\nEl texto analiza puntos clave sobre la coordinación de IA y sistemas multi-agente. Los temas principales incluyen inteligencia distribuida y el futuro de la colaboración autónoma de IA.`;
      
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

  // Handle data request submission (for non-conversational agents)
  const handleDataRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pendingDataRequest) return;

    const allFilled = pendingDataRequest.requirements.every(req => {
      if (req.type === "image") return uploadedFile?.type.startsWith('image/');
      if (req.type === "audio") return uploadedFile?.type.startsWith('audio/');
      return dataInputValues[req.field]?.trim();
    });

    if (!allFilled) {
      addMessage({
        type: "system",
        content: "⚠️ Please provide all required inputs before continuing.",
      });
      return;
    }

    // Store all the responses
    const newResponses = { ...pendingDataResponses };
    for (const req of pendingDataRequest.requirements) {
      if (dataInputValues[req.field]) {
        newResponses[req.field] = dataInputValues[req.field];
      }
    }
    setPendingDataResponses(newResponses);

    const summaryParts = pendingDataRequest.requirements.map(req => {
      if (req.type === "image" && uploadedFile) return `📷 Image: ${uploadedFile.name}`;
      if (req.type === "audio" && uploadedFile) return `🎵 Audio: ${uploadedFile.name}`;
      return `${req.field}: ${dataInputValues[req.field]}`;
    });
    
    addMessage({ 
      type: "user", 
      content: `Provided data:\n${summaryParts.join("\n")}` 
    });

    const node = workflow.find(n => n.id === pendingDataRequest.nodeId);
    if (node) {
      updateWorkflowNode(node.id, { 
        status: "running", 
        missingInputs: undefined,
        agent: { ...node.agent!, status: "working" } 
      });

      addMessage({
        type: "agent",
        content: `🤖 **${node.name}** now has all required data. Processing...`,
        agent: node.agent,
      });

      await sleep(2000);

      // Generate contextual result based on agent type
      let result = "";
      if (node.capability.includes("ocr")) {
        result = "📄 **Extracted Text:**\n\n\"The document contains important information about...\"\n\n• Found 312 words\n• 4 paragraphs detected\n• Confidence: 94%";
      } else if (node.capability.includes("detect")) {
        result = "👁️ **Objects Detected:**\n\n• Person (96%) - Center of frame\n• Computer (89%) - Lower left\n• Plant (78%) - Background\n\n3 objects detected with high confidence.";
      } else if (node.capability.includes("transcribe") || node.capability.includes("whisper")) {
        result = "🎤 **Transcription:**\n\n\"Hello and welcome to this demo of multi-agent AI coordination...\"\n\n• Duration: 2:34\n• Language: English (detected)\n• Confidence: 97%";
      } else if (node.capability.includes("creative")) {
        result = "🎨 **Image Generated:**\n\n[Generated based on your prompt]\n\n• Size: 512x512\n• Style: As requested\n• Ready for download";
      } else {
        result = `✅ **${node.name}** processed your data successfully.`;
      }

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

      setPendingDataRequest(null);
      setDataInputValues({});

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
    <div 
      className="min-h-screen bg-[#050508]"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Drag overlay */}
      <AnimatePresence>
        {isDragging && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#050508]/90 flex items-center justify-center"
          >
            <div className="p-12 border-2 border-dashed border-[#4f7cff] rounded-2xl bg-[#4f7cff]/10">
              <Upload className="w-16 h-16 text-[#4f7cff] mx-auto mb-4" />
              <p className="text-xl text-white font-semibold">Drop your file here</p>
              <p className="text-[#909098] mt-2">Images, documents, or text files</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="border-b border-[#4f7cff]/10 bg-[#0a0a12]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.svg" alt="Nooterra" className="w-8 h-8" />
            <span className="font-semibold text-white">Nooterra Playground</span>
          </Link>
          
          <div className="flex items-center gap-3">
            {/* Share button */}
            {messages.length > 0 && (
              <button
                onClick={generateShareUrl}
                className="flex items-center gap-2 px-4 py-2 bg-[#0f0f18] border border-[#4f7cff]/20 rounded-lg text-[#909098] hover:text-white hover:border-[#4f7cff]/40 transition-all"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </button>
            )}
            
            <button
              onClick={() => {
                if (!isPremium) {
                  setShowPremiumModal(true);
                } else {
                  setIsPremium(false);
                }
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isPremium 
                  ? "bg-gradient-to-r from-[#a855f7] to-[#6366f1] text-white"
                  : "bg-[#0f0f18] border border-[#4f7cff]/20 text-[#909098] hover:border-[#a855f7]/40 hover:text-[#a855f7]"
              }`}
            >
              {isPremium ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              <span className="hidden sm:inline">{isPremium ? "Premium" : "Free"}</span>
            </button>
            
            <Link to="/signup" className="btn-neural px-4 py-2 text-sm">
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Up</span>
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
                    Ask anything, upload files, or use voice input. Watch specialized AI agents collaborate in real-time.
                  </p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap justify-center gap-4 mb-8">
                    <div className="flex items-center gap-2 text-sm text-[#707090]">
                      <Mic className="w-4 h-4 text-[#4f7cff]" />
                      Voice Input
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#707090]">
                      <Upload className="w-4 h-4 text-[#4f7cff]" />
                      File Upload
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#707090]">
                      <Share2 className="w-4 h-4 text-[#4f7cff]" />
                      Share Sessions
                    </div>
                  </div>
                  
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
                        You have access to {FREE_AGENTS.length} free agents. Upgrade for image generation, audio transcription, and more!
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
                        : msg.type === "file"
                        ? "bg-[#10b981]/10 border border-[#10b981]/30 text-white"
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
                        {msg.type === "file" && <FileText className="w-3 h-3 text-[#10b981]" />}
                        <span>{msg.type === "system" ? "System" : msg.type === "file" ? "File" : msg.agent?.name || "Agent"}</span>
                      </div>
                    )}
                    {msg.file?.preview && (
                      <img 
                        src={msg.file.preview} 
                        alt={msg.file.name}
                        className="max-w-[200px] rounded-lg mb-2"
                      />
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

            {/* Uploaded file preview */}
            {uploadedFile && (
              <div className="mb-3 p-3 bg-[#0f0f18] border border-[#10b981]/30 rounded-xl flex items-center gap-3">
                {uploadedFile.preview ? (
                  <img src={uploadedFile.preview} alt={uploadedFile.name} className="w-12 h-12 rounded object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded bg-[#10b981]/20 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-[#10b981]" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm truncate">{uploadedFile.name}</div>
                  <div className="text-[#707090] text-xs">{formatFileSize(uploadedFile.size)}</div>
                </div>
                <button onClick={clearFile} className="p-1 text-[#707090] hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Input */}
            {pendingDataRequest ? (
              // Non-conversational agent needs specific data
              <form onSubmit={handleDataRequestSubmit} className="space-y-3">
                <div className="p-4 bg-[#f59e0b]/10 border border-[#f59e0b]/30 rounded-xl">
                  <div className="flex items-center gap-2 text-[#f59e0b] mb-3">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-semibold">{pendingDataRequest.nodeName} requires input</span>
                  </div>
                  
                  <div className="space-y-3">
                    {pendingDataRequest.requirements.map((req) => (
                      <div key={req.field}>
                        <label className="block text-sm text-[#909098] mb-1">
                          {req.description} {req.required && <span className="text-[#ff6b6b]">*</span>}
                        </label>
                        
                        {req.type === "image" && (
                          <div className="flex items-center gap-3">
                            {uploadedFile?.type.startsWith('image/') ? (
                              <div className="flex items-center gap-2 p-2 bg-[#10b981]/10 border border-[#10b981]/30 rounded-lg">
                                <Image className="w-4 h-4 text-[#10b981]" />
                                <span className="text-sm text-white">{uploadedFile.name}</span>
                                <CheckCircle className="w-4 h-4 text-[#10b981]" />
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="px-4 py-2 border border-dashed border-[#4f7cff]/40 rounded-lg text-[#4f7cff] hover:bg-[#4f7cff]/10 transition-all text-sm flex items-center gap-2"
                              >
                                <Upload className="w-4 h-4" />
                                Upload Image
                              </button>
                            )}
                          </div>
                        )}
                        
                        {req.type === "audio" && (
                          <div className="flex items-center gap-3">
                            {uploadedFile?.type.startsWith('audio/') ? (
                              <div className="flex items-center gap-2 p-2 bg-[#10b981]/10 border border-[#10b981]/30 rounded-lg">
                                <Volume2 className="w-4 h-4 text-[#10b981]" />
                                <span className="text-sm text-white">{uploadedFile.name}</span>
                                <CheckCircle className="w-4 h-4 text-[#10b981]" />
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="px-4 py-2 border border-dashed border-[#4f7cff]/40 rounded-lg text-[#4f7cff] hover:bg-[#4f7cff]/10 transition-all text-sm flex items-center gap-2"
                              >
                                <Upload className="w-4 h-4" />
                                Upload Audio
                              </button>
                            )}
                          </div>
                        )}
                        
                        {req.type === "select" && req.options && (
                          <select
                            value={dataInputValues[req.field] || ""}
                            onChange={(e) => setDataInputValues(prev => ({ ...prev, [req.field]: e.target.value }))}
                            className="w-full bg-[#0a0a12] border border-[#4f7cff]/20 rounded-lg px-3 py-2 text-white text-sm"
                          >
                            <option value="">Select {req.field}...</option>
                            {req.options.map(opt => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        )}
                        
                        {req.type === "text" && (
                          <input
                            type="text"
                            value={dataInputValues[req.field] || ""}
                            onChange={(e) => setDataInputValues(prev => ({ ...prev, [req.field]: e.target.value }))}
                            placeholder={req.placeholder || `Enter ${req.field}...`}
                            className="w-full bg-[#0a0a12] border border-[#4f7cff]/20 rounded-lg px-3 py-2 text-white text-sm placeholder-[#707090]"
                          />
                        )}
                        
                        {req.examples && req.examples.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {req.examples.map(ex => (
                              <button
                                key={ex}
                                type="button"
                                onClick={() => setDataInputValues(prev => ({ ...prev, [req.field]: ex }))}
                                className="text-xs px-2 py-1 bg-[#4f7cff]/10 text-[#4f7cff] rounded hover:bg-[#4f7cff]/20 transition-all"
                              >
                                {ex}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3 bg-[#f59e0b] hover:bg-[#f59e0b]/80 text-black rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Provide Data & Continue
                </button>
              </form>
            ) : pendingQuestion ? (
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
              <form onSubmit={handleSubmit} className="flex gap-2">
                {/* File upload button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-3 bg-[#0f0f18] border border-[#4f7cff]/20 rounded-xl text-[#707090] hover:text-white hover:border-[#4f7cff]/40 transition-all"
                  title="Upload file"
                >
                  <Upload className="w-5 h-5" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileSelect}
                  accept="image/*,.txt,.pdf,.doc,.docx"
                  className="hidden"
                />
                
                {/* Voice input button */}
                {voiceSupported && (
                  <button
                    type="button"
                    onClick={isListening ? stopListening : startListening}
                    className={`p-3 rounded-xl transition-all ${
                      isListening
                        ? "bg-[#ff6b6b] text-white animate-pulse"
                        : "bg-[#0f0f18] border border-[#4f7cff]/20 text-[#707090] hover:text-white hover:border-[#4f7cff]/40"
                    }`}
                    title={isListening ? "Stop listening" : "Voice input"}
                  >
                    {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>
                )}
                
                {/* Text input */}
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isListening ? "Listening..." : "Ask anything... (or drop a file)"}
                    className={`w-full bg-[#0f0f18] border rounded-xl px-4 py-3 text-white placeholder-[#707090] focus:outline-none transition-all ${
                      isListening
                        ? "border-[#ff6b6b]/50 focus:border-[#ff6b6b]"
                        : "border-[#4f7cff]/20 focus:border-[#4f7cff]"
                    }`}
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
                              : node.status === "needs_data"
                              ? "bg-[#ff6b6b]/5 border-[#ff6b6b]/30 animate-pulse"
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
                                : node.status === "needs_data"
                                ? "bg-[#ff6b6b]/20 text-[#ff6b6b]"
                                : "bg-[#4f7cff]/10 text-[#707090]"
                            }`}>
                              {node.status === "success" && <CheckCircle className="w-4 h-4" />}
                              {node.status === "running" && <Loader2 className="w-4 h-4 animate-spin" />}
                              {node.status === "waiting_input" && <HelpCircle className="w-4 h-4" />}
                              {node.status === "needs_data" && <Upload className="w-4 h-4" />}
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
                                 node.status === "needs_data" ? "⚠️ Requires data" :
                                 node.status === "success" ? "Complete" :
                                 node.status === "pending" ? "Waiting..." :
                                 node.status === "ready" ? "Ready" : "Failed"}
                              </div>
                              {node.status === "needs_data" && node.missingInputs && (
                                <div className="mt-1 text-[10px] text-[#ff6b6b]">
                                  Needs: {node.missingInputs.map(m => m.type).join(", ")}
                                </div>
                              )}
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
                  onClick={() => setShowPremiumModal(true)}
                  className="w-full mt-4 py-2 text-xs text-[#a855f7] border border-[#a855f7]/30 rounded-lg hover:bg-[#a855f7]/10 transition-all"
                >
                  Unlock {PREMIUM_AGENTS.length} more agents →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0a0a12] border border-[#4f7cff]/20 rounded-2xl p-6 max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-[#4f7cff]" />
                  Share Session
                </h2>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="text-[#707090] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-[#909098] text-sm mb-4">
                Share this link to let others see your conversation and workflow:
              </p>

              <div className="flex items-center gap-2 mb-6">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 bg-[#0f0f18] border border-[#4f7cff]/20 rounded-lg px-4 py-3 text-white text-sm"
                />
                <button
                  onClick={copyShareUrl}
                  className={`p-3 rounded-lg transition-all ${
                    copied
                      ? "bg-[#39ff8e] text-black"
                      : "bg-[#4f7cff] hover:bg-[#4f7cff]/80 text-white"
                  }`}
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={downloadTranscript}
                  className="flex-1 flex items-center justify-center gap-2 py-3 border border-[#4f7cff]/20 text-[#909098] rounded-xl hover:bg-[#4f7cff]/10 transition-all"
                >
                  <Download className="w-4 h-4" />
                  Download Transcript
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium Upgrade Modal */}
      <AnimatePresence>
        {showPremiumModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setShowPremiumModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0a0a12] border border-[#a855f7]/30 rounded-2xl p-6 max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#a855f7]" />
                  Unlock Premium Agents
                </h2>
                <button
                  onClick={() => setShowPremiumModal(false)}
                  className="text-[#707090] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-[#909098] text-sm mb-6">
                Get access to powerful AI agents including image generation, speech recognition, and advanced analysis tools.
              </p>

              {/* Premium agents preview */}
              <div className="space-y-3 mb-6">
                {PREMIUM_AGENTS.map(agent => (
                  <div key={agent.did} className="flex items-center gap-3 p-3 bg-[#0f0f18] border border-[#a855f7]/10 rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#a855f7]/20 to-[#6366f1]/20 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-[#a855f7]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-medium text-sm">{agent.name}</div>
                      <div className="text-[#707090] text-xs truncate">{agent.description}</div>
                    </div>
                    <div className="text-[#a855f7] text-sm font-semibold">{agent.price}¢</div>
                  </div>
                ))}
              </div>

              {/* Pricing info */}
              <div className="bg-gradient-to-br from-[#a855f7]/10 to-[#6366f1]/10 border border-[#a855f7]/20 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-[#a855f7]" />
                  <span className="text-white font-semibold text-sm">Pay-per-use Pricing</span>
                </div>
                <p className="text-[#909098] text-xs">
                  No subscription required. Only pay for what you use with micro-payments starting at 1¢ per call. 
                  Connect your wallet to add credits.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowPremiumModal(false)}
                  className="flex-1 py-3 border border-[#4f7cff]/20 text-[#909098] rounded-xl hover:bg-[#4f7cff]/10 transition-all"
                >
                  Maybe Later
                </button>
                <Link
                  to="/signup"
                  className="flex-1 py-3 bg-gradient-to-r from-[#a855f7] to-[#6366f1] text-white rounded-xl font-medium text-center hover:opacity-90 transition-all flex items-center justify-center gap-2"
                  onClick={() => setShowPremiumModal(false)}
                >
                  <Sparkles className="w-4 h-4" />
                  Sign Up
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
