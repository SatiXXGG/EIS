-- Compiled with roblox-ts v3.0.0
local GenericChilds
do
	GenericChilds = setmetatable({}, {
		__tostring = function()
			return "GenericChilds"
		end,
	})
	GenericChilds.__index = GenericChilds
	function GenericChilds.new(...)
		local self = setmetatable({}, GenericChilds)
		return self:constructor(...) or self
	end
	function GenericChilds:constructor(x, childs)
		self.childs = {}
		for _, child in childs do
			self.childs[child] = true
		end
	end
	function GenericChilds:forEach(callback)
		local _childs = self.childs
		local _callback = callback
		for _v in _childs do
			_callback(_v, _v, _childs)
		end
	end
	function GenericChilds:destroyChilds(checker)
		for child in self.childs do
			local result = checker(child)
			if result then
				child.element:Destroy()
				child.unusable = true
			end
		end
	end
	function GenericChilds:filterChilds(checker)
		local filteredItems = {}
		for child in self.childs do
			local result = checker(child)
			if result then
				filteredItems[child] = true
			end
		end
		return filteredItems
	end
	function GenericChilds:add(child)
		local _childs = self.childs
		local _child = child
		_childs[_child] = true
	end
	function GenericChilds:remove(child)
		local _childs = self.childs
		local _child = child
		_childs[_child] = nil
	end
end
return {
	GenericChilds = GenericChilds,
}
