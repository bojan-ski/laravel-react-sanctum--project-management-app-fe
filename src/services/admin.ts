import api from "../api/axios";
import type { NewUserFormData } from "../types/types";


export async function createUser(newUserData: NewUserFormData) {    
    const res = await api.post('/api/admin/users', newUserData);

    return res.data;
}