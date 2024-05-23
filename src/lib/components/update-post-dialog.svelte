<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { buttonVariants } from './ui/button';
	import { updatePostSchema } from '$lib/zod-schemas';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { toast } from 'svelte-sonner';

	type Props = {
		form: SuperValidated<Infer<typeof updatePostSchema>>;
	};

	let { form: theForm } = $props<Props>();

	let open = $state(false);

	const form = superForm(theForm, {
		validators: zodClient(updatePostSchema),
		onUpdated: ({ form: updForm }) => {
			if (!updForm.valid) return;

			// give the guys some toast!
			toast.success('Post was updated');
			open = false;
		}
	});

	const { form: updatePostFormData, enhance } = form;
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger class={buttonVariants()}>Update Post</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Update Post</Dialog.Title>
			<Dialog.Description>If you had done it right the first time ....</Dialog.Description>
		</Dialog.Header>
		<form action="?/createPost" method="POST" use:enhance class="space-y-4">
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
			<Form.Button>Create Post</Form.Button>
		</form>
	</Dialog.Content>
</Dialog.Root>
