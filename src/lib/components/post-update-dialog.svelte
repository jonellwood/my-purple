<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog";
	import { buttonVariants } from "./ui/button";
	import PostUpdateForm from "./post-update-form.svelte";
	import { getPostState } from "$lib/state.svelte";

	let data = getPostState();
</script>

<Dialog.Root bind:open={data.updateOpen}>
	<Dialog.Trigger class={buttonVariants()}>Update Post</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Update Post</Dialog.Title>
			<Dialog.Description>If you had done it right the first time ....</Dialog.Description>
		</Dialog.Header>
		<PostUpdateForm />
	</Dialog.Content>
</Dialog.Root>
