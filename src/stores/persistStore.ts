import { writable, type Writable } from "svelte/store";
import { browser } from "$app/environment";

export const persistStore = (key: string, initial: Object) => {
	if (browser) {
		const persist = localStorage.getItem(key);
		const data = persist ? JSON.parse(persist) : initial;

		const store: Writable<any> = writable(data, () => {
			const unsubscribe = store.subscribe((value) => {
				localStorage.setItem(key, JSON.stringify(value));
			});
			return unsubscribe;
		});
		return store;
	}
};
