import { UIElement } from "./generic";
import { CustomFolder } from "./UIElements/CustomFolder";
import { CustomFrame } from "./UIElements/CustomFrame";
import { CustomImageButton } from "./UIElements/ImageButton";
import { CustomImageLabel } from "./UIElements/ImageLabel";
import { CustomTextBox } from "./UIElements/TextBox";
import { CustomTextButton } from "./UIElements/TextButton";
import { CustomTextLabel } from "./UIElements/TextLabel";

export type CustomEISElements =
	| CustomTextLabel
	| CustomTextButton
	| CustomFrame
	| CustomTextBox
	| CustomImageButton
	| CustomFolder
	| CustomImageLabel;

export type EISRootCallback = (eis: UIElement) => CustomEISElements;
export type ChildType = { [key: string]: EISRootCallback | CustomEISElements };

interface EISRootElements {
	[key: string]: EISRootCallback | EISRootElements;
}

export class EIS {
	private root: EISRootElements;
	private main: ScreenGui | Frame | Folder;
	public static debugMode = false;

	constructor(root: EISRootElements, main: ScreenGui | Frame | Folder) {
		this.root = root;
		this.main = main;
	}

	changeRootParent(newParent: Instance) {
		this.main.Parent = newParent;
	}

	/**
	 * MAPS EVERYTHING IN THE ROOT TO THE EIS ELEMENTS
	 * @yields
	 */
	render<T>(): T {
		const setup = (parent: EISRootElements, lastIndexer: UIElement | ScreenGui | Folder) => {
			for (const [key, value] of pairs(parent)) {
				const search = lastIndexer.WaitForChild(key, 1) as UIElement | undefined;
				if (search) {
					const call = value as EISRootCallback;

					if (EIS.debugMode) {
						print("Mapping: " + key + " --->" + search.Name);
					}

					if (type(call) !== "function") {
						error("Error: " + key + " is not a EISRootCallback");
					}

					const result = call(search);

					if (EIS.debugMode) {
						print("-----> Mapped: " + key + " --->" + result);
					}

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
