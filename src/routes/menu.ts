import express from "express";

const router = express.Router();

router.get('/', async (req, res) => {
	const menuGateway = req.container.getMenuGateway();
	const menus = await menuGateway.list();

	res.send(menus);
});

router.get('/:menuId', async (req, res) => {
	const menuGateway = req.container.getMenuGateway();
	const id = parseInt(req.params["menuId"]);
	const menu = await menuGateway.get_menu(id);
	
	if (menu) {
		res.send(menu);
	} else {
		res.sendStatus(404);
	}
});

router.post('/', async (req, res) => {
	
});

export default router;