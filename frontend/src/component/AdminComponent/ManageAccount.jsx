import { useState, useEffect } from "react";
import { ConfirmDeleteStudent } from "../ConfimButton.jsx";

export default function ManageAccount() {
  const [students, setStudents] = useState([]);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [updatingRoleIds, setUpdatingRoleIds] = useState([]);

  // Fetch students once
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`/api/admins/getStudents`);
        if (!response.ok) {
          const txt = await response.text();
          throw new Error(`Failed to fetch students: ${response.status} ${txt}`);
        }
        const result = await response.json();
        setStudents(Array.isArray(result) ? result : []);
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    };

    fetchStudents();
  }, []);

  // Delete student
  const handleDeleteStudent = async (id) => {
    try {
      const response = await fetch(`/api/admins/deleteStudent/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const txt = await response.text();
        throw new Error(`Server error: ${response.status} ${txt}`);
      }

      setStudents((prev) => prev.filter((s) => s._id !== id));
      setStudentToDelete(null);
    } catch (err) {
      console.error("Error deleting student:", err.message);
    }
  };

  // Toggle role
  const handleToggleRole = async (student) => {
    const id = student._id;
    const currentRole = student.role || "student";
    const newRole = currentRole === "club owner" ? "student" : "club owner";

    // Optimistic update
    setStudents((prev) =>
      prev.map((s) => (s._id === id ? { ...s, role: newRole } : s))
    );
    setUpdatingRoleIds((prev) => [...prev, id]);

    try {
      const res = await fetch(`/api/admins/updateStudentRole/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      if (!res.ok) throw new Error("Failed to update role");

      const data = await res.json();
      if (data?.student) {
        setStudents((prev) =>
          prev.map((s) => (s._id === id ? data.student : s))
        );
      }
    } catch (err) {
      console.error("Failed to update role:", err);
      // rollback on failure
      setStudents((prev) =>
        prev.map((s) =>
          s._id === id ? { ...s, role: currentRole } : s
        )
      );
    } finally {
      setUpdatingRoleIds((prev) => prev.filter((x) => x !== id));
    }
  };

  return (
    <main
      style={{
        margin: "40px 0",
        padding: "0 24px 60px",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Inter", system-ui, sans-serif',
        color: "#111827",
      }}
    >
      <header style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0 }}>
          Manage Accounts
        </h1>
        <p style={{ margin: 0, fontSize: 14, color: "#6B7280" }}>
        </p>
      </header>

      {/* Student list */}
      <section style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {students.map((student) => {
          const isUpdating = updatingRoleIds.includes(student._id);

          return (
            <article
              key={student._id}
              style={{
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: 22,
                padding: "18px 22px",
                display: "grid",
                gridTemplateColumns: "1fr 180px 140px", // ← PERFECT UNIFORM ALIGNMENT
                alignItems: "center",
                width: 1180,
                columnGap: 20,
                boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                transition: "transform 0.16s ease, box-shadow 0.16s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 10px 24px rgba(15,23,42,0.14)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.06)";
              }}
            >
              {/* LEFT COLUMN — USERNAME */}
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {student.userName || student.email || "Unknown User"}
              </div>

              {/* MIDDLE COLUMN — ROLE BADGE */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div
                  onClick={() => !updatingRoleIds.includes(student._id) && handleToggleRole(student)}
                  style={{
                    background:
                      student.role === "club owner" ? "#166534" : "#176b2b",
                    color: "white",
                    padding: "8px 18px",
                    borderRadius: 20,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: updatingRoleIds.includes(student._id) ? "wait" : "pointer",
                    opacity: updatingRoleIds.includes(student._id) ? 0.6 : 1,
                    transition: "background 0.15s ease",
                    userSelect: "none",
                  }}
                  title={`Click to ${
                    student.role === "club owner"
                      ? "demote to student"
                      : "promote to club owner"
                  }`}
                >
                  {student.role || "student"}
                </div>
              </div>

              {/* RIGHT COLUMN — DELETE BUTTON */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  style={{
                    padding: "8px 16px",
                    borderRadius: 999,
                    border: "1px solid #FCA5A5",
                    background: "#FEF2F2",
                    color: "#B91C1C",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                  onClick={() => setStudentToDelete(student._id)}
                >
                  Delete User
                </button>
              </div>
            </article>

          );
        })}

        {students.length === 0 && (
          <p
            style={{
              fontSize: 14,
              color: "#9CA3AF",
            }}
          >
            No users found.
          </p>
        )}
      </section>

      {studentToDelete && (
        <ConfirmDeleteStudent
          onConfirm={() => handleDeleteStudent(studentToDelete)}
          onCancel={() => setStudentToDelete(null)}
        />
      )}
    </main>
  );
}
