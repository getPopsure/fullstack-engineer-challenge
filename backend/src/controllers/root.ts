import {Request, RequestHandler, Response} from "express/ts4.0"

export const getRoot: RequestHandler = async (req: Request, res: Response) => {
  res.send("Server is up and running 🚀")
}