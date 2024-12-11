-- Compiled with roblox-ts v3.0.0
local Value
do
	Value = setmetatable({}, {
		__tostring = function()
			return "Value"
		end,
	})
	Value.__index = Value
	function Value.new(...)
		local self = setmetatable({}, Value)
		return self:constructor(...) or self
	end
	function Value:constructor(value)
		self.callbacks = {}
		self.value = value
	end
	function Value:onChange(callback)
		local _result = self.callbacks
		if _result ~= nil then
			local _callback = callback
			_result[_callback] = true
		end
	end
	function Value:set(newValue)
		self.value = newValue
		if self.callbacks then
			local _exp = self.callbacks
			-- ▼ ReadonlySet.forEach ▼
			local _callback = function(callback)
				return callback(newValue)
			end
			for _v in _exp do
				_callback(_v, _v, _exp)
			end
			-- ▲ ReadonlySet.forEach ▲
		end
	end
	function Value:get()
		return self.value
	end
end
return {
	Value = Value,
}
