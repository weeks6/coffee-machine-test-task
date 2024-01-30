<template>
	<loading v-if="isLoading" />
	<h1 v-else-if="isError">Ошибка загрузки</h1>
	<template v-else>
		<h2
			class="entry-title"
			:class="{ 'entry-title--empty': !entryTitle }">
			{{ entryTitle || 'название' }}
		</h2>
		<form
			ref="formRef"
			@submit.prevent="onSubmit"
			class="form">
			<fieldset class="form__fieldset">
				<h3>Размер устройства</h3>
				<img
					class="form__image"
					:src="API_URL + selectedMachine?.image"
					v-if="selectedMachine?.image" />

				<div
					class="form__image"
					v-else>
					Ничего не выбрано
				</div>
				<div class="form__fieldset-row">
					<radio
						v-for="(option, index) in machineOptions"
						name="machine"
						:key="option.key"
						:label="option.title"
						:value="option.key"
						v-model="formData.machine">
						{{ option.title }}
					</radio>
				</div>
				<span
					class="form__error"
					v-if="errors.machine">
					{{ errors.machine }}
				</span>
			</fieldset>
			<fieldset class="form__fieldset">
				<h3>Количество напитков</h3>
				<div class="form__fieldset-row">
					<radio
						v-for="(option, index) in beverageOptions"
						name="beverage"
						:key="option.value"
						:label="option.value"
						:value="option.value"
						v-model="formData.beverages">
						{{ option.value }}
					</radio>
				</div>
				<span
					class="form__error"
					v-if="errors.beverages">
					{{ errors.beverages }}
				</span>
			</fieldset>
			<common-button type="submit"> Сохранить в хранилище </common-button>
		</form>
	</template>
</template>
<script setup>
import { onMounted, ref, computed, watch, onBeforeUnmount } from 'vue';
import getRemoteConfig from '../api/get-remote-config';
import { API_URL } from '../api/constants';
import { errorMessages } from '../utils/forms';
import addEntry from '../api/entries/add';
import useRemoteConfig from '../composables/useRemoteConfig';

import Radio from '../components/Radio/Radio.vue';
import Loading from '../components/Common/Loading.vue';
import CommonButton from '../components/Common/CommonButton.vue';

const validateHandle = ref(null);
const formRef = ref(null);

const { data, isError, isLoading } = useRemoteConfig();

/**
 * @type {import('vue').Ref<{image: string, title: string, key: string}[]>}
 */
const machineOptions = computed(() => {
	return data.value?.machineOptions ?? [];
});

/**
 * @type {import('vue').Ref<{value: number}[]>}
 */
const beverageOptions = computed(() => {
	return data.value?.beverageOptions ?? [];
});

const formData = ref({
	machine: null,
	beverages: null,
});

const errors = ref({
	machine: null,
	beverages: null,
});

const selectedMachine = computed(() =>
	machineOptions.value.find((i) => i.key === formData.value.machine)
);

const entryTitle = computed(() => {
	let title = '';
	if (selectedMachine.value?.title) {
		title += selectedMachine.value?.title;
	}

	if (formData.value.beverages) {
		if (title) {
			title += ' - ';
		}

		title += `${formData.value.beverages} напитков`;
	}

	return title;
});

const validate = () => {
	let valid = true;

	Object.keys(formData.value).forEach((key) => {
		if (formData.value[key] === null || formData.value[key] === undefined) {
			errors.value[key] = errorMessages.required;
			valid = false;
		} else {
			errors.value[key] = null;
		}
	});

	if (!validateHandle.value) {
		validateHandle.value = watch(
			formData,
			() => {
				validate();
			},
			{ deep: true }
		);
	}

	return valid;
};

const reset = () => {
	formData.value = {
		machine: null,
		beverages: null,
	};

	errors.value = {
		machine: null,
		beverages: null,
	};

	if (validateHandle.value) {
		validateHandle.value();
	}

	formRef.value.reset();
};

const onSubmit = (evt) => {
	if (validate()) {
		addEntry(formData.value);
		reset();
	}
};

onBeforeUnmount(() => {
	if (validateHandle.value) {
		validateHandle.value();
	}
});
</script>
<style>
.entry-title {
	color: var(--color-accent);
	margin-left: auto;
	margin-right: auto;
	width: fit-content;
}

.entry-title--empty {
	opacity: 0.2;
}

.form {
	display: flex;
	max-width: 360px;
	margin: 0 auto;
	flex-direction: column;
	gap: 32px;
}

.form__image {
	border-radius: 12px;
	width: 100%;
	min-width: 100%;
	max-width: 360px;
	aspect-ratio: 1;
	object-fit: cover;
	font-family: var(--font-primary);
	display: grid;
	place-items: center;
	color: var(--color-primary);
	margin-bottom: 12px;
	object-fit: cover;
	font-size: 12px;
	user-select: none;
	background-color: var(--color-secondary);
}

.form__error {
	color: var(--color-error);
	font-family: var(--font-primary);
	font-size: 12px;
}

.form__fieldset-row {
	display: flex;
	flex-wrap: wrap;
	gap: 12px;
}

@media screen and (min-width: 360px) {
	.form__image {
		min-width: 360px;
	}
}
</style>
