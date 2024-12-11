import { ChildType } from "..";
import { TextObject } from "./TextObject";

export class CustomTextBox<C extends ChildType = {}> extends TextObject<TextBox, C> {
	protected callback = new Set<(newValue: string) => void>();
	public maxLength: number = 999;
	private lastText = this.element.Text;
	constructor(element: TextBox, childs: C) {
		super(element, childs);

		this.element.GetPropertyChangedSignal("Text").Connect(() => {
			this.callback.forEach((callback) => {
				callback(this.element.Text);
			});
			if (this.element.Text.size() > this.maxLength) {
				this.element.Text = this.lastText;
			} else {
				this.lastText = this.element.Text;
			}
		});
	}

	onChange(callback: (newValue: string) => void) {
		this.callback.add(callback);
	}
}
