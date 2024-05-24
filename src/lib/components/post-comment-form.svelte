<script lang="ts">
	import { superForm } from "sveltekit-superforms";
	import { createPostCommentSchema } from "$lib/zod-schemas";
	import { zodClient } from "sveltekit-superforms/adapters";
	import * as Form from "$lib/components/ui/form";
	import Textarea from "./ui/textarea/textarea.svelte";
	import { getPostState } from "$lib/state.svelte";

	const data = getPostState();
	console.log(data);

	const form = superForm(data.createCommentForm, {
		id: `post-comment-form-${data.post.id}`,
		validators: zodClient(createPostCommentSchema),
		onUpdated: () => {
			data.commentOpen = false;
		},
	});

	const { form: formData, enhance } = form;
</script>

{#if data.commentOpen}
	<form action="/?/createComment&postId={data.post.id}" method="POST" use:enhance class="w-full">
		<Form.Field {form} name="content">
			<Form.Control let:attrs>
				<Form.Label>You got something to say?</Form.Label>
				<Textarea {...attrs} bind:value={$formData.content} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Button>Add your two 🪙</Form.Button>
	</form>
{/if}
