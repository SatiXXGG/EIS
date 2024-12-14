import { ChildType } from "..";
import { Value } from "../Elements/Value";
import { Element } from "../generic";

export class CustomViewportFrame<C extends ChildType = {}> extends Element<ViewportFrame, C> {
	private camera: Camera | undefined;
	private worldModel: WorldModel;

	constructor(element: ViewportFrame, childs: C) {
		super(element, childs);

		this.worldModel = new Instance("WorldModel");
		this.worldModel.Parent = this.element;
	}

	addCamera() {
		if (!this.camera) {
			this.camera = new Instance("Camera");
			this.camera.Parent = this.element;
			this.element.CurrentCamera = this.camera;
		}
	}

	setCameraCFrame(cf: CFrame) {
		if (this.camera) {
			this.camera.CFrame = cf;
		}
	}

	render(instance: BasePart | Model) {
		instance.Parent = this.worldModel;
	}

	clearRenderItems(checker: (x: BasePart | Model) => boolean) {
		this.worldModel.GetChildren().forEach((x) => {
			if (checker(x as BasePart | Model)) {
				x.Destroy();
			}
		});
	}

	getCameraCFrame() {
		if (this.camera) {
			return this.camera.CFrame;
		}
	}

	bindToValue(value: Value<unknown>): void {
		warn("bindToValue is not implemented on ViewportFrames!");
	}
}
