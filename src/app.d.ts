// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// import type { Session, User } from 'lucia'; // per the docs inline import have to be used
// import type { db } from '$lib/server/db.js';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: import('lucia').User | null;
			session: import('lucia').Session | null;
			db: import('$lib/server/db.js').db;
		}
		interface PageData {
			user: import('lucia').User | null;
			session: import('lucia').Session | null;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
