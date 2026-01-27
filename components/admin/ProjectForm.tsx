import { Upload, Eye, Trash2 } from 'lucide-react';
import { useRef } from 'react';

interface FormData {
  title: string;
  description: string;
  link: string;
  category: string;
}

interface ProjectFormProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  handleProjectSubmit: (e: React.FormEvent) => void;
  handleCancelEdit: () => void;
  isUploading: boolean;
  previewUrl: string | null;
  editingProject: {id: string, title: string, description: string, link: string, image: string, category: string} | null;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

export default function ProjectForm({
  formData,
  setFormData,
  handleProjectSubmit,
  handleCancelEdit,
  isUploading,
  previewUrl,
  editingProject,
  fileInputRef
}: ProjectFormProps) {
  return (
    <div className="lg:col-span-2">
      <div
        className="border-2 border-dashed border-[#4a0e4e] rounded-xl p-8 text-center cursor-pointer hover:border-[#611197] transition-colors"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
        />
        <Upload className="mx-auto h-12 w-12 text-[#a9a9b3] mb-4" />
        <h3 className="text-xl font-semibold mb-2">Upload Project Image</h3>
        <p className="text-[#a9a9b3] mb-4">Click to browse for image</p>
        <button className="bg-[#611197] hover:bg-[#4a0e73] px-4 py-2 rounded-lg transition-colors">
          Select Image
        </button>
      </div>

      {/* Project Form */}
      <form onSubmit={handleProjectSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Project Title
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            placeholder="Enter project title"
            className="w-full bg-[#1a1a2e] border border-[#4a0e4e] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#611197]"
          />
        </div>

        <div>
          <label htmlFor="link" className="block text-sm font-medium mb-2">
            Project Link
          </label>
          <input
            type="url"
            id="link"
            value={formData.link}
            onChange={(e) => setFormData({...formData, link: e.target.value})}
            placeholder="https://example.com"
            className="w-full bg-[#1a1a2e] border border-[#4a0e4e] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#611197]"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-2">
            Category
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            className="w-full bg-[#1a1a2e] border border-[#4a0e4e] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#611197]"
          >
            <option value="web">Web Development</option>
            <option value="cli">CLI Tools</option>
            <option value="mobile">Mobile Apps</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            placeholder="Describe your project..."
            rows={3}
            className="w-full bg-[#1a1a2e] border border-[#4a0e4e] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#611197]"
          ></textarea>
        </div>

        <div className="space-y-3">
          <button
            type="submit"
            disabled={isUploading}
            className="w-full bg-[#611197] hover:bg-[#4a0e73] py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
          >
            {isUploading ? 'Processing...' : editingProject ? 'Update Project' : 'Add Project'}
          </button>
          {editingProject && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="w-full bg-[#4a0e73] hover:bg-[#3a0b5a] py-2 px-4 rounded-lg transition-colors"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {previewUrl && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">Image Preview</h3>
          <div className="border border-[#4a0e4e] rounded-lg overflow-hidden">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-auto max-h-64 object-contain bg-[#1a1a2e]"
            />
          </div>
        </div>
      )}
    </div>
  );
}