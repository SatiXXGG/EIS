export class Value<T> {
	private value: T;
	private callbacks = new Set<(newValue: T) => void>();
	constructor(value: T) {
		this.value = value;
	}

	onChange(callback: (newValue: T) => void) {
		this.callbacks?.add(callback);
	}

	set(newValue: T) {
		this.value = newValue;

		if (this.callbacks) {
			this.callbacks.forEach((callback) => callback(newValue));
		}
	}

	get(): T {
		return this.value;
	}
}
