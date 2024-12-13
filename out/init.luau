-- Compiled with roblox-ts v3.0.0
local EIS
do
	EIS = setmetatable({}, {
		__tostring = function()
			return "EIS"
		end,
	})
	EIS.__index = EIS
	function EIS.new(...)
		local self = setmetatable({}, EIS)
		return self:constructor(...) or self
	end
	function EIS:constructor(root, main)
		self.root = root
		self.main = main
	end
	function EIS:changeRootParent(newParent)
		self.main.Parent = newParent
	end
	function EIS:setupSingle(parent, lastIndexer)
		for key, value in pairs(parent) do
			local search = lastIndexer:WaitForChild(key, 1)
			if search then
				local call = value
				if EIS.debugMode then
					print("Mapping: " .. tostring(key) .. " --->" .. search.Name)
				end
				if type(call) ~= "function" then
					error("Error: " .. tostring(key) .. " is not a EISRootCallback")
				end
				local result = call(search)
				if EIS.debugMode then
					print("-----> Mapped: " .. tostring(key) .. " --->" .. tostring(result))
				end
				parent[key] = result
				EIS:setupSingle(result.childs, search)
			end
		end
	end
	function EIS:render()
		local clone = self.root
		EIS:setupSingle(clone, self.main)
		return clone
	end
	EIS.debugMode = false
end
return {
	EIS = EIS,
}
