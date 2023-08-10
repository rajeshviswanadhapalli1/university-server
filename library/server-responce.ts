import { Response } from 'express';


const server_ok = (res: Response, args: any) => {
    res.status(200).json(args);
};
const bad_request = (res: Response, args: any) => {
    res.status(400).json(args);
};
const conflict = (res: Response, args: any) => {
    res.status(409).json(args);
  };
  
  const server_error = (res: Response, args: any) => {
    res.status(500).json(args);
  };

export {bad_request,server_ok,conflict,server_error}