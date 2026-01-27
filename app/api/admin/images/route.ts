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