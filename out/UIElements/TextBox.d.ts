import { ChildType } from "..";
import { TextObject } from "./TextObject";
export declare class CustomTextBox<C extends ChildType = {}> extends TextObject<TextBox, C> {
    protected callback: Set<(newValue: string) => void>;
    maxLength: number;
    private lastText;
    constructor(element: TextBox, childs: C);
    onChange(callback: (newValue: string) => void): void;
}
