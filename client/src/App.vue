<template>
	<nav>
		<router-link
			class="router-link"
			to="/">
			Новая позиция
		</router-link>
		<router-link
			class="router-link"
			to="/storage">
			Хранилище
		</router-link>
	</nav>
	<div class="app-layout">
		<router-view></router-view>
	</div>
</template>
<style>
.app-layout {
	max-width: 1440px;
	padding: 0px 10px 0px 10px;
	margin: 0 auto;
}

nav {
	display: flex;
	justify-content: center;
	padding: 16px;
	gap: 16px;
	flex-wrap: wrap;

	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

.router-link {
	font-family: var(--font-primary);
	color: var(--color-accent);
	font-weight: bold;
	font-size: 24px;
	text-decoration: none;
}

.router-link-active {
	text-decoration: underline;
}
</style>
