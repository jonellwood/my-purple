<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import type { PostWithUser } from '$lib/server/schemas';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { MoreVertical } from 'lucide-svelte';
	import { Trash } from 'lucide-svelte';
	import { SquarePen } from 'lucide-svelte';
	import { buttonVariants } from './ui/button';
	import Button from './ui/button/button.svelte';
	import { sleep } from '$lib/utils';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { deletePostSchema } from '$lib/zod-schemas';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';

	type Props = {
		post: PostWithUser;
		form: SuperValidated<Infer<typeof deletePostSchema>>;
	};
	let { post, form: theForm } = $props<Props>();

	const form = superForm(theForm, {
		validators: zodClient(deletePostSchema),
		onUpdated: ({ form: returnForm }) => {
			if (!returnForm.valid) return toast.error('Error buying Shoes for a clown');
			openStates.deleteDialogOpen = false;
			toast.success('Post Deleted');
		}
	});

	const { enhance } = form;

	const openStates = $state({
		deleteDialogOpen: false,
		editDialogOpen: false,
		dropdownOpen: false
	});

	// let deleteDialogOpen = $state(false);
	// let editDialogOpen = $state(false);
	// let dropdownOpen = $state(false);
</script>

<Card.Root>
	<Card.Header class="flex-row items-center justify-between">
		<Card.Title>
			{post.title}
		</Card.Title>
		<DropdownMenu.Root bind:open={openStates.dropdownOpen}>
			<DropdownMenu.Trigger class={buttonVariants({ size: 'icon', variant: 'ghost' })}>
				<MoreVertical class="size-4" />
				<span class="sr-only"> Manage Posts </span>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Item>
					<SquarePen class="size-4 mr-2" />
					Edit
				</DropdownMenu.Item>
				<DropdownMenu.Item
					on:click={(e) => {
						e.preventDefault();
						openStates.dropdownOpen = false;
						sleep(2).then(() => {
							openStates.deleteDialogOpen = true;
						});
					}}
				>
					<Trash class="size-4 mr-2" />
					Delete
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Card.Header>
	<Card.Content>
		{post.content}
	</Card.Content>
	<Card.Footer>
		By: {post.user.username}
	</Card.Footer>
</Card.Root>

<AlertDialog.Root bind:open={openStates.deleteDialogOpen}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Delete Post</AlertDialog.Title>
			<AlertDialog.Description>Are you sure about this? ... Sinner!</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<form use:enhance method="POST" action="?/deletePost&id={post.id}">
				<Button variant="destructive" type="submit">Yes, Delete It</Button>
			</form>
			<Button variant="outline" onclick={() => (openStates.deleteDialogOpen = false)}
				>Nevermind</Button
			>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
