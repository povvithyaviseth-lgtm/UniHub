//Club
const confirmJoinClub = () => {}
const confirmLeaveClub = () => {}
const confirmKickMember = () => {}

//Event
const confirmRSVP = () => {}
const confirmDeleteEvent = () => {}
const confirmCreateEvent = () => {}


//Annoucement
const confirmCreateAnnoucement = () => {}
const confirmDeleteAnnoucement = () => {}

//Admin
export const ConfirmApproveClub = ({ onCancel, onConfirm }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2000,
      }}
    >
      <div
        style={{
          width: 696,
          height: 337,
          position: "relative",
          background: "white",
          overflow: "hidden",
          borderRadius: 17,
        }}
      >
        <div
          style={{
            width: 654,
            height: 88,
            left: 24,
            top: 93,
            position: "absolute",
            color: "black",
            fontSize: 36,
            fontFamily: "Inter",
            fontWeight: "700",
            wordWrap: "break-word",
          }}
        >
          Are you sure you want to APPROVE this club?
        </div>

        {/* Cancel */}
        <div
          style={{
            width: 235,
            height: 69,
            left: 73,
            top: 218,
            position: "absolute",
            cursor: "pointer",
          }}
          onClick={onCancel}
        >
          <div
            style={{
              width: 235,
              height: 65,
              left: 0,
              top: 2,
              position: "absolute",
              background: "#E1E1E3",
              borderRadius: 8,
            }}
          />
          <div
            style={{
              width: 235,
              height: 65,
              left: 0,
              top: 2,
              position: "absolute",
              textAlign: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              color: "#6B6767",
              fontSize: 32,
              fontFamily: "Inter",
              fontWeight: "700",
              wordWrap: "break-word",
            }}
          >
            Cancel
          </div>
        </div>

        {/* Confirm */}
        <div
          style={{
            width: 235,
            height: 69,
            left: 389,
            top: 218,
            position: "absolute",
            cursor: "pointer",
          }}
          onClick={onConfirm}
        >
          <div
            style={{
              width: 235,
              height: 65,
              left: 0,
              top: 4,
              position: "absolute",
              background: "#00550A",
              borderRadius: 8,
            }}
          />
          <div
            style={{
              width: 235,
              height: 65,
              left: 0,
              top: 4,
              position: "absolute",
              textAlign: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              color: "white",
              fontSize: 32,
              fontFamily: "Inter",
              fontWeight: "700",
              wordWrap: "break-word",
            }}
          >
            Yes, I’m Sure
          </div>
        </div>
      </div>
    </div>
  );
}

export const ConfirmDenyClub = ({ onCancel, onConfirm }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2000,
      }}
    >
      <div
        style={{
          width: 696,
          height: 337,
          position: "relative",
          background: "white",
          overflow: "hidden",
          borderRadius: 17,
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: 68,
            height: 68,
            left: 314,
            top: 17,
            position: "absolute",
          }}
        >
          <img
            style={{
              width: 68,
              height: 68,
              left: 0,
              top: 0,
              position: "absolute",
            }}
            src="https://placehold.co/68x68"
            alt="Warning"
          />
        </div>

        {/* Cancel button */}
        <div
          style={{
            width: 235,
            height: 69,
            left: 73,
            top: 218,
            position: "absolute",
            cursor: "pointer",
          }}
          onClick={onCancel}
        >
          <div
            style={{
              width: 235,
              height: 65,
              left: 0,
              top: 2,
              position: "absolute",
              background: "#E1E1E3",
              borderRadius: 8,
            }}
          />
          <div
            style={{
              width: 235,
              height: 65,
              left: 0,
              top: 2,
              position: "absolute",
              textAlign: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              color: "#6B6767",
              fontSize: 32,
              fontFamily: "Inter",
              fontWeight: "700",
              wordWrap: "break-word",
            }}
          >
            Cancel
          </div>
        </div>

        {/* Confirm button */}
        <div
          style={{
            width: 235,
            height: 69,
            left: 389,
            top: 218,
            position: "absolute",
            cursor: "pointer",
          }}
          onClick={onConfirm}
        >
          <div
            style={{
              width: 235,
              height: 65,
              left: 0,
              top: 4,
              position: "absolute",
              background: "#00550A",
              borderRadius: 8,
            }}
          />
          <div
            style={{
              width: 235,
              height: 65,
              left: 0,
              top: 4,
              position: "absolute",
              textAlign: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              color: "white",
              fontSize: 32,
              fontFamily: "Inter",
              fontWeight: "700",
              wordWrap: "break-word",
            }}
          >
            Yes, I’m Sure
          </div>
        </div>

        {/* Message */}
        <div
          style={{
            width: 654,
            height: 88,
            left: 24,
            top: 93,
            position: "absolute",
            color: "black",
            fontSize: 36,
            fontFamily: "Inter",
            fontWeight: "700",
            wordWrap: "break-word",
          }}
        >
          Are you sure you want to DENY this club?
        </div>
      </div>
    </div>
  );
}

const confirmBanUser = () => {}
export const ConfirmDeleteClub = ({ onConfirm, onCancel }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2000,
      }}
    >
      <div
        style={{
          width: 696,
          height: 337,
          position: "relative",
          background: "white",
          overflow: "hidden",
          borderRadius: 17,
        }}
      >
        {/* Icon */}
        <div style={{ width: 68, height: 68, left: 314, top: 17, position: "absolute" }}>
          <img
            style={{ width: 68, height: 68, position: "absolute" }}
            src="https://placehold.co/68x68"
            alt="Warning"
          />
        </div>

        {/* Message */}
        <div
          style={{
            width: 654,
            height: 88,
            left: 24,
            top: 93,
            position: "absolute",
            color: "black",
            fontSize: 36,
            fontFamily: "Inter",
            fontWeight: "700",
          }}
        >
          Are you sure you want to DELETE this club?
        </div>

        {/* Cancel button */}
        <div
          style={{
            width: 235,
            height: 69,
            left: 73,
            top: 218,
            position: "absolute",
            cursor: "pointer",
          }}
          onClick={onCancel}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "#E1E1E3",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: "700",
              color: "#6B6767",
            }}
          >
            Cancel
          </div>
        </div>

        {/* Confirm button */}
        <div
          style={{
            width: 235,
            height: 69,
            left: 389,
            top: 218,
            position: "absolute",
            cursor: "pointer",
          }}
          onClick={onConfirm}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "#00550A",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: "700",
              color: "white",
            }}
          >
            Yes, I’m Sure
          </div>
        </div>
      </div>
    </div>
  );
};