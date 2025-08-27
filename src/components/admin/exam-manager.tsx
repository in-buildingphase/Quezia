"use client";

import React, { useState } from 'react';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { Plus, Edit, Trash2, Save, X, Eye, EyeOff } from 'lucide-react';

interface ExamFormData {
  examId: string;
  name: string;
  shortName: string;
  description: string;
  iconPath: string;
  price: number;
  isActive: boolean;
  sortOrder: number;
}

interface EditingExam extends ExamFormData {
  _id?: Id<"exams">;
}

const ExamManager: React.FC = () => {
  const exams = useQuery(api.exams.getAllExams);
  const createExam = useMutation(api.exams.createExam);
  const updateExam = useMutation(api.exams.updateExam);
  const deleteExam = useMutation(api.exams.deleteExam);

  const [isCreating, setIsCreating] = useState(false);
  const [editingExam, setEditingExam] = useState<EditingExam | null>(null);
  const [formData, setFormData] = useState<ExamFormData>({
    examId: '',
    name: '',
    shortName: '',
    description: '',
    iconPath: '/assets/images/',
    price: 0,
    isActive: true,
    sortOrder: 1,
  });

  const resetForm = () => {
    setFormData({
      examId: '',
      name: '',
      shortName: '',
      description: '',
      iconPath: '/assets/images/',
      price: 0,
      isActive: true,
      sortOrder: exams ? exams.length + 1 : 1,
    });
  };

  const handleCreate = () => {
    setIsCreating(true);
    resetForm();
    setEditingExam(null);
  };

  const handleEdit = (exam: any) => {
    setEditingExam(exam);
    setFormData({
      examId: exam.examId,
      name: exam.name,
      shortName: exam.shortName,
      description: exam.description,
      iconPath: exam.iconPath,
      price: exam.price || 0,
      isActive: exam.isActive,
      sortOrder: exam.sortOrder,
    });
    setIsCreating(false);
  };

  const handleSave = async () => {
    try {
      if (isCreating) {
        await createExam(formData);
      } else if (editingExam) {
        await updateExam({
          id: editingExam._id!,
          ...formData,
        });
      }
      
      setIsCreating(false);
      setEditingExam(null);
      resetForm();
    } catch (error) {
      console.error('Error saving exam:', error);
      alert('Error saving exam: ' + (error as Error).message);
    }
  };

  const handleDelete = async (id: Id<"exams">) => {
    if (confirm('Are you sure you want to delete this exam?')) {
      try {
        await deleteExam({ id });
      } catch (error) {
        console.error('Error deleting exam:', error);
        alert('Error deleting exam: ' + (error as Error).message);
      }
    }
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingExam(null);
    resetForm();
  };

  const isFormValid = formData.examId && formData.name && formData.shortName && formData.description;

  if (!exams) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-700 rounded mb-4"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-white">Exam Management</h3>
          <p className="text-gray-400 text-sm">Add, edit, and manage available exams</p>
        </div>
        {!isCreating && !editingExam && (
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 bg-[#FF8F00] text-black rounded-lg hover:bg-[#FFB74D] transition-colors"
          >
            <Plus size={16} />
            Add New Exam
          </button>
        )}
      </div>

      {/* Create/Edit Form */}
      {(isCreating || editingExam) && (
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h4 className="text-lg font-medium text-white mb-4">
            {isCreating ? 'Create New Exam' : 'Edit Exam'}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Exam ID *
              </label>
              <input
                type="text"
                value={formData.examId}
                onChange={(e) => setFormData(prev => ({ ...prev, examId: e.target.value }))}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-[#FF8F00] focus:outline-none"
                placeholder="e.g., jee, neet, sat"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Short Name *
              </label>
              <input
                type="text"
                value={formData.shortName}
                onChange={(e) => setFormData(prev => ({ ...prev, shortName: e.target.value }))}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-[#FF8F00] focus:outline-none"
                placeholder="e.g., JEE, NEET, SAT"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-[#FF8F00] focus:outline-none"
                placeholder="e.g., Joint Entrance Examination"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-[#FF8F00] focus:outline-none"
                placeholder="Brief description of the exam..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Icon Path *
              </label>
              <input
                type="text"
                value={formData.iconPath}
                onChange={(e) => setFormData(prev => ({ ...prev, iconPath: e.target.value }))}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-[#FF8F00] focus:outline-none"
                placeholder="/assets/images/examIcon.svg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Price *
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-[#FF8F00] focus:outline-none"
                placeholder="499"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Sort Order
              </label>
              <input
                type="number"
                value={formData.sortOrder}
                onChange={(e) => setFormData(prev => ({ ...prev, sortOrder: parseInt(e.target.value) || 1 }))}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-[#FF8F00] focus:outline-none"
                min="1"
              />
            </div>

            <div className="flex items-center">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                  className="sr-only"
                />
                <div className={`w-12 h-6 rounded-full transition-colors ${formData.isActive ? 'bg-[#FF8F00]' : 'bg-gray-600'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform transform ${formData.isActive ? 'translate-x-6' : 'translate-x-1'} mt-0.5`}></div>
                </div>
                <span className="ml-3 text-sm text-gray-300">Active</span>
              </label>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave}
              disabled={!isFormValid}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={16} />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <X size={16} />
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Exams List */}
      <div className="space-y-4">
        {exams.map((exam) => (
          <div
            key={exam._id}
            className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {exam.isActive ? (
                  <Eye size={16} className="text-green-400" />
                ) : (
                  <EyeOff size={16} className="text-gray-500" />
                )}
                <span className="text-sm text-gray-400">#{exam.sortOrder}</span>
              </div>
              
              <div>
                <div className="flex items-center gap-3">
                  <h4 className="font-medium text-white">{exam.shortName}</h4>
                  <span className="text-sm text-gray-400">({exam.examId})</span>
                </div>
                <p className="text-sm text-gray-300">{exam.name}</p>
                <p className="text-xs text-gray-500 mt-1 max-w-md truncate">{exam.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleEdit(exam)}
                className="p-2 text-blue-400 hover:bg-blue-400/10 rounded transition-colors"
                title="Edit exam"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => handleDelete(exam._id)}
                className="p-2 text-red-400 hover:bg-red-400/10 rounded transition-colors"
                title="Delete exam"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {exams.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No exams found</p>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-[#FF8F00] text-black rounded-lg hover:bg-[#FFB74D] transition-colors"
          >
            Create your first exam
          </button>
        </div>
      )}
    </div>
  );
};

export default ExamManager;
