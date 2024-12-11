import { ChildType } from "..";
import { Value } from "../Elements/Value";
import { Element } from "../generic";
export declare abstract class TextObject<T extends TextLabel | TextButton | TextBox, C extends ChildType> extends Element<T, C> {
    constructor(element: T, childs: C);
    /**
     * Changes the text of the text label
     * @param text
     */
    changeText(text: string): void;
    /**
     * Changes the text of the text label using a tween (typewrite effect)
     * In and Out
     * @param text
     * @yields
     */
    tweenText(text: string): void;
    /**
     * Changes the text of the text label using a tween (typewrite effect)
     * just In
     * @param text
     * @Irreversible
     */
    typewriteText(text: string): void;
    /**
     * Clears the text
     * @Irreversible
     */
    clearText(): void;
    /**
     * By default changes the text to the same value current value
     * if boolean then can be true or false (string)
     * if number then will be converted to string
     * if string then will be the same
     * @param value
     */
    bindToValue<X>(value: Value<X>): void;
    /**
     * Creates a rainbow effect in the text
     * @param speed
     * @Irreversible
     */
    rainbowText(speed?: number): void;
}
