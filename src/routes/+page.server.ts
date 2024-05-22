import type { Actions, PageServerLoad } from './$types';
import { posts } from '$lib/server/schemas';
import { fail, superValidate } from 'sveltekit-superforms';
import { createPostSchema } from '$lib/zod-schemas';
import { zod } from 'sveltekit-superforms/adapters';
import { db } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';
import { generateId } from 'lucia';

export const load: PageServerLoad = async (event) => {
	const createPostForm = await superValidate(zod(createPostSchema));

	const posts = await db.query.posts.findMany({
		orderBy: (posts, { desc }) => [desc(posts.createdAt)]
	});

	return {
		posts,
		createPostForm
	};
};

export const actions: Actions = {
	createPost: async (event) => {
		if (!event.locals.user) redirect(302, './login');
		const form = await superValidate(event, zod(createPostSchema));

		if (!form.valid) {
			return fail(400, { form });
		}
		const postId = generateId(15);
		// create posts in db
		await event.locals.db
			.insert(posts)
			.values({ id: postId, ...form.data, userId: event.locals.user.id });

		return { form };
	}
};
