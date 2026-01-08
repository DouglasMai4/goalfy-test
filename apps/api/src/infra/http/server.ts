import express from 'express';
import cors from 'cors';

import { config } from 'dotenv';

config({
	quiet: true,
});

const PORT = parseInt(process.env.PORT || '3030', 10);

const app = express();

app.use(express.json());
app.use(
	cors({
		origin: process.env.CORS_ORIGINS?.split(',') || '*',
	}),
);

app.get('/', (_req, res) => {
	res.json({
		sucess: true,
		data: {
			message: 'Hello Goalfy!',
		},
	});
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${3000}`);
});
