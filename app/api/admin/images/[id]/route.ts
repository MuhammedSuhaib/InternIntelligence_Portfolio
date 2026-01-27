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