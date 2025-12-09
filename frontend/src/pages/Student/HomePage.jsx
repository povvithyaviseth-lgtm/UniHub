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

// 🔐 student auth store
import { useStudentStore } from "../../store/student";

// ✅ shared ClubCard (owner + student variants)
import ClubCard from "../../component/StudentComponent/ClubCard.jsx";

// ✅ backend base URL
const API_BASE = "http://localhost:5050";

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

/* ------------------------- Event date formatting ------------------------ */

const formatEventDateTime = (date, startTime, endTime) => {
  if (!date && !startTime && !endTime) return "Date & time TBA";

  let dateLabel = "Date TBA";
  if (date) {
    const d = new Date(date);
    if (!Number.isNaN(d.getTime())) {
      dateLabel = d.toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    }
  }

  const toTimeLabel = (timeStr) => {
    if (!timeStr) return null;
    const [hStr, mStr] = timeStr.split(":");
    const h = Number(hStr);
    const m = Number(mStr || 0);
    if (Number.isNaN(h)) return timeStr; // already a nice string
    const dt = new Date();
    dt.setHours(h, m || 0, 0, 0);
    return dt.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  };

  const startLabel = toTimeLabel(startTime);
  const endLabel = toTimeLabel(endTime);

  if (!startLabel && !endLabel) return dateLabel;
  if (startLabel && !endLabel) return `${dateLabel} · ${startLabel}`;
  if (!startLabel && endLabel) return `${dateLabel} · Ends ${endLabel}`;

  return `${dateLabel} · ${startLabel} – ${endLabel}`;
};

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
const ClubModal = ({ club, onClose, onJoin }) => {
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

  const handleJoinClick = async () => {
    if (!onJoin) return;
    await onJoin(club);
  };

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
              fontFamily: "inherit",
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
              fontFamily: "inherit",
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
                fontFamily: "inherit",
                fontWeight: 700,
              }}
            >
              Club Leader:&nbsp;
            </span>
            <span
              style={{
                color: "black",
                fontSize: 20,
                fontFamily: "inherit",
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
                fontFamily: "inherit",
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
                fontFamily: "inherit",
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
            onClick={handleJoinClick}
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
              fontFamily: "inherit",
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

/** ------------------------------- Event Card ----------------------------- */
const EventCard = ({ event }) => {
  const BASE_W = 1220;
  const [hovered, setHovered] = useState(false);

  return (
    <ScaleBox baseWidth={BASE_W} style={{ maxWidth: "100%" }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: 1220,
          minHeight: 260,
          background: "white",
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: hovered
            ? "0px 32px 60px rgba(0, 0, 0, 0.20)"
            : "0px 20px 40px rgba(0, 0, 0, 0.12)",
          display: "flex",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          transition:
            "transform 0.18s ease-out, box-shadow 0.18s ease-out, background 0.18s ease-out",
          cursor: "pointer",
          position: "relative",
        }}
      >
        {/* accent strip */}
        <div
          style={{
            width: 6,
            alignSelf: "stretch",
            background:
              "linear-gradient(180deg, #16A34A 0%, #22C55E 45%, #BBF7D0 100%)",
          }}
        />

        {/* Left image */}
        <div
          style={{
            flex: "0 0 295px",
            maxWidth: 295,
            height: "100%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {event.imageUrl ? (
            <img
              src={event.imageUrl}
              alt={`${event.title} poster`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <PlaceholderImage width="100%" height="100%" />
          )}

          {/* Club badge over image */}
          {event.hostedBy && (
            <div
              style={{
                position: "absolute",
                left: 14,
                bottom: 14,
                padding: "6px 12px",
                borderRadius: 999,
                background: "rgba(15,118,61,0.92)",
                color: "white",
                fontSize: 14,
                fontFamily: "inherit",
                fontWeight: 600,
                maxWidth: "90%",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {event.hostedBy}
            </div>
          )}
        </div>

        {/* Right content */}
        <div
          style={{
            flex: 1,
            padding: "20px 28px 22px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {/* Top row: date chip + "Upcoming" */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                padding: "6px 14px",
                borderRadius: 999,
                background: "#DCFCE7",
                color: "#166534",
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "inherit",
                whiteSpace: "nowrap",
              }}
            >
              Open to All
            </div>
            <div
              style={{
                fontSize: 14,
                fontFamily: "inherit",
                color: "#6B7280",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: "#16A34A",
                }}
              />
              {event.when}
            </div>
          </div>

          {/* Title */}
          <div
            style={{
              color: "#020617",
              fontSize: 28,
              fontFamily: "inherit",
              fontWeight: 700,
              lineHeight: 1.25,
            }}
          >
            {event.title}
          </div>

          {/* Description */}
          {event.description && (
            <div
              style={{
                color: "#111827",
                fontSize: 16,
                fontFamily: "inherit",
                fontWeight: 400,
                lineHeight: 1.5,
                maxHeight: 72,
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
              }}
            >
              {event.description}
            </div>
          )}

          {/* Bottom row: when/where + CTA */}
          <div
            style={{
              marginTop: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                minWidth: 0,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: "#4B5563",
                  fontSize: 15,
                  fontFamily: "inherit",
                }}
              >
                <div
                  aria-hidden
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 8,
                    background: "#BBF7D0",
                  }}
                />
                <span
                  style={{
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    maxWidth: 350,
                  }}
                >
                  {event.when}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: "#4B5563",
                  fontSize: 15,
                  fontFamily: "inherit",
                }}
              >
                <div
                  aria-hidden
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 8,
                    background: "#E5E7EB",
                  }}
                />
                <span
                  style={{
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    maxWidth: 350,
                  }}
                >
                  Location: {event.location}
                </span>
              </div>
            </div>
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
  const token = useStudentStore((s) => s.token);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Clubs");
  const [openClub, setOpenClub] = useState(null);

  // Clubs from backend
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Events from backend
  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventsError, setEventsError] = useState("");

  // Which clubs this student has joined
  const [joinedClubIds, setJoinedClubIds] = useState([]);

  // Profile & EditProfile popups
  const [profileOpen, setProfileOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  // ConfirmDialog popup (reusable)
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  const confirmActionRef = useRef(() => {});

  // 🔄 section refs for scroll
  const clubsSectionRef = useRef(null); // still used as marker for category block
  const eventsSectionRef = useRef(null);

  // 🔄 responsive columns + "see more" state
  const [columns, setColumns] = useState(3);
  const [showAllClubs, setShowAllClubs] = useState(false);

  // 🔄 update columns based on viewport
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setColumns(3); // desktop
      } else if (width >= 640) {
        setColumns(2); // tablet
      } else {
        setColumns(1); // phone
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  // 🔄 helper for smooth scroll (still used for Events)
  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // 🔥 Fetch clubs from backend on mount
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_BASE}/api/clubs`);
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
            ? `${API_BASE}/${c.image.replace(/^\/+/, "")}`
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

  // 🔥 Fetch events from backend (uses getAllEventsService on server)
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setEventsLoading(true);
        setEventsError("");

        const res = await fetch(`${API_BASE}/api/events`);
        if (!res.ok) {
          throw new Error(`Failed to load events (status ${res.status})`);
        }

        const json = await res.json();
        const apiEvents = json.data || json.events || [];

        const normalized = apiEvents.map((e) => {
          // Backend: Event.find({}).populate("club","name image")
          const club = e.club || {};
          const when = formatEventDateTime(e.date, e.startTime, e.endTime);

          const imageFromEvent = e.image
            ? `${API_BASE}/${String(e.image).replace(/^\/+/, "")}`
            : null;
          const imageFromClub = club.image
            ? `${API_BASE}/${String(club.image).replace(/^\/+/, "")}`
            : null;

          return {
            id: e._id || e.id,
            title: e.title || e.name || "Untitled Event",
            hostedBy: club.name || "Student Club",
            description: e.description || "",
            when,
            location: e.location || "Location TBA",
            imageUrl: imageFromEvent || imageFromClub || null,
          };
        });

        setEvents(normalized);
      } catch (err) {
        console.error("Error loading events:", err);
        setEventsError(err.message || "Error loading events");
      } finally {
        setEventsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // 🔥 Fetch joined clubs on mount / when token changes
  useEffect(() => {
    if (!token) return;

    const fetchJoinedClubs = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/membership/joined`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          console.error("Failed to fetch joined clubs", data);
          return;
        }

        const clubs = data.clubs || [];
        setJoinedClubIds(clubs.map((c) => c._id || c.id));
      } catch (err) {
        console.error("Error fetching joined clubs", err);
      }
    };

    fetchJoinedClubs();
  }, [token]);

  const approvedClubs = useMemo(
    () =>
      clubs.filter((c) => c.status === "approved" || c.approved === true),
    [clubs]
  );

  // 🔍 Search + tag filters
  const filteredClubs = useMemo(() => {
    const term = search.trim().toLowerCase();

    return approvedClubs.filter((c) => {
      const matchesText = term ? c.name.toLowerCase().includes(term) : true;

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

  // 🔄 only show first 12 clubs unless "See more" clicked
  const visibleClubs = useMemo(() => {
    if (showAllClubs) return filteredClubs;
    return filteredClubs.slice(0, 12); // 4 rows * 3 cards
  }, [filteredClubs, showAllClubs]);

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
      // TODO: integrate leave API once Profile uses real club IDs
      setConfirmOpen(false);
    };
    setConfirmOpen(true);
  };

  // Navigate to Club Management (parent controls routing)
  const handleManageClub = useCallback(() => {
    setProfileOpen(false);
    navigate("/console/clubs");
  }, [navigate]);

  // ✅ called when user confirms "Confirm" on a card OR clicks "Join Club" in modal
  const handleJoinClub = useCallback(
    async (club) => {
      if (!token) {
        navigate("/login");
        return false;
      }

      const clubId = club._id || club.id;
      if (!clubId) {
        console.error("Club has no id:", club);
        alert("Cannot join this club: missing ID.");
        return false;
      }

      try {
        const res = await fetch(`${API_BASE}/api/membership/${clubId}/join`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          console.error("Join failed:", data);
          alert(data.message || "Could not join club");
          return false;
        }

        // ✅ mark this club as joined in state
        setJoinedClubIds((prev) =>
          prev.includes(clubId) ? prev : [...prev, clubId]
        );

        console.log("Joined club:", data);
        return true;
      } catch (err) {
        console.error("Error joining club:", err);
        alert("Network error joining club");
        return false;
      }
    },
    [token, navigate]
  );

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
        {/* Main content: everything inside fades in + moves up */}
        <div
          style={{
            width: "100%",
            background: "#F8FAFC",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 40,
            opacity: 0,
            animation: "fadeInUp 0.45s ease-out forwards",
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
                  {/* 🔄 Clickable "Clubs" → scroll to very top */}
                  <div
                    role="button"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    style={{
                      width: 153,
                      height: 50,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#707070",
                      fontSize: 40,
                      fontFamily: "inherit",
                      fontWeight: 500,
                      cursor: "pointer",
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
                  {/* 🔄 Clickable "Events" */}
                  <div
                    role="button"
                    onClick={() => scrollToSection(eventsSectionRef)}
                    style={{
                      width: 153,
                      height: 50,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#707070",
                      fontSize: 40,
                      fontFamily: "inherit",
                      fontWeight: 500,
                      cursor: "pointer",
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
                      fontFamily: "inherit",
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
                opacity: 0,
                animation: "fadeInUp 0.45s ease-out forwards",
                animationDelay: "0.05s",
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

                {/* Input */}
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search for clubs…"
                  className="home-search-input"
                  style={{
                    flex: 1,
                    height: "100%",
                    border: "none",
                    outline: "none",
                    fontFamily: "inherit",
                    fontWeight: 700,
                    fontSize: 50,
                    color: "#000000",
                    background: "transparent",
                  }}
                />
              </div>
            </div>
          </ScaleBox>

          {/* ===== Explore by Category / Tag ===== */}
          <div
            ref={clubsSectionRef}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 13,
              width: "100%",
              opacity: 0,
              animation: "fadeInUp 0.45s ease-out forwards",
              animationDelay: "0.1s",
            }}
          >
            {/* Header: Explore By Category */}
            <div
              style={{
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#000000",
                fontSize: 36,
                fontFamily: "inherit",
                fontWeight: 800,
                marginTop: 4,
              }}
            ></div>

            {/* Tag buttons */}
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
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setCategory(cat);
                      setShowAllClubs(false); // reset pagination when filter changes
                    }}
                    style={{
                      minWidth: 120,
                      padding: "10px 16px",
                      height: 50,
                      borderRadius: 25,
                      border: "1px rgba(0, 0, 0, 0.21) solid",
                      background: isActive ? "#00550A" : "white",
                      color: isActive ? "white" : "black",
                      fontSize: 20,
                      fontFamily: "inherit",
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

          {/* 🔽 Clubs Section */}
          <section
            style={{
              width: "100%",
              maxWidth: 1282,
              padding: "0 8px",
              boxSizing: "border-box",
              opacity: 0,
              animation: "fadeInUp 0.5s ease-out forwards",
              animationDelay: "0.15s",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 28,
                justifyContent: "center",
                // Reserve vertical space so Events don't jump when clubs load
                minHeight: 420,
              }}
            >
              {loading ? (
                <div
                  style={{
                    width: "100%",
                    textAlign: "center",
                    color: "#707070",
                    fontFamily: "inherit",
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
                    fontFamily: "inherit",
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
                    fontFamily: "inherit",
                    fontSize: 18,
                  }}
                >
                  No clubs match your search.
                </div>
              ) : (
                <>
                  {/* 🔄 Responsive grid with up to 3 columns */}
                  <div
                    style={{
                      width: "100%", // ✅ full row width so single cards don't shrink
                      display: "grid",
                      gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                      gap: 28,
                      alignItems: "stretch",
                    }}
                  >
                    {visibleClubs.map((club, index) => {
                      const clubId = club._id || club.id;
                      const isJoined = joinedClubIds.includes(clubId);

                      // Row-based delay: cards in the same row animate together
                      const rowIndex = Math.floor(index / columns);
                      const delaySeconds = rowIndex * 0.08;

                      return (
                        <div
                          key={club.id}
                          style={{
                            width: "100%",
                            opacity: 0,
                            animation: "fadeInUp 0.4s ease-out forwards",
                            animationDelay: `${delaySeconds}s`,
                          }}
                        >
                          <ClubCard
                            club={club}
                            onCardClick={setOpenClub}
                            onJoin={handleJoinClub}
                            isJoined={isJoined}
                            variant="student"
                          />
                        </div>
                      );
                    })}
                  </div>

                  {/* 🔄 "See more clubs" after 4 rows of 3 cards */}
                  {!showAllClubs && filteredClubs.length > 12 && (
                    <div
                      style={{
                        marginTop: 32,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <button
                        className="btn-primary"
                        onClick={() => setShowAllClubs(true)}
                        style={{
                          padding: "14px 32px",
                          borderRadius: 999,
                          fontSize: 20,
                          fontWeight: 600,
                          cursor: "pointer",
                          fontFamily: "inherit",
                        }}
                      >
                        See more clubs
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </section>

          {/* 🔽 Events Section (scroll target) */}
          <section
            ref={eventsSectionRef}
            style={{
              width: "100%",
              maxWidth: 1282,
              boxSizing: "border-box",
              opacity: 0,
              animation: "fadeInUp 0.55s ease-out forwards",
              animationDelay: "0.2s",
            }}
          >
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
                  fontFamily: "inherit",
                  fontSize: 40,
                  fontWeight: 700,
                }}
              >
                Upcoming Club Events
              </div>
            </div>

            {/* Events List (uses backend data) */}
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
              {eventsLoading ? (
                <div
                  style={{
                    width: "100%",
                    textAlign: "center",
                    color: "#707070",
                    fontFamily: "inherit",
                    fontSize: 18,
                  }}
                >
                  Loading events…
                </div>
              ) : eventsError ? (
                <div
                  style={{
                    width: "100%",
                    textAlign: "center",
                    color: "red",
                    fontFamily: "inherit",
                    fontSize: 18,
                  }}
                >
                  {eventsError}
                </div>
              ) : events.length === 0 ? (
                <div
                  style={{
                    width: "100%",
                    textAlign: "center",
                    color: "#707070",
                    fontFamily: "inherit",
                    fontSize: 18,
                  }}
                >
                  No upcoming events yet. Check back soon!
                </div>
              ) : (
                events.map((event, index) => (
                  <div
                    key={event.id}
                    style={{
                      opacity: 0,
                      animation: "fadeInUp 0.45s ease-out forwards",
                      animationDelay: `${0.25 + index * 0.12}s`,
                    }}
                  >
                    <EventCard event={event} />
                  </div>
                ))
              )}
            </div>
          </section>

          <div style={{ height: 40 }} />
        </div>
      </div>

      {/* Club details modal */}
      {openClub && (
        <ClubModal
          club={openClub}
          onClose={() => setOpenClub(null)}
          onJoin={async (club) => {
            const ok = await handleJoinClub(club);
            if (ok) setOpenClub(null);
          }}
        />
      )}

      {/* PROFILE popup with smooth animation */}
      <PopUpModals
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        baseW={598.92}
        baseH={814}
      >
        <div className="cd-modal-shell">
          <Profile
            onClose={() => setProfileOpen(false)}
            onEditProfile={handleOpenEditFromProfile}
            onLeaveClub={handleProfileLeaveClub}
            onManageClub={handleManageClub}
          />
        </div>
      </PopUpModals>

      {/* EDIT PROFILE popup (also animated for consistency) */}
      <PopUpModals
        open={editOpen}
        onClose={() => setEditOpen(false)}
        baseW={733}
        baseH={671}
      >
        <div className="cd-modal-shell">
          <EditProfile
            onBack={() => {
              setEditOpen(false);
              setProfileOpen(true);
            }}
          />
        </div>
      </PopUpModals>

      {/* CONFIRM DIALOG popup (also animated) */}
      <PopUpModals
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        baseW={696}
        baseH={354}
      >
        <div className="cd-modal-shell">
          <ConfirmDialog
            title={confirmTitle}
            message={confirmMessage}
            onCancel={() => setConfirmOpen(false)}
            onConfirm={() => confirmActionRef.current?.()}
          />
        </div>
      </PopUpModals>
    </div>
  );
};

export default HomePage;
