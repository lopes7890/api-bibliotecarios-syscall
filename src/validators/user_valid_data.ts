import type { NewUserData, NewUserDataUpdate } from "../types/user_types.js";

export const validateUserData = (userData: NewUserData): { valid: boolean; status: string } => {
    if (!userData.name_user || typeof userData.name_user !== 'string') {
        return { valid: false, status: 'Invalid or missing name' };
    } else if (!userData.email || typeof userData.email !== 'string' || !/\S+@\S+\.\S+/.test(userData.email)) {
        return { valid: false, status: 'Invalid or missing email' };
    }   else if (!userData.password_user || typeof userData.password_user !== 'string' || userData.password_user.length < 6) {
        return { valid: false, status: 'Invalid or missing password (must be at least 6 characters)' };
    }
    return { valid: true, status: 'Valid user data' };
};

export const validateLoginData = (loginData: any): { valid: boolean; status: string } => {
    if (!loginData.email || typeof loginData.email !== 'string' || !/\S+@\S+\.\S+/.test(loginData.email)) {
        return { valid: false, status: 'Invalid or missing email' };
    } else if (!loginData.password_user || typeof loginData.password_user !== 'string' || loginData.password_user.length < 6) {
        return { valid: false, status: 'Invalid or missing password (must be at least 6 characters)' };
    }

    return { valid: true, status: 'Valid login data' };

};

export const validateUpdateUserData = (userData: NewUserDataUpdate): { valid: boolean; status: string } => {
    if (userData.name_user && typeof userData.name_user !== 'string') {
        return { valid: false, status: 'Invalid name' };  
    } else if (userData.email && (typeof userData.email !== 'string' || !/\S+@\S+\.\S+/.test(userData.email))) {
        return { valid: false, status: 'Invalid email' };
    } else if (userData.password_user && (typeof userData.password_user !== 'string' || userData.password_user.length < 6)) {  
        return { valid: false, status: 'Invalid password (must be at least 6 characters)' };
    }
    return { valid: true, status: 'Valid user data' };
};