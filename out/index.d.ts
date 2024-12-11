import { UIElement } from "./generic";
import { CustomFrame } from "./UIElements/CustomFrame";
import { CustomImageButton } from "./UIElements/ImageButton";
import { CustomTextBox } from "./UIElements/TextBox";
import { CustomTextButton } from "./UIElements/TextButton";
import { CustomTextLabel } from "./UIElements/TextLabel";
export type CustomEISElements = CustomTextLabel | CustomTextButton | CustomFrame | CustomTextBox | CustomImageButton;
export type EISRootCallback = (eis: UIElement) => CustomEISElements;
export type ChildType = {
    [key: string]: EISRootCallback | CustomEISElements;
};
interface EISRootElements {
    [key: string]: EISRootCallback | EISRootElements;
}
export declare class EIS<T> {
    private root;
    private renderResult?;
    private main;
    constructor(root: EISRootElements, main: ScreenGui);
    /**
     * MAPS EVERYTHING IN THE ROOT TO THE EIS ELEMENTS
     * @yields
     */
    render(): T;
}
export {};
