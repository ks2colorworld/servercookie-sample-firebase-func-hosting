import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
	// name: 'world' // <App> was created with unknown prop 'name'
	}
});

export default app;