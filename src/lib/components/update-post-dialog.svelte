<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { buttonVariants } from './ui/button';
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants()}>Update Post</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Update Post</Dialog.Title>
			<Dialog.Description>If you had done it right the first time ....</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
