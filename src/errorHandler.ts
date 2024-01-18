import { NextFunction, Request, Response } from "express";

class CustomError extends Error {
     constructor(public status: number, message: string) {
          super(message);

          this.name = this.constructor.name;

          Error.captureStackTrace(this, this.constructor);
     }

     toJSON() {
          return {
               name: this.name,
               message: this.message,
               status: this.status, 
          };
     }
}

const errorHandler = (
     err: CustomError,
     req: Request,
     res: Response,
     next: NextFunction
) => {
     const status = err.status || 500;

     if (res.status) {
          return res.status(status).json({ error: err.message });
     } else {
          // If res.status is not available, use res.json directly
          return res.json({ error: err.message });
     }
};

export { errorHandler, CustomError };
