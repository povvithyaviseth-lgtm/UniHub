import { create } from 'zustand';
import { adminLogin} from '../../frontend/src/function/adminLoginFunction';

export const authentication = create((set) => ({
    login: async (credentials) => {
        if (credentials.isAdmin) {
            return adminLogin(credentials);
        }
        // return StudentLogin(credentials);
    }
}));