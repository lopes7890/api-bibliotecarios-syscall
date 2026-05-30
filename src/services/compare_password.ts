import {compareSync} from 'bcrypt-ts';

export async function comparePassword(password: string, hash: string): Promise<boolean> {
    return compareSync(password, hash);
}