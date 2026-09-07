import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No se envió ningún archivo' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const isVideo = file.type.startsWith('video/') || /\.(mp4|webm|mov|m4v)$/i.test(file.name)
    const folderName = isVideo ? 'videos' : 'images'

    // Crear carpeta uploads si no existe
    const uploadDir = path.join(process.cwd(), 'public', folderName, 'uploads')
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    // Nombre seguro para el archivo
    const timestamp = Date.now()
    const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]/g, '-').replace(/-+/g, '-')
    const filename = `${timestamp}-${safeName}`
    const filepath = path.join(uploadDir, filename)

    // Guardar archivo físico en disco
    fs.writeFileSync(filepath, buffer)

    const publicUrl = `/${folderName}/uploads/${filename}`

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
      type: isVideo ? 'video' : 'image',
    })
  } catch (err: any) {
    console.error('Error subiendo archivo:', err)
    return NextResponse.json({ error: err.message || 'Error al procesar la subida' }, { status: 500 })
  }
}
