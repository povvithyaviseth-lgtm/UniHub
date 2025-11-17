import React, { useMemo, useState } from "react";
import siteLogo from "../../images/UniHubLogo.png";
import bellIcon from "../../images/Bell.png";
import profileIcon from "../../images/Profile.png";
import searchIcon from "../../images/Search.png";

/** ----------------------------------------------------------------
 * Mock Data (replace with real API later)
 * - Clubs: only show items with approved === true
 * - Events: show all
 * ---------------------------------------------------------------- */
const mockClubs = [
  {
    id: "c1",
    name: "The Robotics Team",
    tag: "Tech",
    description:
      "Do you enjoy robots? Do you enjoy coding? Or do you just enjoy tech? Join us for builds, competitions, and fun!",
    imageUrl: null,
    approved: true,
  },
  {
    id: "c2",
    name: "Basketball Club",
    tag: "Sports",
    description:
      "Pickup games, drills, and tournaments. All skill levels welcome.",
    imageUrl: null,
    approved: true,
  },
  {
    id: "c3",
    name: "Outdoor Adventure Club",
    tag: "Volunteering",
    description:
      "Trail care days and community cleanups—give back while outdoors.",
    imageUrl: null,
    approved: true,
  },
  {
    id: "c4",
    name: "Movie Watchers Club",
    tag: "Casual",
    description:
      "Weekly screenings and lively (friendly!) debates. Popcorn provided.",
    imageUrl: null,
    approved: true,
  },
  {
    id: "c5",
    name: "Competitive Programming",
    tag: "Coding",
    description:
      "Sharpen your problem-solving with contests and interview prep.",
    imageUrl: null,
    approved: true,
  },
  {
    id: "c6",
    name: "Art Collective",
    tag: "Art",
    description:
      "Open studios, critiques, and gallery trips—create and share.",
    imageUrl: null,
    approved: true,
  },
  {
    id: "c7",
    name: "Social Hour",
    tag: "Social",
    description:
      "Meet people, board games, and campus hangouts every Friday.",
    imageUrl: null,
    approved: true,
  },
  {
    id: "c8",
    name: "Academic Research Circle",
    tag: "Academic",
    description:
      "Journal clubs, reading groups, and faculty Q&A sessions.",
    imageUrl: null,
    approved: true,
  },
];

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

/** ----------------------------------------------------------------
 * Light-green placeholder “image”
 * ---------------------------------------------------------------- */
const PlaceholderImage = ({ width, height, style = {} }) => (
  <div
    style={{
      width,
      height,
      background: "#AEFFD2",
      borderRadius: 18.8,
      ...style,
    }}
  />
);

/** ----------------------------------------------------------------
 * Club Card
 * ---------------------------------------------------------------- */
const ClubCard = ({ club }) => {
  return (
    <div
      style={{
        width: 388,
        height: 578,
        position: "relative",
        background: "white",
        boxShadow: "0px 27px 38px rgba(0, 0, 0, 0.17)",
        overflow: "hidden",
        borderRadius: 20,
      }}
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
          <img
            src={club.imageUrl}
            alt={`${club.name} cover`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
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
          {club.name}
        </div>

        <div style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
          <div
            style={{
              color: "#707070",
              fontSize: 20,
              fontFamily: "Inter",
              fontWeight: 400,
            }}
          >
            Category:
          </div>
          <div
            style={{
              color: "#00550A",
              fontSize: 20,
              fontFamily: "Inter",
              fontWeight: 700,
            }}
          >
            {club.tag}
          </div>
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
          {club.description}
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          width: 332,
          height: 2.5,
          left: 24,
          top: 485,
          position: "absolute",
          background: "#B7B7B7",
        }}
      />

      {/* Button */}
      <div style={{ width: 257, height: 59, left: 61, top: 500, position: "absolute" }}>
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
          onClick={() => {
            // TODO: navigate(`/clubs/${club.id}`)
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

/** ----------------------------------------------------------------
 * Event Card
 * ---------------------------------------------------------------- */
const EventCard = ({ event }) => {
  return (
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
      {/* Left “image” */}
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

      {/* White strip overlay (original look) */}
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
            {" "}{event.hostedBy}
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
      <div style={{ width: 257, height: 59, left: 946, top: 254, position: "absolute" }}>
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
          onClick={() => {
            // TODO: navigate(`/events/${event.id}`)
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
  );
};

/** ----------------------------------------------------------------
 * Categories
 * ---------------------------------------------------------------- */
const CATEGORIES = [
  "All Clubs",
  "Academic",
  "Sports",
  "Creative",
  "Social",
  "Volunteering",
  "Tech",
  "Casual",
  "Competitive",
  "Coding",
  "Fun",
  "Art",
  "Fitness",
];

/** ----------------------------------------------------------------
 * Page
 * ---------------------------------------------------------------- */
const HomePage = () => {
  // Search + Category filter
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Clubs");

  const approvedClubs = useMemo(
    () => mockClubs.filter((c) => c.approved),
    []
  );

  const filteredClubs = useMemo(() => {
    const term = search.trim().toLowerCase();
    return approvedClubs.filter((c) => {
      const matchesText = term ? c.name.toLowerCase().includes(term) : true;
      const matchesCategory =
        category === "All Clubs" ? true : c.tag.toLowerCase() === category.toLowerCase();
      return matchesText && matchesCategory;
    });
  }, [approvedClubs, search, category]);

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
          padding: 10,
          display: "inline-flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 10,
          width: "100%",
          maxWidth: 1500,
        }}
      >
        <div
          style={{
            width: 1440,
            background: "#F8FAFC",
            overflow: "visible",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 40,
          }}
        >
          {/* ===== Sticky Header ===== */}
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
            <div
              style={{
                height: 120,            // Taller header to comfortably fit larger logo
                position: "relative",
                maxWidth: 1440,
                margin: "0 auto",
              }}
            >
              {/* Left Logo (centered inside its box) */}
              <div
                style={{
                  position: "absolute",
                  left: 33,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 360,          // The frame/box width for your logo
                  height: 260,         // The frame/box height for your logo
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
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

              {/* Center Tabs (Clubs | divider | Events) perfectly centered */}
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

              {/* Right: notifications button */}
              <div
                className="icon-button"
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
              >
                {/* Notification icon — bigger + green via mask */}
                <div
                  className="icon-mask"
                  aria-label="Notifications"
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
                />
              </div>

              {/* Right: profile chip */}
              <div
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
              >
                <div
                  style={{
                    width: 135,
                    height: 44,
                    left: 62,
                    top: 10,
                    position: "absolute",
                    textAlign: "center",
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
                    left: 11,
                    top: 4, // vertically center the 56px circle in a 64px container
                    position: "absolute",
                    overflow: "hidden",
                    borderRadius: 100,
                    background: "rgba(230, 224, 233, 0.10)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  aria-label="Avatar"
                >
                  {/* Profile icon — bigger + green via mask */}
                  <div
                    className="icon-mask"
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
                  />
                </div>
              </div>
            </div>
          </div>
          {/* ===== End Sticky Header ===== */}

          {/* Search Box (typeable input) */}
          <div
            style={{
              width: 1282,
              height: 182,
              position: "relative",
              background: "white",
              boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.25)",
              overflow: "hidden",
              borderRadius: 15,
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
                Search Clubs
              </div>

              {/* Input */}
              <div
                className="search-input-wrap"
                style={{ width: 965, height: 67, position: "absolute", left: 0, top: -1 }}
              >
                <div
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
                  {/* Search icon — green via mask */}
                  <div
                    className="icon-mask"
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
                  placeholder="Search for clubs by name"
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

          {/* ===== Explore by Category ===== */}
          <div
            style={{
              height: "auto",
              minHeight: 120,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 13,
            }}
          >
            <div
              style={{
                height: 74,
                textAlign: "center",
                display: "flex",
                alignItems: "flex-end",
                color: "black",
                fontSize: 40,
                fontFamily: "Inter",
                fontWeight: 700,
              }}
            >
              Explore by Category
            </div>

            <div
              style={{
                width: "100%",
                maxWidth: 1282,
                paddingTop: 12,
                paddingBottom: 12,
                overflow: "hidden",
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
                flexWrap: "wrap",
                alignContent: "center",
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
                      width: 156,
                      height: 50,
                      position: "relative",
                      borderRadius: 25,
                      border: "1px rgba(0, 0, 0, 0.21) solid",
                      background: isActive
                        ? "#00550A"
                        : isAll
                        ? "#00550A"
                        : "white",
                      color: isActive || isAll ? "white" : "black",
                      fontSize: 24,
                      fontFamily: "Inter",
                      fontWeight: 400,
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

          {/* Clubs Grid */}
          <div
            style={{
              width: 1282,
              paddingLeft: 16,
              paddingRight: 16,
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                width: 1260,
                display: "flex",
                flexWrap: "wrap",
                alignContent: "flex-start",
                gap: 28,
                paddingLeft: 15,
                paddingRight: 15,
              }}
            >
              {filteredClubs.length === 0 ? (
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
                filteredClubs.map((club) => <ClubCard key={club.id} club={club} />)
              )}
            </div>
          </div>

          {/* Upcoming Events Header */}
          <div
            style={{
              width: 1220,
              padding: 10,
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                color: "black",
                fontSize: 40,
                fontFamily: "Inter",
                fontWeight: 700,
              }}
            >
              Upcoming Club Events
            </div>
          </div>

          {/* Events List */}
          <div
            style={{
              width: 1282,
              paddingLeft: 16,
              paddingRight: 16,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 28,
            }}
          >
            {mockEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          <div style={{ height: 40 }} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
