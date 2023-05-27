import { Role } from "../../infrastructure/mongo/role.enum";

export interface User {
    id: string;
    email: string;
    password: string;
    role: Role;
}
