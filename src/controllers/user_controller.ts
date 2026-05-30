import { saveUser } from "../services/user.services.js";
import { validateUserData } from "../validators/user_valid_data.js";
import { validateUpdateUserData } from "../validators/user_valid_data.js";
import type { NewUserDataUpdate } from "../types/user_types.js";
import {validateLoginData} from "../validators/user_valid_data.js";
import { autorizedLogin } from "../services/user.services.js";
import {getDataUser} from "../services/user.services.js";
import {updateDataUser} from "../services/user.services.js";
import {deleteUserData} from "../services/user.services.js";

export async function validateDataUser(userData: any): Promise<{ valid: boolean; status: string }> {
    return validateUserData(userData);
}

export async function createUser(userData: any): Promise<{ message: string;}> {
    
    const validationResult = await validateDataUser(userData);
    if (validationResult.valid === true) {
        return await saveUser(userData);
    }

    return { message: validationResult.status}; 
}

export async function loginUser(email: string, password_user: string): Promise<{message: string; tokens?: { accessToken: string; refreshToken: string }}> {
    const validationResult = await validateLoginData({ email, password_user });
    if (validationResult.valid === true) {
        return await autorizedLogin(email, password_user);
    }
    return { message: validationResult.status };    
}

export async function getUser(userId: number): Promise<{ message: string; data?: any }> {
    return await getDataUser(userId);
}

export async function updateUser(userId: number, userData: NewUserDataUpdate): Promise<{ message: string;}> {
    const validationResult = await validateUpdateUserData(userData);
    if (validationResult.valid === true) {
        return await updateDataUser(userId, userData);
    }
    return { message: validationResult.status};
}

export async function deleteUser(userId: number): Promise<{ message: string;}> {
    return await deleteUserData(userId);
}