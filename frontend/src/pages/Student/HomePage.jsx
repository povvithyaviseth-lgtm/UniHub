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
import API_BASE from "../../config/api";

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
              fontFamily: "inherit",
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
                fontFamily: "inherit",
                fontWeight: 400,
              }}
            >
              Hosted by:
            </span>
            <span
              style={{
                color: "#00550A",
                fontSize: 20,
                fontFamily: "inherit",
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
              fontFamily: "inherit",
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
              fontFamily: "inherit",
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
              fontFamily: "inherit",
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
  const token = useStudentStore((s) => s.token);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Clubs");
  const [openClub, setOpenClub] = useState(null);

  // Clubs from backend
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  // 🔥 Fetch joined clubs on mount / when token changes
  useEffect(() => {
    if (!token) return;

    const fetchJoinedClubs = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/clubs/joined`, {
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
        const res = await fetch(`${API_BASE}/api/clubs/${clubId}/join`, {
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
            >
              Explore By Category
            </div>

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
              {mockEvents.map((event, index) => (
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
              ))}
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
