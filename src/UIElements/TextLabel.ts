import { ChildType } from "..";
import { Value } from "../Elements/Value";
import { Element } from "../generic";
import { TextObject } from "./TextObject";

export class CustomTextLabel<C extends ChildType = {}> extends TextObject<TextLabel, C> {
	constructor(element: TextLabel, childs: C) {
		super(element, childs);
	}
}
