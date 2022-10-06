import Container from "../../container";

export {};

declare global {
	namespace Express {
		export interface Request {
			container?: Container
		}
	}
}