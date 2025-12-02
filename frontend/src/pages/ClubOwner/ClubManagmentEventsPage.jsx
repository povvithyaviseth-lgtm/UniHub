// src/pages/ClubOwner/ClubManagmentEventsPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import PopUpModals from "../../component/PopUpModals.jsx";
import PostEventPopUp from "../../component/ClubOwnerComponent/PostEventPopUp.jsx";

export default function ClubManagmentEventsPage() {
  const navigate = useNavigate();

  const [showPost, setShowPost] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);
  const [editingEvent, setEditingEvent] = React.useState(null);

  // Placeholder data
  const events = [
    {
      id: "e1",
      title: "Monthly Valorant Tournament (Team of 5 Required)",
      hostedBy: "Esports Club",
      description:
        "Join us for our recurring competitive Valorant tournament...",
      when: "Thur, Oct 18 | 12:00 PM - 12:30 AM",
      location: "Discord Server",
      imageUrl: "https://placehold.co/480x270",
    },
  ];

  const openEdit = (ev) => {
    setEditingEvent(ev);
    setShowEdit(true);
  };

  return (
    <div style={{ width: "100%", minHeight: "100vh", background: "#F6F6F6", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: 1440, padding: 16, boxSizing: "border-box", display: "flex", flexWrap: "wrap", gap: 16, alignItems: "stretch" }}>
        {/* Sidebar */}
        <aside style={{ flex: "0 1 280px", minWidth: 260, background: "#fff", borderRadius: 12, boxShadow: "0 1px 0 rgba(0,0,0,.04)", overflow: "hidden" }}>
          <div style={{ padding: 16 }}>
            <div style={{ textAlign: "center", color: "#000", fontSize: 36, fontWeight: 700, marginBottom: 8 }}></div>

            <div style={{ color: "#707070", fontSize: 20, fontWeight: 700, paddingLeft: 8, marginBottom: 8 }}></div>
            <div style={{ display: "grid", gap: 8 }}>
              <button
                type="button"
                style={{ width: "100%", height: 41, borderRadius: 6, background: "rgba(0,85,10,0.56)", color: "#fff", fontWeight: 700, fontSize: 17 }}
                onClick={() => navigate("/clubManage")}
              >
                Manage Club &nbsp; 
              </button>
            </div>

            <div style={{ color: "#707070", fontSize: 20, fontWeight: 700, paddingLeft: 8, marginTop: 20, marginBottom: 8 }}>
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              <button
                type="button"
                style={{ width: "100%", height: 41, borderRadius: 6, background: "rgba(0,85,10,0.56)", color: "#fff", fontWeight: 700, fontSize: 17 }}
                onClick={() => {}}
              >
                Announcements &nbsp; &gt;
              </button>
              <button type="button" className="btn-primary" style={{ width: "100%", height: 41, borderRadius: 6, fontSize: 17 }}>
                Events &nbsp; &gt;
              </button>
            </div>

            <button
              type="button"
              onClick={() => window.history.back()}
              style={{ display: "block", margin: "14px auto 0", textAlign: "center", color: "#707070", fontSize: 18, background: "transparent", borderRadius: 6, padding: "10px 12px" }}
            >
              &lt; Back to Website
            </button>
          </div>
        </aside>

        {/* Main */}
        <section aria-label="Main content" style={{ flex: "1 1 600px", minWidth: 320, borderRadius: 12 }}>
          <header style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "8px 8px 0" }}>
            <div>
              <div style={{ color: "black", fontSize: 48, fontWeight: 700, lineHeight: 1.15 }}>Club Management Console</div>
              <div style={{ color: "#707070", fontSize: 40, fontWeight: 700, marginTop: 10 }}></div>
            </div>
            <button type="button" className="btn-primary" style={{ width: 244, height: 41, borderRadius: 6, fontSize: 17 }} onClick={() => setShowPost(true)}>
              Create New A Event
            </button>
          </header>

          <div style={{ padding: 20, display: "grid", gap: 20 }}>
            {events.map((ev) => (
              <article key={ev.id} style={{ position: "relative", background: "white", boxShadow: "0px 23px 32px rgba(0,0,0,0.17)", overflow: "hidden", borderRadius: 16.89, minHeight: 268, display: "flex" }}>
                <div style={{ width: 249, background: "#AEFFD2", overflow: "hidden", borderTopLeftRadius: 15.84, borderBottomLeftRadius: 15.84, position: "relative" }}>
                  <img src={ev.imageUrl} alt={`${ev.title} poster`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transform: "translateX(-12%)" }} />
                </div>
                <div style={{ width: 30, background: "white" }} />
                <div style={{ flex: 1, padding: "10px 16px 16px 16px", display: "flex", flexDirection: "column", gap: 6 }}>
                  <div style={{ color: "black", fontSize: 34, fontWeight: 700 }}>{ev.title}</div>
                  <div>
                    <span style={{ color: "#707070", fontSize: 17, fontWeight: 400 }}>Hosted by:</span>
                    <span style={{ color: "#00550A", fontSize: 17, fontWeight: 700 }}> {ev.hostedBy}</span>
                  </div>
                  <div style={{ color: "black", fontSize: 17 }}>{ev.description}</div>
                  <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                    <div>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                        <div style={{ width: 20, height: 20, borderRadius: 4, background: "#AEFFD2" }} />
                        <div style={{ color: "#707070", fontSize: 17 }}>{ev.when}</div>
                      </div>
                      <div style={{ color: "#707070", fontSize: 17 }}>Location: {ev.location}</div>
                    </div>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      <button type="button" className="btn-primary" style={{ minWidth: 216, height: 42, borderRadius: 8 }} onClick={() => {}}>
                        View RSVP’s
                      </button>
                      <button
                        type="button"
                        className="btn-primary"
                        style={{ minWidth: 216, height: 42, borderRadius: 8 }}
                        onClick={() => openEdit(ev)}
                      >
                        Edit Event
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* Post Event modal */}
      <PopUpModals open={showPost} onClose={() => setShowPost(false)} baseW={1058} baseH={921}>
        <PostEventPopUp
          title="Post Event"
          confirmText="Post Event"
          onCancel={() => setShowPost(false)}
          onCreate={() => setShowPost(false)}
        />
      </PopUpModals>

      {/* Edit Event modal (same dialog, different text + prefill) */}
      <PopUpModals open={showEdit} onClose={() => setShowEdit(false)} baseW={1058} baseH={921}>
        <PostEventPopUp
          title="Edit Event"
          confirmText="Save Changes"
          initial={{
            name: editingEvent?.title || "",
            location: editingEvent?.location || "",
            startTime: editingEvent?.when || "",
            tag: "", // no tag in sample data
            description: editingEvent?.description || "",
          }}
          onCancel={() => setShowEdit(false)}
          onCreate={() => setShowEdit(false)}
        />
      </PopUpModals>
    </div>
  );
}
