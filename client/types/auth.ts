export interface IAuth {
    email?: string;
    sub?: string;
    exp: number;
    iat: number;
}

export interface ILogin {
    email: string;
    password: string;
}
