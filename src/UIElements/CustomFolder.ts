import { ChildType, CustomEISElements } from "..";

export class CustomFolder<C extends ChildType = {}> {
	public childs: C;
	public unusable = false;
	public element: Folder;
	constructor(folder: Folder, childs: C) {
		this.element = folder;
		this.childs = childs || ({} as C);
	}

	/**
	 *
	 * Filters the childs of the given element, with a checker functions if resolves true the child will be not filtered either it will be
	 * @param checker
	 * @generic E (Expected element type to be filtered)
	 * @returns Set<E>
	 */
	filterChilds<E>(checker: (child: E) => boolean): Set<E> {
		const filteredItems = new Set<E>();
		for (const [name, child] of pairs(this.childs)) {
			const a = child as CustomEISElements;
			if (!a.unusable) {
				const result = checker(child as E);
				if (result) {
					filteredItems.add(child as E);
				}
			}
		}
		return filteredItems;
	}

	destroyChilds(checker: (child: CustomEISElements) => boolean) {
		for (const [name, child] of pairs(this.childs as ChildType)) {
			const result = checker(child as CustomEISElements);
			if (result) {
				const a = child as CustomEISElements;
				a.element.Destroy();
				a.unusable = true;
			}
		}
	}
}
