import express, { NextFunction, Request, Response } from 'express';
import { createJwt, validateJwt } from './web/services/jwt_service';
import dotenv from 'dotenv';

if (process.env.NODE_ENV?.toUpperCase() != 'PRODUCTION') {
	dotenv.config();
}

const app = express();

app.get('/', (req: Request, res: Response, next: NextFunction) => {
	res.json({
		status: 'success',
	});
});

app.get('/create', async (req: Request, res: Response, next: NextFunction) => {
	let credentials = {
		email: 'email@email.com',
		password: 'password',
	};
	let token = await createJwt(credentials);
	console.log(token);
	res.json({
		status: 'success',
		token,
	});
});

app.get(
	'/validate',
	async (req: Request, res: Response, next: NextFunction) => {
		let token =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVkZW50aWFscyI6eyJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsInBhc3N3b3JkIjoicGFzc3dvcmQifSwiaWF0IjoxNjc3MTM5NzEwLCJleHAiOjE2NzcxMzk3MTF9.oE3kC1wTLzXQ3vqPb47O0a61D6uxOunrJh3X7GvoD3M';

		let decoded;

		try {
			decoded = await validateJwt(token);
			res.json({
				status: 'success',
				data: decoded,
			});
		} catch (e: any) {
			res.json({
				status: 'failure',
				message: `${e.message}`.toUpperCase(),
			});
		}
	}
);

const PORT = 8080 || process.env.PORT;
app.listen(PORT, () => {
	console.log('Server is listening at PORT 8080');
});
