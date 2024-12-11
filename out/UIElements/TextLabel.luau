-- Compiled with roblox-ts v3.0.0
local TS = _G[script]
local TextObject = TS.import(script, script.Parent, "TextObject").TextObject
local CustomTextLabel
do
	local super = TextObject
	CustomTextLabel = setmetatable({}, {
		__tostring = function()
			return "CustomTextLabel"
		end,
		__index = super,
	})
	CustomTextLabel.__index = CustomTextLabel
	function CustomTextLabel.new(...)
		local self = setmetatable({}, CustomTextLabel)
		return self:constructor(...) or self
	end
	function CustomTextLabel:constructor(element, childs)
		super.constructor(self, element, childs)
	end
end
return {
	CustomTextLabel = CustomTextLabel,
}
