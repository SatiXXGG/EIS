import { ChildType } from "..";
import { TextObject } from "./TextObject";
export declare class CustomTextButton<C extends ChildType = {}> extends TextObject<TextButton, C> {
    private clickCallbacks;
    private onceClickCallbacks;
    constructor(element: TextButton, childs: C);
    onClick(callback: () => void): void;
    onClickOnce(callback: () => void): void;
}
