export declare class Value<T> {
    private value;
    private callbacks;
    constructor(value: T);
    onChange(callback: (newValue: T) => void): void;
    set(newValue: T): void;
    get(): T;
}
