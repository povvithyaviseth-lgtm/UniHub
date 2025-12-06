import { useState, useEffect, useRef } from "react";
import {
  container,
  header,
  headerText,
  listContainer,
  row,
  clubName,
  deleteButton,
  divider,
} from "../../style/AdminDeleteStyle.jsx";
import { ConfirmDeleteStudent } from "../ConfimButton.jsx";

export default function ManageAccount() {
  const [students, setStudents] = useState([]);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [updatingRoleIds, setUpdatingRoleIds] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // Use relative path so the dev server proxy (if used) forwards to backend
        const response = await fetch(`/api/admins/getStudents`);
        if (!response.ok) {
          const txt = await response.text();
          throw new Error(`Failed to fetch students: ${response.status} ${txt}`);
        }
        const result = await response.json();
        // backend returns an array of students
        setStudents(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  const handleDeleteStudent = async (id) => {
    try {
      // backend route is mounted under /api/admins -> DELETE /deleteStudent/:id
      const response = await fetch(`/api/admins/deleteStudent/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status}\n${errorText}`);
      }
      setStudents((prevStudents) => prevStudents.filter((student) => student._id !== id));
      setStudentToDelete(null);
    } catch (err) {
      console.error("Error deleting student:", err.message);
    }
  };

  const handleToggleRole = async (student) => {
    const id = student._id;
    const currentRole = student.role || 'student';
    const newRole = currentRole === 'club owner' ? 'student' : 'club owner';

    // Optimistic UI update
    setStudents((prev) => prev.map((s) => (s._id === id ? { ...s, role: newRole } : s)));
    setUpdatingRoleIds((prev) => [...prev, id]);

    try {
      const res = await fetch(`/api/admins/updateStudentRole/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Server returned ${res.status}: ${txt}`);
      }

      const data = await res.json();
      // sync with authoritative server response
      if (data && data.student) {
        setStudents((prev) => prev.map((s) => (s._id === id ? data.student : s)));
      }
    } catch (err) {
      console.error('Failed to update role:', err);
      // revert optimistic change on error
      setStudents((prev) => prev.map((s) => (s._id === id ? { ...s, role: currentRole } : s)));
    } finally {
      setUpdatingRoleIds((prev) => prev.filter((x) => x !== id));
    }
  };

  // Local role badge style (do not modify shared AdminDeleteStyle.jsx as requested)
  const roleBadgeStyle = {
    background: '#176b2b',
    color: '#ffffff',
    padding: '8px 18px',
    borderRadius: 8,
    fontWeight: 700,
    fontSize: 14,
    display: 'flex',
    boxShadow: '0 2px 0 rgba(0,0,0,0.08)',
    // Horizontal shift (x offset) — change this value to move the badge left/right.
    // Positive moves right, negative moves left. Adjust as needed to align under header.
    transform: 'translateX(-6px)'
  };

  // Column wrapper styles (local only) to ensure items align under the header
  const usernameColStyle = { display: 'flex', alignItems: 'center', height: '68px' };
  const roleColStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '68px' };
  const actionColStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '68px' };

  // Ref for the Roles header — used by alignment logic (kept local, non-invasive)
  const rolesHeaderRef = useRef(null);

  // Inner row container to neutralize absolute styles from shared CSS and align columns
  const rowInnerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '0 27px',
    boxSizing: 'border-box',
  };

  // Local replacements for absolutely-positioned shared styles
  const usernameTextStyle = {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Inter',
    fontWeight: 700,
  };

  const deleteButtonLocal = {
    color: '#BF0000',
    fontSize: 20,
    fontFamily: 'Inter',
    fontWeight: 700,
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    height: 34,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 12px',
  };

  return (
    <div style={container}>
      {/* Header */}
      <div style={header}>
        <div style={headerText}>Club Name</div>
        <div style={headerText} ref={rolesHeaderRef}>Roles</div>
        <div style={headerText}>Actions</div>
      </div>

      {/* Student Rows */}
      <div style={listContainer}>
        {students.map((student) => (
          <div key={student._id} style={row}>
            <div style={rowInnerStyle}>
              <div style={usernameColStyle}>
                <div style={usernameTextStyle}>{student.userName || student.email || '—'}</div>
              </div>

              <div style={roleColStyle}>
                <div
                  role="button"
                  onClick={() => !updatingRoleIds.includes(student._id) && handleToggleRole(student)}
                  style={{
                    ...roleBadgeStyle,
                    cursor: updatingRoleIds.includes(student._id) ? 'wait' : 'pointer',
                    opacity: updatingRoleIds.includes(student._id) ? 0.7 : 1,
                  }}
                  title={`Click to ${student.role === 'club owner' ? 'demote to student' : 'promote to club owner'}`}>
                  {student.role || 'student'}
                </div>
              </div>

              <div style={actionColStyle}>
                <button
                  style={deleteButtonLocal}
                  onClick={() => setStudentToDelete(student._id)}
                >
                  Delete User
                </button>
              </div>
            </div>

            <div style={{ ...divider, top: 0 }} />
            <div style={{ ...divider, top: 68 }} />
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {studentToDelete && (
        <ConfirmDeleteStudent
          onConfirm={() => handleDeleteStudent(studentToDelete)}
          onCancel={() => setStudentToDelete(null)}
        />
      )}
    </div>
  );
}