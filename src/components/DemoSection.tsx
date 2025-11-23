import styles from "./DemoSection.module.css";

const demos = [
  {
    title: "Cold-Chain Crisis Response",
    description:
      "IoT-triggered cold-chain rescue: discovery, bidding, DAG orchestration, reroute, settlement.",
    video: "/demos/coldchain-demo.webm",
  },
  {
    title: "Travel Coalition",
    description:
      "Cross-org travel bundle: flights, hotels, dining, experiences, carbon scoring, settlement.",
    video: "/demos/travel-demo.webm",
  },
];

export function DemoSection() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>Live Demo Captures</span>
        <h2>Protocol in motion</h2>
        <p>Recorded timelines straight from our simulations. No edits, pure event flow.</p>
      </div>
      <div className={styles.grid}>
        {demos.map((demo) => (
          <div key={demo.title} className={styles.card}>
            <div className={styles.meta}>
              <h3>{demo.title}</h3>
              <p>{demo.description}</p>
            </div>
            <video className={styles.video} src={demo.video} controls muted playsInline />
          </div>
        ))}
      </div>
    </section>
  );
}
