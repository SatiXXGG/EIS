-- Compiled with roblox-ts v3.0.0
local TS = _G[script]
local TextObject = TS.import(script, script.Parent, "TextObject").TextObject
local CustomTextButton
do
	local super = TextObject
	CustomTextButton = setmetatable({}, {
		__tostring = function()
			return "CustomTextButton"
		end,
		__index = super,
	})
	CustomTextButton.__index = CustomTextButton
	function CustomTextButton.new(...)
		local self = setmetatable({}, CustomTextButton)
		return self:constructor(...) or self
	end
	function CustomTextButton:constructor(element, childs)
		super.constructor(self, element, childs)
		self.clickCallbacks = {}
		self.onceClickCallbacks = {}
		self.element.MouseButton1Click:Connect(function()
			local _exp = self.clickCallbacks
			-- ▼ ReadonlySet.forEach ▼
			local _callback = function(callback)
				if self.usable then
					callback()
				end
			end
			for _v in _exp do
				_callback(_v, _v, _exp)
			end
			-- ▲ ReadonlySet.forEach ▲
			local _exp_1 = self.onceClickCallbacks
			-- ▼ ReadonlySet.forEach ▼
			local _callback_1 = function(callback)
				if self.usable then
					callback()
					local _onceClickCallbacks = self.onceClickCallbacks
					local _callback_2 = callback
					_onceClickCallbacks[_callback_2] = nil
				end
			end
			for _v in _exp_1 do
				_callback_1(_v, _v, _exp_1)
			end
			-- ▲ ReadonlySet.forEach ▲
		end)
	end
	function CustomTextButton:onClick(callback)
		local _clickCallbacks = self.clickCallbacks
		local _callback = callback
		_clickCallbacks[_callback] = true
	end
	function CustomTextButton:onClickOnce(callback)
		local _onceClickCallbacks = self.onceClickCallbacks
		local _callback = callback
		_onceClickCallbacks[_callback] = true
	end
end
return {
	CustomTextButton = CustomTextButton,
}
