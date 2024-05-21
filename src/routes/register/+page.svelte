<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input';
	import { registerSchema } from '$lib/zod-schemas.js';
	import { FieldErrors } from 'formsnap';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let { data } = $props();

	const form = superForm(data.form, {
		validators: zodClient(registerSchema)
	});

	const { form: formData, enhance } = form;
	// const { form: loginFormData } = loginForm;
</script>

<div class="flex flex-col space-y-2 text-center">
	<form method="POST" use:enhance class="space-y-4">
		<Form.Field {form} name="username">
			<Form.Control let:attrs>
				<Form.Label>Username</Form.Label>
				<Input type="text" {...attrs} bind:value={$formData.username} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="password">
			<Form.Control let:attrs>
				<Form.Label>Password</Form.Label>
				<Input type="password" {...attrs} bind:value={$formData.password} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="passwordConfirm">
			<Form.Control let:attrs>
				<Form.Label>Confirm Password</Form.Label>
				<Input type="password" {...attrs} bind:value={$formData.passwordConfirm} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Button>Register</Form.Button>
	</form>
</div>
