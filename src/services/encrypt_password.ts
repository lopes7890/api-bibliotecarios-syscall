import {genSaltSync, hashSync} from 'bcrypt-ts';

export async function encryptPassword(password: string): Promise<string> {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
}