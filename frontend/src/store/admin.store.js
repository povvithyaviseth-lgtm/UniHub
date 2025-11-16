import { create } from 'zustand';

export const authentication = create((set) => ({
    login: async (credentials) => {
     const response = await fetch('/api/admins/data');
    const data = await response.json();
    
    const {email, password} = credentials;

    if (!email || !password) {
        return { success: false, message: "Email and password are required" };
    }

    const admin = data.find((admin) => admin.email === email && admin.password === password) 
    ? { success: true, message: "Login successful" } : { success: false, message: "Invalid email or password" };

    return admin;
    }

}));