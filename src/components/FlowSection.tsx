import styles from "./FlowSection.module.css";

export function FlowSection() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>Protocol Flows</span>
        <h2>Cold-chain rescue & travel coalition</h2>
        <p>Two reference DAGs showing how discovery, bidding, orchestration, and settlement flow through the stack.</p>
      </div>
      <div className={styles.grid}>
        <Diagram
          title="Cold-Chain Crisis Response"
          description="IoT anomaly → semantic discovery → bids → DAG execution → settlement."
          nodes={[
            { id: "IoT", label: "IoT Temp Alert" },
            { id: "Pub", label: "Publish Intent" },
            { id: "Disc", label: "Semantic\nDiscovery" },
            { id: "Bid", label: "Bidding" },
            { id: "DAG", label: "DAG Exec\n(ETA, Reserve, Reroute)" },
            { id: "Settle", label: "Settlement" },
          ]}
          edges={[
            ["IoT", "Pub"],
            ["Pub", "Disc"],
            ["Disc", "Bid"],
            ["Bid", "DAG"],
            ["DAG", "Settle"],
          ]}
          accent="#22d3ee"
        />
        <Diagram
          title="Travel Coalition"
          description="User intent → parallel search → carbon optimize → bundle select → settlement."
          nodes={[
            { id: "Intent", label: "User Intent" },
            { id: "Flights", label: "Search Flights" },
            { id: "Hotels", label: "Search Hotels" },
            { id: "Exp", label: "Search Experiences" },
            { id: "Carbon", label: "Carbon Optimize" },
            { id: "Bundle", label: "Bundle Select" },
            { id: "Settle", label: "Settlement" },
          ]}
          edges={[
            ["Intent", "Flights"],
            ["Intent", "Hotels"],
            ["Intent", "Exp"],
            ["Flights", "Carbon"],
            ["Hotels", "Carbon"],
            ["Exp", "Carbon"],
            ["Carbon", "Bundle"],
            ["Bundle", "Settle"],
          ]}
          accent="#a855f7"
        />
      </div>
    </section>
  );
}

type Node = { id: string; label: string };
type Edge = [string, string];

function Diagram({
  title,
  description,
  nodes,
  edges,
  accent,
}: {
  title: string;
  description: string;
  nodes: Node[];
  edges: Edge[];
  accent: string;
}) {
  return (
    <div className={styles.card}>
      <div className={styles.meta}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <svg className={styles.svg} viewBox="0 0 640 260" role="img" aria-label={`${title} flow`}>
        <defs>
          <marker
            id={`${title}-arrow`}
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={accent} />
          </marker>
        </defs>
        {edges.map((e, i) => {
          const from = layout(nodes, e[0]);
          const to = layout(nodes, e[1]);
          if (!from || !to) return null;
          return (
            <line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={accent}
              strokeWidth="3"
              markerEnd={`url(#${title}-arrow)`}
              opacity="0.85"
            />
          );
        })}
        {nodes.map((n) => {
          const pos = layout(nodes, n.id)!;
          return (
            <g key={n.id}>
              <rect
                x={pos.x - 70}
                y={pos.y - 28}
                rx="10"
                ry="10"
                width="140"
                height="56"
                fill="rgba(17,24,39,0.8)"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1.2"
              />
              <text
                x={pos.x}
                y={pos.y}
                textAnchor="middle"
                fill="#e5e7eb"
                fontFamily="Inter, sans-serif"
                fontSize="13"
                style={{ whiteSpace: "pre-line" }}
              >
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function layout(nodes: Node[], id: string) {
  const idx = nodes.findIndex((n) => n.id === id);
  if (idx === -1) return null;
  // simple grid layout by index
  const col = idx;
  const row = idx % 2 === 0 ? 0 : 1;
  const x = 70 + col * 90;
  const y = 90 + row * 90;
  return { x, y };
}
