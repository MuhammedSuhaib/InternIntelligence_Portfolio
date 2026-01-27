import { Eye, Trash2 } from 'lucide-react';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  description: string;
  link: string;
  image: string;
  category: string;
  uploadedAt: any;
  isStatic?: boolean;
  originalStaticId?: string;
}

interface ProjectListProps {
  projects: Project[];
  handleViewImage: (project: Project) => void;
  handleEdit: (project: Project) => void;
  handleDelete: (id: string) => void;
}

export default function ProjectList({
  projects,
  handleViewImage,
  handleEdit,
  handleDelete
}: ProjectListProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Projects</h2>
        <span className="bg-[#1a1a2e] text-[#a9a9b3] px-2 py-1 rounded text-sm">
          {projects.length} projects
        </span>
      </div>

      <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-[#1a1a2e] border border-[#4a0e4e] rounded-lg p-3 flex items-center gap-3 hover:bg-[#2a2a3e] transition-colors"
          >
            <div className="flex-shrink-0">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-12 h-12 object-cover rounded"
                />
              ) : (
                <div className="bg-[#252538] border border-[#4a0e4e] rounded w-12 h-12 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#a9a9b3]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
              )}
            </div>
            <div className="flex-grow min-w-0">
              <p className="truncate text-sm font-medium">{project.title}</p>
              <p className="text-xs text-[#a9a9b3] truncate">{project.category}{project.isStatic ? ' (Static)' : ''}</p>
              <p className="text-xs text-[#6c6c7a]">
                {project.uploadedAt ? new Date(project.uploadedAt?.toDate ? project.uploadedAt.toDate() : project.uploadedAt).toLocaleDateString() : 'N/A'}
              </p>
            </div>
            <div className="flex space-x-1">
              <button
                onClick={() => handleViewImage(project)}
                className="p-1.5 text-[#a9a9b3] hover:text-white rounded hover:bg-[#2a2a3e]"
                title="View"
              >
                <Eye className="w-4 h-4" />
              </button>
              {!project.isStatic && (
                <button
                  onClick={() => handleEdit(project)}
                  className="p-1.5 text-[#a9a9b3] hover:text-[#611197] rounded hover:bg-[#2a2a3e]"
                  title="Edit"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 02 2h14a2 2 0 0 02-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z" />
                  </svg>
                </button>
              )}
              {!project.isStatic && (
                <button
                  onClick={() => handleDelete(project.id)}
                  className="p-1.5 text-[#a9a9b3] hover:text-[#611197] rounded hover:bg-[#2a2a3e]"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              {project.isStatic && (
                <div className="p-1.5 text-[#6c6c7a] opacity-50" title="Static projects can't be edited here">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 15.5a3.5 3.5 0 1 0-7 0 3.5 3.5 0 0 0 7 0z" />
                    <path d="M18.8 16.8c1.4-.9 2.2-2.3 2.2-3.8 0-2.8-2.2-5-5-5s-5 2.2-5 5c0 1.5.8 2.9 2.2 3.8l-1.4 2.5c-.4.7 0 1.5.8 1.5h5.2c.8 0 1.2-.8.8-1.5l-1.4-2.5z" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="text-center py-8 text-[#a9a9b3]">
            <svg className="mx-auto h-12 w-12 mb-2 text-[#a9a9b3]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
            <p>No projects added yet</p>
          </div>
        )}
      </div>
    </div>
  );
}