import React from "react";
import { motion } from "framer-motion";
import { CreditCard, Plus, Check, Zap, ArrowRight, ExternalLink } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: 0,
    credits: 500,
    features: ["500 NCR/month", "Basic agents", "Community support"],
    current: true,
  },
  {
    name: "Pro",
    price: 29,
    credits: 5000,
    features: ["5,000 NCR/month", "Premium agents", "Priority support", "Advanced analytics"],
    popular: true,
  },
  {
    name: "Team",
    price: 99,
    credits: 20000,
    features: ["20,000 NCR/month", "All agents", "Dedicated support", "Team management", "Custom workflows"],
  },
];

const paymentHistory = [
  { date: "Dec 1, 2024", amount: 29, credits: 5000, status: "completed" },
  { date: "Nov 1, 2024", amount: 29, credits: 5000, status: "completed" },
  { date: "Oct 1, 2024", amount: 29, credits: 5000, status: "completed" },
];

export default function Billing() {
  const [balance, setBalance] = React.useState(2340);

  return (
    <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Billing & Credits</h1>
          <p className="text-[#707090] mt-1">Manage your subscription and credit balance</p>
        </div>

        {/* Current balance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#4f7cff]/20 to-[#a855f7]/20 border border-[#4f7cff]/30 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-[#909098] mb-1">Current Balance</div>
              <div className="text-4xl font-bold text-white">
                {balance.toLocaleString()} <span className="text-lg text-[#4f7cff]">NCR</span>
              </div>
              <div className="text-sm text-[#707090] mt-2">≈ ${(balance * 0.01).toFixed(2)} USD</div>
            </div>
            <button className="btn-neural">
              <Plus className="w-4 h-4" /> Buy Credits
            </button>
          </div>
        </motion.div>

        {/* Plans */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Subscription Plans</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`relative p-5 rounded-xl border ${
                  plan.popular
                    ? "bg-[#4f7cff]/10 border-[#4f7cff]/40"
                    : "bg-[#0a0a12] border-[#4f7cff]/10"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#4f7cff] text-white text-xs font-medium rounded-full">
                    Popular
                  </div>
                )}
                {plan.current && (
                  <div className="absolute top-3 right-3 px-2 py-0.5 bg-[#39ff8e]/20 text-[#39ff8e] text-xs rounded-full">
                    Current
                  </div>
                )}
                <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-white">${plan.price}</span>
                  <span className="text-[#707090]">/month</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-[#909098]">
                      <Check className="w-4 h-4 text-[#4f7cff]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-2.5 rounded-lg text-sm font-medium transition-all ${
                    plan.current
                      ? "bg-[#4f7cff]/20 text-[#707090] cursor-default"
                      : plan.popular
                      ? "bg-[#4f7cff] text-white hover:bg-[#4f7cff]/90"
                      : "bg-[#4f7cff]/10 text-[#4f7cff] hover:bg-[#4f7cff]/20"
                  }`}
                  disabled={plan.current}
                >
                  {plan.current ? "Current Plan" : "Upgrade"}
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Payment methods */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#0a0a12] border border-[#4f7cff]/10 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-white mb-4">Payment Method</h2>
            <div className="flex items-center gap-4 p-4 bg-[#0f0f18] rounded-lg">
              <div className="w-12 h-8 bg-gradient-to-br from-[#4f7cff] to-[#a855f7] rounded flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-white">•••• •••• •••• 4242</div>
                <div className="text-xs text-[#505060]">Expires 12/25</div>
              </div>
              <button className="text-sm text-[#4f7cff] hover:text-[#00d4ff]">Edit</button>
            </div>
            <button className="mt-4 flex items-center gap-2 text-sm text-[#4f7cff] hover:text-[#00d4ff]">
              <Plus className="w-4 h-4" /> Add payment method
            </button>
          </div>

          {/* Hugging Face integration */}
          <div className="bg-[#0a0a12] border border-[#4f7cff]/10 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-white mb-4">Integrations</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-[#0f0f18] rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center text-xl">
                    🤗
                  </div>
                  <div>
                    <div className="text-sm text-white">Hugging Face</div>
                    <div className="text-xs text-[#505060]">Connect your HF models</div>
                  </div>
                </div>
                <button className="px-3 py-1.5 bg-[#4f7cff]/10 text-[#4f7cff] text-sm rounded-lg hover:bg-[#4f7cff]/20">
                  Connect
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-[#0f0f18] rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#4f7cff]/20 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-[#4f7cff]" />
                  </div>
                  <div>
                    <div className="text-sm text-white">OpenAI</div>
                    <div className="text-xs text-[#505060]">Use your API key</div>
                  </div>
                </div>
                <button className="px-3 py-1.5 bg-[#4f7cff]/10 text-[#4f7cff] text-sm rounded-lg hover:bg-[#4f7cff]/20">
                  Connect
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Payment history */}
        <div className="bg-[#0a0a12] border border-[#4f7cff]/10 rounded-xl p-5">
          <h2 className="text-lg font-semibold text-white mb-4">Payment History</h2>
          <div className="space-y-2">
            {paymentHistory.map((payment, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-[#0f0f18] rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="text-sm text-[#909098]">{payment.date}</div>
                  <div className="text-sm text-white">${payment.amount}</div>
                  <div className="text-xs text-[#505060]">+{payment.credits.toLocaleString()} NCR</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#39ff8e] bg-[#39ff8e]/10 px-2 py-0.5 rounded-full">
                    {payment.status}
                  </span>
                  <button className="text-[#505060] hover:text-[#4f7cff]">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

