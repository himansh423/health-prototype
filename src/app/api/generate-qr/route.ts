import { type NextRequest, NextResponse } from "next/server"
import QRCode from "qrcode"

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json()

    if (!userId) {
      return NextResponse.json({ success: false, message: "User ID is required" }, { status: 400 })
    }

    // Create the URL for the PDF download
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    const pdfUrl = `${baseUrl}/api/get-user-data-qr/${userId}`

    // Generate QR code as data URL
    const qrCodeDataUrl = await QRCode.toDataURL(pdfUrl, {
      errorCorrectionLevel: "H",
      margin: 1,
      width: 300,
      color: {
        dark: "#0070f3",
        light: "#FFFFFF",
      },
    })

    return NextResponse.json({
      success: true,
      qrCode: qrCodeDataUrl,
      pdfUrl,
      message: "QR code generated successfully",
    })
  } catch (error) {
    console.error("Error generating QR code:", error)
    return NextResponse.json(
      { success: false, message: "Failed to generate QR code", error: (error as Error).message },
      { status: 500 },
    )
  }
}

