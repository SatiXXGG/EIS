import { UIElement } from "./generic";
import { CustomFrame } from "./UIElements/CustomFrame";
import { CustomImageButton } from "./UIElements/ImageButton";
import { CustomTextBox } from "./UIElements/TextBox";
import { CustomTextButton } from "./UIElements/TextButton";
import { CustomTextLabel } from "./UIElements/TextLabel";

export type CustomEISElements = CustomTextLabel | CustomTextButton | CustomFrame | CustomTextBox | CustomImageButton;
export type EISRootCallback = (eis: UIElement) => CustomEISElements;
export type ChildType = { [key: string]: EISRootCallback | CustomEISElements };

interface EISRootElements {
	[key: string]: EISRootCallback | EISRootElements;
}

export class EIS<T> {
	private root: EISRootElements;
	private renderResult?: EISRootElements;
	private main: ScreenGui;

	constructor(root: EISRootElements, main: ScreenGui) {
		this.root = root;
		this.main = main;
	}

	/**
	 * MAPS EVERYTHING IN THE ROOT TO THE EIS ELEMENTS
	 * @yields
	 */
	render(): T {
		const setup = (parent: EISRootElements, lastIndexer: UIElement | ScreenGui) => {
			for (const [key, value] of pairs(parent)) {
				const search = lastIndexer.WaitForChild(key, 1) as UIElement | undefined;
				if (search) {
					const call = value as EISRootCallback;
					const result = call(search);
					parent[key] = result as unknown as EISRootCallback;

					setup(result.childs as unknown as EISRootElements, search);
				}
			}
		};

		const clone = this.root as EISRootElements;
		setup(clone, this.main);
		return clone as T;
	}
}
