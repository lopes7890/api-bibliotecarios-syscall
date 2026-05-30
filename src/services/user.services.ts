import { pool } from "../database/data.js";
import { encryptPassword } from "./encrypt_password.js";
import { comparePassword } from "./compare_password.js";
import { generateTokens } from "../functions/generator_tokens.js";
import type {
  NewUserData,
  UserLoginData,
  GetUserData,
  NewUserDataUpdate,
} from "../types/user_types.js";

export async function saveUser(
  userData: NewUserData,
): Promise<{
  message: string;
  tokens?: { accessToken: string; refreshToken: string };
}> {
  try {
    const [rows]: any = await pool.query(
      "SELECT email FROM bibliotecarios WHERE email = ?",
      [userData.email],
    );

    const user = rows[0];

    if (user) {
      return { message: "User already exists" };
    }
    const hashedPassword = await encryptPassword(userData.password_user);

    const register = await pool.query(
      "INSERT INTO bibliotecarios (nome, email, senha_hash) VALUES (?, ?, ?)",
      [userData.name_user, userData.email, hashedPassword],
    );
    if (register) {
      return { message: "User saved" };
    }
    return { message: "Error saving user" };
  } catch (error) {
    console.error("Error saving user:", error);
    return { message: "Internal error to saving user" };
  }
}

export async function autorizedLogin(
  email: string,
  password: string,
): Promise<{ message: string }> {
  try {
    const [rows]: any = await pool.query(
      "SELECT * FROM bibliotecarios WHERE email = ?",
      [email],
    );

    const user: UserLoginData = rows[0];

    if (!user) {
      return { message: "User not found" };
    }

    const passwordMatch = await comparePassword(password, user.senha_hash);

    if (!passwordMatch) {
      return { message: "Invalid password" };
    }

    const tokens = generateTokens(user.id);

    return { message: "Login successful", ...tokens };
  } catch (error) {
    console.error("Error logging in user:", error);

    return { message: "Internal error to login user" };
  }
}

export async function getDataUser(
  userId: number,
): Promise<{ message: string; data?: any }> {
  try {
    const [data]: any = await pool.query(
      "SELECT nome, email FROM bibliotecarios WHERE id = ?",
      [userId],
    );
    const userData: GetUserData = data[0];
    console.log(userData);
    if (data) {
      return { message: "Data retrieved successfully", data: userData };
    }
    return { message: "Error retrieving user data" };
  } catch (error) {
    console.error("Error retrieving user data:", error);
    return { message: "Internal error to retrieve user data" };
  }
}

export async function updateDataUser(
  userId: number,
  userData: NewUserDataUpdate,
): Promise<{ message: string }> {
  try {
    const dataUpdate: any = {};

    for (const [key, value] of Object.entries(userData)) {
      if (value !== undefined && value !== null) {
        dataUpdate[key] = value;
      }
    }

    if (Object.keys(dataUpdate).length === 0) {
      return { message: "No data to update" };
    }

    if (dataUpdate.password_user) {
      dataUpdate.password_user = await encryptPassword(
        dataUpdate.password_user,
      );
    }

    const updateDataBase = await pool.query("UPDATE bibliotecarios SET ? WHERE id = ?", [
      dataUpdate,
      userId,
    ]);

    if (updateDataBase) {
      return { message: "User updated successfully" };
    }

    return { message: "Error updating user data" };
  } catch (error) {
    console.error("Error updating user data:", error);
    return { message: "Internal error to update user data" };
  }
}

export async function deleteUserData(
  userId: number,
): Promise<{ message: string }> {
  try {
    const user = await pool.query("SELECT * FROM bibliotecarios WHERE id = ?", [userId]);
    if (!user) {
      return { message: "User not found" };
    }

    const deleteUser = await pool.query("DELETE FROM bibliotecarios WHERE id = ?", [
      userId,
    ]);
    if (deleteUser) {
      return { message: "User deleted successfully" };
    }

    return { message: "Error deleting user" };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { message: "Internal error to delete user" };
  }
}
