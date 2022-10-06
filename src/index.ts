import express from 'express';
import container from './container';

import menu from './controllers/MenuController';

const app = express();

app.use((req, res, next) => {
	req.container = container;
});

app.get('/', (req, res) => {
	res.send('Hello, world. This is the menumaker application');
});

app.use('/menu', menu);

app.listen(3000, () => {
	console.log(`[server]: Server is running on port 3000`);
});