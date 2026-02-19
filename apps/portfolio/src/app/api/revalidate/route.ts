import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const secret = request.headers.get("x-revalidation-secret");
    const expectedSecret = process.env.REVALIDATION_SECRET;

    if (expectedSecret && secret !== expectedSecret) {
        return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const paths: string[] = body.paths || ["/"];

        for (const path of paths) {
            revalidatePath(path);
        }

        return NextResponse.json({ revalidated: true, paths });
    } catch {
        return NextResponse.json({ error: "Failed to revalidate" }, { status: 500 });
    }
}
