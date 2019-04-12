export interface User {
    id: string,
    name: string,
    email: string,
    password?: string,
    picture?: string,
    created_at: Date,
    updated_at: Date 
}
