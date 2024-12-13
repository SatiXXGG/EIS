-- Compiled with roblox-ts v3.0.0
local TS = _G[script]
local EIS = TS.import(script, script.Parent).EIS
local TweenService = game:GetService("TweenService")
local Element
do
	Element = {}
	function Element:constructor(element, childs)
		self.usable = true
		self.hoverScaleEffect = false
		self.unusable = false
		self.hoverScaleEffectInfo = TweenInfo.new(0.3, Enum.EasingStyle.Elastic, Enum.EasingDirection.Out)
		self.hoverCallbacks = {}
		self.unHoverCallbacks = {}
		self.element = element
		self.childs = childs or ({})
		self.element.MouseEnter:Connect(function()
			if self.usable then
				local _exp = self.hoverCallbacks
				-- ▼ ReadonlySet.forEach ▼
				local _callback = function(callback)
					return callback()
				end
				for _v in _exp do
					_callback(_v, _v, _exp)
				end
				-- ▲ ReadonlySet.forEach ▲
				if self.hoverScaleEffect then
					self:tweenScale(1.1, self.hoverScaleEffectInfo)
				end
			end
		end)
		self.element.MouseLeave:Connect(function()
			if self.usable then
				local _exp = self.unHoverCallbacks
				-- ▼ ReadonlySet.forEach ▼
				local _callback = function(callback)
					return callback()
				end
				for _v in _exp do
					_callback(_v, _v, _exp)
				end
				-- ▲ ReadonlySet.forEach ▲
				if self.hoverScaleEffect then
					self:tweenScale(1, self.hoverScaleEffectInfo)
				end
			end
		end)
	end
	function Element:destroy()
		self.element:Destroy()
		self.unusable = true
	end
	function Element:setVisible(value)
		self.element.Visible = value
	end
	function Element:hideFor(secs)
		self:setVisible(false)
		task.wait(secs)
		self:setVisible(true)
	end
	function Element:runIfUsable(callback, args, notUsableCallback)
		local _value = self.usable and args
		if _value ~= 0 and _value == _value and _value ~= "" and _value then
			callback(args)
		else
			local _result = notUsableCallback
			if _result ~= nil then
				_result()
			end
		end
	end
	function Element:setUsable(value)
		self.usable = value
	end
	function Element:bindTransparencyToValue(value)
		value:onChange(function(newValue)
			self.element.Transparency = newValue
		end)
	end
	function Element:bindVisibilityToValue(value)
		value:onChange(function(newValue)
			self.element.Visible = newValue
		end)
	end
	function Element:tweenPos(newPos, info)
		if info == nil then
			info = TweenInfo.new(1)
		end
		local tween = TweenService:Create(self.element, info, {
			Position = newPos,
		})
		return TS.Promise.new(function(resolve, reject)
			tween:Play()
			tween.Completed:Once(function()
				resolve(true)
			end)
		end)
	end
	function Element:tweenSize(newSize, info)
		if info == nil then
			info = TweenInfo.new(1)
		end
		local tween = TweenService:Create(self.element, info, {
			Size = newSize,
		})
		return TS.Promise.new(function(resolve, reject)
			tween:Play()
			tween.Completed:Once(function()
				resolve(true)
			end)
		end)
	end
	function Element:setBackground(color)
		self.element.BackgroundColor3 = color
	end
	function Element:tweenBackground(color, info)
		if info == nil then
			info = TweenInfo.new(1)
		end
		local tween = TweenService:Create(self.element, info, {
			BackgroundColor3 = color,
		})
		tween:Play()
		return TS.Promise.new(function(resolve, reject)
			tween.Completed:Once(function()
				resolve(true)
			end)
		end)
	end
	function Element:rainbowEffect(speed)
		if speed == nil then
			speed = 0.01
		end
		local i = 0
		task.spawn(function()
			while self.element do
				i += speed
				self.element.BackgroundColor3 = Color3.fromHSV(i, 1, 1)
				task.wait(0.1)
				if i >= 1 then
					i = 0
				end
			end
		end)
	end
	function Element:filterChilds(checker)
		local filteredItems = {}
		for name, child in pairs(self.childs) do
			local a = child
			if not a.unusable then
				local result = checker(child)
				if result then
					filteredItems[child] = true
				end
			end
		end
		return filteredItems
	end
	function Element:destroyChilds(checker)
		for name, child in pairs(self.childs) do
			local result = checker(child)
			if EIS.debugMode then
				print("Deleting " .. tostring(name) .. " with result ---> " .. tostring(result))
			end
			if result then
				local a = child
				a.element:Destroy()
				a.unusable = true
			end
		end
	end
	function Element:tweenScale(scale, info)
		if info == nil then
			info = TweenInfo.new(1)
		end
		local uiScale = self.element:FindFirstChildWhichIsA("UIScale")
		if uiScale then
			local tween = TweenService:Create(uiScale, info, {
				Scale = scale,
			})
			return TS.Promise.new(function(resolve, reject)
				tween:Play()
				tween.Completed:Once(function()
					resolve(true)
				end)
			end)
		else
			warn("There isn't any UIScale member on the element " .. self.element.Name)
		end
	end
	function Element:onHover(callback)
		local _hoverCallbacks = self.hoverCallbacks
		local _callback = callback
		_hoverCallbacks[_callback] = true
	end
	function Element:onHoverEnds(callback)
		local _unHoverCallbacks = self.unHoverCallbacks
		local _callback = callback
		_unHoverCallbacks[_callback] = true
	end
	function Element:setupChilds()
		local clone = self.childs
		EIS:setupSingle(clone, self.element)
		self.childs = clone
	end
end
return {
	Element = Element,
}
