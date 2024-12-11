-- Compiled with roblox-ts v3.0.0
local CustomFolder
do
	CustomFolder = setmetatable({}, {
		__tostring = function()
			return "CustomFolder"
		end,
	})
	CustomFolder.__index = CustomFolder
	function CustomFolder.new(...)
		local self = setmetatable({}, CustomFolder)
		return self:constructor(...) or self
	end
	function CustomFolder:constructor(folder, childs)
		self.unusable = false
		self.element = folder
		self.childs = childs or ({})
	end
	function CustomFolder:filterChilds(checker)
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
	function CustomFolder:destroyChilds(checker)
		for name, child in pairs(self.childs) do
			local result = checker(child)
			if result then
				local a = child
				a.element:Destroy()
				a.unusable = true
			end
		end
	end
end
return {
	CustomFolder = CustomFolder,
}
