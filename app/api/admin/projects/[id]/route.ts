import { NextRequest } from 'next/server';
import { getFirestore, getDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      return Response.json(
        { error: 'Missing project ID' },
        { status: 400 }
      );
    }

    // Get the document from Firestore
    const docSnap = await getDoc(doc(db, 'projects', id));

    if (!docSnap.exists()) {
      return Response.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    const projectData = docSnap.data();

    // Return project data
    return Response.json({
      id: docSnap.id,
      title: projectData.title,
      description: projectData.description,
      link: projectData.link,
      image: projectData.image,
      category: projectData.category,
      uploadedAt: projectData.uploadedAt
    });
  } catch (error) {
    console.error('Get project error:', error);
    return Response.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { title, description, link, image, category, staticId } = body;

    if (!id) {
      return Response.json(
        { error: 'Missing project ID' },
        { status: 400 }
      );
    }

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

    // Update the document in Firestore
    const projectRef = doc(db, 'projects', id);
    const updateData: any = {
      title,
      description,
      link,
      image,
      category: category || 'web',
      updatedAt: new Date(), // Track when it was last updated
    };

    // If staticId is provided, this is an override for a static project
    if (staticId !== undefined) {
      updateData.staticId = staticId;
    }

    await updateDoc(projectRef, updateData);

    return Response.json({
      success: true,
      message: 'Project updated successfully',
      id: id,
    });
  } catch (error) {
    console.error('Update project error:', error);
    return Response.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      return Response.json(
        { error: 'Missing project ID' },
        { status: 400 }
      );
    }

    // Delete the document from Firestore
    await deleteDoc(doc(db, 'projects', id));

    return Response.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Delete project error:', error);
    return Response.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}