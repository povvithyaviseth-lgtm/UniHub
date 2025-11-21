// src/components/EditProfile.jsx
import React from "react";

export default function EditProfile({ onBack = () => {} }) {
  // Natural (design) size; PopUpModals will scale & center this.
  const baseW = 733;
  const baseH = 671;

  return (
    <div
      style={{
        width: baseW,
        height: baseH,
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 11,
        paddingBottom: 11,
        background: "white",
        overflow: "hidden",
        borderRadius: 20,
        display: "inline-flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        boxShadow: "0 10px 30px rgba(0,0,0,.06)",
      }}
    >
      <div
        style={{
          alignSelf: "stretch",
          height: baseH - 52, // 619 in your static design
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Title */}
        <div
          style={{
            width: 265,
            left: 0,
            top: 0,
            position: "absolute",
            color: "#00550A",
            fontSize: 34.92,
            fontWeight: 700,
            wordWrap: "break-word",
          }}
        >
          Edit Profile
        </div>

        {/* Back link (uses global styles) */}
        <button
          type="button"
          className="btn-link"
          onClick={onBack}
          style={{
            width: 239,
            height: 47,
            left: 446,
            top: 0,
            position: "absolute",
            textAlign: "right",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            color: "#707070",
            fontSize: 18,
            fontWeight: 400,
          }}
        >
          &lt; Back to Account Settings
        </button>

        {/* Divider */}
        <div
          style={{
            width: 685,
            height: 3,
            left: -6,
            top: 64,
            position: "absolute",
            background: "#E4E4E4",
          }}
        />

        {/* Change Username */}
        <div style={{ width: 680, height: 274, left: -1, top: 82.5, position: "absolute" }}>
          <div
            style={{
              width: 373,
              left: 0,
              top: 0,
              position: "absolute",
              color: "black",
              fontSize: 27,
              fontWeight: 700,
              wordWrap: "break-word",
            }}
          >
            Change Username
          </div>

          {/* Current Password (visual field) */}
          <div style={{ width: 674, height: 59, left: 5, top: 38, position: "absolute" }}>
            <div
              className="search-input-wrap"
              style={{
                width: 674,
                height: 50,
                left: 0,
                top: 5,
                position: "absolute",
                background: "white",
                borderRadius: 10.02,
                border: "1.5px #EEEEEE solid",
              }}
            />
            <div
              style={{
                width: 254.14,
                height: 50.08,
                left: 12,
                top: 5,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                color: "#707070",
                fontSize: 17,
                fontWeight: 700,
              }}
            >
              Current Password
            </div>
          </div>

          {/* New Username (visual field) */}
          <div style={{ width: 674, height: 59, left: 6, top: 92, position: "absolute" }}>
            <div
              className="search-input-wrap"
              style={{
                width: 674,
                height: 50,
                left: 0,
                top: 5,
                position: "absolute",
                background: "white",
                borderRadius: 10.02,
                border: "1.5px #EEEEEE solid",
              }}
            />
            <div
              style={{
                width: 254.14,
                height: 50.08,
                left: 12,
                top: 5,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                color: "#707070",
                fontSize: 17,
                fontWeight: 700,
              }}
            >
              New Username
            </div>
          </div>

          {/* Change Username CTA */}
          <div style={{ width: 674, height: 59, left: 6, top: 156, position: "absolute" }}>
            <button
              className="btn-primary"
              style={{
                width: 674,
                height: 50,
                position: "absolute",
                left: 0,
                top: 5,
                borderRadius: 10.02,
                background: "#B11919",
              }}
              onClick={() => alert("Change Username")}
            >
              <span style={{ fontSize: 25.04 }}>Change Username</span>
            </button>
          </div>
        </div>

        {/* Change Password */}
        <div style={{ width: 680, height: 274, left: 2, top: 322.5, position: "absolute" }}>
          <div
            style={{
              width: 243,
              left: 0,
              top: 0,
              position: "absolute",
              color: "black",
              fontSize: 27,
              fontWeight: 700,
              wordWrap: "break-word",
            }}
          >
            Change Password
          </div>

          {/* Current Password (visual field) */}
          <div style={{ width: 674, height: 59, left: 5, top: 38, position: "absolute" }}>
            <div
              className="search-input-wrap"
              style={{
                width: 674,
                height: 50,
                left: 0,
                top: 5,
                position: "absolute",
                background: "white",
                borderRadius: 10.02,
                border: "1.5px #EEEEEE solid",
              }}
            />
            <div
              style={{
                width: 254.14,
                height: 50.08,
                left: 12,
                top: 5,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                color: "#707070",
                fontSize: 17,
                fontWeight: 700,
              }}
            >
              Current Password
            </div>
          </div>

          {/* New Password (visual field) */}
          <div style={{ width: 674, height: 59, left: 6, top: 92, position: "absolute" }}>
            <div
              className="search-input-wrap"
              style={{
                width: 674,
                height: 50,
                left: 0,
                top: 5,
                position: "absolute",
                background: "white",
                borderRadius: 10.02,
                border: "1.5px #EEEEEE solid",
              }}
            />
            <div
              style={{
                width: 254.14,
                height: 50.08,
                left: 12,
                top: 5,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                color: "#707070",
                fontSize: 17,
                fontWeight: 700,
              }}
            >
              New Password
            </div>
          </div>

          {/* Confirm New Password (visual field) */}
          <div style={{ width: 674, height: 59, left: 5, top: 151, position: "absolute" }}>
            <div
              className="search-input-wrap"
              style={{
                width: 674,
                height: 50,
                left: 0,
                top: 5,
                position: "absolute",
                background: "white",
                borderRadius: 10.02,
                border: "1.5px #EEEEEE solid",
              }}
            />
            <div
              style={{
                width: 254.14,
                height: 50.08,
                left: 12,
                top: 5,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                color: "#707070",
                fontSize: 17,
                fontWeight: 700,
              }}
            >
              Confirm New Password
            </div>
          </div>

          {/* Change Password CTA */}
          <div style={{ width: 674, height: 59, left: 6, top: 215, position: "absolute" }}>
            <button
              className="btn-primary"
              style={{
                width: 674,
                height: 50,
                position: "absolute",
                left: 0,
                top: 5,
                borderRadius: 10.02,
                background: "#B11919",
              }}
              onClick={() => alert("Change Password")}
            >
              <span style={{ fontSize: 25.04 }}>Change Password</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
