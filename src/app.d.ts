// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { Infer, SuperValidated } from "sveltekit-superforms";
import { updatePostSchema } from "./lib/zod-schemas";

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: import("lucia").User | null;
			session: import("lucia").Session | null;
			db: import("$lib/server/db.js").db;
		}
		interface PageData {
			user: import("lucia").User | null;
			session: import("lucia").Session | null;
		}
		interface PageState {
			updatePost: {
				form: SuperValidated<Infer<updatePostSchema>>;
				dialog: boolean;
			};
		}
		// interface Platform {}
	}
}

export {};
