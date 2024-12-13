import { ChildType, CustomEISElements, EIS, EISRootElements } from ".";
import { Value } from "./Elements/Value";

export type UIElement = TextLabel | TextBox | ImageButton | ImageLabel | TextButton | Frame;
const TweenService = game.GetService("TweenService");
export abstract class Element<T extends UIElement, C extends ChildType = {}> {
	public element: T;
	protected usable: boolean = true;
	public childs: C;
	public hoverScaleEffect = false;
	public unusable = false;
	public hoverScaleEffectInfo = new TweenInfo(0.3, Enum.EasingStyle.Elastic, Enum.EasingDirection.Out);
	private hoverCallbacks = new Set<() => void>();
	private unHoverCallbacks = new Set<() => void>();

	constructor(element: T, childs?: C) {
		this.element = element;
		this.childs = childs || ({} as C);

		this.element.MouseEnter.Connect(() => {
			if (this.usable) {
				this.hoverCallbacks.forEach((callback) => callback());
				if (this.hoverScaleEffect) {
					this.tweenScale(1.1, this.hoverScaleEffectInfo);
				}
			}
		});

		this.element.MouseLeave.Connect(() => {
			if (this.usable) {
				this.unHoverCallbacks.forEach((callback) => callback());

				if (this.hoverScaleEffect) {
					this.tweenScale(1, this.hoverScaleEffectInfo);
				}
			}
		});
	}

	abstract bindToValue(value: Value<unknown>): void;

	/**
	 * Destroys the element
	 */

	destroy() {
		this.element.Destroy();
		this.unusable = true;
	}

	/**
	 * Changes the visibility of the element
	 * @param value
	 */

	setVisible(value: boolean) {
		this.element.Visible = value;
	}

	/**
	 * Changes the visibility of the element for a given amount of seconds
	 * @param secs the amount of seconds that you want to hide the element
	 */

	hideFor(secs: number) {
		this.setVisible(false);
		task.wait(secs);
		this.setVisible(true);
	}

	runIfUsable<A>(callback: (args: A) => void, args?: A, notUsableCallback?: () => void) {
		if (this.usable && args) {
			callback(args);
		} else {
			notUsableCallback?.();
		}
	}

	/**
	 * Changes the usable state of the element
	 * @param value
	 */

	setUsable(value: boolean) {
		this.usable = value;
	}

	bindTransparencyToValue(value: Value<number>) {
		value.onChange((newValue) => {
			this.element.Transparency = newValue as number;
		});
	}

	bindVisibilityToValue(value: Value<boolean>) {
		value.onChange((newValue) => {
			this.element.Visible = newValue;
		});
	}

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
	tweenPos(newPos: UDim2, info: TweenInfo = new TweenInfo(1)) {
		const tween = TweenService.Create(this.element as Frame, info, {
			Position: newPos,
		});
		return new Promise((resolve, reject) => {
			tween.Play();
			tween.Completed.Once(() => {
				resolve(true);
			});
		});
	}

	/**
	 * Tween the size of the element to the desired size
	 * @param newSize
	 * @param info
	 * @returns
	 */

	tweenSize(newSize: UDim2, info: TweenInfo = new TweenInfo(1)) {
		const tween = TweenService.Create(this.element as GuiObject, info, {
			Size: newSize,
		});
		return new Promise((resolve, reject) => {
			tween.Play();
			tween.Completed.Once(() => {
				resolve(true);
			});
		});
	}

	/**
	 * Changes the background color of the element
	 * @param color
	 */

	setBackground(color: Color3) {
		this.element.BackgroundColor3 = color;
	}

	/**
	 * Tween the background color of the element
	 * @param info
	 */

	tweenBackground(color: Color3, info: TweenInfo = new TweenInfo(1)) {
		const tween = TweenService.Create(this.element as GuiObject, info, {
			BackgroundColor3: color,
		});
		tween.Play();

		return new Promise((resolve, reject) => {
			tween.Completed.Once(() => {
				resolve(true);
			});
		});
	}

	/**
	 * Rainbow effect on the element background
	 * @Irreversible
	 */

	rainbowEffect(speed: number = 0.01) {
		let i = 0;

		task.spawn(() => {
			while (this.element) {
				i += speed;
				this.element.BackgroundColor3 = Color3.fromHSV(i, 1, 1);
				task.wait(0.1);

				if (i >= 1) {
					i = 0;
				}
			}
		});
	}

	/**
	 *
	 * Filters the childs of the given element, with a checker functions if resolves true the child will be not filtered either it will be
	 * @param checker
	 * @generic E (Expected element type to be filtered)
	 * @returns Set<E>
	 */

	filterChilds<E extends Element<UIElement>>(checker: (child: E) => boolean): Set<E> {
		const filteredItems = new Set<E>();
		for (const [name, child] of pairs(this.childs)) {
			const a = child as E;
			if (!a.unusable) {
				const result = checker(child as E);
				if (result) {
					filteredItems.add(child as E);
				}
			}
		}
		return filteredItems;
	}

	/**
	 *
	 * Filters the childs of the given element, with a checker functions if resolves true the child will be deleted either it will not
	 * @param checker
	 */

	destroyChilds(checker: (child: CustomEISElements) => boolean) {
		for (const [name, child] of pairs(this.childs as ChildType)) {
			const result = checker(child as CustomEISElements);
			if (EIS.debugMode) print("Deleting " + name + " with result ---> " + result);
			if (result) {
				const a = child as CustomEISElements;
				a.element.Destroy();
				a.unusable = true;
			}
		}
	}

	/**
	 * Tween the scale on the element
	 * @param scale	Amount of scale to tween
	 * @param info Tween info
	 */

	tweenScale(scale: number, info: TweenInfo = new TweenInfo(1)) {
		const uiScale = this.element.FindFirstChildWhichIsA("UIScale");
		if (uiScale) {
			const tween = TweenService.Create(uiScale, info, {
				Scale: scale,
			});
			return new Promise((resolve, reject) => {
				tween.Play();
				tween.Completed.Once(() => {
					resolve(true);
				});
			});
		} else {
			warn("There isn't any UIScale member on the element " + this.element.Name);
		}
	}

	/**
	 * When the mouse enters the UI
	 * @param callback
	 */

	onHover(callback: () => void) {
		this.hoverCallbacks.add(callback);
	}
	/**
	 * When the mouse leaves the UI
	 * @param callback
	 */

	onHoverEnds(callback: () => void) {
		this.unHoverCallbacks.add(callback);
	}

	/**
	 * THIS FUNCTION SHOULD BE USED ONLY WHEN YOU CREATE THIS ELEMENT OUT OF A ROOT AND A .render() method
	 *
	 * warn: THIS FUNCTION DOESN'T HAVE TYPE SAFETY SO USE ON YOUR OWN RISK
	 * @yields
	 * @borrows
	 * @variation
	 * @experimental
	 */

	changeParent(parent: Instance) {
		this.element.Parent = parent;
	}

	setupChilds<L>() {
		const clone = this.childs as EISRootElements;
		EIS.setupSingle(clone, this.element);
		this.childs = clone as C;
		return clone as L;
	}
}
