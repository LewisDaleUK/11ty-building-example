import express from "express";
import Menu from "../models/Menu";

const router = express.Router();

router.get('/', async (req, res) => {
	const menuGateway = req.container.getMenuGateway();
	const menus = await menuGateway.list();

	res.render('menu/list.njk', { menus });
});

router.get('/new', async (req, res) => {
	res.render('menu/new.njk');
});

router.get('/:menuId', async (req, res) => {
	const menuGateway = req.container.getMenuGateway();
	const id = parseInt(req.params["menuId"]);
	const menu = await menuGateway.get(id);
	
	if (menu) {
		res.send(menu);
	} else {
		res.sendStatus(404);
	}
});

router.post('/:menuId?', async (req, res) => {
	const menuGateway = req.container.getMenuGateway();
	const id = req.params["menuId"] ? parseInt(req.params["menuId"]) : undefined;
	const menu = new Menu(
		id,
		req.body["title"],
		req.body["description"]
	);

	await menuGateway.save(menu);
	res.redirect("/menu");
});

export default router;