// src/pages/Student/HomePage.jsx
import React, { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import siteLogo from "../../images/UniHubLogo.png";
import bellIcon from "../../images/Bell.png";
import profileIcon from "../../images/Profile.png";
import searchIcon from "../../images/Search.png";

// ✅ make sure the stylesheet is loaded for this page
import "../../index.css"; // if your file is named index.css instead, use: import "../../index.css";

// Popups + bodies
import PopUpModals from "../../component/PopUpModals.jsx";
import ConfirmDialog from "../../component/ConfirmDialog.jsx";
import Profile from "../../component/StudentComponent/Profile.jsx";
import EditProfile from "../../component/StudentComponent/EditProfile.jsx"; // make sure this file exists

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
 * Mock Data (replace with real API later)
 * ---------------------------------------------------------------- */
const mockClubs = [
  { id: "c1", name: "The Robotics Team", tag: "Tech", description: "Do you enjoy robots? Do you enjoy coding? Or do you just enjoy tech? Join us for builds, competitions, and fun!", imageUrl: null, approved: true, leader: "Evelyn Reeds", email: "EvelynReeds@csus.edu" },
  { id: "c2", name: "Basketball Club", tag: "Sports", description: "Pickup games, drills, and tournaments. All skill levels welcome.", imageUrl: null, approved: true, leader: "Marcus Hill", email: "basketball@csus.edu" },
  { id: "c3", name: "Outdoor Adventure Club", tag: "Volunteering", description: "Trail care days and community cleanups—give back while outdoors.", imageUrl: null, approved: true, leader: "Taylor Nguyen", email: "outdoors@csus.edu" },
  { id: "c4", name: "Movie Watchers Club", tag: "Casual", description: "Weekly screenings and lively (friendly!) debates. Popcorn provided.", imageUrl: null, approved: true, leader: "Priya Desai", email: "movies@csus.edu" },
  { id: "c5", name: "Competitive Programming", tag: "Coding", description: "Sharpen your problem-solving with contests and interview prep.", imageUrl: null, approved: true, leader: "Alex Chen", email: "comp-prog@csus.edu" },
  { id: "c6", name: "Art Collective", tag: "Art", description: "Open studios, critiques, and gallery trips—create and share.", imageUrl: null, approved: true, leader: "Samira Ali", email: "art@csus.edu" },
  { id: "c7", name: "Social Hour", tag: "Social", description: "Meet people, board games, and campus hangouts every Friday.", imageUrl: null, approved: true, leader: "Jordan Lee", email: "social@csus.edu" },
  { id: "c8", name: "Academic Research Circle", tag: "Academic", description: "Journal clubs, reading groups, and faculty Q&A sessions.", imageUrl: null, approved: true, leader: "Dr. Rivera", email: "research@csus.edu" },
];

const mockEvents = [
  { id: "e1", title: "Monthly Valorant Tournament (Team of 5 Required)", hostedBy: "Esports Club", description: "Competitive Valorant tournament—bring your five-stack or spectate. Everyone’s welcome!", when: "Thu, Oct 18 | 12:00 PM – 12:30 AM", location: "Discord Server", imageUrl: null },
  { id: "e2", title: "Go Hiking at Lake Tahoe", hostedBy: "Hiking Club", description: "Join our day trip to Lake Tahoe. Hike, snack, and soak in the views. All levels welcome.", when: "Sat, Oct 1 | 5:00 PM – 9:30 AM", location: "Lake Tahoe", imageUrl: null },
];

/** Light-green placeholder “image” */
const PlaceholderImage = ({ width, height, style = {} }) => (
  <div style={{ width, height, background: "#AEFFD2", borderRadius: 18.8, ...style }} />
);

/** ------------------------------ Club Modal ------------------------------ */
const ClubModal = ({ club, onClose }) => {
  const leader = club.leader || "Club Leader (TBD)";
  const email = club.email || "club@example.edu";

  const onEsc = useCallback((e) => e.key === "Escape" && onClose(), [onClose]);

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
            <div style={{ width: "100%", height: "100%", background: "#AEFFD2" }} />
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
          <div style={{ color: "black", fontSize: 32, fontFamily: "Inter", fontWeight: 700, lineHeight: 1.2 }}>
            {club.name}
          </div>
          <div style={{ color: "black", fontSize: 20, fontFamily: "Inter", fontWeight: 400, lineHeight: 1.35 }}>
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
            <span style={{ color: "black", fontSize: 20, fontFamily: "Inter", fontWeight: 700 }}>Club Leader:&nbsp;</span>
            <span style={{ color: "black", fontSize: 20, fontFamily: "Inter", fontWeight: 400 }}>{leader}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ color: "black", fontSize: 20, fontFamily: "Inter", fontWeight: 700 }}>Contact:</span>
            <a
              href={`mailto:${email}`}
              className="text-link"
              style={{ color: "#007D99", fontSize: 20, fontFamily: "Inter", fontWeight: 400, textDecoration: "underline" }}
            >
              {email}
            </a>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ position: "absolute", left: 292, top: 669 }}>
          <button className="btn-primary" style={{ width: 258, height: 67, borderRadius: 8 }}
            onClick={() => alert(`Requested to join "${club.name}"`)}>
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

/** ------------------------------- Club Card ------------------------------ */
const ClubCard = ({ club, onCardClick }) => {
  const BASE_W = 388;

  return (
    <div style={{ flex: "1 1 300px", maxWidth: 388, minWidth: 260 }}>
      <ScaleBox baseWidth={BASE_W}>
        <div
          onClick={() => onCardClick(club)}
          style={{
            width: 388,
            height: 578,
            position: "relative",
            background: "white",
            boxShadow: "0px 27px 38px rgba(0, 0, 0, 0.17)",
            overflow: "hidden",
            borderRadius: 20,
            cursor: "pointer",
          }}
          title={`Open details for ${club.name}`}
        >
          {/* Image */}
          <div
            style={{
              width: 323,
              height: 204,
              left: 33,
              top: 26,
              position: "absolute",
              overflow: "hidden",
              borderRadius: 18.8,
            }}
          >
            {club.imageUrl ? (
              <img src={club.imageUrl} alt={`${club.name} cover`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <PlaceholderImage width="100%" height="100%" />
            )}
          </div>

          {/* Content */}
          <div
            style={{
              width: 323,
              left: 33,
              top: 234,
              position: "absolute",
              display: "inline-flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 6,
            }}
          >
            <div style={{ alignSelf: "stretch", color: "black", fontSize: 40, fontFamily: "Inter", fontWeight: 700, lineHeight: 1.1 }}>
              {club.name}
            </div>

            <div style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
              <div style={{ color: "#707070", fontSize: 20, fontFamily: "Inter", fontWeight: 400 }}>Category:</div>
              <div style={{ color: "#00550A", fontSize: 20, fontFamily: "Inter", fontWeight: 700 }}>{club.tag}</div>
            </div>

            <div style={{ alignSelf: "stretch", color: "black", fontSize: 20, fontFamily: "Inter", fontWeight: 400 }}>
              {club.description}
            </div>
          </div>

          {/* Divider */}
          <div style={{ width: 332, height: 2.5, left: 24, top: 485, position: "absolute", background: "#B7B7B7" }} />

          {/* Button */}
          <div style={{ width: 257, height: 59, left: 61, top: 500, position: "absolute" }}>
            <button
              className="btn-primary"
              style={{ width: "100%", height: 50, borderRadius: 10, position: "absolute", left: 0, top: 5 }}
              onClick={(e) => {
                e.stopPropagation();
                onCardClick(club);
              }}
            >
              View Details
            </button>
          </div>
        </div>
      </ScaleBox>
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
            <img src={event.imageUrl} alt={`${event.title} poster`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <PlaceholderImage width="100%" height="100%" />
          )}
        </div>

        {/* White strip */}
        <div style={{ width: 36, height: 318, left: 266, top: 0, position: "absolute", background: "white" }} />

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
          <div style={{ alignSelf: "stretch", color: "black", fontSize: 40, fontFamily: "Inter", fontWeight: 700, lineHeight: 1.1 }}>
            {event.title}
          </div>

          <div style={{ alignSelf: "stretch" }}>
            <span style={{ color: "#707070", fontSize: 20, fontFamily: "Inter", fontWeight: 400 }}>Hosted by:</span>
            <span style={{ color: "#00550A", fontSize: 20, fontFamily: "Inter", fontWeight: 700 }}> {event.hostedBy}</span>
          </div>

          <div style={{ alignSelf: "stretch", color: "black", fontSize: 20, fontFamily: "Inter", fontWeight: 400 }}>
            {event.description}
          </div>
        </div>

        {/* CTA */}
        <div style={{ width: 257, height: 59, left: 946, top: 254, position: "absolute" }}>
          <button className="btn-primary" style={{ width: "100%", height: 50, borderRadius: 10, position: "absolute", left: 0, top: 5 }}>
            View Details
          </button>
        </div>

        {/* When & Where */}
        <div style={{ width: 614, height: 64, left: 324, top: 251, position: "absolute", overflow: "hidden" }}>
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

        <div style={{ left: 300, top: 256, position: "absolute", display: "inline-flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: "#AEFFD2" }} aria-hidden />
          <div style={{ color: "#787878", fontSize: 20, fontFamily: "Inter", fontWeight: 400 }}>{event.when}</div>
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

  // Profile & EditProfile popups
  const [profileOpen, setProfileOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  // ConfirmDialog popup (reusable)
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  const confirmActionRef = useRef(() => {});

  const approvedClubs = useMemo(() => mockClubs.filter((c) => c.approved), []);
  const filteredClubs = useMemo(() => {
    const term = search.trim().toLowerCase();
    return approvedClubs.filter((c) => {
      const matchesText = term ? c.name.toLowerCase().includes(term) : true;
      const matchesCategory =
        category === "All Clubs" ? true : c.tag.toLowerCase() === category.toLowerCase();
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
      // await api.leaveClub(clubId);
      setConfirmOpen(false);
      // Optional: toast/refresh
    };
    setConfirmOpen(true);
  };

  // Navigate to Club Management (parent controls routing)
  const handleManageClub = useCallback(() => {
    setProfileOpen(false);
    navigate("/clubManage");
  }, [navigate]);

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
          <div style={{ position: "sticky", top: 0, zIndex: 20, alignSelf: "stretch", background: "#F8FAFC", boxShadow: "0px 1px 30px rgba(0, 0, 0, 0.19)" }}>
            <ScaleBox baseWidth={1440}>
              <div style={{ height: 120, position: "relative", width: 1440, margin: "0 auto" }}>
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
                    style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block" }}
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
                  <div style={{ width: 153, height: 50, display: "flex", alignItems: "center", justifyContent: "center", color: "#707070", fontSize: 40, fontFamily: "Inter", fontWeight: 500 }}>
                    Clubs
                  </div>
                  <div style={{ width: 2, height: 40, background: "#D0D0D0", borderRadius: 1 }} />
                  <div style={{ width: 153, height: 50, display: "flex", alignItems: "center", justifyContent: "center", color: "#707070", fontSize: 40, fontFamily: "Inter", fontWeight: 500 }}>
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

          {/* Search Section (scaled) */}
          <ScaleBox baseWidth={1282}>
            <div
              style={{
                width: 1282,
                height: 182,
                position: "relative",
                background: "white",
                boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.25)",
                overflow: "hidden",
                borderRadius: 15,
                margin: "0 auto",
              }}
            >
              <div style={{ width: 965, left: 158, top: 91, position: "absolute" }}>
                <div
                  style={{
                    width: 965,
                    position: "absolute",
                    left: 0,
                    top: -70,
                    textAlign: "center",
                    color: "black",
                    fontSize: 55,
                    fontFamily: "Inter",
                    fontWeight: 700,
                  }}
                >
                </div>

                {/* Input */}
                <div style={{ width: 965, height: 67, position: "absolute", left: 0, top: -1 }}>
                  <div
                    className="search-input-wrap"
                    style={{
                      width: "100%",
                      height: 57,
                      position: "absolute",
                      left: 0,
                      top: 1,
                      background: "white",
                      borderRadius: 8,
                      border: "2px #00550A solid",
                    }}
                  />
                  <div
                    style={{
                      width: 67,
                      height: 57,
                      position: "absolute",
                      left: 4,
                      top: 1,
                      borderRadius: 12,
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    aria-hidden
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        backgroundColor: "#00550A",
                        WebkitMaskImage: `url(${searchIcon})`,
                        maskImage: `url(${searchIcon})`,
                        WebkitMaskRepeat: "no-repeat",
                        maskRepeat: "no-repeat",
                        WebkitMaskPosition: "center",
                        maskPosition: "center",
                        WebkitMaskSize: "contain",
                        maskSize: "contain",
                      }}
                    />
                  </div>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search for clubs"
                    style={{
                      position: "absolute",
                      left: 75,
                      top: 6,
                      width: 870,
                      height: 45,
                      border: "none",
                      outline: "none",
                      fontFamily: "Inter",
                      fontWeight: 700,
                      fontSize: 17,
                      color: "#2A2A2A",
                      background: "transparent",
                    }}
                  />
                </div>
              </div>
            </div>
          </ScaleBox>

          {/* ===== Explore by Category ===== */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 13, width: "100%" }}>
            <div style={{ height: 14, textAlign: "center", display: "flex", alignItems: "flex-end", color: "black", fontSize: 40, fontFamily: "Inter", fontWeight: 700 }}>
            </div>

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
                      background: isActive ? "#00550A" : isAll ? "#00550A" : "white",
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
          <div style={{ width: "100%", maxWidth: 1282, padding: "0 8px", boxSizing: "border-box" }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 28,
                justifyContent: "center",
              }}
            >
              {filteredClubs.length === 0 ? (
                <div style={{ width: "100%", textAlign: "center", color: "#707070", fontFamily: "Inter", fontSize: 18 }}>
                  No clubs match your search.
                </div>
              ) : (
                filteredClubs.map((club) => <ClubCard key={club.id} club={club} onCardClick={setOpenClub} />)
              )}
            </div>
          </div>

          {/* Upcoming Events Header */}
          <div style={{ width: "100%", maxWidth: 1220, padding: 10, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ color: "black", fontFamily: "Inter", fontSize: 40, fontWeight: 700 }}>Upcoming Club Events</div>
          </div>

          {/* Events List (each scales to width) */}
          <div style={{ width: "100%", maxWidth: 1282, padding: "0 8px", display: "flex", flexDirection: "column", alignItems: "stretch", gap: 28, boxSizing: "border-box" }}>
            {mockEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          <div style={{ height: 40 }} />
        </div>
      </div>

      {/* Club details modal */}
      {openClub && <ClubModal club={openClub} onClose={() => setOpenClub(null)} />}

      {/* PROFILE popup */}
      <PopUpModals
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        baseW={598.92}
        baseH={814}
      >
        {/* onManageClub navigates to /clubManage */}
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
        <EditProfile onBack={() => { setEditOpen(false); setProfileOpen(true); }} />
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
