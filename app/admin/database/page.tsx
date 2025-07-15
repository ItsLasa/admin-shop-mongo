import DatabaseStatus from "@/components/database-status"

export default function DatabasePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <DatabaseStatus />
      </div>
    </div>
  )
}
