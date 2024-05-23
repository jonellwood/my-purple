import { Argon2id } from 'oslo/password';
import { faker } from '@faker-js/faker';
import { db } from '../src/lib/server/db';
import { generateId } from 'lucia';
import { posts, users } from '../src/lib/server/schemas';

// import { webcrypto } from 'node:crypto';
// globalThis.crypto = webcrypto as Crypto;

async function createUsers() {
	for (let i = 0; i < 10; i++) {
		const userId = generateId(15);
		const hashedPassword = await new Argon2id().hash('1234');

		db.insert(users)
			.values({ username: faker.internet.userName(), hashed_password: hashedPassword, id: userId })
			.returning({ insertedId: users.id })
			.get();
		createPosts(userId);
	}
}

async function createPosts(userId: string) {
	for (let i = 0; i < 5; i++) {
		// console.log('Creating post #', i);
		await db.insert(posts).values({
			title: faker.commerce.productAdjective(),
			content: faker.company.buzzPhrase(),
			userId
		});
	}
}

async function seed() {
	await createUsers();
}

seed();
