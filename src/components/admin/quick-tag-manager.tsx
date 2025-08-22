'use client';

import { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
import { Plus, Trash2, Eye, EyeOff } from 'lucide-react';

interface Tag {
  _id: string;
  tagId: string;
  label: string;
  icon: string;
  color?: string;
  isActive: boolean;
  sortOrder: number;
}

interface QuickTagManagerProps {
  title?: string;
  showInactive?: boolean;
  maxHeight?: string;
}

export function QuickTagManager({ 
  title = "Quick Tag Manager", 
  showInactive = true, 
  maxHeight = "400px" 
}: QuickTagManagerProps) {
  const [newTagId, setNewTagId] = useState('');
  const [newTagLabel, setNewTagLabel] = useState('');

  const tags = useQuery(api.tags.getAllTags);
  const createTag = useMutation(api.tags.createTag);
  const updateTag = useMutation(api.tags.updateTag);
  const deleteTag = useMutation(api.tags.deleteTag);

  const handleQuickAdd = async () => {
    if (!newTagId || !newTagLabel) {
      alert('Please enter both ID and Label');
      return;
    }

    try {
      await createTag({
        tagId: newTagId,
        label: newTagLabel,
        icon: 'Calculator',
        sortOrder: (tags?.length || 0) + 1
      });
      setNewTagId('');
      setNewTagLabel('');
    } catch (error) {
      alert(`Failed to create tag: ${error}`);
    }
  };

  const toggleTag = async (tag: Tag) => {
  await updateTag({
    id: tag._id as Id<"tags">,
    isActive: !tag.isActive,
  });
};

    const removeTag = async (tag: Tag) => {
    if (confirm(`Delete "${tag.label}"?`)) {
        await deleteTag({ id: tag._id as Id<"tags"> });
    }
    };

  const filteredTags = tags?.filter(tag => showInactive || tag.isActive) || [];
  const sortedTags = [...filteredTags].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      
      {/* Quick Add Form */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <input
            type="text"
            placeholder="Tag ID (e.g., math)"
            value={newTagId}
            onChange={(e) => setNewTagId(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Label (e.g., Mathematics)"
            value={newTagLabel}
            onChange={(e) => setNewTagLabel(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleQuickAdd}
            className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>

      {/* Tags List */}
      <div 
        className="space-y-2 overflow-y-auto"
        style={{ maxHeight }}
      >
        {sortedTags.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No tags found</p>
        ) : (
          sortedTags.map((tag: Tag) => (
            <div key={tag._id} className="flex items-center justify-between p-2 border border-gray-200 rounded">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${
                  tag.isActive ? 'bg-green-500' : 'bg-red-500'
                }`} />
                <span className="font-medium text-sm">{tag.label}</span>
                <span className="text-xs text-gray-500">({tag.tagId})</span>
              </div>
              
              <div className="flex items-center gap-1">
                <button
                  onClick={() => toggleTag(tag)}
                  className={`p-1 rounded text-xs ${
                    tag.isActive 
                      ? 'text-green-600 hover:bg-green-100' 
                      : 'text-red-600 hover:bg-red-100'
                  }`}
                  title={tag.isActive ? 'Deactivate' : 'Activate'}
                >
                  {tag.isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                </button>
                <button
                  onClick={() => removeTag(tag)}
                  className="p-1 text-red-600 rounded text-xs hover:bg-red-100"
                  title="Delete"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary */}
      <div className="mt-4 pt-3 border-t border-gray-200">
        <div className="flex justify-between text-xs text-gray-600">
          <span>Total: {tags?.length || 0}</span>
          <span>Active: {tags?.filter(t => t.isActive).length || 0}</span>
        </div>
      </div>
    </div>
  );
}
