/* Bildhantering i webbläsaren för uppgiftshjälpen: validering och nedskalning. */

export const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif']
export const MAX_UPLOAD_MB = 8

export function validateFile(file: File): string | null {
  const isImage = ALLOWED_IMAGE_TYPES.includes(file.type)
  const isPdf = file.type === 'application/pdf'
  if (!isImage && !isPdf) return 'Den filtypen stöds inte. Använd en bild (PNG, JPG, WEBP, GIF) eller en PDF.'
  if (file.size > MAX_UPLOAD_MB * 1024 * 1024) return `Filen är för stor (max ${MAX_UPLOAD_MB} MB).`
  return null
}

/** Läser in en bild och skalar ned den till max 1600 px. Returnerar en data-URL (JPEG eller PNG). */
export async function prepareImage(file: File, maxSide = 1600): Promise<string> {
  const url = URL.createObjectURL(file)
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const i = new Image()
      i.onload = () => resolve(i)
      i.onerror = () => reject(new Error('Bilden kunde inte läsas.'))
      i.src = url
    })
    const scale = Math.min(1, maxSide / Math.max(img.width, img.height))
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(img.width * scale)
    canvas.height = Math.round(img.height * scale)
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Bilden kunde inte läsas.')
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    // JPEG blir mycket mindre för foton; PNG behålls för skärmbilder med lite färger
    return file.type === 'image/png' && file.size < 1.5 * 1024 * 1024 ? canvas.toDataURL('image/png') : canvas.toDataURL('image/jpeg', 0.85)
  } finally {
    URL.revokeObjectURL(url)
  }
}
