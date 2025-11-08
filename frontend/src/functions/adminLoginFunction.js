export async function adminLogin(credentials) {
    const response = await fetch('/api/admins/data');
    const data = await response.json();
    
    const {email, password} = credentials;
    const admin = data.find((admin) => admin.email === email && admin.password === password) 
    ? { success: true, message: "Login successful" } : { success: false, message: "Invalid email or password" };

    return admin;
}