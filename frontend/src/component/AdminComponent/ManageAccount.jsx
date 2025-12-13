// src/component/AdminComponent/ManageAccount.jsx
import { useState, useEffect } from "react";
import ConfirmDeleteModal from "../ConfirmDeleteModal.jsx";
import "../../index.css"; // global fonts + animations

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
          throw new Error(
            `Failed to fetch students: ${response.status} ${txt}`
          );
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
        color: "#111827",
      }}
    >
      <header style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0 }}>
          Manage Accounts
        </h1>
        <p style={{ margin: 0, fontSize: 14, color: "#6B7280" }}></p>
      </header>

      {/* Student list */}
      <section style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {students.map((student, index) => {
          const isUpdating = updatingRoleIds.includes(student._id);

          return (
            <article
              key={student._id}
              className="cd-list-item-anim"
              style={{
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: 22,
                padding: "18px 22px",
                display: "grid",
                gridTemplateColumns: "1fr auto",
                alignItems: "center",
                width: 1150,
                boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                transition:
                  "transform 0.16s ease, box-shadow 0.16s ease, opacity 0.16s ease",
                animationDelay: `${index * 40}ms`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 10px 24px rgba(15,23,42,0.14)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(0,0,0,0.06)";
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

              {/* RIGHT COLUMN — BUTTON GROUP */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                {/* CHANGE ROLE BUTTON */}
                <button
                  onClick={() => !isUpdating && handleToggleRole(student)}
                  style={{
                    background:
                      student.role === "club owner" ? "#166534" : "#176b2b",
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: 999,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: isUpdating ? "wait" : "pointer",
                    border: "none",
                    opacity: isUpdating ? 0.6 : 1,
                    transition: "background 0.15s ease",
                    whiteSpace: "nowrap",
                  }}
                  title={`Click to ${
                    student.role === "club owner"
                      ? "demote to student"
                      : "promote to club owner"
                  }`}
                >
                  {student.role === "club owner" ? "club owner" : "student"}
                </button>

                {/* DELETE BUTTON */}
                <button
                  style={{
                    padding: "8px 16px",
                    borderRadius: 999,
                    border: "1px solid #FCA5A5",
                    background: "#FEF2F2",
                    color: "#B91C1C",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
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

      {/* Reusable delete confirmation modal */}
      {studentToDelete && (
        <ConfirmDeleteModal
          title="Delete user"
          message="Are you sure you want to delete this user? This action cannot be undone."
          confirmLabel="Delete user"
          cancelLabel="Cancel"
          onConfirm={() => handleDeleteStudent(studentToDelete)}
          onCancel={() => setStudentToDelete(null)}
        />
      )}
    </main>
  );
}
