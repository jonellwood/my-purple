<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { createPostSchema } from '$lib/zod-schemas.js';
	import { FieldErrors } from 'formsnap';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let { data } = $props();

	const createPostForm = superForm(data.createPostForm, {
		validators: zodClient(createPostSchema)
	});

	const { form: createPostFormData, enhance } = createPostForm;
</script>

<div class="container">
	<form action="?/createPost" method="POST" use:enhance class="space-y-4">
		<Form.Field form={createPostForm} name="title">
			<Form.Control let:attrs>
				<Form.Label>Title</Form.Label>
				<Input {...attrs} bind:value={$createPostFormData.title} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field form={createPostForm} name="content">
			<Form.Control let:attrs>
				<Form.Label>Content</Form.Label>
				<Textarea {...attrs} bind:value={$createPostFormData.content} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Button>Create Post</Form.Button>
	</form>
</div>
