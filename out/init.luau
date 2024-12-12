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
	function EIS:render()
		local setup
		setup = function(parent, lastIndexer)
			for key, value in pairs(parent) do
				local search = lastIndexer:WaitForChild(key, 1)
				if search then
					local call = value
					local result = call(search)
					parent[key] = result
					setup(result.childs, search)
				end
			end
		end
		local clone = self.root
		setup(clone, self.main)
		return clone
	end
end
return {
	EIS = EIS,
}
