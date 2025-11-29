import React from "react";

export default function Credits() {
  const [ledger, setLedger] = React.useState<any[]>([]);
  const [balance, setBalance] = React.useState<any>(null);
  const [accounts, setAccounts] = React.useState<any[]>([]);
  const [selectedDid, setSelectedDid] = React.useState<string | null>(null);
  const [selectedLedger, setSelectedLedger] = React.useState<any>(null);
  const [selectedEvents, setSelectedEvents] = React.useState<any[]>([]);
  const apiKey = typeof window !== "undefined" ? localStorage.getItem("apiKey") || "" : "";
  const coordUrl = import.meta.env.VITE_COORD_URL || "https://coord.nooterra.ai";
  const agentDid = typeof window !== "undefined" ? localStorage.getItem("agentDid") || "" : "";

  React.useEffect(() => {
    const run = async () => {
      try {
        if (agentDid) {
          const resBal = await fetch(`${coordUrl}/v1/balances/${agentDid}`, {
            headers: { ...(apiKey ? { "x-api-key": apiKey } : {}) },
          });
          const balJson = await resBal.json();
          setBalance(balJson);
          const resHist = await fetch(`${coordUrl}/v1/ledger/${agentDid}/history`, {
            headers: { ...(apiKey ? { "x-api-key": apiKey } : {}) },
          });
          const jsonHist = await resHist.json();
          setLedger(jsonHist.history || []);
        }

        const resAccounts = await fetch(`${coordUrl}/v1/ledger/accounts?limit=100`, {
          headers: { ...(apiKey ? { "x-api-key": apiKey } : {}) },
        });
        if (resAccounts.ok) {
          const jsonAcc = await resAccounts.json();
          const list = jsonAcc.accounts || [];
          setAccounts(list);
          if (!selectedDid && list.length) {
            setSelectedDid(list[0].owner_did);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    run();
  }, [apiKey, coordUrl, agentDid, selectedDid]);

  React.useEffect(() => {
    const fetchSelected = async () => {
      if (!selectedDid) return;
      try {
        const headers = apiKey ? { "x-api-key": apiKey } : {};
        const resAcc = await fetch(`${coordUrl}/v1/ledger/accounts/${encodeURIComponent(selectedDid)}`, { headers });
        if (resAcc.ok) {
          const json = await resAcc.json();
          setSelectedLedger(json.account || null);
          setSelectedEvents(json.events || []);
        } else {
          setSelectedLedger(null);
          setSelectedEvents([]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchSelected();
  }, [apiKey, coordUrl, selectedDid]);

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Credits & Ledger</h2>

      <div className="bg-substrate border border-white/10 rounded-xl p-4 text-sm text-secondary space-y-2">
        <div>Agent (local): {agentDid || "not set (localStorage key “agentDid”)"}</div>
        <div>Balance: {balance?.credits ?? 0}</div>
      </div>

      <div className="bg-substrate border border-white/10 rounded-xl">
        <div className="px-4 py-3 border-b border-white/10 text-xs uppercase tracking-[0.2em] text-secondary">
          Local Agent Ledger (set localStorage.agentDid)
        </div>
        <table className="w-full text-sm">
          <thead className="text-secondary text-xs uppercase tracking-[0.2em] border-b border-white/10">
            <tr>
              <th className="text-left px-4 py-3">Delta</th>
              <th className="text-left px-4 py-3">Task</th>
              <th className="text-left px-4 py-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {ledger.map((l) => (
              <tr key={l.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 text-primary">{l.delta}</td>
                <td className="px-4 py-3 text-secondary text-xs font-mono">{l.task_id || "—"}</td>
                <td className="px-4 py-3 text-secondary text-sm">{l.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-substrate border border-white/10 rounded-xl">
        <div className="px-4 py-3 border-b border-white/10 text-xs uppercase tracking-[0.2em] text-secondary">
          Ledger Accounts (Top 100) – click to inspect
        </div>
        <table className="w-full text-sm">
          <thead className="text-secondary text-xs uppercase tracking-[0.2em] border-b border-white/10">
            <tr>
              <th className="text-left px-4 py-3">Owner DID</th>
              <th className="text-left px-4 py-3">Balance</th>
              <th className="text-left px-4 py-3">Currency</th>
              <th className="text-left px-4 py-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((a) => {
              const active = a.owner_did === selectedDid;
              return (
                <tr
                  key={a.id}
                  className={`border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer ${
                    active ? "bg-white/5" : ""
                  }`}
                  onClick={() => setSelectedDid(a.owner_did)}
                >
                  <td className="px-4 py-3 text-primary font-mono text-xs">{a.owner_did}</td>
                  <td className="px-4 py-3 text-secondary text-sm">{a.balance}</td>
                  <td className="px-4 py-3 text-secondary text-sm">{a.currency || "NCR"}</td>
                  <td className="px-4 py-3 text-secondary text-sm">{a.created_at}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selectedLedger && (
        <div className="bg-substrate border border-white/10 rounded-xl">
          <div className="px-4 py-3 border-b border-white/10 text-xs uppercase tracking-[0.2em] text-secondary">
            Account Detail: {selectedLedger.owner_did} (balance {selectedLedger.balance} {selectedLedger.currency || "NCR"})
          </div>
          <table className="w-full text-sm">
            <thead className="text-secondary text-xs uppercase tracking-[0.2em] border-b border-white/10">
              <tr>
                <th className="text-left px-4 py-3">Delta</th>
                <th className="text-left px-4 py-3">Reason</th>
                <th className="text-left px-4 py-3">Workflow</th>
                <th className="text-left px-4 py-3">Node</th>
                <th className="text-left px-4 py-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {selectedEvents.map((e: any, idx: number) => (
                <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-primary">{e.delta}</td>
                  <td className="px-4 py-3 text-secondary text-sm">{e.reason || "—"}</td>
                  <td className="px-4 py-3 text-secondary text-xs font-mono break-all">{e.workflow_id || "—"}</td>
                  <td className="px-4 py-3 text-secondary text-sm">{e.node_name || "—"}</td>
                  <td className="px-4 py-3 text-secondary text-sm">{e.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
