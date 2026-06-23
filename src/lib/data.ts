import Papa from "papaparse";

export interface ExtensionEntry {
  id: string;
  department: string;
  category: string;
  name: string;
  designation: string;
  extension: string;
}

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1DtUP5fyARusZO1PUOkYESohI1jXI8TtNLRuUDmPLGtM/export?format=csv";

export async function fetchDirectoryData(): Promise<ExtensionEntry[]> {
  const response = await fetch(SHEET_CSV_URL, { next: { revalidate: 60 } }); // revalidate every 60s
  const csvText = await response.text();

  const parsed = Papa.parse<string[]>(csvText, {
    header: false,
    skipEmptyLines: true,
  });

  const entries: ExtensionEntry[] = [];
  let currentDept1 = "";
  let currentDept2 = "";

  parsed.data.forEach((row, rowIndex) => {
    // Skip the first few lines if they contain headers or title
    if (rowIndex === 0) return; 

    // Block 1: Indices 1, 2, 3
    const b1Col1 = (row[1] || "").trim();
    const b1Col2 = (row[2] || "").trim();
    const b1Col3 = (row[3] || "").trim();

    // Block 2: Indices 4, 5, 6
    const b2Col1 = (row[4] || "").trim();
    const b2Col2 = (row[5] || "").trim();
    const b2Col3 = (row[6] || "").trim();

    // Check if Block 1 defines a new Department
    if (b1Col1 && !b1Col2 && !b1Col3) {
      currentDept1 = b1Col1;
    } else if (b1Col1 || b1Col2 || b1Col3) {
      // It's a data row
      // We expect Designation (b1Col1), Name (b1Col2), Extension (b1Col3)
      if (b1Col3) {
        entries.push({
          id: `b1-${rowIndex}`,
          department: currentDept1,
          category: currentDept1, // Fallback category to dept
          designation: b1Col1,
          name: b1Col2 || b1Col1, // fallback if name is empty
          extension: b1Col3,
        });
      }
    }

    // Check if Block 2 defines a new Department
    if (b2Col1 && !b2Col2 && !b2Col3) {
      currentDept2 = b2Col1;
    } else if (b2Col1 || b2Col2 || b2Col3) {
      if (b2Col3) {
        entries.push({
          id: `b2-${rowIndex}`,
          department: currentDept2,
          category: currentDept2,
          designation: b2Col1,
          name: b2Col2 || b2Col1,
          extension: b2Col3,
        });
      }
    }
  });

  return entries;
}
