import api from "../api/axios";

export async function createUser(
    name: string,
    email: string,
    password: string,
) {
    console.log(name);
    console.log(email);
    console.log(password);
    
    const res = await api.post('/api/admin/users', {
        name,
        email,
        password,
    });

    console.log(res);    

    return res.data;
}

// export async function createUser(userData: any) {
//     const res = await api.post('/admin/users', userData);

//     return res.data;
// }