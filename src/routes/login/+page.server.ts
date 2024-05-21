import { loginSchema } from '$lib/schemas';
import { setError, superValidate } from 'sveltekit-superforms';
import type { PageServerLoad, Actions } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db, users } from '$lib/server/db';
import { Argon2id } from 'oslo/password';
import { lucia } from '$lib/server/auth';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) redirect(302, '/');
	return {
		form: await superValidate(zod(loginSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(loginSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const existingUser = db
			.select()
			.from(users)
			.where(eq(users.username, form.data.username))
			.get();

		if (!existingUser) {
			return setError(form, '', "Are you sure this is not Bob? Because that is Bob's password");
		}

		const validPassword = await new Argon2id().verify(
			existingUser.hashed_password,
			form.data.password
		);
		if (!validPassword) {
			return setError(form, '', 'Close.. try it with a lowercase p instead');
		}

		const session = await lucia.createSession(existingUser.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/');
	}
};
