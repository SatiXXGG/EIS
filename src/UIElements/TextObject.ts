import { ChildType } from "..";
import { Value } from "../Elements/Value";
import { Element } from "../generic";

export abstract class TextObject<T extends TextLabel | TextButton | TextBox, C extends ChildType> extends Element<
	T,
	C
> {
	constructor(element: T, childs: C) {
		super(element, childs);
	}

	/**
	 * Changes the text of the text label
	 * @param text
	 */
	changeText(text: string) {
		this.element.Text = text;
	}
	/**
	 * Changes the text of the text label using a tween (typewrite effect)
	 * In and Out
	 * @param text
	 * @yields
	 */

	tweenText(text: string) {
		const oldText = this.element.Text;

		for (let i = oldText.size() - 1; i >= 0; i--) {
			this.element.Text = string.sub(oldText, 0, i);
			task.wait(0.05);
		}

		task.wait(0.2);
		this.element.Text = "";

		for (let i = 0; i < text.size() + 1; i++) {
			this.element.Text = string.sub(text, 0, i);
			task.wait(0.05);
		}
	}

	/**
	 * Changes the text of the text label using a tween (typewrite effect)
	 * just In
	 * @param text
	 * @Irreversible
	 */

	typewriteText(text: string) {
		this.element.Text = "";

		for (let i = 0; i < text.size() + 1; i++) {
			this.element.Text = string.sub(text, 0, i);
			task.wait(0.05);
		}
	}

	/**
	 * Clears the text
	 * @Irreversible
	 */

	clearText() {
		this.element.Text = "";
	}

	/**
	 * By default changes the text to the same value current value
	 * if boolean then can be true or false (string)
	 * if number then will be converted to string
	 * if string then will be the same
	 * @param value
	 */

	bindToValue<X>(value: Value<X>): void {
		value.onChange((newValue) => {
			if (type(newValue) === "string") {
				this.element.Text = newValue as string;
			} else if (type(newValue) === "number") {
				this.element.Text = tostring(newValue as number);
			} else if (type(newValue) === "boolean") {
				if (newValue) {
					this.element.Text = "True";
				} else {
					this.element.Text = "False";
				}
			}
		});
	}

	/**
	 * Creates a rainbow effect in the text
	 * @param speed
	 * @Irreversible
	 */

	rainbowText(speed: number = 0.01) {
		let i = 0;

		task.spawn(() => {
			while (this.element) {
				i += speed;
				this.element.TextColor3 = Color3.fromHSV(i, 1, 1);
				task.wait(0.1);

				if (i >= 1) {
					i = 0;
				}
			}
		});
	}
}
