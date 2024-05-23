<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { updatePostSchema } from '$lib/zod-schemas.js';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { redirect } from '@sveltejs/kit';

	let { data } = $props();
	// let open = $state(false);

	const form = superForm(data.updatePostForm, {
		validators: zodClient(updatePostSchema),
		onUpdated: ({ form: updForm }) => {
			if (!updForm.valid) return;

			// give the guys some toast!
			toast.success('Post was updated');
			// close dialog if relevant
		}
	});

	const { form: updatePostFormData, enhance } = form;
</script>

<form action="?/updatePost" method="POST" use:enhance class="space-y-4 max-w-xl">
	<Form.Field {form} name="title">
		<Form.Control let:attrs>
			<Form.Label>Title</Form.Label>
			<Input {...attrs} bind:value={$updatePostFormData.title} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="content">
		<Form.Control let:attrs>
			<Form.Label>Content</Form.Label>
			<Textarea {...attrs} bind:value={$updatePostFormData.content} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<!-- <Form.Errors errors={$errors._errors} /> -->
	<Form.Button type="submit">Update Post</Form.Button>
</form>
