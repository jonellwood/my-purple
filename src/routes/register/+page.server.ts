import { setError, superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { registerSchema } from '$lib/schemas';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';
import { generateId } from 'lucia';
import { db, users } from '$lib/server/db';
import { lucia } from '$lib/server/auth';
import { eq } from 'drizzle-orm';
import { Argon2id } from 'oslo/password';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) redirect(302, '/');
	return {
		form: await superValidate(zod(registerSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(registerSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		// check if username is taken
		const userExists = db
			.select({ username: users.username })
			.from(users)
			.where(eq(users.username, form.data.username))
			.get();

		if (userExists) {
			return setError(form, 'username', 'Username is not available');
		}

		const userId = generateId(15);
		const hashedPassword = await new Argon2id().hash(form.data.password);

		const { insertedId } = db
			.insert(users)
			.values({ username: form.data.username, hashed_password: hashedPassword, id: userId })
			.returning({ insertedId: users.id })
			.get();

		const session = await lucia.createSession(insertedId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, './login');
	}
};
