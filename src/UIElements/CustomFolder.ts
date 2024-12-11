import { ChildType, CustomEISElements } from "..";

export class CustomFolder<C extends ChildType = {}> {
    public childs: C
    public unusable = false;
    public element: Folder
    constructor(folder: Folder, childs: C) {
        this.element = folder
        this.childs = childs || ({} as C)
    }

    	filterChilds(checker: (child: CustomEISElements) => boolean): Set<CustomEISElements> {
		const filteredItems = new Set<CustomEISElements>();
		for (const [name, child] of pairs(this.childs)) {
			const a = child as CustomEISElements;
			if (!a.unusable) {
				const result = checker(child as CustomEISElements);
				print(result);
				if (result) {
					filteredItems.add(child as CustomEISElements);
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
