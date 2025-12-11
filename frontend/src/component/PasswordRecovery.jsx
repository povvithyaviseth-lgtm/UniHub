// src/component/PasswordRecoveryContent.jsx
import React from 'react';

// Styles for the content *inside* the PopUpModals wrapper
const formStyles = {
    card: {
        backgroundColor: '#ffffff',
        padding: '40px 30px',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
        maxWidth: '450px',
        width: '100%',
        textAlign: 'left',
    },
    title: {
        fontSize: '38px',
        fontWeight: 'bold',
        marginBottom: '40px',
        color: '#000000',
    },
    label: {
        fontSize: '18px',
        marginBottom: '8px',
        display: 'block',
        fontWeight: '600',
        color: '#000000',
    },
    input: {
        width: '100%',
        padding: '14px',
        marginBottom: '30px',
        border: '1px solid #ccc',
        borderRadius: '6px',
        fontSize: '18px',
        boxSizing: 'border-box',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '20px',
        marginTop: '30px',
    },
    closeButton: {
        flex: 1,
        padding: '14px 20px',
        backgroundColor: '#e0e0e0',
        color: '#000000',
        border: 'none',
        borderRadius: '8px',
        fontSize: '22px',
        fontWeight: 'bold',
        cursor: 'pointer',
        minWidth: '120px',
    },
    submitButton: {
        flex: 1,
        padding: '14px 20px',
        backgroundColor: '#38761d', // Dark green
        color: '#ffffff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '22px',
        fontWeight: 'bold',
        cursor: 'pointer',
        minWidth: '120px',
    },
};

/**
 * Renders the content of the Password Recovery form, intended to be used
 * as a child of PopUpModals.
 */
const PasswordRecoveryContent = ({ onClose }) => {
    const [email, setEmail] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // 🚨 TODO: Add actual API call here
        console.log('Password recovery request for:', email);
        alert(`Recovery link sent to ${email} (simulated)`);
        onClose(); // Close the modal after submission attempt
    };

    // Note: PopUpModals handles the Escape key, so we don't need the useEffect here.
    
    return (
        <div style={formStyles.card}>
            <form onSubmit={handleSubmit}>
                <h1 style={formStyles.title}>Password Recovery</h1>
                <div>
                    <label htmlFor="recoveryEmail" style={formStyles.label}>Enter Your Email</label>
                    <input
                        type="email"
                        id="recoveryEmail"
                        placeholder="Enter your email"
                        style={formStyles.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div style={formStyles.buttonGroup}>
                    <button
                        type="button" 
                        style={formStyles.closeButton}
                        onClick={onClose}
                    >
                        Close
                    </button>
                    <button
                        type="submit"
                        style={formStyles.submitButton}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PasswordRecoveryContent;