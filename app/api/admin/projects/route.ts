import { NextRequest } from 'next/server';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { staticProjects } from '@/lib/staticProjects';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, link, image, category, staticId } = body;

    // Validate input
    if (!title || !description || !link || !image) {
      return Response.json(
        { error: 'Missing required fields: title, description, link, or image' },
        { status: 400 }
      );
    }

    // Verify image is a valid base64 image
    if (!image.startsWith('data:image/')) {
      return Response.json(
        { error: 'Invalid image format' },
        { status: 400 }
      );
    }

    // Prepare project data
    const projectData: any = {
      title,
      description,
      link,
      image, // Store base64 image data
      category: category || 'web',
      uploadedAt: new Date(),
    };

    // If staticId is provided, this is an override for a static project
    if (staticId) {
      projectData.staticId = staticId;
    }

    // Save to Firestore
    const docRef = await addDoc(collection(db, 'projects'), projectData);

    return Response.json({
      success: true,
      message: 'Project added successfully',
      id: docRef.id,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Project creation error:', error);
    return Response.json(
      { error: 'Failed to add project' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Get dynamic projects from Firebase
    const q = query(collection(db, 'projects'));
    const querySnapshot = await getDocs(q);
    const dynamicProjects: Array<{id: string, title: string, description: string, link: string, image: string, category: string, uploadedAt: any, isStatic?: boolean, staticId?: string}> = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      dynamicProjects.push({
        id: doc.id,
        title: data.title,
        description: data.description,
        link: data.link,
        image: data.image,
        category: data.category,
        uploadedAt: data.uploadedAt,
        isStatic: false, // Indicates this is a dynamic project
        staticId: data.staticId, // If this is an override of a static project
      });
    });

    // Create a map of dynamic overrides for static projects
    const staticOverrideMap = new Map<string, typeof dynamicProjects[0]>();
    const regularDynamicProjects = [];

    for (const proj of dynamicProjects) {
      if (proj.staticId) {
        // This is an override for a static project
        staticOverrideMap.set(proj.staticId, proj);
      } else {
        regularDynamicProjects.push(proj);
      }
    }

    // Create the final project list: static projects (possibly overridden) + regular dynamic projects
    const allProjects = [
      // Static projects (possibly overridden by dynamic ones)
      ...staticProjects.map(staticProj => {
        const override = staticOverrideMap.get(staticProj.id);
        if (override) {
          // Return the override data with static project ID
          return {
            ...staticProj, // Keep original static ID
            ...override,  // Override with dynamic data
            isStatic: false, // Mark as dynamic since it's an override
            originalStaticId: staticProj.id // Track original ID
          };
        } else {
          // Return the original static project
          return { ...staticProj, isStatic: true };
        }
      }),
      // Regular dynamic projects (not overrides)
      ...regularDynamicProjects
    ];

    // Sort projects: static projects (original or overridden) maintain their order,
    // then dynamic projects by upload date
    allProjects.sort((a, b) => {
      const isAStatic = !!a.isStatic;
      const isBStatic = !!b.isStatic;

      if (isAStatic && isBStatic) {
        // Both are static (original or overridden), maintain original static order
        const aIndex = staticProjects.findIndex(sp => sp.id === a.id || sp.id === a.originalStaticId);
        const bIndex = staticProjects.findIndex(sp => sp.id === b.id || sp.id === b.originalStaticId);
        return aIndex - bIndex;
      } else if (isAStatic && !isBStatic) {
        return -1; // Static projects first
      } else if (!isAStatic && isBStatic) {
        return 1;  // Static projects first
      } else {
        // Both are dynamic, sort by upload date (newest first)
        const dateA = a.uploadedAt?.toDate ? a.uploadedAt.toDate() : new Date(a.uploadedAt);
        const dateB = b.uploadedAt?.toDate ? b.uploadedAt.toDate() : new Date(b.uploadedAt);
        return dateB.getTime() - dateA.getTime();
      }
    });

    return Response.json({
      projects: allProjects,
      count: allProjects.length
    });
  } catch (error) {
    console.error('Fetch projects error:', error);
    return Response.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}