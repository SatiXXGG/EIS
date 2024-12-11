import { ChildType } from "..";
import { Value } from "../Elements/Value";
import { ClickableElement } from "./ClickableElement";

export class CustomImageButton<C extends ChildType = {}> extends ClickableElement<ImageButton, C> {
	constructor(item: ImageButton, childs: C) {
		super(item, childs);
	}

	bindToValue(value: Value<unknown>): void {
		value.onChange((newValue) => {
			if (type(newValue) === "string") {
				const found = string.find(newValue as string, "rbxassetid://");
				if (found) {
					this.element.Image = newValue as string;
				} else {
					this.element.Image = ("rbxassetid://" + newValue) as string;
				}
			}
		});
	}

	changeImage(id: string | number) {
		if (type(id) === "string") {
			const found = string.find(id as string, "rbxassetid://");
			if (found) {
				this.element.Image = id as string;
			} else {
				this.element.Image = ("rbxassetid://" + id) as string;
			}
		}
	}
}
