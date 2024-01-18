import { NextFunction, Request, Response } from "express";

class CustomError extends Error {
     constructor(message: string) {
          super(message);
          // Ensure the name of this error is the same as the class name
          this.name = this.constructor.name;
          // Capture the stack trace (excluding the constructor call)
          Error.captureStackTrace(this, this.constructor);
     }

     toJSON() {
          // Return the error object without wrapping it
          return {
               name: this.name,
               message: this.message,
          };
     }
}


export { CustomError };
