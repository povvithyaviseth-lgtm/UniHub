// src/component/StudentComponent/ClubCard.jsx
import React, { useEffect, useState } from "react";

/**
 * Reusable club card used in:
 * - Owner console (default, variant="owner")
 * - Student homepage (variant="student")
 * - Admin approval (variant="admin")
 *
 * Common props:
 * - club        (object): club data (expects name, description, tag, status, image/imageUrl)
 * - onCardClick (function): when the card background is clicked
 * - onMoreClick (function, optional): owner variant, "More" button; falls back to onCardClick
 *
 * Student variant extra props:
 * - onJoin   (function): async join handler, should return true/false
 * - isJoined (boolean): whether the current student has already joined this club
 *
 * Admin variant extra props:
 * - onAdminDecision (function): called with "approved" or "denied"
 *
 * variant:
 * - "owner"   → owner console card (status pill + More)
 * - "student" → homepage card with Join / Confirm / Cancel / Joined! flow
 * - "admin"   → admin approval card with Approve / Deny buttons + fade-out
 */
const ClubCard = ({
  club,
  onCardClick,
  onMoreClick,
  onJoin,
  isJoined,
  variant = "owner",
  onAdminDecision,
}) => {
  const [hovered, setHovered] = useState(false);

  // student/homepage join state
  const [joinState, setJoinState] = useState(isJoined ? "joined" : "idle"); // 'idle' | 'confirm' | 'joined'

  // admin approve/deny state
  const [adminActionState, setAdminActionState] = useState("idle"); // 'idle' | 'approved' | 'denied'
  const [isRemoving, setIsRemoving] = useState(false); // for fade-out after approve/deny

  useEffect(() => {
    setJoinState(isJoined ? "joined" : "idle");
  }, [isJoined]);

  // Prefer imageUrl if provided (Home/Admin/Owner can inject it), fallback to image field
  const imageSrc = club.imageUrl || club.image || null;

  const isPending = club.status === "pending";

  const handleCardClick = () => {
    if (onCardClick) onCardClick(club);
  };

  const handleMoreClick = (e) => {
    e.stopPropagation();
    if (onMoreClick) onMoreClick(club._id);
    else if (onCardClick) onCardClick(club);
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);

    // Homepage behavior: if user had clicked "Join" but left the card
    // before confirming, reset back to "idle" so it shows Join again next time.
    if (variant === "student" && joinState === "confirm" && !isJoined) {
      setJoinState("idle");
    }
  };

  /* ------------------------------------------------------------------
   * STUDENT / HOMEPAGE VARIANT
   * ------------------------------------------------------------------ */
  if (variant === "student") {
    // Split tags by comma for display; empty tags => show nothing
    const rawTag = club.tag || "";
    const tagLines = rawTag
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const handleJoinClick = (e) => {
      e.stopPropagation();
      setJoinState("confirm");
    };

    const handleLetsGoClick = async (e) => {
      e.stopPropagation();

      if (!onJoin) {
        setJoinState("joined");
        return;
      }

      const ok = await onJoin(club);
      if (ok) {
        setJoinState("joined");
      } else {
        setJoinState("idle");
      }
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
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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
              // same dark green shade as the rest of the app
              background: "#00550A",
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

        {/* Hover overlay (fades in + moves up) */}
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
              opacity: 0,
              animation: "cdFadeUpList 0.28s ease-out",
              animationFillMode: "forwards",
            }}
            onClick={(e) => e.stopPropagation()}
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
                        color: "#00550A",
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
              ></span>

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
                      background: "#00550A",
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
                        background: "#00550A",
                        color: "white",
                        fontWeight: 500,
                        fontSize: 25,
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Let's go!
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
                    Joined!
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </article>
    );
  }

  /* ------------------------------------------------------------------
   * ADMIN / APPROVAL VARIANT
   * ------------------------------------------------------------------ */
  if (variant === "admin") {
    const rawTag = club.tag || "";
    const tagLines = rawTag
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    // tweak these two to control timing:
    const VISIBLE_MS = 1200; // how long to show "Club approved/denied!"
    const FADE_MS = 350;     // should match opacity transition below

    const triggerAdminDecision = (decision) => {
      // decision: "approved" | "denied"
      setAdminActionState(decision);

      // Show "Club approved/denied!" for a bit
      setTimeout(() => {
        // start fade-out
        setIsRemoving(true);
      }, VISIBLE_MS);

      // After fade-out, notify parent so it can remove/refetch
      if (onAdminDecision) {
        setTimeout(() => {
          onAdminDecision(decision);
        }, VISIBLE_MS + FADE_MS);
      }
    };

    const handleApproveClick = (e) => {
      e.stopPropagation();
      if (adminActionState !== "idle") return; // prevent double-click
      triggerAdminDecision("approved");
    };

    const handleDenyClick = (e) => {
      e.stopPropagation();
      if (adminActionState !== "idle") return;
      triggerAdminDecision("denied");
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
          transform: hovered ? "translateY(-2px)" : "translateY(0)",
          minHeight: 320,
          width: "100%",
          maxWidth: 430,

          // fade-out bits:
          opacity: isRemoving ? 0 : 1,
          pointerEvents: isRemoving ? "none" : "auto",
          transition:
            "transform 0.18s ease, box-shadow 0.18s ease, opacity 0.35s ease",
        }}
        aria-label={`${club.name} card`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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

        {/* Hover overlay (fades in + moves up OR stays after decision) */}
        {(hovered || adminActionState !== "idle") && (
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
              opacity: 0,
              animation: "cdFadeUpList 0.28s ease-out",
              animationFillMode: "forwards",
            }}
            onClick={(e) => e.stopPropagation()}
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
                  {tagLines.map((t) => (
                    <span
                      key={t}
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
                      #{t}
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

            {/* Footer: approve / deny buttons or confirmation */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 8,
              }}
            >
              {adminActionState === "idle" && (
                <>
                  <button
                    onClick={handleDenyClick}
                    style={{
                      padding: "9px 20px",
                      borderRadius: 999,
                      border: "1px solid #F87171",
                      background: "#FEF2F2",
                      color: "#B91C1C",
                      fontWeight: 500,
                      fontSize: 18,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Deny
                  </button>

                  <button
                    onClick={handleApproveClick}
                    style={{
                      padding: "9px 30px",
                      borderRadius: 999,
                      border: "none",
                      background: "#0D6C30",
                      color: "white",
                      fontWeight: 500,
                      fontSize: 18,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Approve
                  </button>
                </>
              )}

              {adminActionState === "approved" && (
                <span
                  style={{
                    padding: "9px 24px",
                    borderRadius: 999,
                    background: "#DCFCE7",
                    color: "#166534",
                    fontWeight: 600,
                    fontSize: 16,
                    whiteSpace: "nowrap",
                  }}
                >
                  Club approved!
                </span>
              )}

              {adminActionState === "denied" && (
                <span
                  style={{
                    padding: "9px 24px",
                    borderRadius: 999,
                    background: "#FEF2F2",
                    color: "#B91C1C",
                    fontWeight: 600,
                    fontSize: 16,
                    whiteSpace: "nowrap",
                  }}
                >
                  Club denied!
                </span>
              )}
            </div>
          </div>
        )}
      </article>
    );
  }

  /* ------------------------------------------------------------------
   * OWNER / CONSOLE VARIANT (original card + animated overlay)
   * ------------------------------------------------------------------ */

  // Split tags by comma and put each on its own line
  const rawTag = club.tag || "No tag";
  const tagLines = rawTag
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <article
      className="club-card club-card--owner"
      aria-label={`${club.name} card`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      style={{
        transition: "transform 0.18s ease, box-shadow 0.18s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
      }}
    >
      {/* Base content: image + name */}
      <div className="club-card-main">
        <div className="club-card-cover">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={`${club.name} cover`}
              className="club-card-cover-image"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <span className="club-card-cover-placeholder">
              No image uploaded
            </span>
          )}
        </div>

        <div className="club-card-title-wrap">
          <div className="club-card-title">{club.name}</div>
        </div>
      </div>

      {/* Hover overlay (fades in + moves up) */}
      {hovered && (
        <div
          className="club-card-overlay"
          style={{
            opacity: 0,
            animation: "cdFadeUpList 0.28s ease-out",
            animationFillMode: "forwards",
          }}
          onClick={(e) => e.stopPropagation()} // prevent triggering onCardClick
        >
          {/* Tag + Status row */}
          <div className="club-card-overlay-top">
            <div className="club-card-tags">
              {tagLines.length > 0 ? (
                tagLines.map((tag, idx) => (
                  <span key={idx} className="club-card-tag-line">
                    {tag}
                    {idx < tagLines.length - 1 ? "," : ""}
                  </span>
                ))
              ) : (
                <span>No tag</span>
              )}
            </div>

            <div
              className={
                "club-card-status-pill " +
                (isPending
                  ? "club-card-status-pill--pending"
                  : "club-card-status-pill--approved")
              }
            >
              {isPending ? "Pending approval" : "Approved"}
            </div>
          </div>

          {/* Scrollable description */}
          <div className="club-card-overlay-description">
            {club.description || "No description provided."}
          </div>

          {/* Footer button */}
          <div className="club-card-overlay-footer">
            <button
              type="button"
              className="btn-primary club-card-more-btn"
              onClick={handleMoreClick}
            >
              More
            </button>
          </div>
        </div>
      )}
    </article>
  );
};

export default ClubCard;
