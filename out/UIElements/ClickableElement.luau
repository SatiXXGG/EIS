-- Compiled with roblox-ts v3.0.0
local TS = _G[script]
local Element = TS.import(script, script.Parent.Parent, "generic").Element
local ClickableElement
do
	local super = Element
	ClickableElement = setmetatable({}, {
		__tostring = function()
			return "ClickableElement"
		end,
		__index = super,
	})
	ClickableElement.__index = ClickableElement
	function ClickableElement:constructor(element, childs)
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
	function ClickableElement:onClick(callback)
		local _clickCallbacks = self.clickCallbacks
		local _callback = callback
		_clickCallbacks[_callback] = true
	end
	function ClickableElement:onClickOnce(callback)
		local _onceClickCallbacks = self.onceClickCallbacks
		local _callback = callback
		_onceClickCallbacks[_callback] = true
	end
end
return {
	ClickableElement = ClickableElement,
}
