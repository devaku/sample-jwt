import jwt from 'jsonwebtoken';

type jwtContents = {
	email: string;
	password: string;
};

export function createJwt(credentials: jwtContents): string {
	const secret_key = process.env.JWT_SECRET!;
	const token = jwt.sign({ credentials }, secret_key, { expiresIn: '1s' });
	return token;
}

export function validateJwt(jwtToken: string) {
	const secret_key = process.env.JWT_SECRET!;
	return new Promise((resolve, reject) => {
		jwt.verify(jwtToken, secret_key, function (err, decoded) {
			if (err) {
				console.log(err.message);
				reject(err);
			}

			resolve(decoded);
		});
	});
}
