import { EIS } from ".";
import { GenericChilds } from "./Elements/GenericChilds";
import { UIElement } from "./generic";
import { CustomFolder } from "./UIElements/CustomFolder";
import { CustomTextButton } from "./UIElements/TextButton";

const eis = new EIS(
	{
		main: (x) =>
			new CustomFolder(x, {
				someButton: (x: UIElement) => new CustomTextButton(x as TextButton, {}),
			}),
		variableScroll: (x: UIElement) => new GenericChilds(x, []),
	},
	new Instance("ScreenGui"),
);

const render = eis.render<{
	main: CustomFolder<{
		someButton: CustomTextButton;
	}>;
	variableScroll: GenericChilds<CustomTextButton>;
}>();

render.main.childs.someButton.onClick(() => print("Clicked"));

render.variableScroll.childs.add(new CustomTextButton(new Instance("TextButton"), {}));

render.variableScroll.forEach((a) => {
	a.onClick(() => print("Im a button!"));
});
