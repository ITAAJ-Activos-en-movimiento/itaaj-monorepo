import { itaajApi } from "@/api";

export const getCurrentUser = async () =>{
    const { data } = await itaajApi.get(`/users`);
    return data
}

export const getUsers = async () =>{
    const { data } = await itaajApi.get(`/users`);
    return data
}

export const loginOfficer = async (info: { username: string, password: string }) =>{
    const { data } = await itaajApi.post("/auth/login", info)
    return data
}

export const login = async (email: string) =>{
    console.log({email})
    const { data } = await itaajApi.post("/auth/login/email", { email })
    return data
}