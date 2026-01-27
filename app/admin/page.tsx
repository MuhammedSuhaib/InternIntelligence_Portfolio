'use client';

import { LogOut } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';
import { auth, provider } from '@/lib/firebase';
import AdminLayout from '@/components/admin/AdminLayout';
import LoginForm from '@/components/admin/LoginForm';
import ProjectForm from '@/components/admin/ProjectForm';
import ProjectList from '@/components/admin/ProjectList';

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Array<{id: string, title: string, description: string, link: string, image: string, category: string, uploadedAt: any}>>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [loginRequired, setLoginRequired] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    category: 'web',
  });
  const [editingProject, setEditingProject] = useState<{id: string, title: string, description: string, link: string, image: string, category: string, originalStaticId?: string} | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check auth state on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setLoginRequired(false);
        fetchProjects(); // Load projects when authenticated
      } else {
        setCurrentUser(null);
        setLoginRequired(true);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/admin/projects');
      const data = await response.json();

      if (data.projects) {
        setProjects(data.projects);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setCurrentUser(result.user);
      setLoginRequired(false);
      fetchProjects(); // Load projects after login
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setLoginRequired(true);
      setProjects([]);
      setPreviewUrl(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = fileInputRef.current?.files?.[0];

    // If editing, we might not have a new file, so we can reuse the existing image
    if (!editingProject && !file) {
      alert('Please select an image file');
      return;
    }

    setIsUploading(true);

    let imageToSave = '';

    if (file) {
      // Convert image to Base64
      const reader = new FileReader();
      reader.onload = async (event) => {
        if (event.target?.result) {
          imageToSave = event.target.result as string;

          try {
            let response;
            if (editingProject) {
              // Update existing project
              response = await fetch(`/api/admin/projects/${editingProject.id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  ...formData,
                  image: imageToSave, // Update with new image if provided
                  staticId: editingProject.originalStaticId || undefined, // Pass staticId if it's an override
                }),
              });
            } else {
              // Create new project - check if it's an override for a static project
              const staticId = editingProject?.originalStaticId || undefined;

              response = await fetch('/api/admin/projects', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  ...formData,
                  image: imageToSave, // Store base64 image data
                  staticId: staticId, // Indicate if this is an override for a static project
                }),
              });
            }

            const result = await response.json();

            if (result.success) {
              // Refresh the projects list
              fetchProjects();
              setFormData({
                title: '',
                description: '',
                link: '',
                category: 'web',
              });
              setEditingProject(null); // Clear editing state
              setPreviewUrl(null);
              setIsUploading(false);

              // Reset file input
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }
            } else {
              throw new Error(result.message || 'Operation failed');
            }
          } catch (error) {
            console.error('Project operation error:', error);
            alert('Failed to ' + (editingProject ? 'update' : 'upload') + ' project: ' + (error as Error).message);
            setIsUploading(false);
          }
        }
      };
      reader.readAsDataURL(file);
    } else if (editingProject) {
      // Update project without changing the image
      try {
        const response = await fetch(`/api/admin/projects/${editingProject.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            image: editingProject.image, // Keep existing image
            staticId: editingProject.originalStaticId || undefined, // Pass staticId if it's an override
          }),
        });

        const result = await response.json();

        if (result.success) {
          // Refresh the projects list
          fetchProjects();
          setFormData({
            title: '',
            description: '',
            link: '',
            category: 'web',
          });
          setEditingProject(null); // Clear editing state
          setPreviewUrl(null);
          setIsUploading(false);

          // Reset file input
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        } else {
          throw new Error(result.message || 'Update failed');
        }
      } catch (error) {
        console.error('Update error:', error);
        alert('Failed to update project: ' + (error as Error).message);
        setIsUploading(false);
      }
    }
  };

  const handleEdit = (project: {id: string, title: string, description: string, link: string, image: string, category: string, originalStaticId?: string}) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      link: project.link,
      category: project.category,
    });
    setPreviewUrl(project.image);
  };

  const handleCancelEdit = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      link: '',
      category: 'web',
    });
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (id: string) => {
    try {
      if (confirm('Are you sure you want to delete this project?')) {
        const response = await fetch(`/api/admin/projects/${id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          fetchProjects(); // Refresh the list
          setPreviewUrl(null);
          // If we were editing the deleted project, cancel edit mode
          if (editingProject && editingProject.id === id) {
            handleCancelEdit();
          }
        } else {
          const result = await response.json();
          alert(`Failed to delete project: ${result.error}`);
        }
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('An error occurred while deleting the project');
    }
  };

  const handleViewImage = async (project: {id: string, title: string, image: string, originalStaticId?: string}) => {
    try {
      // Fetch the specific project data from Firebase
      const response = await fetch(`/api/admin/projects/${project.id}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch project: ${response.status}`);
      }

      const data = await response.json();

      if (data.image) {
        setPreviewUrl(data.image);
      } else {
        alert('Could not load image data. The image is not available for this project.');
      }
    } catch (error) {
      console.error('Error fetching project:', error);
      alert('Error loading project data');
    }
  };

  if (loginRequired) {
    return (
      <LoginForm
        currentUser={currentUser}
        handleLogin={handleLogin}
        loginRequired={loginRequired}
      />
    );
  }

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Portfolio Manager</h1>
          <p className="text-[#a9a9b3]">Manage your portfolio projects</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-medium">{currentUser?.displayName || currentUser?.email}</p>
            <p className="text-sm text-[#a9a9b3]">Admin</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-[#611197] hover:bg-[#4a0e73] px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ProjectForm
          formData={formData}
          setFormData={setFormData}
          handleProjectSubmit={handleProjectSubmit}
          handleCancelEdit={handleCancelEdit}
          isUploading={isUploading}
          previewUrl={previewUrl}
          editingProject={editingProject}
          fileInputRef={fileInputRef}
        />

        <div className="lg:col-span-1">
          <ProjectList
            projects={projects}
            handleViewImage={handleViewImage}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </AdminLayout>
  );
}