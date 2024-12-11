import { ChildType } from "..";
import { Value } from "../Elements/Value";
import { Element } from "../generic";
export declare class CustomImageLabel<C extends ChildType = {}> extends Element<ImageLabel, C> {
    constructor(item: ImageLabel, childs: C);
    bindToValue(value: Value<unknown>): void;
    changeImage(id: string | number): void;
}
