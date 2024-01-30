<template>
	<button
		class="btn"
		:type="type">
		<slot> </slot>
	</button>
</template>
<script setup>
const props = defineProps({
	type: {
		type: String,
	},
});
</script>
<style>
.btn {
	background-color: var(--color-accent);
	color: white;
	border: none;
	font-family: var(--font-primary);
	font-weight: bold;
	border-radius: 6px;
	padding: 12px;
	cursor: pointer;
	transition: background-color 0.15s ease;
}

.btn:disabled {
	cursor: not-allowed;
	opacity: 0.75;
}

@media screen and (hover: hover) {
	.btn:hover:not(:disabled) {
		background-color: var(--color-accent-hover);
	}
}

@media screen and (prefers-reduced-motion) {
	.btn {
		transition: none;
	}
}
</style>
