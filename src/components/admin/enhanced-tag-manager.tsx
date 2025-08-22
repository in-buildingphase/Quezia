'use client';

import { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
import { 
  Plus, Edit2, Trash2, Save, X, Eye, EyeOff, 
  Download, Upload, CheckSquare, Square,
  ArrowUp, ArrowDown
} from 'lucide-react';

interface Tag {
  _id: Id<"tags">;
  tagId: string;
  label: string;
  icon: string;
  color?: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: number;
}

export function EnhancedTagManager() {
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [editingTag, setEditingTag] = useState<Id<"tags"> | null>(null);
  const [selectedTags, setSelectedTags] = useState<Set<Id<"tags">>>(new Set());
  const [editForm, setEditForm] = useState({
    label: '',
    icon: 'Calculator',
    color: '',
    sortOrder: 1
  });
  const [newTag, setNewTag] = useState({
    tagId: '',
    label: '',
    icon: 'Calculator',
    color: '',
    sortOrder: 1
  });

  // Convex hooks
  const tags = useQuery(api.tags.getAllTags);
  const createTag = useMutation(api.tags.createTag);
  const updateTag = useMutation(api.tags.updateTag);
  const deleteTag = useMutation(api.tags.deleteTag);
  const swapTagOrder = useMutation(api.tags.swapTagOrder);

  const availableIcons = [
    'Calculator', 'Atom', 'TestTube', 'Zap', 'Book', 'Brain', 
    'FileText', 'Target', 'Award', 'Star', 'Lightbulb', 'Microscope',
    'Globe', 'Heart', 'Home', 'Music', 'Camera', 'Clock'
  ];

  const handleCreateTag = async () => {
    if (!newTag.tagId || !newTag.label) {
      alert('Please fill in Tag ID and Label');
      return;
    }

    try {
      await createTag({
        tagId: newTag.tagId,
        label: newTag.label,
        icon: newTag.icon,
        color: newTag.color || undefined,
        sortOrder: newTag.sortOrder
      });
      
      setNewTag({ tagId: '', label: '', icon: 'Calculator', color: '', sortOrder: 1 });
      setIsAddingTag(false);
    } catch (error) {
      alert(`Failed to create tag: ${error}`);
    }
  };

  const handleUpdateTag = async (id: Id<"tags">, updates: Partial<Omit<Tag, '_id' | 'tagId' | 'createdAt'>>) => {
    try {
      await updateTag({ id, ...updates });
      setEditingTag(null);
    } catch (error) {
      alert(`Failed to update tag: ${error}`);
    }
  };

  const handleSaveEdit = async () => {
    if (!editForm.label) {
      alert('Please fill in the Label');
      return;
    }

    try {
      await updateTag({ 
        id: editingTag!, 
        label: editForm.label,
        icon: editForm.icon,
        color: editForm.color || undefined,
        sortOrder: editForm.sortOrder
      });
      setEditingTag(null);
      setEditForm({ label: '', icon: 'Calculator', color: '', sortOrder: 1 });
    } catch (error) {
      alert(`Failed to update tag: ${error}`);
    }
  };

  const startEditing = (tag: Tag) => {
    setEditingTag(tag._id);
    setEditForm({
      label: tag.label,
      icon: tag.icon,
      color: tag.color || '',
      sortOrder: tag.sortOrder
    });
  };

  const cancelEdit = () => {
    setEditingTag(null);
    setEditForm({ label: '', icon: 'Calculator', color: '', sortOrder: 1 });
  };

  const handleDeleteTag = async (id: Id<"tags">) => {
    if (confirm('Are you sure you want to delete this tag?')) {
      try {
        await deleteTag({ id });
      } catch (error) {
        alert(`Failed to delete tag: ${error}`);
      }
    }
  };

  const handleBulkDelete = async () => {
    if (selectedTags.size === 0) return;
    
    if (confirm(`Are you sure you want to delete ${selectedTags.size} selected tags?`)) {
      try {
        // Run all deletions in parallel for better performance
        await Promise.all(
          Array.from(selectedTags).map(id => deleteTag({ id }))
        );
        setSelectedTags(new Set());
      } catch (error) {
        alert(`Failed to delete tags: ${error}`);
      }
    }
  };

  const handleBulkActivate = async () => {
    if (selectedTags.size === 0) return;
    
    try {
      // Run all updates in parallel for better performance
      await Promise.all(
        Array.from(selectedTags).map(id => updateTag({ id, isActive: true }))
      );
      setSelectedTags(new Set());
    } catch (error) {
      alert(`Failed to activate tags: ${error}`);
    }
  };

  const handleBulkDeactivate = async () => {
    if (selectedTags.size === 0) return;
    
    try {
      // Run all updates in parallel for better performance
      await Promise.all(
        Array.from(selectedTags).map(id => updateTag({ id, isActive: false }))
      );
      setSelectedTags(new Set());
    } catch (error) {
      alert(`Failed to deactivate tags: ${error}`);
    }
  };

  const handleExport = async () => {
    try {
      // Create export data manually from current tags
      const exportData = {
        exportedAt: new Date().toISOString(),
        totalTags: tags?.length || 0,
        tags: tags?.map(tag => ({
          tagId: tag.tagId,
          label: tag.label,
          icon: tag.icon,
          color: tag.color,
          isActive: tag.isActive,
          sortOrder: tag.sortOrder,
          createdAt: tag.createdAt
        })) || []
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
        type: 'application/json' 
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `tags-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      alert(`Failed to export tags: ${error}`);
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const importData = JSON.parse(text);
      
      if (!importData.tags || !Array.isArray(importData.tags)) {
        alert('Invalid import file format');
        return;
      }

      const replaceExisting = confirm(
        'Do you want to replace all existing tags? Click OK to replace, Cancel to merge.'
      );

      // Manual import process
      if (replaceExisting) {
        // Delete all existing tags in parallel for better performance
        if (tags && tags.length > 0) {
          await Promise.all(
            tags.map(tag => deleteTag({ id: tag._id }))
          );
        }
      }

      // Create new tags
      let importedCount = 0;
      for (const tag of importData.tags) {
        try {
          await createTag({
            tagId: tag.tagId,
            label: tag.label,
            icon: tag.icon,
            color: tag.color,
            sortOrder: tag.sortOrder
          });
          importedCount++;
        } catch (error) {
          console.warn(`Failed to import tag ${tag.tagId}:`, error);
        }
      }

      alert(`Successfully imported ${importedCount} tags`);
    } catch (error) {
      alert(`Failed to import tags: ${error}`);
    }
    
    // Reset the input
    event.target.value = '';
  };

  const moveTag = async (tag: Tag, direction: 'up' | 'down') => {
    const sortedTags = [...(tags || [])].sort((a, b) => a.sortOrder - b.sortOrder);
    const currentIndex = sortedTags.findIndex(t => t._id === tag._id);
    
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === sortedTags.length - 1)
    ) {
      return;
    }

    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const targetTag = sortedTags[targetIndex];

    // Use atomic swap to ensure consistency
    try {
      await swapTagOrder({
        id1: tag._id,
        id2: targetTag._id
      });
    } catch (error) {
      alert(`Failed to reorder tags: ${error}`);
    }
  };

  const toggleTagSelection = (tagId: Id<"tags">) => {
    const newSelection = new Set(selectedTags);
    if (newSelection.has(tagId)) {
      newSelection.delete(tagId);
    } else {
      newSelection.add(tagId);
    }
    setSelectedTags(newSelection);
  };

  const selectAllTags = () => {
    if (selectedTags.size === tags?.length) {
      setSelectedTags(new Set());
    } else {
      setSelectedTags(new Set(tags?.map(t => t._id) || []));
    }
  };

  const sortedTags = [...(tags || [])].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="rounded-2xl border border-[#333] backdrop-blur-md bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] p-8 shadow-2xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#FF8F00] to-[#FFD54F] bg-clip-text text-transparent mb-2">
            Tag Management
          </h2>
          <p className="text-[#B0B0B0]">Create, edit, and organize your application tags efficiently</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl hover:from-green-500 hover:to-green-400 transition-all duration-300 shadow-lg hover:shadow-green-500/25"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          
          <label className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:from-blue-500 hover:to-blue-400 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 cursor-pointer">
            <Upload className="w-4 h-4" />
            Import
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>

          <button
            onClick={() => setIsAddingTag(true)}
            className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#FF8F00] to-[#FFA000] text-black rounded-xl hover:from-[#FFA000] hover:to-[#FFD54F] transition-all duration-300 shadow-lg hover:shadow-[#FF8F00]/25 font-medium"
          >
            <Plus className="w-4 h-4" />
            Add New Tag
          </button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedTags.size > 0 && (
        <div className="mb-8 p-6 bg-gradient-to-r from-[#FF8F00]/10 to-[#FFD54F]/5 border border-[#FF8F00]/30 rounded-xl backdrop-blur-sm">
          <div className="flex justify-between items-center">
            <span className="text-[#FF8F00] font-semibold text-lg">
              {selectedTags.size} tag(s) selected
            </span>
            <div className="flex gap-3">
              <button
                onClick={handleBulkActivate}
                className="px-4 py-2 bg-gradient-to-r from-green-600/20 to-green-500/20 text-green-400 border border-green-500/30 rounded-lg text-sm hover:from-green-600/30 hover:to-green-500/30 transition-all duration-300"
              >
                Activate Selected
              </button>
              <button
                onClick={handleBulkDeactivate}
                className="px-4 py-2 bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-lg text-sm hover:from-yellow-600/30 hover:to-yellow-500/30 transition-all duration-300"
              >
                Deactivate Selected
              </button>
              <button
                onClick={handleBulkDelete}
                className="px-4 py-2 bg-gradient-to-r from-red-600/20 to-red-500/20 text-red-400 border border-red-500/30 rounded-lg text-sm hover:from-red-600/30 hover:to-red-500/30 transition-all duration-300"
              >
                Delete Selected
              </button>
              <button
                onClick={() => setSelectedTags(new Set())}
                className="px-4 py-2 bg-[#2A2A2A] text-[#B0B0B0] border border-[#444] rounded-lg text-sm hover:bg-[#333] hover:border-[#555] transition-all duration-300"
              >
                Clear Selection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Tag Form */}
      {isAddingTag && (
        <div className="mb-8 p-6 border border-[#FF8F00]/30 rounded-xl bg-gradient-to-br from-[#2A1F0A] to-[#3D2A0F] backdrop-blur-sm">
          <h3 className="text-xl font-semibold mb-6 text-[#FF8F00]">Add New Tag</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#E0E0E0] mb-2">
                Tag ID *
              </label>
              <input
                type="text"
                value={newTag.tagId}
                onChange={(e) => setNewTag({ ...newTag, tagId: e.target.value })}
                placeholder="e.g., biology"
                className="w-full px-4 py-3 border border-[#444] rounded-xl bg-[#1A1A1A] text-[#E0E0E0] placeholder-[#888] focus:outline-none focus:ring-2 focus:ring-[#FF8F00] focus:border-transparent transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#E0E0E0] mb-2">
                Label *
              </label>
              <input
                type="text"
                value={newTag.label}
                onChange={(e) => setNewTag({ ...newTag, label: e.target.value })}
                placeholder="e.g., Biology"
                className="w-full px-4 py-3 border border-[#444] rounded-xl bg-[#1A1A1A] text-[#E0E0E0] placeholder-[#888] focus:outline-none focus:ring-2 focus:ring-[#FF8F00] focus:border-transparent transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#E0E0E0] mb-2">
                Icon
              </label>
              <select
                value={newTag.icon}
                onChange={(e) => setNewTag({ ...newTag, icon: e.target.value })}
                className="w-full px-4 py-3 border border-[#444] rounded-xl bg-[#1A1A1A] text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#FF8F00] focus:border-transparent transition-all duration-300"
              >
                {availableIcons.map(icon => (
                  <option key={icon} value={icon} className="bg-[#1A1A1A]">{icon}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#E0E0E0] mb-2">
                Color (optional)
              </label>
              <input
                type="text"
                value={newTag.color}
                onChange={(e) => setNewTag({ ...newTag, color: e.target.value })}
                placeholder="e.g., #FF6B6B"
                className="w-full px-4 py-3 border border-[#444] rounded-xl bg-[#1A1A1A] text-[#E0E0E0] placeholder-[#888] focus:outline-none focus:ring-2 focus:ring-[#FF8F00] focus:border-transparent transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#E0E0E0] mb-2">
                Sort Order
              </label>
              <input
                type="number"
                value={newTag.sortOrder}
                onChange={(e) => setNewTag({ ...newTag, sortOrder: parseInt(e.target.value) || 1 })}
                className="w-full px-4 py-3 border border-[#444] rounded-xl bg-[#1A1A1A] text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#FF8F00] focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleCreateTag}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF8F00] to-[#FFA000] text-black rounded-xl hover:from-[#FFA000] hover:to-[#FFD54F] transition-all duration-300 shadow-lg font-medium"
            >
              <Save className="w-4 h-4" />
              Save Tag
            </button>
            <button
              onClick={() => setIsAddingTag(false)}
              className="flex items-center gap-2 px-6 py-3 bg-[#2A2A2A] text-[#E0E0E0] border border-[#444] rounded-xl hover:bg-[#333] hover:border-[#555] transition-all duration-300"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Edit Tag Form */}
      {editingTag && (
        <div className="mb-8 p-6 border border-orange-500/30 rounded-xl bg-gradient-to-br from-[#2A1A0A] to-[#3D2A0F] backdrop-blur-sm">
          <h3 className="text-xl font-semibold mb-6 text-orange-400">Edit Tag</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#E0E0E0] mb-2">
                Tag ID (Read-only)
              </label>
              <input
                type="text"
                value={tags?.find(t => t._id === editingTag)?.tagId || ''}
                disabled
                className="w-full px-4 py-3 border border-[#444] rounded-xl bg-[#2A2A2A] text-[#888] cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#E0E0E0] mb-2">
                Label *
              </label>
              <input
                type="text"
                value={editForm.label}
                onChange={(e) => setEditForm({ ...editForm, label: e.target.value })}
                placeholder="e.g., Biology"
                className="w-full px-4 py-3 border border-[#444] rounded-xl bg-[#1A1A1A] text-[#E0E0E0] placeholder-[#888] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#E0E0E0] mb-2">
                Icon
              </label>
              <select
                value={editForm.icon}
                onChange={(e) => setEditForm({ ...editForm, icon: e.target.value })}
                className="w-full px-4 py-3 border border-[#444] rounded-xl bg-[#1A1A1A] text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
              >
                {availableIcons.map(icon => (
                  <option key={icon} value={icon} className="bg-[#1A1A1A]">{icon}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#E0E0E0] mb-2">
                Color (optional)
              </label>
              <input
                type="text"
                value={editForm.color}
                onChange={(e) => setEditForm({ ...editForm, color: e.target.value })}
                placeholder="e.g., #FF6B6B"
                className="w-full px-4 py-3 border border-[#444] rounded-xl bg-[#1A1A1A] text-[#E0E0E0] placeholder-[#888] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#E0E0E0] mb-2">
                Sort Order
              </label>
              <input
                type="number"
                value={editForm.sortOrder}
                onChange={(e) => setEditForm({ ...editForm, sortOrder: parseInt(e.target.value) || 1 })}
                className="w-full px-4 py-3 border border-[#444] rounded-xl bg-[#1A1A1A] text-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSaveEdit}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-xl hover:from-orange-500 hover:to-orange-400 transition-all duration-300 shadow-lg font-medium"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
            <button
              onClick={cancelEdit}
              className="flex items-center gap-2 px-6 py-3 bg-[#2A2A2A] text-[#E0E0E0] border border-[#444] rounded-xl hover:bg-[#333] hover:border-[#555] transition-all duration-300"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Tags List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-[#E0E0E0]">
            Tags <span className="text-[#FF8F00]">({tags?.length || 0})</span>
          </h3>
          <button
            onClick={selectAllTags}
            className="flex items-center gap-2 text-sm text-[#FF8F00] hover:text-[#FFD54F] transition-colors"
          >
            {selectedTags.size === tags?.length ? (
              <CheckSquare className="w-4 h-4" />
            ) : (
              <Square className="w-4 h-4" />
            )}
            {selectedTags.size === tags?.length ? 'Deselect All' : 'Select All'}
          </button>
        </div>

        {sortedTags.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏷️</div>
            <p className="text-[#888] text-lg mb-2">No tags found</p>
            <p className="text-[#666] text-sm">Add your first tag using the button above!</p>
          </div>
        ) : (
          sortedTags.map((tag: Tag, index) => (
            <div key={tag._id} className="group flex items-center justify-between p-6 border border-[#333] rounded-xl bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] hover:border-[#FF8F00]/30 hover:shadow-lg hover:shadow-[#FF8F00]/10 transition-all duration-300">
              <div className="flex items-center gap-6">
                <button
                  onClick={() => toggleTagSelection(tag._id)}
                  className="text-[#FF8F00] hover:text-[#FFD54F] transition-colors"
                >
                  {selectedTags.has(tag._id) ? (
                    <CheckSquare className="w-5 h-5" />
                  ) : (
                    <Square className="w-5 h-5" />
                  )}
                </button>

                <div className={`px-4 py-2 rounded-full text-sm font-medium border ${
                  tag.isActive 
                    ? 'bg-gradient-to-r from-green-500/20 to-green-400/20 text-green-400 border-green-500/30' 
                    : 'bg-gradient-to-r from-red-500/20 to-red-400/20 text-red-400 border-red-500/30'
                }`}>
                  {tag.isActive ? 'Active' : 'Inactive'}
                </div>
                
                <div>
                  <div className="font-semibold text-[#E0E0E0] text-lg mb-1">{tag.label}</div>
                  <div className="text-sm text-[#888] flex items-center gap-4">
                    <span>ID: <span className="text-[#FF8F00]">{tag.tagId}</span></span>
                    <span>Icon: <span className="text-[#B0B0B0]">{tag.icon}</span></span>
                    <span>Order: <span className="text-[#B0B0B0]">{tag.sortOrder}</span></span>
                    {tag.color && <span>Color: <span className="text-[#B0B0B0]">{tag.color}</span></span>}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => moveTag(tag, 'up')}
                  disabled={index === 0}
                  className={`p-2 rounded-lg transition-colors ${
                    index === 0 
                      ? 'text-[#444] cursor-not-allowed' 
                      : 'text-[#B0B0B0] hover:bg-[#2A2A2A] hover:text-[#FF8F00]'
                  }`}
                  title="Move Up"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => moveTag(tag, 'down')}
                  disabled={index === sortedTags.length - 1}
                  className={`p-2 rounded-lg transition-colors ${
                    index === sortedTags.length - 1 
                      ? 'text-[#444] cursor-not-allowed' 
                      : 'text-[#B0B0B0] hover:bg-[#2A2A2A] hover:text-[#FF8F00]'
                  }`}
                  title="Move Down"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleUpdateTag(tag._id, { isActive: !tag.isActive })}
                  className={`p-2 rounded-lg transition-colors ${
                    tag.isActive 
                      ? 'text-green-400 hover:bg-green-500/20' 
                      : 'text-red-400 hover:bg-red-500/20'
                  }`}
                  title={tag.isActive ? 'Deactivate' : 'Activate'}
                >
                  {tag.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => startEditing(tag)}
                  className="p-2 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleDeleteTag(tag._id)}
                  className="p-2 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Statistics */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-400/5 border border-blue-500/20 backdrop-blur-sm">
          <div className="text-3xl font-bold text-blue-400 mb-1">{tags?.length || 0}</div>
          <div className="text-sm text-blue-300/80 font-medium">Total Tags</div>
        </div>
        <div className="p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-green-400/5 border border-green-500/20 backdrop-blur-sm">
          <div className="text-3xl font-bold text-green-400 mb-1">
            {tags?.filter(t => t.isActive).length || 0}
          </div>
          <div className="text-sm text-green-300/80 font-medium">Active Tags</div>
        </div>
        <div className="p-6 rounded-xl bg-gradient-to-br from-red-500/10 to-red-400/5 border border-red-500/20 backdrop-blur-sm">
          <div className="text-3xl font-bold text-red-400 mb-1">
            {tags?.filter(t => !t.isActive).length || 0}
          </div>
          <div className="text-sm text-red-300/80 font-medium">Inactive Tags</div>
        </div>
        <div className="p-6 rounded-xl bg-gradient-to-br from-[#FF8F00]/10 to-[#FFD54F]/5 border border-[#FF8F00]/20 backdrop-blur-sm">
          <div className="text-3xl font-bold text-[#FF8F00] mb-1">{selectedTags.size}</div>
          <div className="text-sm text-[#FF8F00]/80 font-medium">Selected</div>
        </div>
      </div>
    </div>
  );
}
