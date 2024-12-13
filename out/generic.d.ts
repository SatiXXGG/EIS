import { ChildType, CustomEISElements } from ".";
import { Value } from "./Elements/Value";
export type UIElement = TextLabel | TextBox | ImageButton | ImageLabel | TextButton | Frame;
export declare abstract class Element<T extends UIElement, C extends ChildType = {}> {
    element: T;
    protected usable: boolean;
    childs: C;
    hoverScaleEffect: boolean;
    unusable: boolean;
    hoverScaleEffectInfo: TweenInfo;
    private hoverCallbacks;
    private unHoverCallbacks;
    constructor(element: T, childs?: C);
    abstract bindToValue(value: Value<unknown>): void;
    /**
     * Destroys the element
     */
    destroy(): void;
    /**
     * Changes the visibility of the element
     * @param value
     */
    setVisible(value: boolean): void;
    /**
     * Changes the visibility of the element for a given amount of seconds
     * @param secs the amount of seconds that you want to hide the element
     */
    hideFor(secs: number): void;
    runIfUsable<A>(callback: (args: A) => void, args?: A, notUsableCallback?: () => void): void;
    /**
     * Changes the usable state of the element
     * @param value
     */
    setUsable(value: boolean): void;
    bindTransparencyToValue(value: Value<number>): void;
    bindVisibilityToValue(value: Value<boolean>): void;
    /**
     * Tween the element to the desired goal
     * @param property The property to tween
     * @param goal The goal to tween to
     * @param info The tween info
     */
    /**
     * Tween the position of the element to the desired position
     * @param newPos
     * @param info
     * @returns
     */
    tweenPos(newPos: UDim2, info?: TweenInfo): Promise<unknown>;
    /**
     * Tween the size of the element to the desired size
     * @param newSize
     * @param info
     * @returns
     */
    tweenSize(newSize: UDim2, info?: TweenInfo): Promise<unknown>;
    /**
     * Changes the background color of the element
     * @param color
     */
    setBackground(color: Color3): void;
    /**
     * Tween the background color of the element
     * @param info
     */
    tweenBackground(color: Color3, info?: TweenInfo): Promise<unknown>;
    /**
     * Rainbow effect on the element background
     * @Irreversible
     */
    rainbowEffect(speed?: number): void;
    /**
     *
     * Filters the childs of the given element, with a checker functions if resolves true the child will be not filtered either it will be
     * @param checker
     * @generic E (Expected element type to be filtered)
     * @returns Set<E>
     */
    filterChilds<E extends Element<UIElement>>(checker: (child: E) => boolean): Set<E>;
    /**
     *
     * Filters the childs of the given element, with a checker functions if resolves true the child will be deleted either it will not
     * @param checker
     */
    destroyChilds(checker: (child: CustomEISElements) => boolean): void;
    /**
     * Tween the scale on the element
     * @param scale	Amount of scale to tween
     * @param info Tween info
     */
    tweenScale(scale: number, info?: TweenInfo): Promise<unknown> | undefined;
    /**
     * When the mouse enters the UI
     * @param callback
     */
    onHover(callback: () => void): void;
    /**
     * When the mouse leaves the UI
     * @param callback
     */
    onHoverEnds(callback: () => void): void;
    /**
     * THIS FUNCTION SHOULD BE USED ONLY WHEN YOU CREATE THIS ELEMENT OUT OF A ROOT AND A .render() method
     *
     * warn: THIS FUNCTION DOESN'T HAVE TYPE SAFETY SO USE ON YOUR OWN RISK

     * @yields
     * @borrows
     * @variation
     * @experimental
     */
    setupChilds<L>(): L;
}
