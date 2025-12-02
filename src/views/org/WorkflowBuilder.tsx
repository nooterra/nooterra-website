import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Save,
  Play,
  Plus,
  Bot,
  GitBranch,
  Zap,
  Database,
  Code,
  Filter,
  Split,
  Merge,
  Clock,
  Webhook,
  X,
  GripVertical,
} from "lucide-react";

type NodeType = "trigger" | "agent" | "transform" | "condition" | "merge" | "output";

type Node = {
  id: string;
  type: NodeType;
  name: string;
  config: Record<string, any>;
  x: number;
  y: number;
};

type Connection = {
  from: string;
  to: string;
};

const nodeTypes = [
  { type: "trigger" as const, icon: <Zap className="w-4 h-4" />, label: "Trigger", color: "#39ff8e" },
  { type: "agent" as const, icon: <Bot className="w-4 h-4" />, label: "Agent", color: "#4f7cff" },
  { type: "transform" as const, icon: <Code className="w-4 h-4" />, label: "Transform", color: "#a855f7" },
  { type: "condition" as const, icon: <Split className="w-4 h-4" />, label: "Condition", color: "#00d4ff" },
  { type: "merge" as const, icon: <Merge className="w-4 h-4" />, label: "Merge", color: "#e040fb" },
  { type: "output" as const, icon: <Database className="w-4 h-4" />, label: "Output", color: "#ff6b6b" },
];

const agentOptions = [
  { id: "gpt4", name: "GPT-4 Reasoning" },
  { id: "claude", name: "Claude Analysis" },
  { id: "code-review", name: "Code Reviewer" },
  { id: "data-analyzer", name: "Data Analyzer" },
  { id: "content-writer", name: "Content Writer" },
  { id: "research", name: "Research Agent" },
];

export default function WorkflowBuilder() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isNew = id === "new";

  const [name, setName] = React.useState(isNew ? "Untitled Workflow" : "Customer Support Pipeline");
  const [nodes, setNodes] = React.useState<Node[]>([
    { id: "1", type: "trigger", name: "API Trigger", config: { type: "webhook" }, x: 100, y: 200 },
    { id: "2", type: "agent", name: "GPT-4", config: { agentId: "gpt4" }, x: 350, y: 200 },
    { id: "3", type: "output", name: "Response", config: {}, x: 600, y: 200 },
  ]);
  const [connections, setConnections] = React.useState<Connection[]>([
    { from: "1", to: "2" },
    { from: "2", to: "3" },
  ]);
  const [selectedNode, setSelectedNode] = React.useState<string | null>(null);
  const [dragging, setDragging] = React.useState<string | null>(null);
  const [showNodePicker, setShowNodePicker] = React.useState(false);

  const addNode = (type: NodeType) => {
    const newNode: Node = {
      id: Date.now().toString(),
      type,
      name: nodeTypes.find((n) => n.type === type)?.label || "Node",
      config: {},
      x: 300 + Math.random() * 100,
      y: 150 + Math.random() * 100,
    };
    setNodes([...nodes, newNode]);
    setShowNodePicker(false);
  };

  const deleteNode = (id: string) => {
    setNodes(nodes.filter((n) => n.id !== id));
    setConnections(connections.filter((c) => c.from !== id && c.to !== id));
    setSelectedNode(null);
  };

  const getNodeColor = (type: NodeType) => {
    return nodeTypes.find((n) => n.type === type)?.color || "#4f7cff";
  };

  const getNodeIcon = (type: NodeType) => {
    return nodeTypes.find((n) => n.type === type)?.icon;
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <header className="h-14 flex items-center justify-between px-4 border-b border-[#4f7cff]/10 bg-[#0a0a12] flex-shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/org/workflows")}
            className="text-[#707090] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-transparent text-white font-semibold text-lg focus:outline-none border-b border-transparent hover:border-[#4f7cff]/30 focus:border-[#00d4ff]"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-ghost text-sm py-2">
            <Play className="w-4 h-4" /> Test
          </button>
          <button className="btn-neural text-sm py-2">
            <Save className="w-4 h-4" /> Save
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Canvas */}
        <div className="flex-1 relative bg-[#050508] overflow-auto">
          {/* Grid background */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(79, 124, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(79, 124, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />

          {/* SVG Connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {connections.map((conn, i) => {
              const fromNode = nodes.find((n) => n.id === conn.from);
              const toNode = nodes.find((n) => n.id === conn.to);
              if (!fromNode || !toNode) return null;

              const x1 = fromNode.x + 120;
              const y1 = fromNode.y + 40;
              const x2 = toNode.x;
              const y2 = toNode.y + 40;
              const midX = (x1 + x2) / 2;

              return (
                <path
                  key={i}
                  d={`M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`}
                  stroke="url(#conn-gradient)"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.6"
                />
              );
            })}
            <defs>
              <linearGradient id="conn-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4f7cff" />
                <stop offset="100%" stopColor="#00d4ff" />
              </linearGradient>
            </defs>
          </svg>

          {/* Nodes */}
          {nodes.map((node) => (
            <motion.div
              key={node.id}
              drag
              dragMomentum={false}
              onDragEnd={(_, info) => {
                setNodes((prev) =>
                  prev.map((n) =>
                    n.id === node.id
                      ? { ...n, x: n.x + info.offset.x, y: n.y + info.offset.y }
                      : n
                  )
                );
              }}
              onClick={() => setSelectedNode(node.id)}
              className={`absolute cursor-grab active:cursor-grabbing ${
                selectedNode === node.id ? "z-10" : ""
              }`}
              style={{ left: node.x, top: node.y }}
            >
              <div
                className={`w-[120px] rounded-xl border-2 bg-[#0a0a12] transition-all ${
                  selectedNode === node.id
                    ? "border-[#00d4ff] shadow-[0_0_20px_rgba(0,212,255,0.3)]"
                    : "border-[#4f7cff]/20 hover:border-[#4f7cff]/40"
                }`}
              >
                <div
                  className="h-2 rounded-t-[10px]"
                  style={{ backgroundColor: getNodeColor(node.type) }}
                />
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-6 h-6 rounded flex items-center justify-center"
                      style={{
                        backgroundColor: `${getNodeColor(node.type)}20`,
                        color: getNodeColor(node.type),
                      }}
                    >
                      {getNodeIcon(node.type)}
                    </div>
                    <span className="text-xs text-[#707090] uppercase">{node.type}</span>
                  </div>
                  <div className="text-sm text-white font-medium truncate">{node.name}</div>
                </div>
                {/* Connection dots */}
                <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#4f7cff] rounded-full border-2 border-[#0a0a12]" />
                <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#00d4ff] rounded-full border-2 border-[#0a0a12]" />
              </div>
            </motion.div>
          ))}

          {/* Add node button */}
          <button
            onClick={() => setShowNodePicker(true)}
            className="absolute bottom-6 right-6 w-12 h-12 bg-[#00d4ff] hover:bg-[#00d4ff]/90 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all"
          >
            <Plus className="w-6 h-6" />
          </button>

          {/* Node picker */}
          {showNodePicker && (
            <div className="absolute bottom-20 right-6 bg-[#0a0a12] border border-[#4f7cff]/20 rounded-xl p-3 shadow-xl">
              <div className="text-xs text-[#707090] mb-2 px-2">Add Node</div>
              <div className="grid grid-cols-2 gap-2">
                {nodeTypes.map((nt) => (
                  <button
                    key={nt.type}
                    onClick={() => addNode(nt.type)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#4f7cff]/10 transition-colors"
                  >
                    <div
                      className="w-6 h-6 rounded flex items-center justify-center"
                      style={{ backgroundColor: `${nt.color}20`, color: nt.color }}
                    >
                      {nt.icon}
                    </div>
                    <span className="text-sm text-white">{nt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Properties panel */}
        {selectedNode && (
          <div className="w-80 border-l border-[#4f7cff]/10 bg-[#0a0a12] p-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-semibold">Properties</h3>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-[#707090] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {(() => {
              const node = nodes.find((n) => n.id === selectedNode);
              if (!node) return null;

              return (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm text-[#707090] mb-2">Node Name</label>
                    <input
                      type="text"
                      value={node.name}
                      onChange={(e) =>
                        setNodes((prev) =>
                          prev.map((n) => (n.id === node.id ? { ...n, name: e.target.value } : n))
                        )
                      }
                      className="w-full bg-[#0f0f18] border border-[#4f7cff]/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d4ff]/50"
                    />
                  </div>

                  {node.type === "agent" && (
                    <div>
                      <label className="block text-sm text-[#707090] mb-2">Select Agent</label>
                      <select
                        value={node.config.agentId || ""}
                        onChange={(e) =>
                          setNodes((prev) =>
                            prev.map((n) =>
                              n.id === node.id
                                ? { ...n, config: { ...n.config, agentId: e.target.value } }
                                : n
                            )
                          )
                        }
                        className="w-full bg-[#0f0f18] border border-[#4f7cff]/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d4ff]/50"
                      >
                        <option value="">Select an agent...</option>
                        {agentOptions.map((agent) => (
                          <option key={agent.id} value={agent.id}>
                            {agent.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {node.type === "trigger" && (
                    <div>
                      <label className="block text-sm text-[#707090] mb-2">Trigger Type</label>
                      <select
                        value={node.config.type || "webhook"}
                        onChange={(e) =>
                          setNodes((prev) =>
                            prev.map((n) =>
                              n.id === node.id
                                ? { ...n, config: { ...n.config, type: e.target.value } }
                                : n
                            )
                          )
                        }
                        className="w-full bg-[#0f0f18] border border-[#4f7cff]/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d4ff]/50"
                      >
                        <option value="webhook">Webhook</option>
                        <option value="schedule">Schedule</option>
                        <option value="event">Event</option>
                        <option value="manual">Manual</option>
                      </select>
                    </div>
                  )}

                  <div className="pt-4 border-t border-[#4f7cff]/10">
                    <button
                      onClick={() => deleteNode(node.id)}
                      className="w-full py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      Delete Node
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}

