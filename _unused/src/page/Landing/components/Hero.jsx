export default function Hero({
  brand = { text: "Paguyuban Usaha Sukses", badgeText: "PUS" },
  titleLines = ["DISCOVER.", "LEARN.", "ENJOY"],
  subtitleLines = ["platform for creatives", "around the world"],
}) {
  return (
    <div>
      <div className="d-inline-flex align-items-center gap-2">
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.18)",
            border: "2px solid rgba(255,255,255,0.35)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(4px)",
          }}
          aria-hidden="true"
        >
          <span style={{ color: "#fff", fontWeight: 800 }}>
            {brand.badgeText}
          </span>
        </div>
        <span style={{ fontWeight: 800, color: "#fff" }}>{brand.text}</span>
      </div>
      <h1
        className="mt-3 fw-bolder text-white"
        style={{ letterSpacing: ".02em" }}
      >
        {titleLines.map((t, i) => (
          <span key={i}>
            {t}
            <br />
          </span>
        ))}
      </h1>
      <p className="text-white-50 m-0">
        {subtitleLines.map((t, i) => (
          <span key={i}>
            {t}
            <br />
          </span>
        ))}
      </p>
    </div>
  );
}
