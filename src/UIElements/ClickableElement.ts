import { ChildType } from "..";
import { Element } from "../generic";

export abstract class ClickableElement<T extends TextButton | ImageButton, C extends ChildType> extends Element<T, C> {
	private clickCallbacks = new Set<() => void>();
	private onceClickCallbacks = new Set<() => void>();
	constructor(element: T, childs: C) {
		super(element, childs);

		this.element.MouseButton1Click.Connect(() => {
			this.clickCallbacks.forEach((callback) => {
				if (this.usable) {
					callback();
				}
			});

			this.onceClickCallbacks.forEach((callback) => {
				if (this.usable) {
					callback();
					this.onceClickCallbacks.delete(callback);
				}
			});
		});
	}

	onClick(callback: () => void) {
		this.clickCallbacks.add(callback);
	}

	onClickOnce(callback: () => void) {
		this.onceClickCallbacks.add(callback);
	}
}
