import { fetchDirectoryData } from "@/lib/data";
import { Hero } from "@/components/hero";
import { QuickAccess } from "@/components/quick-access";
import { DepartmentGrid } from "@/components/department-grid";
import { GlobalSearch } from "@/components/global-search";

export default async function Home() {
  const data = await fetchDirectoryData();
  
  // Extract unique departments
  const departments = Array.from(new Set(data.map((d) => d.department))).filter(Boolean);

  return (
    <div className="flex flex-col flex-grow">
      <Hero />
      <div className="container mx-auto px-4 py-12 space-y-20">
        <section id="search-section" className="scroll-mt-24 max-w-3xl mx-auto -mt-20 relative z-10">
          <GlobalSearch data={data} />
        </section>
        <section>
          <QuickAccess data={data} />
        </section>
        <section id="departments-section" className="scroll-mt-24">
          <DepartmentGrid departments={departments} data={data} />
        </section>
      </div>
    </div>
  );
}
