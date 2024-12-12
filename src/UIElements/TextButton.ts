import { ChildType } from "..";
import { Value } from "../Elements/Value";
import { ClickableElement } from "./ClickableElement";
import { TextObject } from "./TextObject";

export class CustomTextButton<C extends ChildType = {}> extends TextObject<TextButton, C> {
	private clickCallbacks = new Set<() => void>();
	private onceClickCallbacks = new Set<() => void>();
	private hoverCallbacks = new Set<() => void>();
	private unHoverCallbacks = new Set<() => void>();
	public hoverScaleEffect = false;
	public nativeCooldown = false;
	public cooldownSize = 0.2;
	public isInCooldown = new Value(false);

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

		this.element.MouseEnter.Connect(() => {
			if (this.usable) {
				this.hoverCallbacks.forEach((callback) => callback());
				if (this.hoverScaleEffect) {
					this.tweenScale(1.1);
				}
			}
		});

		this.element.MouseLeave.Connect(() => {
			if (this.usable) {
				this.unHoverCallbacks.forEach((callback) => callback());

				if (this.hoverScaleEffect) {
					this.tweenScale(1);
				}
			}
		});
	}

	onClick(callback: () => void) {
		this.clickCallbacks.add(callback);
	}

	onClickOnce(callback: () => void) {
		this.onceClickCallbacks.add(callback);
	}

	onHover(callback: () => void) {
		this.hoverCallbacks.add(callback);
	}

	onHoverEnds(callback: () => void) {
		this.unHoverCallbacks.add(callback);
	}
}
