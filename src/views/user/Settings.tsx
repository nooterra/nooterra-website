import React from "react";
import { motion } from "framer-motion";
import { User, Bell, Shield, Key, Palette, Save, Eye, EyeOff } from "lucide-react";

export default function Settings() {
  const [user, setUser] = React.useState({
    name: "John Doe",
    email: "john@example.com",
  });
  const [showApiKey, setShowApiKey] = React.useState(false);
  const [notifications, setNotifications] = React.useState({
    email: true,
    push: false,
    weeklyDigest: true,
  });
  const [saving, setSaving] = React.useState(false);

  const handleSave = async () => {
    setSaving(true);
    // Simulate save
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
  };

  return (
    <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-[#707090] mt-1">Manage your account preferences</p>
        </div>

        {/* Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0a0a12] border border-[#4f7cff]/10 rounded-xl p-6 mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <User className="w-5 h-5 text-[#4f7cff]" />
            <h2 className="text-lg font-semibold text-white">Profile</h2>
          </div>

          <div className="flex items-start gap-6 mb-6">
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#4f7cff] to-[#a855f7] flex items-center justify-center text-white text-2xl font-bold">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm text-[#707090] mb-2">Display Name</label>
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="w-full bg-[#0f0f18] border border-[#4f7cff]/20 rounded-lg px-4 py-2.5 text-white focus:border-[#4f7cff]/40 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-[#707090] mb-2">Email</label>
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="w-full bg-[#0f0f18] border border-[#4f7cff]/20 rounded-lg px-4 py-2.5 text-white focus:border-[#4f7cff]/40 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* API Keys */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0a0a12] border border-[#4f7cff]/10 rounded-xl p-6 mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Key className="w-5 h-5 text-[#4f7cff]" />
            <h2 className="text-lg font-semibold text-white">API Access</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-[#707090] mb-2">Your API Key</label>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-[#0f0f18] border border-[#4f7cff]/20 rounded-lg px-4 py-2.5 font-mono text-sm text-white">
                  {showApiKey ? "noot_sk_7f3a9b2c4d5e6f7a8b9c0d1e2f3a4b5c" : "noot_sk_••••••••••••••••••••"}
                </div>
                <button
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="p-2.5 bg-[#0f0f18] border border-[#4f7cff]/20 rounded-lg text-[#707090] hover:text-white"
                >
                  {showApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-[#505060] mt-2">
                Use this key to authenticate API requests. Keep it secret!
              </p>
            </div>

            <button className="px-4 py-2 bg-[#4f7cff]/10 text-[#4f7cff] text-sm rounded-lg hover:bg-[#4f7cff]/20">
              Regenerate Key
            </button>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#0a0a12] border border-[#4f7cff]/10 rounded-xl p-6 mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-[#4f7cff]" />
            <h2 className="text-lg font-semibold text-white">Notifications</h2>
          </div>

          <div className="space-y-4">
            {[
              { key: "email", label: "Email notifications", desc: "Receive updates via email" },
              { key: "push", label: "Push notifications", desc: "Browser push notifications" },
              { key: "weeklyDigest", label: "Weekly digest", desc: "Summary of your activity" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-white">{item.label}</div>
                  <div className="text-xs text-[#505060]">{item.desc}</div>
                </div>
                <button
                  onClick={() =>
                    setNotifications({
                      ...notifications,
                      [item.key]: !notifications[item.key as keyof typeof notifications],
                    })
                  }
                  className={`w-12 h-6 rounded-full transition-all ${
                    notifications[item.key as keyof typeof notifications]
                      ? "bg-[#4f7cff]"
                      : "bg-[#2a2a3a]"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      notifications[item.key as keyof typeof notifications]
                        ? "translate-x-6"
                        : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#0a0a12] border border-[#4f7cff]/10 rounded-xl p-6 mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-5 h-5 text-[#4f7cff]" />
            <h2 className="text-lg font-semibold text-white">Security</h2>
          </div>

          <div className="space-y-4">
            <button className="w-full text-left p-4 bg-[#0f0f18] rounded-lg hover:bg-[#0f0f18]/80 transition-colors">
              <div className="text-sm text-white">Change password</div>
              <div className="text-xs text-[#505060] mt-1">Update your account password</div>
            </button>
            <button className="w-full text-left p-4 bg-[#0f0f18] rounded-lg hover:bg-[#0f0f18]/80 transition-colors">
              <div className="text-sm text-white">Two-factor authentication</div>
              <div className="text-xs text-[#505060] mt-1">Add an extra layer of security</div>
            </button>
            <button className="w-full text-left p-4 bg-[#0f0f18] rounded-lg hover:bg-[#0f0f18]/80 transition-colors">
              <div className="text-sm text-white">Active sessions</div>
              <div className="text-xs text-[#505060] mt-1">Manage your logged-in devices</div>
            </button>
          </div>
        </motion.div>

        {/* Save button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-neural disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

