export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="text-lg">
        This is a protected dashboard page. Only authenticated users can see
        this.
      </p>
    </div>
  );
}
