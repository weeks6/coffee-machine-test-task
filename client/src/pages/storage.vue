<template>
	<loading v-if="isLoading" />
	<h1 v-else-if="isError">Ошибка загрузки</h1>
	<template v-else>
		<h1>Хранилище</h1>
		<ul class="storage-list">
			<storage-item
				v-for="(item, index) in list"
				:item="item"
				:index="index"
				:data="data">
			</storage-item>
		</ul>
	</template>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import entryList from '../api/entries/list';
import useRemoteConfig from '../composables/useRemoteConfig';

import StorageItem from '../components/Storage/StorageItem.vue';
import Loading from '../components/Common/Loading.vue';

const list = ref([]);
const { data, isError, isLoading } = useRemoteConfig();

onMounted(() => {
	list.value = entryList();
});
</script>
<style>
.storage-list {
	display: flex;
	flex-direction: column;
	gap: 12px;
}

@media screen and (max-width: 450px) {
	.storage-list {
		padding: 0;
	}
}
</style>
