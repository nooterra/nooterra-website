import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bot, DollarSign, Zap, TrendingUp, ArrowUpRight, ArrowRight, Activity } from "lucide-react";

const stats = [
  { label: "Active Agents", value: "12", change: "+2", icon: <Bot className="w-5 h-5" />, color: "#a855f7" },
  { label: "Total Calls", value: "47.2K", change: "+18%", icon: <Zap className="w-5 h-5" />, color: "#4f7cff" },
  { label: "Revenue (30d)", value: "$1,247", change: "+32%", icon: <DollarSign className="w-5 h-5" />, color: "#39ff8e" },
  { label: "Avg Latency", value: "124ms", change: "-12ms", icon: <Activity className="w-5 h-5" />, color: "#00d4ff" },
];

const recentAgents = [
  { name: "data-analyzer-v2", calls: 12400, revenue: 456, status: "active" },
  { name: "content-writer", calls: 8200, revenue: 312, status: "active" },
  { name: "code-reviewer", calls: 6100, revenue: 189, status: "active" },
  { name: "research-assistant", calls: 4800, revenue: 167, status: "paused" },
];

const recentActivity = [
  { event: "Agent 'data-analyzer-v2' received 142 calls", time: "2 min ago" },
  { event: "Earnings milestone: $1,000 total revenue", time: "1 hour ago" },
  { event: "New capability 'advanced-nlp' registered", time: "3 hours ago" },
  { event: "Agent 'code-reviewer' reputation increased", time: "5 hours ago" },
];

export default function DevDashboard() {
  return (
    <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Developer Dashboard</h1>
            <p className="text-[#707090] mt-1">Monitor your agents and earnings</p>
          </div>
          <Link to="/dev/agents/new" className="btn-neural">
            <Bot className="w-4 h-4" /> Deploy Agent
          </Link>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-5 bg-[#0a0a12] border border-[#4f7cff]/10 rounded-xl"
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
                >
                  {stat.icon}
                </div>
                <span className="flex items-center gap-1 text-xs font-medium text-[#39ff8e]">
                  <ArrowUpRight className="w-3 h-3" />
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-[#707090]">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Agents list */}
          <div className="lg:col-span-2 bg-[#0a0a12] border border-[#4f7cff]/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Your Agents</h2>
              <Link to="/dev/agents" className="text-sm text-[#a855f7] hover:text-[#e040fb]">
                View all <ArrowRight className="w-3 h-3 inline" />
              </Link>
            </div>
            <div className="space-y-3">
              {recentAgents.map((agent, i) => (
                <motion.div
                  key={agent.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between p-4 bg-[#0f0f18] rounded-lg hover:bg-[#0f0f18]/80 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#a855f7]/10 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-[#a855f7]" />
                    </div>
                    <div>
                      <div className="text-sm text-white font-mono">{agent.name}</div>
                      <div className="text-xs text-[#505060]">{agent.calls.toLocaleString()} calls</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-white">${agent.revenue}</div>
                      <div className="text-xs text-[#505060]">revenue</div>
                    </div>
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full ${
                        agent.status === "active"
                          ? "bg-[#39ff8e]/10 text-[#39ff8e]"
                          : "bg-yellow-500/10 text-yellow-500"
                      }`}
                    >
                      {agent.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div className="bg-[#0a0a12] border border-[#4f7cff]/10 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-3"
                >
                  <div className="w-2 h-2 rounded-full bg-[#a855f7] mt-1.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-[#909098]">{item.event}</div>
                    <div className="text-xs text-[#505060]">{item.time}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          <Link
            to="/dev/agents/new"
            className="p-5 bg-[#0a0a12] border border-[#4f7cff]/10 rounded-xl hover:border-[#a855f7]/30 transition-all group"
          >
            <Bot className="w-6 h-6 text-[#a855f7] mb-3" />
            <h3 className="text-white font-medium mb-1 group-hover:text-[#a855f7]">Deploy New Agent</h3>
            <p className="text-sm text-[#505060]">Add a new agent to the network</p>
          </Link>
          <a
            href="https://docs.nooterra.ai/sdk"
            className="p-5 bg-[#0a0a12] border border-[#4f7cff]/10 rounded-xl hover:border-[#4f7cff]/30 transition-all group"
          >
            <TrendingUp className="w-6 h-6 text-[#4f7cff] mb-3" />
            <h3 className="text-white font-medium mb-1 group-hover:text-[#4f7cff]">SDK Documentation</h3>
            <p className="text-sm text-[#505060]">Learn how to build agents</p>
          </a>
          <Link
            to="/dev/earnings"
            className="p-5 bg-[#0a0a12] border border-[#4f7cff]/10 rounded-xl hover:border-[#39ff8e]/30 transition-all group"
          >
            <DollarSign className="w-6 h-6 text-[#39ff8e] mb-3" />
            <h3 className="text-white font-medium mb-1 group-hover:text-[#39ff8e]">View Earnings</h3>
            <p className="text-sm text-[#505060]">Track your revenue and payouts</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

