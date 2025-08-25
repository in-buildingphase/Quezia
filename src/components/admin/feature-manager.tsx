'use client';

import { useState } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';

interface ActionDockFeature {
  _id: Id<"actionDockFeatures">;
  featureId: string;
  heading: string;
  showInfo?: boolean;
  type: 'number' | 'text' | 'select';
  placeholder?: string;
  defaultValue: string | number;
  min?: number;
  max?: number;
  options?: string[];
  isActive: boolean;
  sortOrder: number;
  createdAt: number;
}

export default function FeatureManager() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingFeature, setEditingFeature] = useState<ActionDockFeature | null>(null);
  const [formData, setFormData] = useState<{
    featureId: string;
    heading: string;
    type: 'number' | 'text' | 'select';
    placeholder: string;
    defaultValue: string;
    min: string;
    max: string;
    options: string;
    showInfo: boolean;
    sortOrder: string;
  }>({
    featureId: '',
    heading: '',
    type: 'number' as 'number' | 'text' | 'select',
    placeholder: '',
    defaultValue: '',
    min: '',
    max: '',
    options: '',
    showInfo: false,
    sortOrder: '',
  });

  // Convex hooks
  const features = useQuery(api.actionDockFeatures.getActiveFeatures);
  const createFeature = useMutation(api.actionDockFeatures.createFeature);
  const updateFeature = useMutation(api.actionDockFeatures.updateFeature);
  const deleteFeature = useMutation(api.actionDockFeatures.deleteFeature);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Process options for select type
      const optionsArray = formData.type === 'select' && formData.options 
        ? formData.options.split(',').map(opt => opt.trim()).filter(opt => opt.length > 0)
        : undefined;

      const processedData = {
        featureId: formData.featureId,
        heading: formData.heading,
        type: formData.type,
        placeholder: formData.placeholder || undefined,
        defaultValue: formData.type === 'number' ? Number(formData.defaultValue) : formData.defaultValue,
        min: formData.min ? Number(formData.min) : undefined,
        max: formData.max ? Number(formData.max) : undefined,
        options: optionsArray,
        showInfo: formData.showInfo,
        sortOrder: formData.sortOrder ? Number(formData.sortOrder) : undefined,
      };

      if (editingFeature) {
        await updateFeature({
          featureId: editingFeature.featureId,
          heading: processedData.heading,
          type: processedData.type,
          placeholder: processedData.placeholder,
          defaultValue: processedData.defaultValue,
          min: processedData.min,
          max: processedData.max,
          options: processedData.options,
          showInfo: processedData.showInfo,
          sortOrder: processedData.sortOrder,
        });
      } else {
        await createFeature(processedData);
      }
      
      // Reset form
      setFormData({
        featureId: '',
        heading: '',
        type: 'number',
        placeholder: '',
        defaultValue: '',
        min: '',
        max: '',
        options: '',
        showInfo: false,
        sortOrder: '',
      });
      setIsCreating(false);
      setEditingFeature(null);
    } catch (error) {
      console.error('Error saving feature:', error);
      alert('Error saving feature: ' + (error as Error).message);
    }
  };

  const handleEdit = (feature: ActionDockFeature) => {
    setEditingFeature(feature);
    setFormData({
      featureId: feature.featureId,
      heading: feature.heading,
      type: feature.type,
      placeholder: feature.placeholder || '',
      defaultValue: feature.defaultValue.toString(),
      min: feature.min?.toString() || '',
      max: feature.max?.toString() || '',
      options: feature.options ? feature.options.join(', ') : '',
      showInfo: feature.showInfo || false,
      sortOrder: feature.sortOrder.toString(),
    });
    setIsCreating(true);
  };

  const handleDelete = async (feature: ActionDockFeature) => {
    if (confirm(`Delete feature "${feature.heading}"?`)) {
      try {
        await deleteFeature({ featureId: feature.featureId });
      } catch (error) {
        alert('Error deleting feature: ' + (error as Error).message);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Create/Edit Form */}
      {isCreating && (
        <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-lg space-y-4">
          <h3 className="text-lg font-medium text-white">
            {editingFeature ? 'Edit Feature' : 'Create New Feature'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Feature ID (e.g., numQuestions)"
              value={formData.featureId}
              onChange={(e) => setFormData({ ...formData, featureId: e.target.value })}
              disabled={!!editingFeature}
              className="bg-gray-700 text-white p-2 rounded border border-gray-600 focus:border-[#FF8F00] outline-none"
              required={!editingFeature}
            />
            
            <input
              type="text"
              placeholder="Display Heading"
              value={formData.heading}
              onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
              className="bg-gray-700 text-white p-2 rounded border border-gray-600 focus:border-[#FF8F00] outline-none"
              required
            />
            
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as 'number' | 'text' | 'select' })}
              className="bg-gray-700 text-white p-2 rounded border border-gray-600 focus:border-[#FF8F00] outline-none"
            >
              <option value="number">Number</option>
              <option value="text">Text</option>
              <option value="select">Select (Dropdown)</option>
            </select>
            
            <input
              type="text"
              placeholder="Placeholder text"
              value={formData.placeholder}
              onChange={(e) => setFormData({ ...formData, placeholder: e.target.value })}
              className="bg-gray-700 text-white p-2 rounded border border-gray-600 focus:border-[#FF8F00] outline-none"
            />
            
            <input
              type={formData.type === 'number' ? 'number' : 'text'}
              placeholder="Default value"
              value={formData.defaultValue}
              onChange={(e) => setFormData({ ...formData, defaultValue: e.target.value })}
              className="bg-gray-700 text-white p-2 rounded border border-gray-600 focus:border-[#FF8F00] outline-none"
              required
            />
            
            {formData.type === 'number' && (
              <>
                <input
                  type="number"
                  placeholder="Min value (optional)"
                  value={formData.min}
                  onChange={(e) => setFormData({ ...formData, min: e.target.value })}
                  className="bg-gray-700 text-white p-2 rounded border border-gray-600 focus:border-[#FF8F00] outline-none"
                />
                
                <input
                  type="number"
                  placeholder="Max value (optional)"
                  value={formData.max}
                  onChange={(e) => setFormData({ ...formData, max: e.target.value })}
                  className="bg-gray-700 text-white p-2 rounded border border-gray-600 focus:border-[#FF8F00] outline-none"
                />
              </>
            )}
            
            {formData.type === 'select' && (
              <input
                type="text"
                placeholder="Options (comma-separated: Easy, Medium, Hard)"
                value={formData.options}
                onChange={(e) => setFormData({ ...formData, options: e.target.value })}
                className="bg-gray-700 text-white p-2 rounded border border-gray-600 focus:border-[#FF8F00] outline-none col-span-full"
                required
              />
            )}
            
            <input
              type="number"
              placeholder="Sort Order (optional)"
              value={formData.sortOrder}
              onChange={(e) => setFormData({ ...formData, sortOrder: e.target.value })}
              className="bg-gray-700 text-white p-2 rounded border border-gray-600 focus:border-[#FF8F00] outline-none"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showInfo"
              checked={formData.showInfo}
              onChange={(e) => setFormData({ ...formData, showInfo: e.target.checked })}
              className="text-[#FF8F00] focus:ring-[#FF8F00]"
            />
            <label htmlFor="showInfo" className="text-white">Show info icon</label>
          </div>
          
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-[#FF8F00] text-black px-4 py-2 rounded hover:bg-[#e67f00] transition"
            >
              {editingFeature ? 'Update' : 'Create'}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsCreating(false);
                setEditingFeature(null);
                setFormData({
                  featureId: '',
                  heading: '',
                  type: 'number',
                  placeholder: '',
                  defaultValue: '',
                  min: '',
                  max: '',
                  options: '',
                  showInfo: false,
                  sortOrder: '',
                });
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
          Add New Feature
        </button>
      )}

      {/* Features List */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-white mb-4">Existing Features</h3>
        
        {!features || features.length === 0 ? (
          <p className="text-gray-400">No features found. Create your first feature above.</p>
        ) : (
          <div className="space-y-2">
            {features.map((feature) => (
              <div
                key={feature._id}
                className="flex items-center justify-between bg-gray-800 p-3 rounded border border-gray-700"
              >
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-[#FF8F00] font-mono text-sm">#{feature.featureId}</span>
                  <span className="text-white">{feature.heading}</span>
                  <span className="text-gray-400 text-sm">({feature.type})</span>
                  <span className="text-gray-500 text-sm">Default: {feature.defaultValue}</span>
                  {feature.min && <span className="text-gray-500 text-sm">Min: {feature.min}</span>}
                  {feature.max && <span className="text-gray-500 text-sm">Max: {feature.max}</span>}
                  {feature.options && <span className="text-purple-400 text-sm">Options: [{feature.options.join(', ')}]</span>}
                  {feature.showInfo && <span className="text-blue-400 text-sm">ℹ️</span>}
                  <span className="text-gray-500 text-sm">Order: {feature.sortOrder}</span>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(feature)}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-500 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(feature)}
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
