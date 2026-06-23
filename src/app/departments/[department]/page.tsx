import { fetchDirectoryData } from "@/lib/data";
import { DepartmentView } from "./department-view";

export async function generateStaticParams() {
  const data = await fetchDirectoryData();
  const departments = Array.from(new Set(data.map((d) => d.department))).filter(Boolean);
  return departments.map((dept) => ({
    department: dept,
  }));
}

export default async function DepartmentPage({
  params,
}: {
  params: Promise<{ department: string }>;
}) {
  const resolvedParams = await params;
  const decodedDept = decodeURIComponent(resolvedParams.department);
  const data = await fetchDirectoryData();
  const departmentData = data.filter((d) => d.department === decodedDept);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 flex-grow">
      <DepartmentView departmentName={decodedDept} data={departmentData} />
    </div>
  );
}
