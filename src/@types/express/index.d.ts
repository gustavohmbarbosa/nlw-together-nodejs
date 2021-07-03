declare namespace Express {
  export interface Request {
    auth: {
      id: string;
      name: string;
      email: string;
      admin: boolean;
    };
  }
}
