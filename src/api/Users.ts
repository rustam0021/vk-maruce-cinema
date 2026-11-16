import { UserSchema, UserType } from "./ValidationSchema";
import { z } from 'zod';

const API_URL = "https://cinemaguide.skillbox.cc";


export const fetchUser = async (): Promise<UserType> => {
    const response = await fetch(`${API_URL}/profile`, { credentials: 'include' });

    if (!response.ok) {
        throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    try {
        return UserSchema.parse(data);
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error("Ошибка валидации Zod в fetchUser:", error.format());
        }
        throw error;
    }
};

type RegisterResponse = {
    success: boolean
}

export const registerUser = async (email: string, password: string, name: string, surname: string): Promise<RegisterResponse> => {
    const response = await fetch(`${API_URL}/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, name, surname }),
        credentials: 'include',
    });

    if(!response.ok) {
        throw new Error(`Ошибка: ${response.status} ${response.statusText}`)
    }

    return response.json();
}

export const loginUser = async (email: string, password: string): Promise<void> => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
        credentials: 'include',
    })

    if(!response.ok) {
        throw new Error(`Ошибка: ${response.status} ${response.statusText}`)
    }

    return undefined;
}


export const logoutUser = async () => {
    const response = await fetch(`${API_URL}/auth/logout`, {
        credentials: 'include',
    });
    
    if(!response.ok) {
        throw new Error('Неизвестная ошибка')
    }
}