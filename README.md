# Roblox UI Manager 🎮✨

Welcome to **Roblox UI Manager**! 🎉
This project is a user interface (UI) manager for Roblox Studio, built with **[Roblox-TS](https://roblox-ts.com/)** (TypeScript for Roblox). It provides advanced, type-safe tools to create, customize, and animate dynamic UIs effortlessly.

---

## 🚀 Features

- **Supports multiple UI elements:**
  Manage common elements like `TextLabel`, `TextBox`, `ImageButton`, `ImageLabel`, `TextButton`, and `Frame`.

- **Manipulation and animation:**
  🔹 Adjust properties like visibility, size, position, and color.
  🔹 Use **tweens** with `TweenService` for smooth animations.

- **Reactive interfaces:**
  🔗 Bind properties like transparency or visibility to dynamic values with change events.

- **State and resource management:**
  ✅ Control element usability.
  🗑️ Efficiently destroy elements and their children.

- **Advanced effects:**
  🌈 Add visual effects like a **rainbow background** (`rainbowEffect`) for vibrant designs.

- **Child filtering:**
  🔍 Find and manipulate child elements based on custom conditions.

---

## 🛠️ Installation




1. Install via NPM / PNPM
   ```bash
   npm install @rbxts/eis

2. Clone this repository:
   ```bash
   git clone https://github.com/your-username/roblox-ui-manager.git

3. Example of use
   ```typescript
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
