import { ChildType } from "..";
import { Value } from "../Elements/Value";
import { Element } from "../generic";
export abstract class ClickableElement<T extends TextButton | ImageButton, C extends ChildType> extends Element<T, C> {
	private clickCallbacks = new Set<() => void>();
	private onceClickCallbacks = new Set<() => void>();

	public nativeCooldown = false;
	public cooldownSize = 0.2;
	public isInCooldown = new Value(false);
	constructor(element: T, childs: C) {
		super(element, childs);

		this.element.MouseButton1Click.Connect(() => {
			this.clickCallbacks.forEach((callback) => {
				if (this.usable) {
					if (this.nativeCooldown) {
						if (this.isInCooldown.get()) return;
					}
					callback();

					if (this.nativeCooldown) {
						this.isInCooldown.set(true);
						task.delay(this.cooldownSize, () => this.isInCooldown.set(false));
					}
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
