import { CustomEISElements } from "..";
import { Element, UIElement } from "../generic";
export declare class GenericChilds<T extends Element<UIElement> = Element<TextButton, {}>> {
    readonly childs: Set<T>;
    constructor(x: UIElement, childs: T[]);
    forEach(callback: (child: T) => void): void;
    destroyChilds(checker: (child: CustomEISElements) => boolean): void;
    filterChilds(checker: (child: T) => boolean): Set<T>;
    add(child: T): void;
    remove(child: T): void;
}
