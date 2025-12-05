// src/pages/Student/HomePage.jsx
import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import siteLogo from "../../images/UniHubLogo.png";
import bellIcon from "../../images/Bell.png";
import profileIcon from "../../images/Profile.png";
import searchIcon from "../../images/Search.png";

// ✅ make sure the stylesheet is loaded for this page
import "../../index.css";

// Popups + bodies
import PopUpModals from "../../component/PopUpModals.jsx";
import ConfirmDialog from "../../component/ConfirmDialog.jsx";
import Profile from "../../component/StudentComponent/Profile.jsx";
import EditProfile from "../../component/StudentComponent/EditProfile.jsx";

/* ----------------------------- Scale helper ----------------------------- */
/** Scales fixed-width children to fit the container width (<= maxScale). */
const ScaleBox = ({ baseWidth, maxScale = 1, style, children }) => {
  const ref = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const w = el.clientWidth || 1;
      const k = Math.min(maxScale, w / baseWidth);
      setScale(k > 0 ? k : 1);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [baseWidth, maxScale]);

  return (
    <div ref={ref} style={{ width: "100%", ...style }}>
      <div
        style={{
          width: baseWidth,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          margin: "0 auto",
        }}
      >
        {children}
      </div>
    </div>
  );
};

/** ----------------------------------------------------------------
 * Mock Events (clubs now come from backend)
 * ---------------------------------------------------------------- */
const mockEvents = [
  {
    id: "e1",
    title: "Monthly Valorant Tournament (Team of 5 Required)",
    hostedBy: "Esports Club",
    description:
      "Competitive Valorant tournament—bring your five-stack or spectate. Everyone’s welcome!",
    when: "Thu, Oct 18 | 12:00 PM – 12:30 AM",
    location: "Discord Server",
    imageUrl: null,
  },
  {
    id: "e2",
    title: "Go Hiking at Lake Tahoe",
    hostedBy: "Hiking Club",
    description:
      "Join our day trip to Lake Tahoe. Hike, snack, and soak in the views. All levels welcome.",
    when: "Sat, Oct 1 | 5:00 PM – 9:30 AM",
    location: "Lake Tahoe",
    imageUrl: null,
  },
];

/** Light-green placeholder “image” */
const PlaceholderImage = ({ width, height, style = {} }) => (
  <div
    style={{
      width,
      height,
      background: "#0f763dff",
      borderRadius: 18.8,
      ...style,
    }}
  />
);

/** ------------------------------ Club Modal ------------------------------ */
const ClubModal = ({ club, onClose }) => {
  const leader = club.leader || "Club Leader (TBD)";
  const email = club.email || "club@example.edu";

  const onEsc = useCallback(
    (e) => e.key === "Escape" && onClose(),
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [onEsc]);

  return (
    <div
      aria-modal="true"
      role="dialog"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        padding: 12,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 576,
          height: 763,
          position: "relative",
          background: "white",
          overflow: "hidden",
          borderRadius: 15,
          boxShadow: "0 25px 60px rgba(0,0,0,.25)",
          maxWidth: "calc(100vw - 24px)",
          maxHeight: "calc(100vh - 24px)",
        }}
      >
        {/* Hero */}
        <div
          style={{
            width: "100%",
            height: 250,
            position: "absolute",
            top: 0,
            left: 0,
            overflow: "hidden",
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}
        >
          {club.imageUrl ? (
            <img
              src={club.imageUrl}
              alt={`${club.name} hero`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div
              style={{ width: "100%", height: "100%", background: "#AEFFD2" }}
            />
          )}
        </div>

        {/* Name + Description */}
        <div
          style={{
            position: "absolute",
            left: 22,
            top: 283,
            right: 22,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <div
            style={{
              color: "black",
              fontSize: 32,
              fontFamily: "Inter",
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            {club.name}
          </div>
          <div
            style={{
              color: "black",
              fontSize: 20,
              fontFamily: "Inter",
              fontWeight: 400,
              lineHeight: 1.35,
            }}
          >
            {club.description}
          </div>
        </div>

        {/* Leader / Contact */}
        <div
          style={{
            position: "absolute",
            left: 22,
            right: 22,
            top: 513,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <div style={{ height: 2, background: "#B7B7B7" }} />
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                color: "black",
                fontSize: 20,
                fontFamily: "Inter",
                fontWeight: 700,
              }}
            >
              Club Leader:&nbsp;
            </span>
            <span
              style={{
                color: "black",
                fontSize: 20,
                fontFamily: "Inter",
                fontWeight: 400,
              }}
            >
              {leader}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                color: "black",
                fontSize: 20,
                fontFamily: "Inter",
                fontWeight: 700,
              }}
            >
              Contact:
            </span>
            <a
              href={`mailto:${email}`}
              className="text-link"
              style={{
                color: "#007D99",
                fontSize: 20,
                fontFamily: "Inter",
                fontWeight: 400,
                textDecoration: "underline",
              }}
            >
              {email}
            </a>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ position: "absolute", left: 292, top: 669 }}>
          <button
            className="btn-primary"
            style={{ width: 258, height: 67, borderRadius: 8 }}
            onClick={() => alert(`Requested to join "${club.name}"`)}
          >
            Join Club
          </button>
        </div>

        <div style={{ position: "absolute", left: 35, top: 670 }}>
          <button
            style={{
              width: 235,
              height: 65,
              borderRadius: 8,
              background: "#E1E1E3",
              color: "#6B6767",
              fontSize: 32,
              fontFamily: "Inter",
              fontWeight: 700,
            }}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

/** ------------------------------- New Club Card -------------------------- */
/**
 * Minimal, structured homepage ClubCard:
 * - Base: image + name
 * - Hover overlay: header (name + tags), description, join flow
 * - Join → "Let's go!" + "Cancel" → "Club joined!"
 */
const ClubCard = ({ club, onCardClick, onJoin }) => {
  const [hovered, setHovered] = useState(false);
  const [joinState, setJoinState] = useState("idle"); // 'idle' | 'confirm' | 'joined'

  const imageSrc = club.imageUrl || null;

  // Split tags by comma for display
  const rawTag = club.tag || "";
  const tagLines = rawTag
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const handleCardClick = () => {
    if (onCardClick) onCardClick(club);
  };

  const handleJoinClick = (e) => {
    e.stopPropagation();
    setJoinState("confirm");
  };

  const handleLetsGoClick = (e) => {
    e.stopPropagation();
    setJoinState("joined");
    if (onJoin) onJoin(club);
  };

  const handleCancelClick = (e) => {
    e.stopPropagation();
    setJoinState("idle");
  };

  return (
    <article
      style={{
        position: "relative",
        background: "#FFFFFF",
        borderRadius: 26,
        border: "1.7px solid #E5E7EB",
        boxShadow: hovered
          ? "0 10px 24px rgba(15, 23, 42, 0.14)"
          : "0 4px 12px rgba(15, 23, 42, 0.06)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        transition: "transform 0.18s ease, box-shadow 0.18s ease",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        minHeight: 320,
        width: "100%",
        maxWidth: 430,
      }}
      aria-label={`${club.name} card`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleCardClick}
    >
      {/* Base content: image + name */}
      <div>
        <div
          style={{
            position: "relative",
            margin: 16,
            marginBottom: 10,
            borderRadius: 12,
            overflow: "hidden",
            background: "#227246",
            aspectRatio: "16 / 10",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={`${club.name} cover`}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <span
              style={{
                fontSize: 13,
                color: "#D1FAE5",
                padding: 8,
                textAlign: "center",
              }}
            >
              No image uploaded
            </span>
          )}
        </div>

        <div
          style={{
            padding: "0 16px 16px 16px",
          }}
        >
          <div
            style={{
              color: "#111827",
              fontSize: 35,
              fontWeight: 700,
              lineHeight: 1.2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              textAlign: "center",
            }}
          >
            {club.name}
          </div>
        </div>
      </div>

      {/* Hover overlay */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(255, 255, 255, 0.98)",
            color: "#0F172A",
            display: "flex",
            flexDirection: "column",
            padding: 16,
            boxSizing: "border-box",
          }}
        >
          {/* Header: name + tags */}
          <div
            style={{
              marginBottom: 8,
            }}
          >
            <div
              style={{
                fontSize: 35,
                fontWeight: 700,
                color: "#111827",
                marginBottom: 10,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {club.name}
            </div>

            {tagLines.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 15,
                }}
              >
                {tagLines.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: "7px 8px",
                      borderRadius: 999,
                      border: "1px solid #E5E7EB",
                      background: "#F9FAFB",
                      fontSize: 11,
                      fontWeight: 500,
                      color: "#006f32ff",
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Body: description (scrollable) */}
          <div
            style={{
              fontSize: 16,
              lineHeight: 1.5,
              color: "#4B5563",
              marginBottom: 12,
              flex: 1,
              maxHeight: 140,
              overflowY: "auto",
            }}
          >
            {club.description || "No description provided."}
          </div>

          {/* Divider */}
          <div
            style={{
              height: 1,
              background: "#E5E7EB",
              marginBottom: 10,
              marginTop: 2,
            }}
          />

          {/* Footer: join button flow */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                fontSize: 11,
                color: "#9CA3AF",
                textTransform: "uppercase",
                letterSpacing: 0.05,
              }}
            >
            </span>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              {joinState === "idle" && (
                <button
                  onClick={handleJoinClick}
                  style={{
                    padding: "9px 30px",
                    borderRadius: 999,
                    border: "none",
                    background: "#0D6C30",
                    color: "white",
                    fontWeight: 500,
                    fontSize: 30,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  Join
                </button>
              )}

              {joinState === "confirm" && (
                <>
                  <button
                    onClick={handleLetsGoClick}
                    style={{
                      padding: "9px 20px",
                      borderRadius: 999,
                      border: "none",
                      background: "#105F2D",
                      color: "white",
                      fontWeight: 500,
                      fontSize: 25,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Let&apos;s go!
                  </button>
                  <button
                    onClick={handleCancelClick}
                    style={{
                      padding: "9px 20px",
                      borderRadius: 999,
                      border: "1px solid #D1D5DB",
                      background: "white",
                      color: "#374151",
                      fontWeight: 500,
                      fontSize: 25,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Cancel
                  </button>
                </>
              )}

              {joinState === "joined" && (
                <span
                  style={{
                    padding: "9px 20px",
                    borderRadius: 999,
                    background: "#DCFCE7",
                    color: "#166534",
                    fontWeight: 600,
                    fontSize: 25,
                    whiteSpace: "nowrap",
                  }}
                >
                  Club joined!
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </article>
  );
};


/** ------------------------------- Event Card ----------------------------- */
const EventCard = ({ event }) => {
  const BASE_W = 1220;

  return (
    <ScaleBox baseWidth={BASE_W} style={{ maxWidth: "100%" }}>
      <div
        style={{
          width: 1220,
          height: 318,
          position: "relative",
          background: "white",
          boxShadow: "0px 27px 38px rgba(0, 0, 0, 0.17)",
          overflow: "hidden",
          borderRadius: 20,
        }}
      >
        {/* Left image */}
        <div
          style={{
            width: 295,
            height: 318,
            left: 0,
            top: 0,
            position: "absolute",
            overflow: "hidden",
            borderRadius: 18.8,
          }}
        >
          {event.imageUrl ? (
            <img
              src={event.imageUrl}
              alt={`${event.title} poster`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <PlaceholderImage width="100%" height="100%" />
          )}
        </div>

        {/* White strip */}
        <div
          style={{
            width: 36,
            height: 318,
            left: 266,
            top: 0,
            position: "absolute",
            background: "white",
          }}
        />

        {/* Content */}
        <div
          style={{
            width: 901,
            height: 294,
            left: 302,
            top: 12,
            position: "absolute",
            display: "inline-flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 6,
          }}
        >
          <div
            style={{
              alignSelf: "stretch",
              color: "black",
              fontSize: 40,
              fontFamily: "Inter",
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            {event.title}
          </div>

          <div style={{ alignSelf: "stretch" }}>
            <span
              style={{
                color: "#707070",
                fontSize: 20,
                fontFamily: "Inter",
                fontWeight: 400,
              }}
            >
              Hosted by:
            </span>
            <span
              style={{
                color: "#00550A",
                fontSize: 20,
                fontFamily: "Inter",
                fontWeight: 700,
              }}
            >
              {" "}
              {event.hostedBy}
            </span>
          </div>

          <div
            style={{
              alignSelf: "stretch",
              color: "black",
              fontSize: 20,
              fontFamily: "Inter",
              fontWeight: 400,
            }}
          >
            {event.description}
          </div>
        </div>

        {/* CTA */}
        <div
          style={{
            width: 257,
            height: 59,
            left: 946,
            top: 254,
            position: "absolute",
          }}
        >
          <button
            className="btn-primary"
            style={{
              width: "100%",
              height: 50,
              borderRadius: 10,
              position: "absolute",
              left: 0,
              top: 5,
            }}
          >
            View Details
          </button>
        </div>

        {/* When & Where */}
        <div
          style={{
            width: 614,
            height: 64,
            left: 324,
            top: 251,
            position: "absolute",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: 551,
              height: 28,
              left: 1,
              top: 37,
              position: "absolute",
              color: "#787878",
              fontSize: 20,
              fontFamily: "Inter",
              fontWeight: 400,
            }}
          >
            Location: {event.location}
          </div>
        </div>

        <div
          style={{
            left: 300,
            top: 256,
            position: "absolute",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: 6,
              background: "#AEFFD2",
            }}
            aria-hidden
          />
          <div
            style={{
              color: "#787878",
              fontSize: 20,
              fontFamily: "Inter",
              fontWeight: 400,
            }}
          >
            {event.when}
          </div>
        </div>
      </div>
    </ScaleBox>
  );
};

/** ------------------------------- Categories ----------------------------- */
const CATEGORIES = [
  "All Clubs",
  "Academic",
  "Arts",
  "Culture",
  "Career",
  "Service",
  "Social",
  "Sports",
  "Technology",
  "Wellness",
  "Leadership",
  "Environmental",
  "Hobbies",
];

/** --------------------------------- Page --------------------------------- */
const HomePage = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Clubs");
  const [openClub, setOpenClub] = useState(null);

  // Clubs from backend
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Profile & EditProfile popups
  const [profileOpen, setProfileOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  // ConfirmDialog popup (reusable)
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  const confirmActionRef = useRef(() => {});

  // 🔥 Fetch clubs from backend on mount
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("http://localhost:5050/api/clubs");
        if (!res.ok) {
          throw new Error(`Failed to load clubs (status ${res.status})`);
        }

        const json = await res.json();
        const apiClubs = json.data || json.clubs || [];

        // Normalize to what the UI expects
        const normalized = apiClubs.map((c) => ({
          id: c._id || c.id,
          _id: c._id, // keep for consistency if needed
          name: c.name,
          description: c.description || "",
          tag: c.tag || "Other",
          imageUrl: c.image
            ? `http://localhost:5050/${c.image.replace(/^\/+/, "")}`
            : null,
          status: c.status || (c.approved ? "approved" : "pending"),
          leader: c.leader,
          email: c.email,
        }));

        setClubs(normalized);
      } catch (err) {
        console.error("Error loading clubs:", err);
        setError(err.message || "Error loading clubs");
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  const approvedClubs = useMemo(
    () =>
      clubs.filter((c) => c.status === "approved" || c.approved === true),
    [clubs]
  );

  // 🔍 Search + tag filters
  // Now supports comma-separated tags per club, and category chips filter by those tags.
  const filteredClubs = useMemo(() => {
    const term = search.trim().toLowerCase();

    return approvedClubs.filter((c) => {
      const matchesText = term
        ? c.name.toLowerCase().includes(term)
        : true;

      const allTags = (c.tag || "")
        .split(",")
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean);

      const matchesCategory =
        category === "All Clubs"
          ? true
          : allTags.includes(category.toLowerCase());

      return matchesText && matchesCategory;
    });
  }, [approvedClubs, search, category]);

  // When Profile wants to open EditProfile:
  const handleOpenEditFromProfile = () => {
    setProfileOpen(false);
    setEditOpen(true);
  };

  // When Profile asks to confirm leaving a club:
  const handleProfileLeaveClub = (clubName) => {
    setConfirmTitle("Leave Club?");
    setConfirmMessage(`Are you sure you want to leave "${clubName}"?`);
    confirmActionRef.current = async () => {
      // TODO: call your API to remove the user from the club
      setConfirmOpen(false);
    };
    setConfirmOpen(true);
  };

  // Navigate to Club Management (parent controls routing)
  const handleManageClub = useCallback(() => {
    setProfileOpen(false);
    navigate("/console/clubs");
  }, [navigate]);

  // ✅ called when user confirms "Let's go" on a card
  const handleJoinClub = (club) => {};

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        display: "flex",
        justifyContent: "center",
        background: "#F8FAFC",
      }}
    >
      <div
        style={{
          padding: "10px",
          display: "flex",
          justifyContent: "center",
          width: "100%",
          maxWidth: 1500,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "100%",
            background: "#F8FAFC",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 40,
          }}
        >
          {/* ===== Sticky Header (scaled to fit) ===== */}
          <div
            style={{
              position: "sticky",
              top: 0,
              zIndex: 20,
              alignSelf: "stretch",
              background: "#F8FAFC",
              boxShadow: "0px 1px 30px rgba(0, 0, 0, 0.19)",
            }}
          >
            <ScaleBox baseWidth={1440}>
              <div
                style={{
                  height: 120,
                  position: "relative",
                  width: 1440,
                  margin: "0 auto",
                }}
              >
                {/* Left Logo */}
                <div
                  style={{
                    position: "absolute",
                    left: 33,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 360,
                    height: 120,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <img
                    src={siteLogo}
                    alt="Site logo"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </div>

                {/* Center Tabs */}
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    alignItems: "center",
                    gap: 28,
                  }}
                >
                  <div
                    style={{
                      width: 153,
                      height: 50,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#707070",
                      fontSize: 40,
                      fontFamily: "Inter",
                      fontWeight: 500,
                    }}
                  >
                    Clubs
                  </div>
                  <div
                    style={{
                      width: 2,
                      height: 40,
                      background: "#D0D0D0",
                      borderRadius: 1,
                    }}
                  />
                  <div
                    style={{
                      width: 153,
                      height: 50,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#707070",
                      fontSize: 40,
                      fontFamily: "Inter",
                      fontWeight: 500,
                    }}
                  >
                    Events
                  </div>
                </div>

                {/* Right: bell */}
                <div
                  style={{
                    position: "absolute",
                    right: 240,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 65,
                    height: 64,
                    padding: 5,
                    background: "#F0F0F0",
                    borderRadius: 25,
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className="icon-button"
                  title="Notifications"
                >
                  <div
                    aria-hidden
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor: "#00550A",
                      WebkitMaskImage: `url(${bellIcon})`,
                      maskImage: `url(${bellIcon})`,
                      WebkitMaskRepeat: "no-repeat",
                      maskRepeat: "no-repeat",
                      WebkitMaskPosition: "center",
                      maskPosition: "center",
                      WebkitMaskSize: "contain",
                      maskSize: "contain",
                    }}
                    className="icon-mask"
                  />
                </div>

                {/* Right: profile chip */}
                <button
                  type="button"
                  onClick={() => setProfileOpen(true)}
                  className="profile-chip"
                  style={{
                    position: "absolute",
                    right: 33,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 200,
                    height: 64,
                    background: "#F0F0F0",
                    borderRadius: 25,
                  }}
                  aria-label="Open My Profile"
                >
                  <div
                    style={{
                      width: 135,
                      height: 44,
                      marginLeft: 62,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#00550A",
                      fontSize: 24,
                      fontFamily: "Inter",
                      fontWeight: 700,
                    }}
                  >
                    My Profile
                  </div>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      position: "absolute",
                      left: 11,
                      top: 4,
                      overflow: "hidden",
                      borderRadius: 100,
                      background: "rgba(230, 224, 233, 0.10)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    aria-hidden
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        backgroundColor: "#00550A",
                        WebkitMaskImage: `url(${profileIcon})`,
                        maskImage: `url(${profileIcon})`,
                        WebkitMaskRepeat: "no-repeat",
                        maskRepeat: "no-repeat",
                        WebkitMaskPosition: "center",
                        maskPosition: "center",
                        WebkitMaskSize: "contain",
                        maskSize: "contain",
                      }}
                      className="icon-mask"
                    />
                  </div>
                </button>
              </div>
            </ScaleBox>
          </div>
          {/* ===== End Header ===== */}

          {/* Search Section */}
          <ScaleBox baseWidth={1282}>
            <div
              style={{
                width: "100%",
                height: 152,
                background: "white",
                boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.25)",
                overflow: "hidden",
                borderRadius: 15,
                margin: "0 auto",
                padding: "40px 40px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {/* Search Bar */}
              <div
                style={{
                  width: "100%",
                  height: 107,
                  background: "white",
                  borderRadius: 8,
                  border: "2px #00550A solid",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 16px",
                  gap: 12,
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: 68,
                    height: 68,
                    backgroundColor: "#00550A",
                    WebkitMaskImage: `url(${searchIcon})`,
                    maskImage: `url(${searchIcon})`,
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskPosition: "center",
                    WebkitMaskSize: "contain",
                    maskSize: "contain",
                    flexShrink: 0,
                  }}
                />

                {/* Input (auto-expands to fill width) */}
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Let’s find your people…"
                  style={{
                    flex: 1,
                    height: "100%",
                    border: "none",
                    outline: "none",
                    fontFamily: "Inter",
                    fontWeight: 700,
                    fontSize: 50,
                    color: "#000000ff",
                    background: "transparent",
                  }}
                />
              </div>
            </div>
          </ScaleBox>

          {/* ===== Explore by Category / Tag ===== */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 13,
              width: "100%",
            }}
          >
            <div
              style={{
                height: 14,
                textAlign: "center",
                display: "flex",
                alignItems: "flex-end",
                color: "black",
                fontSize: 40,
                fontFamily: "Inter",
                fontWeight: 700,
              }}
            ></div>

            <div
              style={{
                width: "100%",
                maxWidth: 1282,
                padding: "12px 8px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              {CATEGORIES.map((cat) => {
                const isActive = category === cat;
                const isAll = cat === "All Clubs";
                return (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    style={{
                      minWidth: 120,
                      padding: "10px 16px",
                      height: 50,
                      borderRadius: 25,
                      border: "1px rgba(0, 0, 0, 0.21) solid",
                      background: isActive
                        ? "#00550A"
                        : isAll
                        ? "#00550A"
                        : "white",
                      color: isActive || isAll ? "white" : "black",
                      fontSize: 20,
                      fontFamily: "Inter",
                      fontWeight: 500,
                      cursor: "pointer",
                      transition: "filter 0.15s ease",
                    }}
                    className={isActive ? "btn-primary" : undefined}
                    title={cat}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
          {/* ===== End Explore by Category ===== */}

          {/* Clubs Grid (responsive wrap) */}
          <div
            style={{
              width: "100%",
              maxWidth: 1282,
              padding: "0 8px",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 28,
                justifyContent: "center",
              }}
            >
              {loading ? (
                <div
                  style={{
                    width: "100%",
                    textAlign: "center",
                    color: "#707070",
                    fontFamily: "Inter",
                    fontSize: 18,
                  }}
                >
                  Loading clubs…
                </div>
              ) : error ? (
                <div
                  style={{
                    width: "100%",
                    textAlign: "center",
                    color: "red",
                    fontFamily: "Inter",
                    fontSize: 18,
                  }}
                >
                  {error}
                </div>
              ) : filteredClubs.length === 0 ? (
                <div
                  style={{
                    width: "100%",
                    textAlign: "center",
                    color: "#707070",
                    fontFamily: "Inter",
                    fontSize: 18,
                  }}
                >
                  No clubs match your search.
                </div>
              ) : (
                <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 28,
              justifyItems: "center",
            }}
          >
            {filteredClubs.map((club) => (
              <ClubCard
                key={club.id}
                club={club}
                onCardClick={setOpenClub}
              />
            ))}
          </div>
              )}
            </div>
          </div>

          {/* Upcoming Events Header */}
          <div
            style={{
              width: "100%",
              maxWidth: 1220,
              padding: 10,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                color: "black",
                fontFamily: "Inter",
                fontSize: 40,
                fontWeight: 700,
              }}
            >
              Upcoming Club Events
            </div>
          </div>

          {/* Events List (each scales to width) */}
          <div
            style={{
              width: "100%",
              maxWidth: 1282,
              padding: "0 8px",
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              gap: 28,
              boxSizing: "border-box",
            }}
          >
            {mockEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          <div style={{ height: 40 }} />
        </div>
      </div>

      {/* Club details modal */}
      {openClub && (
        <ClubModal club={openClub} onClose={() => setOpenClub(null)} />
      )}

      {/* PROFILE popup */}
      <PopUpModals
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        baseW={598.92}
        baseH={814}
      >
        <Profile
          onClose={() => setProfileOpen(false)}
          onEditProfile={handleOpenEditFromProfile}
          onLeaveClub={handleProfileLeaveClub}
          onManageClub={handleManageClub}
        />
      </PopUpModals>

      {/* EDIT PROFILE popup */}
      <PopUpModals
        open={editOpen}
        onClose={() => setEditOpen(false)}
        baseW={733}
        baseH={671}
      >
        <EditProfile
          onBack={() => {
            setEditOpen(false);
            setProfileOpen(true);
          }}
        />
      </PopUpModals>

      {/* CONFIRM DIALOG popup (reusable across the app) */}
      <PopUpModals
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        baseW={696}
        baseH={354}
      >
        <ConfirmDialog
          title={confirmTitle}
          message={confirmMessage}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={() => confirmActionRef.current?.()}
        />
      </PopUpModals>
    </div>
  );
};

export default HomePage;
