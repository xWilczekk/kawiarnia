"use client";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#040302",
      }}
    >
      {/* Main footer row */}
      <div
        style={{
          padding: "clamp(2rem, 4vw, 3rem) clamp(2rem, 8vw, 8rem)",
          borderTop: "1px solid rgba(201,169,110,0.06)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1.5rem",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1rem",
            fontWeight: 300,
            letterSpacing: "0.2em",
            color: "rgba(201,169,110,0.4)",
            textTransform: "uppercase",
          }}
        >
          U&nbsp;Rełkowej
        </div>

        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.58rem",
            letterSpacing: "0.15em",
            color: "rgba(240,230,208,0.2)",
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          Świętojańska 80 · 07-200 Wyszków ·{" "}
          <a
            href="tel:501445536"
            style={{
              color: "rgba(201,169,110,0.3)",
              textDecoration: "none",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "rgba(201,169,110,0.7)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "rgba(201,169,110,0.3)")
            }
          >
            501 445 536
          </a>
        </div>

        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.55rem",
            letterSpacing: "0.15em",
            color: "rgba(240,230,208,0.15)",
            textTransform: "uppercase",
          }}
        >
          © {new Date().getFullYear()}
        </div>
      </div>

    </footer>
  );
}
