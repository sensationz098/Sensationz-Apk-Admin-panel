import ActiveBatchesClient from "@/app/components/ActiveBatchesClient";

export default async function ActiveBatchesPage() {

  return (
    <section className="w-full px-4">
      <h1 className="text-3xl font-semibold mb-6 text-white">Active Batches</h1>
      <ActiveBatchesClient />
    </section>
  );
}





