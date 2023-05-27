import { Role } from "../../infrastructure/mongo/role";

export interface User {
    id: string;
    email: string;
    password: number;
    role: Role;
}
