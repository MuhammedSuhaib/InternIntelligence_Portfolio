## Directory Structure
```
 Directory of D:\VScode\GitHub\Portfolio\

.git/
.next/
.vscode/
app/
components/
lib/
node_modules/
public/
types/
utils/
.env
.eslintrc.json
.gitignore
.prettierrc
components.json
fr_generate_architecture.py
next-env.d.ts
next.config.mjs
package.json
pnpm-lock.yaml
postcss.config.mjs
tailwind.config.ts
tsconfig.json
```

# app\api\admin\images\[id]\get\route.ts
```typescript
import { NextRequest } from 'next/server';
import { getFirestore, getDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      return Response.json(
        { error: 'Missing image ID' },
        { status: 400 }
      );
    }

    // Get the document from Firestore
    const docSnap = await getDoc(doc(db, 'images', id));

    if (!docSnap.exists()) {
      return Response.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }

    const imageData = docSnap.data();

    // Return only the base64 data and metadata (excluding sensitive info)
    return Response.json({
      id: docSnap.id,
      base64Data: imageData.base64Data,
      fileName: imageData.fileName,
      title: imageData.title,
      size: imageData.size,
      uploadedAt: imageData.uploadedAt
    });
  } catch (error) {
    console.error('Get image error:', error);
    return Response.json(
      { error: 'Failed to fetch image' },
      { status: 500 }
    );
  }
}
```

# app\api\admin\images\[id]\route.ts
```typescript
import { NextRequest } from 'next/server';
import { getFirestore, getDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      return Response.json(
        { error: 'Missing image ID' },
        { status: 400 }
      );
    }

    // Get the document from Firestore
    const docSnap = await getDoc(doc(db, 'images', id));

    if (!docSnap.exists()) {
      return Response.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }

    const imageData = docSnap.data();

    // Return only the base64 data and metadata (excluding sensitive info)
    return Response.json({
      id: docSnap.id,
      base64Data: imageData.base64Data,
      fileName: imageData.fileName,
      title: imageData.title,
      size: imageData.size,
      uploadedAt: imageData.uploadedAt
    });
  } catch (error) {
    console.error('Get image error:', error);
    return Response.json(
      { error: 'Failed to fetch image' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      return Response.json(
        { error: 'Missing image ID' },
        { status: 400 }
      );
    }

    // Delete the document from Firestore
    await deleteDoc(doc(db, 'images', id));

    return Response.json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    console.error('Delete error:', error);
    return Response.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
}
```

# app\api\admin\images\get-post\route.ts
```typescript
import { NextRequest } from 'next/server';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { base64Data, fileName, title } = body;

    // Validate input
    if (!base64Data || !fileName) {
      return Response.json(
        { error: 'Missing base64Data or fileName' },
        { status: 400 }
      );
    }

    // Verify it's a valid base64 image
    if (!base64Data.startsWith('data:image/')) {
      return Response.json(
        { error: 'Invalid image format' },
        { status: 400 }
      );
    }

    // Save to Firestore
    const docRef = await addDoc(collection(db, 'images'), {
      base64Data,
      fileName,
      title: title || fileName,
      uploadedAt: new Date(),
      size: base64Data.length
    });

    return Response.json({
      success: true,
      message: 'Image uploaded successfully',
      id: docRef.id,
      fileName,
      size: base64Data.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Upload error:', error);
    return Response.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, 'images'));
    const images: Array<{id: string, fileName: string, title: string, uploadedAt: any, size: number}> = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      images.push({
        id: doc.id,
        fileName: data.fileName,
        title: data.title,
        uploadedAt: data.uploadedAt,
        size: data.size
      });
    });

    return Response.json({
      images,
      count: images.length
    });
  } catch (error) {
    console.error('Fetch error:', error);
    return Response.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
}
```

# app\api\admin\images\route.ts
```typescript
import { NextRequest } from 'next/server';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { base64Data, fileName, title } = body;

    // Validate input
    if (!base64Data || !fileName) {
      return Response.json(
        { error: 'Missing base64Data or fileName' },
        { status: 400 }
      );
    }

    // Verify it's a valid base64 image
    if (!base64Data.startsWith('data:image/')) {
      return Response.json(
        { error: 'Invalid image format' },
        { status: 400 }
      );
    }

    // Save to Firestore
    const docRef = await addDoc(collection(db, 'images'), {
      base64Data,
      fileName,
      title: title || fileName,
      uploadedAt: new Date(),
      size: base64Data.length
    });

    return Response.json({
      success: true,
      message: 'Image uploaded successfully',
      id: docRef.id,
      fileName,
      size: base64Data.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Upload error:', error);
    return Response.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, 'images'));
    const images: Array<{id: string, fileName: string, title: string, uploadedAt: any, size: number}> = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      images.push({
        id: doc.id,
        fileName: data.fileName,
        title: data.title,
        uploadedAt: data.uploadedAt,
        size: data.size
      });
    });

    return Response.json({
      images,
      count: images.length
    });
  } catch (error) {
    console.error('Fetch error:', error);
    return Response.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
}
```

# lib\firebase.ts
```typescript
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();

export const analytics = typeof window !== "undefined" 
  ? isSupported().then(yes => yes ? getAnalytics(app) : null) 
  : null;
```

# lib\utils.ts
```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

```

# next-env.d.ts
```typescript
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/building-your-application/configuring/typescript for more information.

```

# tailwind.config.ts
```typescript
import type { Config } from "tailwindcss";
const animations = require('@midudev/tailwind-animations');

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {

			colors: {

				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [animations],
	animations // ✅ ADD THIS

};
export default config;

```

# types\midudev-tailwind.d.ts
```typescript
declare module '@midudev/tailwind-animations';

```

# utils\utils.ts
```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

```

# app\about-me\page.tsx
```tsx
import { Github, House, Linkedin, Mailbox } from "lucide-react";
import { Merienda, Montserrat } from "next/font/google";
import Link from "next/link";

const merienda = Merienda({ subsets: ["latin"], weight: ["400", "700"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["300", "400", "600"] });

export default function Timeline() {
    const levels = [
        { year: "2025-06", text: "Learning agentic AI with OpenAI SDK." },
        { year: "2025-05", text: "Explored Python basics, OOP, Streamlit, and Google Colab" },
        { year: "2025-01", text: "Working on a presentation 'Learn Computing in 0 Day.'" },
        { year: "2025-01", text: "Completed front-end development training from GIAIC." },
        { year: "2024-08", text: "Developed an interest in internet security & backdoors." },
        { year: "2024", text: "Completed TypeScript course from GIAIC." },
        { year: "2023-12", text: "Taught basic computing to two young students." },
        { year: "2023-09", text: "Learned fundamentals of web development (HTML, CSS, JavaScript)." },
        { year: "2023-07", text: "Passed aptitude test at GIAIC." },
        { year: "2023", text: "Discovered AI-driven websites." },
        { year: "2023", text: "Learned Urdu typing." },
        { year: "2023", text: "Advanced skills in Photoshop." },
        { year: "2022-2023", text: "Enhanced design skills with Canva." },
        { year: "2021-2023", text: "Completed FSC (Pre-Engineering) from SM Science." },
        { year: "2020-2021", text: "Completed Graphic Designing course from DigiSkills." },
        { year: "2007-2021", text: "Completed CIT & Basics of Computing from SCOSIT School." },
        { year: "2007-2021", text: "Passed Matriculation from SCOSIT School." }
    ];
    return (
        <div className="min-h-screen flex flex-col items-center justify-center py-10 px-5 size-full ">
            <section className="max-w-3xl text-center text-white mb-10">
                <h1 className={`${merienda.className} text-5xl mb-4 text-white`}>About Me</h1>
                <p className={`${montserrat.className} text-lg text-gray-300 leading-relaxed`}>
                    I am a passionate self-learner and tech enthusiast with a growing interest in front-end
                    development, and design. Over the past few years, I have dedicated myself to
                    expanding my skill set through various courses and hands-on projects.
                </p>
                <p className={`${montserrat.className} mt-4 text-lg text-gray-300 leading-relaxed`}>
                    In 2025, I am working on a presentation titled
                    <strong> &quot;Learn Computing in 0 Days&quot;</strong>, aimed at helping beginners understand basic
                    computing concepts. Prior to that, I explored internet security and backdoors, which
                    sparked my fascination with the digital landscape.
                </p>
                <p className={`${montserrat.className} mt-4 text-lg text-gray-300 leading-relaxed`}>
                    My journey into tech began in 2023 when I took my first steps in web development
                    (HTML, CSS, JavaScript) and enhanced my skills with tools like Photoshop and Canva.
                    However, after diving into web development, I no longer focus on graphic design.
                </p>
                <p className={`${montserrat.className} mt-4 text-lg text-gray-300 leading-relaxed`}>
                    I am now diving deeper into technologies like TypeScript, Next.js, and preparing to explore
                    Agentic AI, Metaverse, and Cloud Computing. My journey is just beginning, and I&apos;m excited about
                    where it will take me.
                </p>
            </section>
            <h2 className={`${merienda.className} text-5xl text-white`}>My Timeline</h2>
            {levels.map((item, index) => (
                <div key={index} className="flex flex-col items-center py-5">
                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                        {/* those circles */}
                        <div
                            className="relative size-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-cover bg-center flex justify-center items-center text-white font-bold text-sm sm:text-lg bg-[url(/OO.jpg)]"
                        >
                            {item.year}
                        </div>
                        {/* those boxes */}
                        <div className="flex items-center gap-5 bg-white p-4 sm:p-5 rounded-2xl shadow-lg transition-all duration-500 hover:scale-105 text-center sm:text-left">
                            <p className="text-sm sm:text-lg text-black">{item.text}</p>
                        </div>
                    </div>
                    {index !== levels.length - 1 && (
                        <div className="w-1 bg-gray-300 h-12 sm:h-16 my-2"></div>
                    )}
                </div>
            ))}
            {/* Buttons  */}
            <p className="text-white text-lg mb-3">Click here for:</p>
            <section className="flex flex-col md:flex-row justify-center items-center gap-5">
                <a href="https://github.com/MuhammedSuhaib" target="_blank" rel="noopener noreferrer" title="GitHub Profile" className="flex flex-col items-center text-white">
                    <Github className="size-10" />
                    <span>GitHub Profile</span>
                </a>
                <a href="https://www.linkedin.com/in/suhaib1/" target="_blank" rel="noopener noreferrer" title="Linkedin Profile" className="flex flex-col items-center text-white">
                    <Linkedin className="size-10" />
                    <span>Linkedin Profile</span>
                </a>
                <Link href="/contact-us" className="flex flex-col items-center text-white">
                    <Mailbox className="size-10" />
                    <span>Contact Me</span>
                </Link>
                <Link href="/" className="flex flex-col items-center text-white">
                    <House className="size-10" />
                    <span>Home</span>
                </Link>
            </section>
        </div>
    );
}

```

# app\admin\layout.tsx
```tsx
import { ReactNode } from 'react';

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
      {children}
    </div>
  );
}
```

# app\admin\page.tsx
```tsx
'use client';

import { Upload, Image, Trash2, Eye, LogOut, User } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';
import { auth, provider } from '@/lib/firebase';

export default function AdminDashboard() {
  const [images, setImages] = useState<Array<{id: string, fileName: string, title: string, base64Data?: string, uploadedAt: any, size: number}>>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [loginRequired, setLoginRequired] = useState(true);
  const [title, setTitle] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check auth state on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setLoginRequired(false);
        fetchImages(); // Load images when authenticated
      } else {
        setCurrentUser(null);
        setLoginRequired(true);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch('/api/admin/images');
      const data = await response.json();

      if (data.images) {
        // For security reasons, we won't load all base64 data initially
        // Only load base64 when user clicks to view an image
        setImages(data.images);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setCurrentUser(result.user);
      setLoginRequired(false);
      fetchImages(); // Load images after login
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setLoginRequired(true);
      setImages([]);
      setPreviewUrl(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    // Show preview
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setPreviewUrl(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);

    // Convert to Base64
    const base64Reader = new FileReader();
    base64Reader.onload = async (event) => {
      if (event.target?.result) {
        const base64String = event.target.result as string;

        try {
          // Upload to Firebase via API
          const response = await fetch('/api/admin/images', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              base64Data: base64String,
              fileName: file.name,
              title: title || file.name
            }),
          });

          const result = await response.json();

          if (result.success) {
            // Refresh the images list
            fetchImages();
            setTitle('');
            setIsUploading(false);

            // Reset file input
            if (fileInputRef.current) {
              fileInputRef.current.value = '';
            }
          } else {
            throw new Error(result.message || 'Upload failed');
          }
        } catch (error) {
          console.error('Upload error:', error);
          alert('Failed to upload image: ' + (error as Error).message);
          setIsUploading(false);
        }
      }
    };
    base64Reader.readAsDataURL(file);
  };

  const handleDelete = async (id: string) => {
    try {
      if (confirm('Are you sure you want to delete this image?')) {
        const response = await fetch(`/api/admin/images/${id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          fetchImages(); // Refresh the list
          if (images.length === 1) {
            setPreviewUrl(null);
          }
        } else {
          const result = await response.json();
          alert(`Failed to delete image: ${result.error}`);
        }
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('An error occurred while deleting the image');
    }
  };

  const handleViewImage = async (image: {id: string, fileName: string, title: string}) => {
    try {
      // Fetch the specific image data from Firebase
      const response = await fetch(`/api/admin/images/${image.id}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.status}`);
      }

      const data = await response.json();

      if (data.base64Data) {
        setPreviewUrl(data.base64Data);
      } else {
        alert('Could not load image data. The Base64 data is not available for this image.');
      }
    } catch (error) {
      console.error('Error fetching image:', error);
      alert('Error loading image data');
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      // Simulate file input change
      const event = {
        target: {
          files: [file]
        }
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      // We need to create a new event to trigger the handler
      const newEvent = new Event('change', { bubbles: true });
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.files = e.dataTransfer.files;
      fileInput.dispatchEvent(newEvent);

      // Actually handle the file
      const tempEvent = { target: { files: e.dataTransfer.files } } as React.ChangeEvent<HTMLInputElement>;
      handleImageUpload(tempEvent);
    }
  };

  if (loginRequired) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-gray-800 border border-gray-700 rounded-xl p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-500 p-3 rounded-full">
              <User className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2">Admin Access Required</h1>
          <p className="text-gray-400 mb-6">Please sign in to access the admin dashboard</p>
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
              <path fill="#fff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#fff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#fff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#fff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-400">Manage your image assets</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-medium">{currentUser?.displayName || currentUser?.email}</p>
              <p className="text-sm text-gray-400">Admin</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Section */}
          <div className="lg:col-span-2">
            <div
              className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              <Upload className="mx-auto h-12 w-12 text-gray-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Upload Images</h3>
              <p className="text-gray-400 mb-4">Drag & drop images here or click to browse</p>
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
                Select Files
              </button>
            </div>

            {/* Title Input */}
            <div className="mt-4">
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Image Title (optional)
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a title for the image"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {isUploading && (
              <div className="mt-4 text-center">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
                <p className="mt-2 text-gray-400">Uploading to Firebase...</p>
              </div>
            )}

            {previewUrl && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Preview</h3>
                <div className="border border-gray-700 rounded-lg overflow-hidden">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-auto max-h-64 object-contain bg-gray-800"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Image List */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Uploaded Images</h2>
              <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-sm">
                {images.length} items
              </span>
            </div>

            <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="bg-gray-800 border border-gray-700 rounded-lg p-3 flex items-center gap-3 hover:bg-gray-750 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <div className="bg-gray-700 border border-gray-600 rounded w-12 h-12 flex items-center justify-center">
                      <Image className="w-6 h-6 text-gray-400" />
                    </div>
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="truncate text-sm font-medium">{image.title}</p>
                    <p className="text-xs text-gray-400 truncate">{image.fileName}</p>
                    <p className="text-xs text-gray-500">
                      {(image.size ? (image.size / 1024).toFixed(1) : '0') + ' KB'}
                    </p>
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleViewImage(image)}
                      className="p-1.5 text-gray-400 hover:text-white rounded hover:bg-gray-700"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(image.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 rounded hover:bg-gray-700"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {images.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Image className="mx-auto h-12 w-12 mb-2" />
                  <p>No images uploaded yet</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Base64 Display Section */}
        {previewUrl && (
          <div className="mt-8 bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium">Base64 Data</h3>
              <button
                onClick={() => navigator.clipboard.writeText(previewUrl)}
                className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded transition-colors"
              >
                Copy to Clipboard
              </button>
            </div>
            <textarea
              value={previewUrl}
              readOnly
              className="w-full h-32 bg-gray-900 text-xs p-3 rounded border border-gray-700 font-mono"
              onClick={(e) => (e.target as HTMLTextAreaElement).select()}
            />
          </div>
        )}
      </div>
    </div>
  );
}
```

# app\contact-us\page.tsx
```tsx
"use client";
import Link from "next/link";
import React from "react";
import { useForm, ValidationError } from "@formspree/react";

const ContactPage = () => {
  const [state, handleSubmit] = useForm("mwpobpor"); 

  if (state.succeeded) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white px-4">
        <h2 className="text-2xl font-bold mb-4">Thanks for your message!</h2>
        <Link href="/">
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-md shadow-lg hover:bg-indigo-700 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400">
            Back to Home
          </button>
        </Link>
      </div>
      
    );
  }

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-lg bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-8 sm:p-12">
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            Contact Me
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 p-4 w-full rounded-md border border-gray-300 bg-white/5 text-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 transition duration-300 hover:bg-white/10"
                placeholder="Your name"
              />
              <ValidationError prefix="Name" field="name" errors={state.errors} />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                autoComplete="email"
                className="mt-1 p-4 w-full rounded-md border border-gray-300 bg-white/5 text-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 transition duration-300 hover:bg-white/10"
                placeholder="your@email.com"
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="mt-1 p-4 w-full rounded-md border border-gray-300 bg-white/5 text-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 transition duration-300 hover:bg-white/10"
                placeholder="Your message"
              />
              <ValidationError prefix="Message" field="message" errors={state.errors} />
            </div>

            <button
              type="submit"
              disabled={state.submitting}
              className="w-full py-3 px-4 rounded-md bg-indigo-600 text-white font-medium shadow-md hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {state.submitting ? "Sending..." : "Send Message"}
            </button>
          </form>

          <div className="mt-8 space-y-4 text-center text-white">
            <p> Address: P&T society, Korangi, Karachi, Pakistan.</p>
          </div>

          <div className="flex justify-center space-x-6 mt-6">
            <a
              href="https://www.linkedin.com/in/suhaib1/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-indigo-200 transition duration-300"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/MuhammedSuhaib"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-indigo-200 transition duration-300"
            >
              GitHub
            </a>
          </div>
        </div>

        <Link href="/" className="mt-6">
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-md shadow-lg hover:bg-indigo-700 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ContactPage;

```

# app\layout.tsx
```tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Abel } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import BubbleCursor from "@/components/ui/BubbleCursor";

const abel = Abel({ subsets: ["latin"], weight: ["400"], variable: "--font-abel" });

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Muhammad Suhaib's Portfolio | JAM-Stack & Next.js Developer",
  description:
    "Muhammad Suhaib's portfolio showcasing skills, projects, and expertise in React, Next.js, TypeScript, and Python.",
  keywords: [
    "Muhammad Suhaib",
    "JAM-Stack Developer",
    "Nextjs Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Python Developer",
    "Web Developer",
    "Portfolio",
  ],
  robots: "index, follow", // Allows search engines to index and follow links
  openGraph: {
    title: "Muhammad Suhaib's Portfolio",
    description:
      "A portfolio of Muhammad Suhaib showcasing React, Next.js, TypeScript, and Python projects.",
    url: "https://muhammedsuhaib.netlify.app/",
    images: [
      {
        url: "/muhammad-suhaib.jpg", // Correct property: 'url' inside 'images'
        width: 1200,  // Optional: Specify image width
        height: 630,  // Optional: Specify image height
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image", // Twitter card with large image
    title: "Muhammad Suhaib's Portfolio",
    description:
      "JAM-Stack Developer Portfolio showcasing React, Next.js, TypeScript, and Python expertise.",
    images: [
      {
        url: "/muhammad-suhaib.jpg", // Correct property: 'url' inside 'images'
        width: 1200,  // Optional: Specify image width
        height: 630,  // Optional: Specify image height
      },
    ],
  },
  icons: {
    icon: "/favicon-32x32.png",
    apple: "/apple-icon-180x180.png",
    shortcut: "/favicon.ico",
  },
  other: {
    "google-site-verification": "it3bdI8wxU7vBHv7oC3MIfPf0bPZEZbNI84zw7ZdYSw",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${abel.className} ${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-[#0d0b1f] via-[#1e0625] to-[#1b1b3a] transition-all hover:bg-gradient-to-tl hover:from-[#25162f] hover:via-[#0d0b1f] hover:to-[#0a0a0a]`}
      >
        <Header /> 
        {children} 
        <BubbleCursor /> 
      </body>
    </html>
  );
}
```

# app\page.tsx
```tsx
// npm i prettier-plugin-tailwindcss@latest

import Pic from "../components/Pic";
import Main from "../components/Hero";
import Technologies from "@/components/Technologies";
import Projects from "@/components/Projects";
import Link from "next/link";
import { Github, Linkedin, Mailbox, ScrollText } from "lucide-react";

export default function Home() {
  return (
    <>
      <Pic />
      <Main />
      <section id="technologies" className="flex justify-center items-center">
        <Technologies />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section className="w-full text-center py-10">
        <p className="text-white text-lg mb-3">Click here for:</p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-5">
          <a href="https://github.com/MuhammedSuhaib" target="_blank" rel="noopener noreferrer" title="GitHub Profile" className="flex flex-col items-center text-white">
            <Github className="size-10" />
            <span>GitHub Profile</span>
          </a>
          <a href="https://www.linkedin.com/in/suhaib1/" target="_blank" rel="noopener noreferrer" title="Linkedin Profile" className="flex flex-col items-center text-white">
            <Linkedin className="size-10" />
            <span>Linkedin Profile</span>
          </a>
          <Link href="/contact-us" className="flex flex-col items-center text-white">
            <Mailbox className="size-10" />
            <span>Contact Me</span>
          </Link>
          <Link href="/about-me" className="flex flex-col items-center text-white">
            <ScrollText className="size-10" />
            <span>About Me</span>
          </Link>
        </div>
      </section>
    </>
  );
} 

```

# components\Header.tsx
```tsx
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Merienda } from "next/font/google";

const merienda = Merienda({ subsets: ["latin"], weight: ["400", "700"] });
function Header() {
  return (
    <header className="mb-10">
      <div className="p-5 m-0 flex justify-between rounded-md shadow-md shadow-[#d431dad8] hover:shadow-[#8df4f7]">
        <strong className="text-4xl mt-5 bg-gradient-to-br from-fuchsia-400 via-violet-600 to-emerald-300 text-transparent bg-clip-text hover:bg-gradient-to-tl hover:from-yellow-200 hover:to-fuchsia-950">
        <Link href="/">
          𝔐𝔲𝔥𝔞𝔪𝔪𝔞𝔡 ͯś𝔲𝔥𝔞𝔦𝔟
          </Link>
        </strong>
        <nav className="flex justify-between items-center">
          <ul className={`${merienda.className}  text-white space-x-4 hidden md:flex justify-center items-center`}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/#technologies">Technologies</Link></li>
            <li><Link href="/#projects">Projects</Link></li>
            <li><Link href="/contact-us">Contact</Link></li>
            <li><Link href="/about-me">About Me</Link></li>
          </ul>
          <span className="md:hidden">
            <Sheet>
              <SheetTrigger>
                <Menu className="bg-white m-5 rounded-md" />
              </SheetTrigger>
              <SheetContent className={`${merienda.className}  text-white space-x-4 bg-gradient-to-b hover:from-[#32027e] hover:to-black hover:bg-gradient-to-br from-black   to-[#32027e] transition-all duration-10000 font-bold`}>
                <ul className="text-white space-y-3">
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/#technologies">Technologies</Link></li>
                  <li><Link href="/#projects">Projects</Link></li>
                  <li><Link href="/contact-us">Contact</Link></li>
                  <li><Link href="/about-me">About Me</Link></li>
                </ul>
              </SheetContent>
            </Sheet>
          </span>
        </nav>
      </div>
    </header>
  );
}
export default Header;

```

# components\Hero.tsx
```tsx
import React from "react";
import { Merienda } from "next/font/google";
const merienda = Merienda({ subsets: ["latin"], weight: ["400", "700"] });

function Main() {
  return (
      <div className="flex flex-col justify-center items-center text-white">
        <h1 className="text-5xl  from-fuchsia-400 via-violet-600 to-emerald-300hover:to-fuchsia-950 sm:text-7xl text-center bg-gradient-to-br text-transparent bg-clip-text hover:bg-gradient-to-tl">
        𝔐𝔲𝔥𝔞𝔪𝔪𝔞𝔡 <span className="text-8xl"> ͯś</span>𝔲𝔥𝔞𝔦𝔟     </h1>
        <h2 className={`${merienda.className} text-4xl ml-7 md:ml-0 mt-6 bg-gradient-to-br from-fuchsia-400 via-violet-600 to-emerald-300 text-transparent bg-clip-text hover:bg-gradient-to-tl hover:to-fuchsia-950 `}>
          {" "}
          &lt; Ꮤeb 𐌃eveloper/&gt;
        </h2>

        <p className="w-3/4 mt-11 text-xl flex justify-center text-center max-w-screen-md">
          𝑰&apos;𝒎 𝒂 𝒘𝒆𝒃 𝒅𝒆𝒗𝒆𝒍𝒐𝒑𝒆𝒓 𝒔𝒌𝒊𝒍𝒍𝒆𝒅 𝒊𝒏 𝑵𝒆𝒙𝒕𝒋𝒔. 𝒂𝒏𝒅 𝑻𝒂𝒊𝒍𝒘𝒊𝒏𝒅. 𝒇𝒐𝒄𝒖𝒔𝒆𝒅 𝒐𝒏
          𝒃𝒖𝒊𝒍𝒅𝒊𝒏𝒈 𝒄𝒍𝒆𝒂𝒏, 𝒔𝒄𝒂𝒍𝒂𝒃𝒍𝒆 𝒂𝒑𝒑𝒍𝒊𝒄𝒂𝒕𝒊𝒐𝒏𝒔. 𝑰 𝒄𝒓𝒆𝒂𝒕𝒆 𝒆𝒇𝒇𝒊𝒄𝒊𝒆𝒏𝒕 𝒔𝒐𝒍𝒖𝒕𝒊𝒐𝒏𝒔
          𝒇𝒐𝒓 𝒅𝒚𝒏𝒂𝒎𝒊𝒄 𝒖𝒔𝒆𝒓 𝒆𝒙𝒑𝒆𝒓𝒊𝒆𝒏𝒄𝒆𝒔. 𝑳𝒆𝒕&apos;𝒔 𝒃𝒖𝒊𝒍𝒅 𝒔𝒐𝒎𝒆𝒕𝒉𝒊𝒏𝒈 𝒈𝒓𝒆𝒂𝒕 𝒕𝒐𝒈𝒆𝒕𝒉𝒆𝒓!
        </p>
      </div>
  );
}

export default Main;

```

# components\Pic.tsx
```tsx
import Image from "next/image";
import React from "react";
function Pic() {
  return (
    <div className="flex justify-center items-center mt- my-4">
      {/* Profile Picture Section */}

      <Image
        src="/muhammad-suhaib.jpg"
        alt="Muhammad Suhaib's Portfolio Picture"
        width={250}
        height={250}
        className="rounded-full p-3 ring-[6px] ring-[#d431dad8] shadow-2xl shadow-[#d431dad8] hover:shadow-[#c58bf5] hover:ring-[#a245f8] "
      />
    </div>
  );
}

export default Pic;

```

# components\Projects.tsx
```tsx
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Merienda } from "next/font/google";
const merienda = Merienda({ subsets: ["latin"], weight: ["400", "700"] });

const projects = [
  { link: `https://muhammedsuhaib.github.io/markdownResume/`, title: "Markdown Resume", description: "A simple, Jekyll-powered resume built using Markdown and GitHub Pages. Highlights skills, projects, and experience with a clean developer-friendly layout.", image: "/MuhammedResume.jpeg" },
  { link: `https://cyberdevs.netlify.app/`, title: "Firebase Chat PWA ", description: "Real-time multi-room PWA chat with Google Auth, built using Firebase, Next.js 15, and Tailwind CSS. No backend or SQL needed.", image: "/cyber.png" },
  { link: `https://push-notifcation-splitter.streamlit.app`, title: "Smartband Exam Hack", description: "A notification splitter tool designed to bypass exam restrictions using smartbands.", image: "/smartband.jpeg" },
  { link: `https://share.streamlit.io/user/muhammedsuhaib`, title: "All Streamlit Projects", description: "Collection of Streamlit apps built for learning and experimenting.", image: "/streamlit.jpeg" },
  { link: `https://github.com/MuhammedSuhaib/gemini_Openai-Agent`, title: "AI Agent (Gemini + OpenAI)", description: "AI agent using both Gemini and OpenAI, shared in a LinkedIn post.", image: "/agent.png" },
  { link: `https://growthmindsetbysirzia.streamlit.app`, title: "Growth Mindset Challenge", description: "A motivational app built using Streamlit to promote growth mindset.", image: "/growth.jpeg" },
  { link: `https://readable-password-generator.streamlit.app`, title: "Readable Password Generator", description: "Generates secure, easy-to-remember passwords using Streamlit.", image: "/password.jpeg" },
  { link: `https://muhammedsuhaibhackathon2.vercel.app/`, title: "E-commerce Website", description: "A full-stack e-commerce platform built with Next.js and Tailwind CSS.", image: "/Hekto.png" },
  { link: `https://hackathon-milestone-3-4-5-alpha.vercel.app/`, title: "Interactive Resume Builder", description: "A resume builder with interactive features using pure HTML and CSS.", image: "/resume.jpg" },
  { link: `https://heto-ui-clone.netlify.app/`, title: "Pixel-Perfect E-commerce Clone", description: "A precise, pixel-perfect recreation of an e-commerce website.", image: "/px.jpeg" },
  { link: `https://instagrem-com.netlify.app/`, title: "Instagram Attack", description: "A fun project demonstrating security vulnerabilities.", image: "/ig.png" },
  { link: `https://pana-cloud-sepia.vercel.app/`, title: "Panacloud Website", description: "A static website built with HTML and CSS.", image: "/pc.jpeg" },
  { link: `https://q2-assi8.vercel.app/`, title: "Next.js & Sanity Project", description: "Exploring Sanity as a headless CMS with Next.js and Tailwind.", image: "/Sanity.png" },
  { link: `https://reactandvite.netlify.app/`, title: "Toggle themes", description: "Exploring React + vite + Typescript along  with Tailwind Css.", image: "/tm.png" },
  { link: `https://simple-react-simple-todos.netlify.app/`, title: "Simple React Project", description: "  Exploring React  with Tailwind Css.", image: "/todos.png" },
  { link: `https://my-app-data-fetching.vercel.app/`, title: "API Data Fetching Project", description: "Fetching and displaying API data in a Next.js project.", image: "/get.png" },
  { link: `https://mob-responsive.vercel.app/`, title: "Educational Website Clone", description: "A cloned educational website built with Next.js and Tailwind CSS.", image: "/edu.png" },
  { link: `https://github.com/MuhammedSuhaib/1stfigmaClone.git`, title: "Jewelry Website Clone", description: "A pixel-perfect Figma-based jewelry website clone.", image: "/clone-img.webp" },
  { link: `https://celebrated-dodol-99f944.netlify.app/`, title: "Space Exploration Landing Page", description: "A Next.js landing page showcasing space exploration.", image: "/space.jpg" },
  { link: `https://my-1st-responsive-site.vercel.app/`, title: "Next.js Landing Page", description: "A landing page built with Next.js and pure CSS modules.", image: "/resp.jpg" },
  { link: `https://next-js-page-routing.vercel.app/`, title: "Next.js Hot Reload Demo", description: "A project demonstrating Next.js Hot Reload feature.", image: "/hotReload.png" },
  { link: `https://hackathon-milestone-1-2-three.vercel.app/`, title: "static Resume Builder", description: "A static resume  using pure HTML and CSS.", image: "/plain.png" },
  // CLI
  { link: `https://github.com/MuhammedSuhaib/uvpy/blob/master/atm.py`, title: "OOP Python CLI ATM", description: "An OOP-based terminal tool using uv for fast package management, styled with pyfiglet and colorama.", image: "/opp_atm.png" },
  { link: `https://github.com/MuhammedSuhaib/stickman_animation/blob/main/animated_stickman.bat`, title: "Stickman Animation", description: "A short 5–10s batch script animation made for fun during Ramazan.", image: "/stickman.png" },
  { link: `https://www.linkedin.com/posts/suhaib1_activity-7238076836780343296-H6YC?utm_source=social_share_send&utm_medium=member_desktop_web`, title: "CLI Ghost Image", description: "Displays a ghost image in the terminal using Chalk and animations.", image: "/ghoost.jpg" },
  { link: `https://github.com/MuhammedSuhaib/Fast-Quiz`, title: "CLI Quiz App", description: "A CLI-based quiz app built with TypeScript, Inquirer, and Chalk.", image: "/Quiz.jpg" },
  { link: `https://github.com/MuhammedSuhaib/Adventure-game`, title: "CLI Adventure Game", description: "A text-based adventure game created with TypeScript and CLI libraries.", image: "/g.jpg" },
  { link: `https://github.com/MuhammedSuhaib/Student-Management-System`, title: "CLI Student Management System", description: "A CLI-based student management system built with TypeScript.", image: "/Std.jpg" },
  { link: `https://github.com/MuhammedSuhaib/TODOS`, title: "CLI To-Do App", description: "A simple CLI to-do list application using TypeScript and Inquirer.", image: "/todos.jpg" },
  { link: `https://github.com/MuhammedSuhaib/ATM`, title: "CLI ATM Simulator", description: "A command-line ATM simulation built with TypeScript.", image: "/atm.jpg" },
  { link: `https://github.com/MuhammedSuhaib/currency_converter`, title: "CLI Currency Converter", description: "A CLI app for converting currencies using TypeScript.", image: "/crr.jpg" },
  { link: `https://github.com/MuhammedSuhaib/word_counter.git`, title: "CLI Word Counter", description: "A word-counting tool built for the terminal.", image: "/w.jpg" },
  { link: `https://github.com/MuhammedSuhaib/Guess-the-Number-Game`, title: "CLI Number Guessing Game", description: "A CLI game where users guess a number.", image: "/guess.jpg" },
  { link: `https://github.com/MuhammedSuhaib/smple_calculator`, title: "CLI Calculator", description: "A simple command-line calculator using TypeScript.", image: "/Simple.jpg" },
  { link: `https://github.com/MuhammedSuhaib/45-taks.git`, title: "Node.js TypeScript Tasks", description: "A collection of 45 TypeScript tasks built with Node.js.", image: "/45.png" },
];

function Projects() {
  return (
    <div id="pro" className="flex flex-col items-center justify-center gap-6 py-10 px-6">
      <h1 className={`${merienda.className} mt-6 pb-16 bg-gradient-to-br from-fuchsia-400 via-violet-600 to-emerald-300 bg-clip-text text-6xl text-transparent`}>
        Projects
      </h1>
      <ul>
        <li className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="overflow-hidden transform transition animate-duration-faster hover:animate-blink"
            >
              <a href={project.link} target="_blank" rel="noopener noreferrer" >
                <CardHeader>
                  <Image
                    src={project.image}
                    width={400}
                    height={200}
                    alt={project.title}
                    className="rounded-t-lg object-cover w-full h-48"
                  />
                </CardHeader  >
                <CardContent className="p-4 bg-[#b916fa1f]">
                  <CardTitle className="text-lg font-semibold text-center text-white">
                    {project.title}
                  </CardTitle>
                </CardContent>
                <CardFooter className="p-4 text-center text-sm text-white">
                  {project.description}
                </CardFooter></a>
            </Card>
          ))}
        </li>
      </ul>
    </div>
  );
}

export default Projects;

```

# components\Technologies.tsx
```tsx
import React from "react";
import Image from "next/image";
import { Merienda } from "next/font/google";

const merienda = Merienda({ subsets: ["latin"], weight: ["400", "700"] });

const techs = [
  { src: "/h.png", alt: "HTML", name: "HTML" },
  { src: "/c.png", alt: "CSS", name: "CSS" },
  { src: "/js.png", alt: "JavaScript", name: "JavaScript" },
  { src: "/ts.png", alt: "TypeScript", name: "TypeScript" },
  { src: "/nodejs.png", alt: "Node.js", name: "Node.js" },
  { src: "/npm.png", alt: "npm", name: "npm" },
  { src: "/nextjs.png", alt: "Next.js", name: "Next.js" },
  { src: "/tailwind.png", alt: "Tailwind CSS", name: "Tailwind CSS" },
  { src: "/shadcn.png", alt: "shadcn", name: "shadcn" },
  { src: "/py.png", alt: "Python", name: "Python" },
  { src: "/st.png", alt: "Streamlit", name: "Streamlit" },
  { src: "/ch.png", alt: "Chainlit", name: "Chainlit" },
  { src: "/openai.png", alt: "OpenAI SDK", name: "OpenAI SDK" },
  { src: "/gemini.png", alt: "Gemini API", name: "Gemini API" },
  { src: "/firebase.png", alt: "Firebase", name: "Firebase" },
  { src: "/netlify.png", alt: "Netlify", name: "Netlify" },
];

export default function Technologies() {
  return (
    <div className="h-full w-full max-w-screen-lg flex flex-col items-center justify-center gap-6 py-10">
      <h1
        className={`${merienda.className
          } pb-5 text-4xl md:text-6xl mt-6 bg-gradient-to-br from-fuchsia-400 via-violet-600 to-emerald-300 text-transparent bg-clip-text hover:bg-gradient-to-tl hover:to-fuchsia-950`}
      >
        Technologies
      </h1>
      <ul className="flex flex-wrap justify-center gap-14 text-2xl bg-gradient-to-br from-fuchsia-400 via-violet-600 to-emerald-300 text-transparent bg-clip-text hover:bg-gradient-to-tl hover:to-fuchsia-950">
        {techs.map(({ src, alt, name }) => (
          <li key={name}
            className="flex flex-col items-center transition-transform hover:animate-spin-clockwise ">
            <Image src={src} alt={alt} width={100} height={100} />
            <p className="text-center mt-2">{name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

```

# components\ui\BubbleCursor.tsx
```tsx
'use client';
import React, { useEffect, useRef } from 'react';

interface BubbleCursorProps {
  wrapperElement?: HTMLElement;
}

class Particle {
  lifeSpan: number;
  initialLifeSpan: number;
  velocity: { x: number; y: number };
  position: { x: number; y: number };
  baseDimension: number;

  constructor(x: number, y: number) {
    this.initialLifeSpan = Math.floor(Math.random() * 40 + 40); // ⬅️ Reduced lifespan for fewer particles
    this.lifeSpan = this.initialLifeSpan;
    this.velocity = {
      x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 15), // ⬅️ Less random movement
      y: -0.2 + Math.random() * -0.6, // ⬅️ Slower rise
    };
    this.position = { x, y };
    this.baseDimension = 3; // ⬅️ Smaller particles for subtle effect
  }

  update(context: CanvasRenderingContext2D) {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.velocity.x += ((Math.random() < 0.5 ? -1 : 1) * 1.5) / 100;
    this.velocity.y -= Math.random() / 700;
    this.lifeSpan--;

    const scale = 0.2 + (this.initialLifeSpan - this.lifeSpan) / this.initialLifeSpan;

    context.fillStyle = 'rgba(230, 241, 247, 0.6)'; // ⬅️ More transparency for softer look
    context.strokeStyle = 'rgba(58, 146, 197, 0.5)';
    context.beginPath();
    context.arc(
      this.position.x - (this.baseDimension / 2) * scale,
      this.position.y - this.baseDimension / 2,
      this.baseDimension * scale,
      0,
      2 * Math.PI
    );

    context.stroke();
    context.fill();
    context.closePath();
  }
}

const BubbleCursor: React.FC<BubbleCursorProps> = ({ wrapperElement }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const cursorRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let canvas: HTMLCanvasElement | null = null;
    let context: CanvasRenderingContext2D | null = null;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const init = () => {
      if (prefersReducedMotion.matches) {
        console.log('Reduced motion enabled, skipping effect.');
        return false;
      }

      canvas = canvasRef.current;
      if (!canvas) return;

      context = canvas.getContext('2d');
      if (!context) return;

      canvas.style.top = '0px';
      canvas.style.left = '0px';
      canvas.style.pointerEvents = 'none';

      if (wrapperElement) {
        canvas.style.position = 'absolute';
        wrapperElement.appendChild(canvas);
        canvas.width = wrapperElement.clientWidth;
        canvas.height = wrapperElement.clientHeight;
      } else {
        canvas.style.position = 'fixed';
        document.body.appendChild(canvas);
        canvas.width = width;
        canvas.height = height;
      }

      bindEvents();
      loop();
    };

    const bindEvents = () => {
      const element = wrapperElement || document.body;
      element.addEventListener('mousemove', onMouseMove);
      element.addEventListener('touchmove', onTouchMove, { passive: true });
      element.addEventListener('touchstart', onTouchMove, { passive: true });
      window.addEventListener('resize', onWindowResize);
    };

    const onWindowResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      if (!canvasRef.current) return;

      if (wrapperElement) {
        canvasRef.current.width = wrapperElement.clientWidth;
        canvasRef.current.height = wrapperElement.clientHeight;
      } else {
        canvasRef.current.width = width;
        canvasRef.current.height = height;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        for (let i = 0; i < e.touches.length; i++) {
          addParticle(e.touches[i].clientX, e.touches[i].clientY);
        }
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (wrapperElement) {
        const boundingRect = wrapperElement.getBoundingClientRect();
        cursorRef.current.x = e.clientX - boundingRect.left;
        cursorRef.current.y = e.clientY - boundingRect.top;
      } else {
        cursorRef.current.x = e.clientX;
        cursorRef.current.y = e.clientY;
      }

      addParticle(cursorRef.current.x, cursorRef.current.y);
    };

    const addParticle = (x: number, y: number) => {
      if (particlesRef.current.length < 50) {
        // ⬅️ Reduced max number of particles
        particlesRef.current.push(new Particle(x, y));
      }
    };

    const updateParticles = () => {
      if (!canvas || !context) return;

      if (particlesRef.current.length === 0) {
        return;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);

      // Update
      for (let i = 0; i < particlesRef.current.length; i++) {
        particlesRef.current[i].update(context);
      }

      // Remove dead particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        if (particlesRef.current[i].lifeSpan < 0) {
          particlesRef.current.splice(i, 1);
        }
      }

      if (particlesRef.current.length === 0) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    const loop = () => {
      updateParticles();
      animationFrameRef.current = requestAnimationFrame(loop);
    };

    init();

    return () => {
      if (canvas) {
        canvas.remove();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      const element = wrapperElement || document.body;
      element.removeEventListener('mousemove', onMouseMove);
      element.removeEventListener('touchmove', onTouchMove);
      element.removeEventListener('touchstart', onTouchMove);
      window.removeEventListener('resize', onWindowResize);
    };
  }, [wrapperElement]);

  return <canvas ref={canvasRef} />;
};

export default BubbleCursor;

```

# components\ui\card.tsx
```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-1", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-1 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

```

# components\ui\sheet.tsx
```tsx
"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      <SheetPrimitive.Close className="bg-white absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
      {children}
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}

```

# components.json
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "zinc",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

# package.json
```json
{
  "name": "my-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbo",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@formspree/react": "^3.0.0",
    "@midudev/tailwind-animations": "^0.2.0",
    "@radix-ui/react-dialog": "^1.1.2",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "firebase": "^12.8.0",
    "lucide-react": "^0.462.0",
    "mini-svg-data-uri": "^1.4.4",
    "motion": "^12.4.1",
    "next": "14.2.15",
    "next-themes": "^0.4.4",
    "prettier-plugin-tailwindcss": "^0.6.9",
    "react": "^18",
    "react-dom": "^18",
    "styled-components": "^6.1.14",
    "sweetalert2": "^11.15.10",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "eslint": "^8",
    "eslint-config-next": "14.2.15",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}

```

# tsconfig.json
```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "typeRoots": ["./types", "./node_modules/@types"],
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts", "components/C.tsx"],
  "exclude": ["node_modules"]
}

```

# app\globals.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

```

