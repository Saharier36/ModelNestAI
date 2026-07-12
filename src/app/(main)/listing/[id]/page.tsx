export default async function ListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="p-8 bg-[#030303] text-white min-h-screen">
      <h1 className="text-2xl font-bold">Listing Detail for: {id}</h1>
    </div>
  );
}
