-- Compiled with roblox-ts v3.0.0
local TS = _G[script]
local Element = TS.import(script, script.Parent.Parent, "generic").Element
local CustomFrame
do
	local super = Element
	CustomFrame = setmetatable({}, {
		__tostring = function()
			return "CustomFrame"
		end,
		__index = super,
	})
	CustomFrame.__index = CustomFrame
	function CustomFrame.new(...)
		local self = setmetatable({}, CustomFrame)
		return self:constructor(...) or self
	end
	function CustomFrame:constructor(frame, childs)
		super.constructor(self, frame, childs)
	end
	function CustomFrame:bindToValue(value)
		value:onChange(function(newValue)
			if type(newValue) == "number" then
				self.element.BackgroundTransparency = newValue
			end
		end)
	end
end
return {
	CustomFrame = CustomFrame,
}
