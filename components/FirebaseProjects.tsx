'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { Merienda } from "next/font/google";
import { useEffect, useState } from 'react';

const merienda = Merienda({ subsets: ["latin"], weight: ["400", "700"] });

interface Project {
  id: string;
  title: string;
  description: string;
  link: string;
  image: string;
  category: string;
  uploadedAt: any;
}

function FirebaseProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data.projects || []);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#611197]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-20 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div id="pro" className="flex flex-col items-center justify-center gap-6 py-10 px-6">
      <h1 className={`${merienda.className} mt-6 pb-16 bg-gradient-to-br from-fuchsia-400 via-violet-600 to-emerald-300 bg-clip-text text-6xl text-transparent`}>
        Projects
      </h1>
      <ul>
        <li className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <Card
              key={project.id}
              className="overflow-hidden transform transition animate-duration-faster hover:animate-blink"
            >
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <CardHeader>
                  {project.image ? (
                    <Image
                      src={project.image}
                      width={400}
                      height={200}
                      alt={project.title}
                      className="rounded-t-lg object-cover w-full h-48"
                    />
                  ) : (
                    <div className="rounded-t-lg bg-gray-700 w-full h-48 flex items-center justify-center">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="p-4 bg-[#b916fa1f]">
                  <CardTitle className="text-lg font-semibold text-center text-white">
                    {project.title}
                  </CardTitle>
                </CardContent>
                <CardFooter className="p-4 text-center text-sm text-white">
                  {project.description}
                </CardFooter>
              </a>
            </Card>
          ))}
        </li>
      </ul>
    </div>
  );
}

export default FirebaseProjects;