import express from 'express';
import nunjucks from 'nunjucks';

import container from './container';
import menu from './routes/menu';

const app = express();

nunjucks.configure('src/views', {
	autoescape: true,
	express: app
});

app.use(express.json());
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use((req, res, next) => {
	req.container = container;
	next();
});

app.get('/', (req, res) => {
	res.send('Hello, world. This is the menumaker application');
});

app.use('/menu', menu);

app.listen(3000, () => {
	console.log(`[server]: Server is running on port 3000`);
});