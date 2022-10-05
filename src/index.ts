import express from 'express';
import container from './container';

const app = express();

app.get('/', (req, res) => {
	res.send('Hello, world. This is the menumaker application');
});

app.get('/menu', container.getMenuController().get);

app.listen(3000, () => {
	console.log(`[server]: Server is running on port 3000`);
});