'use client';

import { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
import { Plus, Trash2, Save, X, Eye, EyeOff } from 'lucide-react';

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

export function TagManager() {
  const [isAddingTag, setIsAddingTag] = useState(false);
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

  const availableIcons = [
    'Calculator', 'Atom', 'TestTube', 'Zap', 'Book', 'Brain', 
    'FileText', 'Target', 'Award', 'Star', 'Lightbulb', 'Microscope'
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

    const handleUpdateTag = async (
    id: Id<"tags">,
    updates: Partial<Omit<Tag, '_id' | 'tagId' | 'createdAt'>>
    ) => {
    try {
        await updateTag({ id, ...updates });
    } catch (error) {
        alert(`Failed to update tag: ${error}`);
    }
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

  const toggleTagStatus = async (tag: Tag) => {
    await handleUpdateTag(tag._id, { isActive: !tag.isActive });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Tag Management</h2>
        <button
          onClick={() => setIsAddingTag(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New Tag
        </button>
      </div>

      {/* Add New Tag Form */}
      {isAddingTag && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h3 className="text-lg font-semibold mb-4">Add New Tag</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tag ID *
              </label>
              <input
                type="text"
                value={newTag.tagId}
                onChange={(e) => setNewTag({ ...newTag, tagId: e.target.value })}
                placeholder="e.g., biology"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Label *
              </label>
              <input
                type="text"
                value={newTag.label}
                onChange={(e) => setNewTag({ ...newTag, label: e.target.value })}
                placeholder="e.g., Biology"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Icon
              </label>
              <select
                value={newTag.icon}
                onChange={(e) => setNewTag({ ...newTag, icon: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {availableIcons.map(icon => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Color (optional)
              </label>
              <input
                type="text"
                value={newTag.color}
                onChange={(e) => setNewTag({ ...newTag, color: e.target.value })}
                placeholder="e.g., #FF6B6B"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sort Order
              </label>
              <input
                type="number"
                value={newTag.sortOrder}
                onChange={(e) => setNewTag({ ...newTag, sortOrder: parseInt(e.target.value) || 1 })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleCreateTag}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Tag
            </button>
            <button
              onClick={() => setIsAddingTag(false)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Tags List */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Existing Tags</h3>
        {tags?.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No tags found. Add your first tag above!</p>
        ) : (
          tags?.map((tag: Tag) => (
            <div key={tag._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center gap-4">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  tag.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {tag.isActive ? 'Active' : 'Inactive'}
                </div>
                <div>
                  <div className="font-semibold text-gray-800">{tag.label}</div>
                  <div className="text-sm text-gray-500">
                    ID: {tag.tagId} | Icon: {tag.icon} | Order: {tag.sortOrder}
                    {tag.color && ` | Color: ${tag.color}`}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleTagStatus(tag)}
                  className={`p-2 rounded hover:bg-gray-200 transition-colors ${
                    tag.isActive ? 'text-green-600' : 'text-red-600'
                  }`}
                  title={tag.isActive ? 'Deactivate' : 'Activate'}
                >
                  {tag.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handleDeleteTag(tag._id)}
                  className="p-2 text-red-600 rounded hover:bg-gray-200 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">Quick Actions</h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={async () => {
              const activeTags = tags?.filter((t: Tag) => t.isActive) || [];
              for (const tag of activeTags) {
                await handleUpdateTag(tag._id, { isActive: false });
              }
            }}
            className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition-colors"
          >
            Deactivate All
          </button>
          <button
            onClick={async () => {
              const inactiveTags = tags?.filter((t: Tag) => !t.isActive) || [];
              for (const tag of inactiveTags) {
                await handleUpdateTag(tag._id, { isActive: true });
              }
            }}
            className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-colors"
          >
            Activate All
          </button>
        </div>
      </div>
    </div>
  );
}
