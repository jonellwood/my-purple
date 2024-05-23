import { z } from 'zod';

export const registerSchema = z
	.object({
		username: z.string().min(3).max(30),
		password: z.string().min(4).max(255),
		passwordConfirm: z.string().min(4).max(255)
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: 'Password do not match',
		path: ['passwordConfirm', 'password']
	});

export const loginSchema = z.object({
	username: z.string().min(3).max(30),
	password: z.string()
});

export const createPostSchema = z.object({
	title: z
		.string()
		.min(3, "Title must be 3 characters at least! C'mon!!")
		.max(64, 'Title can not be more than 64 characters - save it for your content cowboy'),
	content: z
		.string()
		.min(3, 'You have to have more than 3 characters worth or wisdom to spout out, right?')
		.max(1024, 'Be more concise - less than 1024 characters in fact')
});

export const deletePostSchema = z.object({
	id: z.string()
});

export const updatePostSchema = z.object({
	id: z.string(),
	title: z
		.string()
		.min(3, "Title must be 3 characters at least! C'mon!!")
		.max(64, 'Title can not be more than 64 characters - save it for your content cowboy'),
	content: z
		.string()
		.min(3, 'You have to have more than 3 characters worth or wisdom to spout out, right?')
		.max(1024, 'Be more concise - less than 1024 characters in fact')
});
