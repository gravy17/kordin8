declare namespace Express {
  export interface Request {
    customer?: string;
    agent?: string;
    admin?: string;
  }
}
