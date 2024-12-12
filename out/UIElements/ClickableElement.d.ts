import { ChildType } from "..";
import { Value } from "../Elements/Value";
import { Element } from "../generic";
export declare abstract class ClickableElement<T extends TextButton | ImageButton, C extends ChildType> extends Element<T, C> {
    private clickCallbacks;
    private onceClickCallbacks;
    nativeCooldown: boolean;
    cooldownSize: number;
    isInCooldown: Value<boolean>;
    constructor(element: T, childs: C);
    onClick(callback: () => void): void;
    onClickOnce(callback: () => void): void;
}
