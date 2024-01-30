<template>
	<li class="storage-item">
		<div class="storage-item__info">
			<img
				class="storage-item__image"
				:src="API_URL + item.machine?.image" />
			<span>{{ entryTitle }}</span>
		</div>
		<div class="storage-item__actions">
			<common-button
				@click="decrement"
				:disabled="item.count === 0">
				-
			</common-button>
			{{ item.count }}
			<common-button @click="increment"> + </common-button>
		</div>
	</li>
</template>
<script setup>
import { computed } from 'vue';
import { API_URL } from '../../api/constants';
import updateEntry from '../../api/entries/update';

import CommonButton from '../Common/CommonButton.vue';

const props = defineProps({
	item: {
		type: Object,
	},
	index: {
		required: true,
		type: Number,
	},
	data: {
		type: Object,
	},
});

const item = computed({
	get() {
		const machine = props.data.machineOptions.find(
			(i) => i.key === props.item.machine
		);
		const beverages = props.data.beverageOptions.find(
			(i) => i.value === +props.item.beverages
		);

		return {
			machine,
			beverages,
			count: props.item.count ?? 0,
		};
	},
	set(nv) {
		props.item.count = nv.count;
		updateEntry(props.index, nv);
	},
});

const entryTitle = computed(() => {
	let title = '';
	if (item.value?.machine.title) {
		title += item.value?.machine.title;
	}

	if (item.value.beverages) {
		if (title) {
			title += ' - ';
		}

		title += `${item.value.beverages.value} напитков`;
	}

	return title;
});

const decrement = () => {
	console.log('decrement');
	item.value = {
		...props.item,
		count: item.value.count - 1,
	};
};
const increment = () => {
	console.log('increment');
	item.value = {
		...props.item,
		count: item.value.count + 1,
	};
};
</script>
<style>
.storage-item {
	list-style: none;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
	font-family: var(--font-primary);
	font-size: 18px;
}

.storage-item__info {
	display: flex;
	align-items: center;
	gap: 16px;
}

.storage-item__image {
	width: 96px;
	border-radius: 12px;
	aspect-ratio: 1;
}

@media screen and (max-width: 450px) {
	.storage-item {
		font-size: 14px;
	}

	.storage-item__image {
		width: 56px;
	}
}
</style>
