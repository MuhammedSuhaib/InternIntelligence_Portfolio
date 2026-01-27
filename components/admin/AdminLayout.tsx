import { ReactNode } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export default function AdminLayout({ children, title, description }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0b1f] via-[#1e0625] to-[#1b1b3a] text-white p-6">
      <div className="max-w-6xl mx-auto">
        {title && (
          <header className="mb-8">
            <h1 className="text-3xl font-bold">{title}</h1>
            {description && <p className="text-[#a9a9b3]">{description}</p>}
          </header>
        )}
        {children}
      </div>
    </div>
  );
}