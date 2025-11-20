import { useNavigate } from 'react-router-dom';
import { useState } from "react";

export default function Index() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert(`Password recovery email sent to: ${email}`);
      setEmail("");
      // In a real app, you'd likely close the modal here or show a success message
    }, 1000);
  };

  const handleClose = () => {
    navigate("/");
  };

    const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#F8FAFC", // A light background color
        padding: "20px", // Some padding around the modal
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px", // Adjusted max-width to better fit the image proportions
          background: "white",
          borderRadius: "15px", // Match image border radius
          padding: "50px", // Match image padding
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.25)", // Subtle shadow
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start", // Align items to start for the label/input
          gap: "40px", // Spacing between title, input group, and buttons
          boxSizing: "border-box", // Ensure padding doesn't add to total width
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontSize: "65px", // Larger font size for the title as per image
            fontFamily: "Inter, sans-serif", // Using Inter as in HomePage
            fontWeight: 700,
            color: "black",
            margin: "0", // Reset default margin
            alignSelf: "center", // Center the title explicitly
            textAlign: "center", // Ensure text is centered
            width: "100%", // Take full width for centering
          }}
        >
          Password Recovery
        </h1>

        <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "30px" }}>
          {/* Email Input Group */}
          <div>
            <label
              htmlFor="recovery-email"
              style={{
                display: "block",
                color: "black",
                fontSize: "24px", // Label font size
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                marginBottom: "15px", // Space between label and input
              }}
            >
              Enter Your Email
            </label>
            <input
              id="recovery-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              style={{
                width: "100%",
                padding: "18px 20px", // Larger padding for input
                fontSize: "22px", // Input text size
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                borderRadius: "8px", // Input border radius
                border: "2px #ccc solid", // Light gray border
                boxSizing: "border-box",
                outline: "none", // Remove default outline
                // Focus styles (can be added with a pseudo-class or JavaScript for inline styles)
                // For a simpler inline approach, we'll keep it as is, but consider CSS classes for focus
              }}
            />
          </div>

          {/* Buttons Row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "30px", // Space between buttons
              paddingTop: "20px", // Space above buttons
            }}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              style={{
                flex: 1, // Allow buttons to grow and take equal space
                height: "70px", // Button height
                borderRadius: "8px", // Button border radius
                background: "#E1E1E3", // Light gray background
                color: "#6B6767", // Dark gray text
                fontSize: "32px", // Button text size
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.2s ease", // Smooth transition for hover
                // Hover effect (inline styles don't directly support :hover, usually done with CSS classes or JS event listeners)
                // For simplicity, we'll omit dynamic hover in inline styles, but a real app would have it.
              }}
            >
              Close
            </button>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting} // Keep disabled state from previous code
              style={{
                flex: 1,
                height: "70px",
                borderRadius: "8px",
                background: "#2E550A", // Dark green background
                color: "white",
                fontSize: "32px",
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                border: "none",
                cursor: isSubmitting ? "not-allowed" : "pointer", // Change cursor when disabled
                opacity: isSubmitting ? 0.7 : 1, // Reduce opacity when submitting
                transition: "background-color 0.2s ease, opacity 0.2s ease",
              }}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}