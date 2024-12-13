import { CustomEISElements } from "..";
import { Element, UIElement } from "../generic";

export class GenericChilds<T extends Element<UIElement> = Element<TextButton, {}>> {
	public readonly childs = new Set<T>();

	constructor(x: UIElement, childs: T[]) {
		for (const child of childs) {
			this.childs.add(child as T);
		}
	}

	forEach(callback: (child: T) => void) {
		this.childs.forEach(callback);
	}

	destroyChilds(checker: (child: CustomEISElements) => boolean) {
		for (const child of this.childs) {
			const result = checker(child as CustomEISElements);
			if (result) {
				child.element.Destroy();
				child.unusable = true;
			}
		}
	}

	filterChilds(checker: (child: T) => boolean) {
		const filteredItems = new Set<T>();
		for (const child of this.childs) {
			const result = checker(child);
			if (result) {
				filteredItems.add(child);
			}
		}
		return filteredItems;
	}

	add(child: T) {
		this.childs.add(child);
	}

	remove(child: T) {
		this.childs.delete(child);
	}
}
