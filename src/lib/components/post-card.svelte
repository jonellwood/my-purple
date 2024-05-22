<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import type { PostWithUser } from '$lib/server/schemas';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { MoreVertical } from 'lucide-svelte';
	import { Trash } from 'lucide-svelte';
	import { SquarePen } from 'lucide-svelte';
	import { buttonVariants } from './ui/button';
	import { Description } from 'formsnap';
	import Button from './ui/button/button.svelte';
	import { sleep } from '$lib/utils';

	type Props = {
		post: PostWithUser;
	};
	let { post } = $props<Props>();

	let deleteDialogOpen = $state(false);
	let editDialogOpen = $state(false);
	let dropdownOpen = $state(false);
</script>

<Card.Root>
	<Card.Header class="flex-row items-center justify-between">
		<Card.Title>
			{post.title}
		</Card.Title>
		<DropdownMenu.Root bind:open={dropdownOpen}>
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
						dropdownOpen = false;
						sleep(2).then(() => {
							deleteDialogOpen = true;
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

<AlertDialog.Root bind:open={deleteDialogOpen}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Delete Post</AlertDialog.Title>
			<AlertDialog.Description>Are you sure about this? ... Sinner!</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<Button variant="destructive">Yep</Button>
			<Button variant="outline" onclick={() => (deleteDialogOpen = false)}>Nope</Button>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
