export interface CreateUserDTO {
    name: string;
    cpf: string;
    email: string;
    telephone: string;
    password: string;
    birthdate: Date;
    gender: string;
    userType: string;
}
export interface UpdateUserDTO {
    name?: string;
    password?: string;
    birthdate?: Date;
    gender?: string;
    userType?: string;
}
