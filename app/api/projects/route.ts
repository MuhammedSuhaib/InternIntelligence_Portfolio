import { NextRequest } from 'next/server';
import { getFirestore, collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { staticProjects } from '@/lib/staticProjects';

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

    // Create the final project list: overridden static projects + regular dynamic projects
    const finalProjects = [
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
    finalProjects.sort((a, b) => {
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
      projects: finalProjects,
      count: finalProjects.length
    });
  } catch (error) {
    console.error('Fetch projects error:', error);
    return Response.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}