
import { Business } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ResultsTableProps {
  businesses: Business[];
}

const ResultsTable = ({ businesses }: ResultsTableProps) => {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Kategorie</TableHead>
            <TableHead>Inhaber oder Geschäftsführer</TableHead>
            <TableHead>E-Mail</TableHead>
            <TableHead>Telefon</TableHead>
            <TableHead>Adresse</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {businesses.map((business) => (
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
  );
};

export default ResultsTable;
