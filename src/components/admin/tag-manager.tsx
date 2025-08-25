'use client';

import { useState } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

export default function TagManager() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingTag, setEditingTag] = useState<any>(null);
  const [formData, setFormData] = useState({
    tagId: '',
    label: '',
    icon: 'Calculator',
    color: '',
    sortOrder: '',
  });

  // Convex hooks
  const tags = useQuery(api.tags.getAllTags);
  const createTag = useMutation(api.tags.createTag);
  const updateTag = useMutation(api.tags.updateTag);
  const deleteTag = useMutation(api.tags.deleteTag);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingTag) {
        await updateTag({
          id: editingTag._id,
          label: formData.label || undefined,
          icon: formData.icon || undefined,
          color: formData.color || undefined,
          sortOrder: formData.sortOrder ? Number(formData.sortOrder) : undefined,
        });
      } else {
        await createTag({
          tagId: formData.tagId,
          label: formData.label,
          icon: formData.icon,
          color: formData.color || undefined,
          sortOrder: formData.sortOrder ? Number(formData.sortOrder) : undefined,
        });
      }
      
      // Reset form
      setFormData({ tagId: '', label: '', icon: 'Calculator', color: '', sortOrder: '' });
      setIsCreating(false);
      setEditingTag(null);
    } catch (error) {
      console.error('Error saving tag:', error);
      alert('Error saving tag: ' + (error as Error).message);
    }
  };

  const handleEdit = (tag: any) => {
    setEditingTag(tag);
    setFormData({
      tagId: tag.tagId,
      label: tag.label,
      icon: tag.icon,
      color: tag.color || '',
      sortOrder: tag.sortOrder.toString(),
    });
    setIsCreating(true);
  };

  const handleDelete = async (tag: any) => {
    if (confirm(`Delete tag "${tag.label}"?`)) {
      try {
        await deleteTag({ id: tag._id });
      } catch (error) {
        alert('Error deleting tag: ' + (error as Error).message);
      }
    }
  };

  const iconOptions = [
    'Calculator', 'Atom', 'TestTube', 'Zap', 'Book', 'Brain', 'FileText',
    'Target', 'Award', 'Star', 'Lightbulb', 'Microscope', 'Globe', 'Heart'
  ];

  return (
    <div className="space-y-6">
      {/* Create/Edit Form */}
      {isCreating && (
        <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-lg space-y-4">
          <h3 className="text-lg font-medium text-white">
            {editingTag ? 'Edit Tag' : 'Create New Tag'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Tag ID (e.g., mathematics)"
              value={formData.tagId}
              onChange={(e) => setFormData({ ...formData, tagId: e.target.value })}
              disabled={!!editingTag}
              className="bg-gray-700 text-white p-2 rounded border border-gray-600 focus:border-[#FF8F00] outline-none"
              required={!editingTag}
            />
            
            <input
              type="text"
              placeholder="Display Label"
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              className="bg-gray-700 text-white p-2 rounded border border-gray-600 focus:border-[#FF8F00] outline-none"
              required
            />
            
            <select
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="bg-gray-700 text-white p-2 rounded border border-gray-600 focus:border-[#FF8F00] outline-none"
            >
              {iconOptions.map(icon => (
                <option key={icon} value={icon}>{icon}</option>
              ))}
            </select>
            
            <input
              type="text"
              placeholder="Color (optional)"
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              className="bg-gray-700 text-white p-2 rounded border border-gray-600 focus:border-[#FF8F00] outline-none"
            />
            
            <input
              type="number"
              placeholder="Sort Order (optional)"
              value={formData.sortOrder}
              onChange={(e) => setFormData({ ...formData, sortOrder: e.target.value })}
              className="bg-gray-700 text-white p-2 rounded border border-gray-600 focus:border-[#FF8F00] outline-none"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-[#FF8F00] text-black px-4 py-2 rounded hover:bg-[#e67f00] transition"
            >
              {editingTag ? 'Update' : 'Create'}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsCreating(false);
                setEditingTag(null);
                setFormData({ tagId: '', label: '', icon: 'Calculator', color: '', sortOrder: '' });
              }}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Action Button */}
      {!isCreating && (
        <button
          onClick={() => setIsCreating(true)}
          className="bg-[#FF8F00] text-black px-4 py-2 rounded hover:bg-[#e67f00] transition"
        >
          Add New Tag
        </button>
      )}

      {/* Tags List */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-white mb-4">Existing Tags</h3>
        
        {!tags || tags.length === 0 ? (
          <p className="text-gray-400">No tags found. Create your first tag above.</p>
        ) : (
          <div className="space-y-2">
            {tags.map((tag) => (
              <div
                key={tag._id}
                className="flex items-center justify-between bg-gray-800 p-3 rounded border border-gray-700"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[#FF8F00] font-mono text-sm">#{tag.tagId}</span>
                  <span className="text-white">{tag.label}</span>
                  <span className="text-gray-400 text-sm">({tag.icon})</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    tag.isActive ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
                  }`}>
                    {tag.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <span className="text-gray-500 text-sm">Order: {tag.sortOrder}</span>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(tag)}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-500 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(tag)}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-500 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
