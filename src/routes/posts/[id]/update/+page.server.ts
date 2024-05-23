import { db } from "$lib/server/db";
import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { getPostById } from "$lib/server/helpers";
import { updatePostSchema } from "$lib/zod-schemas";
import { z } from "zod";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { posts } from "$lib/server/schemas";
import { eq } from "drizzle-orm";

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) redirect(302, "./login");

	const postId = event.params.id;
	const post = await getPostById(postId, event.locals.user.id);

	if (!post) error(404, "No...Mr. Post no home");

	const updatePostSchema = z.object({
		id: z.string().default(post.id),
		title: z
			.string()
			.min(3, "Title must be 3 characters at least! C'mon!!")
			.max(64, "Title can not be more than 64 characters - save it for your content cowboy")
			.default(post.title),
		content: z
			.string()
			.min(3, "You have to have more than 3 characters worth or wisdom to spout out, right?")
			.max(1024, "Be more concise - less than 1024 characters in fact")
			.default(post.content),
	});

	const updatePostForm = await superValidate(event, zod(updatePostSchema));

	return {
		updatePostForm,
		post,
	};
};

export const actions: Actions = {
	updatePost: async (event) => {
		if (!event.locals.user) redirect(302, "/login");
		const form = await superValidate(event, zod(updatePostSchema));
		if (!form.valid) return fail(400, { form });

		await db
			.update(posts)
			.set({ title: form.data.title, content: form.data.content })
			.where(eq(posts.id, event.params.id));

		return { form };
	},
};
