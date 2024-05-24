// import type { Infer, SuperValidated } from "sveltekit-superforms";
// import type { PostWithRelations } from "./server/schemas";
// import type {
// 	createLikeSchema,
// 	createPostCommentSchema,
// 	deleteLikeSchema,
// 	deletePostSchema,
// 	updatePostSchema,
// } from "./zod-schemas";
// import { getContext, setContext } from "svelte";

import type { Infer, SuperValidated } from "sveltekit-superforms";
import type { PostWithUser } from "./server/schemas";
import type { createPostCommentSchema, deletePostSchema, updatePostSchema } from "./zod-schemas";
import { setContext, getContext } from "svelte";

export class Ref<T> {
	value = $state() as T;

	constructor(value: T) {
		this.value = value;
	}
}

export function ref<T>(initialValue: T) {
	return new Ref(initialValue);
}

export type PostContext = {
	post: PostWithUser;
	deletePostForm: SuperValidated<Infer<typeof deletePostSchema>>;
	updatePostForm: SuperValidated<Infer<typeof updatePostSchema>>;
	createCommentForm: SuperValidated<Infer<typeof createPostCommentSchema>>;
	deleteOpen: boolean;
	dropdownOpen: boolean;
	updateOpen: boolean;
	commentOpen: boolean;
};

const POST_CTX = Symbol("post_ctx");

export function setPostContext(defaults: PostContext) {
	const state = $state(defaults);
	return setContext<PostContext>(POST_CTX, state);
}

export function getPostContext() {
	return getContext<PostContext>(POST_CTX);
}
type SetPostState = {
	// post: PostWithRelations & { userLiked: number };
	post: PostWithUser;
	deletePostForm: SuperValidated<Infer<typeof deletePostSchema>>;
	updatePostForm: SuperValidated<Infer<typeof updatePostSchema>>;
	createCommentForm: SuperValidated<Infer<typeof createPostCommentSchema>>;
	// createLikeForm: SuperValidated<Infer<typeof createLikeSchema>>;
	// deleteLikeForm: SuperValidated<Infer<typeof deleteLikeSchema>>;
};
export class PostState {
	deletePostForm = $state() as SuperValidated<Infer<typeof deletePostSchema>>;
	updatePostForm = $state() as SuperValidated<Infer<typeof updatePostSchema>>;
	createCommentForm = $state() as SuperValidated<Infer<typeof createPostCommentSchema>>;
	// createLikeForm = $state() as SuperValidated<Infer<typeof createLikeSchema>>;
	// deleteLikeForm = $state() as SuperValidated<Infer<typeof deleteLikeSchema>>;
	deleteOpen = $state(false);
	dropdownOpen = $state(false);
	updateOpen = $state(false);
	commentOpen = $state(false);
	// post = $state() as PostWithRelations & { userLiked: number };
	post: PostWithUser = $state() as PostWithUser;

	constructor(init: SetPostState) {
		this.deletePostForm = init.deletePostForm;
		this.updatePostForm = init.updatePostForm;
		this.createCommentForm = init.createCommentForm;
		// this.createLikeForm = init.createLikeForm;
		// this.deleteLikeForm = init.deleteLikeForm;
		this.post = init.post;
	}
}

export function setPostState(init: SetPostState) {
	const postState = new PostState(init);
	setContext<PostState>(POST_CTX, postState);
	return postState;
}

export function getPostState() {
	return getContext<PostState>(POST_CTX);
}
