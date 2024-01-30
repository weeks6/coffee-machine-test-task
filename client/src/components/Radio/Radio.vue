<template>
	<label class="radio">
		<span
			class="radio__label"
			v-if="label">
			{{ label }}
		</span>
		<input
			:name="name"
			:value="value"
			@input="$emit('update:modelValue', $event.target.value)"
			type="radio"
			class="radio__field visually-hidden" />
	</label>
</template>
<script setup>
const props = defineProps({
	name: {
		required: true,
		type: String,
	},
	label: {
		type: [String, Number],
	},
	value: {},
	modelValue: {
		type: [String, Number],
	},
});

const emit = defineEmits(['update:modelValue']);
</script>
<style>
.radio {
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	border: 2px solid var(--color-secondary);
	border-radius: 6px;
	padding: 8px 12px;
	transition: border-color 0.15s ease;
	flex-grow: 1;
}

.radio:has(input:checked, input:focus-visible) {
	border: 2px solid var(--color-accent);
}

.radio__label {
}

.radio__field {
}
</style>
