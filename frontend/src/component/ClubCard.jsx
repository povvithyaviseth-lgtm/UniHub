import React from "react";

export default function ClubCard({ name, description, membersCount }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 12,
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        padding: 16,
        display: "grid",
        gap: 8,
      }}
    >
      <h3 style={{ fontFamily: "Inter, sans-serif", fontWeight: 700 }}>{name}</h3>
      <p style={{ color: "#707070" }}>{description}</p>
      <p style={{ fontSize: 13, color: "#444" }}>{membersCount} members</p>
    </div>
  );
}
