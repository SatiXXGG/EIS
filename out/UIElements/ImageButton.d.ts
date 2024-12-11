import { ChildType } from "..";
import { Value } from "../Elements/Value";
import { ClickableElement } from "./ClickableElement";
export declare class CustomImageButton<C extends ChildType = {}> extends ClickableElement<ImageButton, C> {
    constructor(item: ImageButton, childs: C);
    bindToValue(value: Value<unknown>): void;
    changeImage(id: string | number): void;
}
