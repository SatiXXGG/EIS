import { ChildType } from "..";
import { Value } from "../Elements/Value";
import { Element } from "../generic";
export declare class CustomFrame<C extends ChildType = {}> extends Element<Frame, C> {
    constructor(frame: Frame, childs: C);
    bindToValue(value: Value<unknown>): void;
}
