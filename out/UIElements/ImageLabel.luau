-- Compiled with roblox-ts v3.0.0
local TS = _G[script]
local Element = TS.import(script, script.Parent.Parent, "generic").Element
local CustomImageLabel
do
	local super = Element
	CustomImageLabel = setmetatable({}, {
		__tostring = function()
			return "CustomImageLabel"
		end,
		__index = super,
	})
	CustomImageLabel.__index = CustomImageLabel
	function CustomImageLabel.new(...)
		local self = setmetatable({}, CustomImageLabel)
		return self:constructor(...) or self
	end
	function CustomImageLabel:constructor(item, childs)
		super.constructor(self, item, childs)
	end
	function CustomImageLabel:bindToValue(value)
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
	function CustomImageLabel:changeImage(id)
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
	CustomImageLabel = CustomImageLabel,
}
