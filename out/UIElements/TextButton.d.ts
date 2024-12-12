import { ChildType } from "..";
import { Value } from "../Elements/Value";
import { TextObject } from "./TextObject";
export declare class CustomTextButton<C extends ChildType = {}> extends TextObject<TextButton, C> {
    private clickCallbacks;
    private onceClickCallbacks;
    private hoverCallbacks;
    private unHoverCallbacks;
    hoverScaleEffect: boolean;
    nativeCooldown: boolean;
    cooldownSize: number;
    isInCooldown: Value<boolean>;
    constructor(element: TextButton, childs: C);
    onClick(callback: () => void): void;
    onClickOnce(callback: () => void): void;
    onHover(callback: () => void): void;
    onHoverEnds(callback: () => void): void;
}
