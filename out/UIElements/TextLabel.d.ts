import { ChildType } from "..";
import { TextObject } from "./TextObject";
export declare class CustomTextLabel<C extends ChildType = {}> extends TextObject<TextLabel, C> {
    constructor(element: TextLabel, childs: C);
}
