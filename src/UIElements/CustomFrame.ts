import { ChildType } from "..";
import { Value } from "../Elements/Value";
import { Element } from "../generic";

export class CustomFrame<C extends ChildType = {}> extends Element<Frame, C> {
	constructor(frame: Frame, childs: C) {
		super(frame, childs);
	}

	bindToValue(value: Value<unknown>): void {
		value.onChange((newValue) => {
			if (type(newValue) === "number") {
				this.element.BackgroundTransparency = newValue as number;
			}
		});
	}
}
