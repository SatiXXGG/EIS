-- Compiled with roblox-ts v3.0.0
local TS = _G[script]
local ClickableElement = TS.import(script, script.Parent, "ClickableElement").ClickableElement
local CustomImageButton
do
	local super = ClickableElement
	CustomImageButton = setmetatable({}, {
		__tostring = function()
			return "CustomImageButton"
		end,
		__index = super,
	})
	CustomImageButton.__index = CustomImageButton
	function CustomImageButton.new(...)
		local self = setmetatable({}, CustomImageButton)
		return self:constructor(...) or self
	end
	function CustomImageButton:constructor(item, childs)
		super.constructor(self, item, childs)
	end
	function CustomImageButton:bindToValue(value)
		value:onChange(function(newValue)
			if type(newValue) == "string" then
				local found = { string.find(newValue, "rbxassetid://") }
				if found then
					self.element.Image = newValue
				else
					self.element.Image = ("rbxassetid://" .. tostring(newValue))
				end
			end
		end)
	end
	function CustomImageButton:changeImage(id)
		if type(id) == "string" then
			local found = { string.find(id, "rbxassetid://") }
			if found then
				self.element.Image = id
			else
				self.element.Image = ("rbxassetid://" .. tostring(id))
			end
		end
	end
end
return {
	CustomImageButton = CustomImageButton,
}
