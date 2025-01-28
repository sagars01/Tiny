import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as Blob;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Convert WEBP to PNG
        const pngBuffer = await sharp(buffer).toFormat("png").toBuffer();

        // Get metadata and create SVG
        const metadata = await sharp(pngBuffer).metadata();
        const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${metadata.width} ${metadata.height}">
          <image href="data:image/png;base64,${pngBuffer.toString("base64")}" width="${metadata.width}" height="${metadata.height}" />
      </svg>
    `;

        return NextResponse.json({
            convertedImage: `data:image/svg+xml;base64,${Buffer.from(svgContent).toString("base64")}`,
        });
    } catch (error: any) {
        console.error("Error during image conversion:", error);
        return NextResponse.json({ error: "Conversion failed", details: error.message }, { status: 500 });
    }
}
