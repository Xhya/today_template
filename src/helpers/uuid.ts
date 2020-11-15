import { v4 as uuidv4 } from 'uuid';

export function generateRandomUUID(): string {
    return uuidv4(); // => example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
}

