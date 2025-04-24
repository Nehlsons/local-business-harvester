
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Business } from "@/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ExtractedDataTableProps {
  businesses: Business[];
}

type SortField = 'name' | 'category' | 'owner' | 'email' | 'phone' | 'address';
type SortDirection = 'asc' | 'desc';

const ExtractedDataTable = ({ businesses }: ExtractedDataTableProps) => {
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  if (businesses.length === 0) {
    return null;
  }

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedBusinesses = [...businesses].sort((a, b) => {
    const fieldA = a[sortField] || '';
    const fieldB = b[sortField] || '';
    
    if (sortDirection === 'asc') {
      return fieldA.localeCompare(fieldB as string);
    } else {
      return fieldB.localeCompare(fieldA as string);
    }
  });

  const SortButton = ({ field }: { field: SortField }) => (
    <Button
      variant="ghost"
      size="sm"
      className="px-1 hover:bg-transparent"
      onClick={() => handleSort(field)}
    >
      {sortField === field && (
        sortDirection === 'asc' ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )
      )}
    </Button>
  );

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Extrahierte Daten</h2>
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableCaption>Liste der extrahierten Geschäftsdaten</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="flex items-center">
                Name
                <SortButton field="name" />
              </TableHead>
              <TableHead className="flex items-center">
                Kategorie
                <SortButton field="category" />
              </TableHead>
              <TableHead className="flex items-center">
                Inhaber/Geschäftsführer
                <SortButton field="owner" />
              </TableHead>
              <TableHead className="flex items-center">
                E-Mail
                <SortButton field="email" />
              </TableHead>
              <TableHead className="flex items-center">
                Telefon
                <SortButton field="phone" />
              </TableHead>
              <TableHead className="flex items-center">
                Adresse
                <SortButton field="address" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedBusinesses.map((business) => (
              <TableRow key={business.id}>
                <TableCell className="font-medium">{business.name}</TableCell>
                <TableCell>
                  {business.category === 'restaurants' ? 'Restaurant' : 'Hotel'}
                </TableCell>
                <TableCell>{business.owner || 'N/A'}</TableCell>
                <TableCell>{business.email || 'N/A'}</TableCell>
                <TableCell>{business.phone || 'N/A'}</TableCell>
                <TableCell>{business.address || 'N/A'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ExtractedDataTable;
