import MenuController from "./controllers/MenuController";

const getMenuController: (() => MenuController) = () => new MenuController();

export default Object.freeze({
	getMenuController
});