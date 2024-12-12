import { UIElement } from "./generic";
import { CustomFolder } from "./UIElements/CustomFolder";
import { CustomFrame } from "./UIElements/CustomFrame";
import { CustomImageButton } from "./UIElements/ImageButton";
import { CustomImageLabel } from "./UIElements/ImageLabel";
import { CustomTextBox } from "./UIElements/TextBox";
import { CustomTextButton } from "./UIElements/TextButton";
import { CustomTextLabel } from "./UIElements/TextLabel";
export type CustomEISElements = CustomTextLabel | CustomTextButton | CustomFrame | CustomTextBox | CustomImageButton | CustomFolder | CustomImageLabel;
export type EISRootCallback = (eis: UIElement) => CustomEISElements;
export type ChildType = {
    [key: string]: EISRootCallback | CustomEISElements;
};
interface EISRootElements {
    [key: string]: EISRootCallback | EISRootElements;
}
export declare class EIS {
    private root;
    private main;
    static debugMode: boolean;
    constructor(root: EISRootElements, main: ScreenGui | Frame | Folder);
    changeRootParent(newParent: Instance): void;
    /**
     * MAPS EVERYTHING IN THE ROOT TO THE EIS ELEMENTS
     * @yields
     */
    render<T>(): T;
}
export {};
