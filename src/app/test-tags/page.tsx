import { QuickTagManager } from '../../components/admin/quick-tag-manager';

export default function TestTagsPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Quick Tag Manager Test</h1>
        <QuickTagManager title="Test Tag Management" />
      </div>
    </div>
  );
}
