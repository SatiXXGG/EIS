-- Compiled with roblox-ts v3.0.0
local TS = _G[script]
local TextObject = TS.import(script, script.Parent, "TextObject").TextObject
local CustomTextBox
do
	local super = TextObject
	CustomTextBox = setmetatable({}, {
		__tostring = function()
			return "CustomTextBox"
		end,
		__index = super,
	})
	CustomTextBox.__index = CustomTextBox
	function CustomTextBox.new(...)
		local self = setmetatable({}, CustomTextBox)
		return self:constructor(...) or self
	end
	function CustomTextBox:constructor(element, childs)
		super.constructor(self, element, childs)
		self.callback = {}
		self.maxLength = 999
		self.lastText = self.element.Text
		self.element:GetPropertyChangedSignal("Text"):Connect(function()
			local _exp = self.callback
			-- ▼ ReadonlySet.forEach ▼
			local _callback = function(callback)
				callback(self.element.Text)
			end
			for _v in _exp do
				_callback(_v, _v, _exp)
			end
			-- ▲ ReadonlySet.forEach ▲
			if #self.element.Text > self.maxLength then
				self.element.Text = self.lastText
			else
				self.lastText = self.element.Text
			end
		end)
	end
	function CustomTextBox:onChange(callback)
		local _callback = self.callback
		local _callback_1 = callback
		_callback[_callback_1] = true
	end
end
return {
	CustomTextBox = CustomTextBox,
}
