import { ChildType } from "..";
import { ClickableElement } from "./ClickableElement";
import { TextObject } from "./TextObject";

export class CustomTextButton<C extends ChildType = {}> extends TextObject<TextButton, C> {
	private clickCallbacks = new Set<() => void>();
	private onceClickCallbacks = new Set<() => void>();
	constructor(element: TextButton, childs: C) {
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
