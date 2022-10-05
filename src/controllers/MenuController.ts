import { Request, Response } from "express";
import Container from "../container";
import Menu from "../models/Menu";

export default class MenuController {
	get(req: Request, res: Response) {
		res.send("Getting a menu");
	}

	static post(req: Request, res: Response) {
		res.redirect("/menu");
	}
}