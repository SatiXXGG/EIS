-- Compiled with roblox-ts v3.0.0
local TS = _G[script]
local Element = TS.import(script, script.Parent.Parent, "generic").Element
local TextObject
do
	local super = Element
	TextObject = setmetatable({}, {
		__tostring = function()
			return "TextObject"
		end,
		__index = super,
	})
	TextObject.__index = TextObject
	function TextObject:constructor(element, childs)
		super.constructor(self, element, childs)
	end
	function TextObject:changeText(text)
		self.element.Text = text
	end
	function TextObject:tweenText(text)
		local oldText = self.element.Text
		for i = #oldText - 1, 0, -1 do
			self.element.Text = string.sub(oldText, 0, i)
			task.wait(0.05)
		end
		task.wait(0.2)
		self.element.Text = ""
		for i = 0, #text do
			self.element.Text = string.sub(text, 0, i)
			task.wait(0.05)
		end
	end
	function TextObject:typewriteText(text)
		self.element.Text = ""
		for i = 0, #text do
			self.element.Text = string.sub(text, 0, i)
			task.wait(0.05)
		end
	end
	function TextObject:clearText()
		self.element.Text = ""
	end
	function TextObject:bindToValue(value)
		value:onChange(function(newValue)
			if type(newValue) == "string" then
				self.element.Text = newValue
			elseif type(newValue) == "number" then
				self.element.Text = tostring(newValue)
			elseif type(newValue) == "boolean" then
				if newValue ~= 0 and newValue == newValue and newValue ~= "" and newValue then
					self.element.Text = "True"
				else
					self.element.Text = "False"
				end
			end
		end)
	end
	function TextObject:rainbowText(speed)
		if speed == nil then
			speed = 0.01
		end
		local i = 0
		task.spawn(function()
			while self.element do
				i += speed
				self.element.TextColor3 = Color3.fromHSV(i, 1, 1)
				task.wait(0.1)
				if i >= 1 then
					i = 0
				end
			end
		end)
	end
end
return {
	TextObject = TextObject,
}
