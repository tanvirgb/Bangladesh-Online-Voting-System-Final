declare namespace NodeJs{
    export interface ProcessEnv{
        DATABASE_URL: string;
        jwtSecretKey: string;
        jwtRefreshTokenKey:string;
    }
}