import { ChildType, CustomEISElements } from "..";
import { UIElement } from "../generic";
export declare class CustomFolder<C extends ChildType = {}> {
    childs: C;
    unusable: boolean;
    element: Folder;
    /**
     * We're working on fixing the type for the folder
     * @param folder
     * @param childs
     */
    constructor(folder: UIElement, childs: C);
    /**
     *
     * Filters the childs of the given element, with a checker functions if resolves true the child will be not filtered either it will be
     * @param checker
     * @generic E (Expected element type to be filtered)
     * @returns Set<E>
     */
    filterChilds<E>(checker: (child: E) => boolean): Set<E>;
    destroyChilds(checker: (child: CustomEISElements) => boolean): void;
}
