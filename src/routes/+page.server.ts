import type { Actions, PageServerLoad } from './$types';
import { posts } from '$lib/server/schemas';
import { fail, setError, superValidate } from 'sveltekit-superforms';
import { createPostSchema, deletePostSchema } from '$lib/zod-schemas';
import { zod } from 'sveltekit-superforms/adapters';
import { db } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';
import { generateId } from 'lucia';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	const createPostForm = await superValidate(zod(createPostSchema));
	const deletePostForm = superValidate(zod(deletePostSchema));

	const posts = await db.query.posts.findMany({
		orderBy: (posts, { desc }) => [desc(posts.createdAt)],
		with: {
			user: {
				columns: {
					username: true
				}
			}
		}
	});

	return {
		posts,
		createPostForm,
		deletePostForm
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
	},
	deletePost: async (event) => {
		if (!event.locals.user) redirect(302, './login');

		const form = await superValidate(event.url, zod(deletePostSchema));

		if (!form.valid) {
			setError(form, '', 'bang form dot valid');
			return {
				deletePostForm: form
			};
		}

		// does user own this post
		const post = await db.query.posts.findFirst({
			where: eq(posts.id, form.data.id),
			with: {
				user: {
					columns: {
						id: true
					}
				}
			}
		});
		if (!post || post.userId !== event.locals.user.id) {
			return setError(form, '', 'Delete request DENIED says I');
		}

		await db.delete(posts).where(eq(posts.id, form.data.id));

		return {
			form
		};
	}
};
