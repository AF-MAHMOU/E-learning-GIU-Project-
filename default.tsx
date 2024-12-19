export default async function Default({
    params,
}: {
    params: Promise<{ artist: string }>
}) {
    const artist = (await params).artist
}