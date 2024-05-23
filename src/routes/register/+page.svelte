<script lang="ts">
	import * as Form from "$lib/components/ui/form/index.js";
	import { Input } from "$lib/components/ui/input";
	import { registerSchema } from "$lib/zod-schemas.js";
	import { superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";

	let { data } = $props();

	const form = superForm(data.form, {
		validators: zodClient(registerSchema),
	});

	const { form: formData, enhance } = form;
	// const { form: loginFormData } = loginForm;
</script>

<!-- <div class="flex flex-col space-y-2 text-center justify-center"> -->
<div class="flex flex-col space-y-2 text-center pt-2">
	<h1 class="text-2xl font-semibold tracking-tight">Create your account</h1>
	<p class="text-sm text-muted-foreground">Show everyone how much smarter you are then them!</p>
</div>
<form method="POST" use:enhance class="w-full space-y-4 p-20 max-w-xl">
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
	<!-- <Form.Errors errors={$errors._errors} /> -->
	<Form.Button>Register</Form.Button>
</form>
<!-- </div> -->
