declare namespace NodeJS {
  export interface ProcessEnv {
    URL: string;
    DATABASE_URL: string;
    NEXTAUTH_JWT_SECRET: string;
    NEXTAUTH_SECRET: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    GITHUB_ID: string;
    GITHUB_SECRET: string;
  }
}
