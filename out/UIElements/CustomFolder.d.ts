import { ChildType, CustomEISElements } from "..";
export declare class CustomFolder<C extends ChildType = {}> {
    childs: C;
    unusable: boolean;
    element: Folder;
    constructor(folder: Folder, childs: C);
    filterChilds(checker: (child: CustomEISElements) => boolean): Set<CustomEISElements>;
    destroyChilds(checker: (child: CustomEISElements) => boolean): void;
}
