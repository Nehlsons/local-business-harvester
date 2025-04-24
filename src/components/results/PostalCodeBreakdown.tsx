
import { useState } from "react";
import { Business } from "@/types";
import { MapPin, ChevronUp, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface PostalCodeBreakdownProps {
  postalCodeBreakdown: {[key: string]: Business[]};
}

const PostalCodeBreakdown = ({ postalCodeBreakdown }: PostalCodeBreakdownProps) => {
  const [expandedPostalCodes, setExpandedPostalCodes] = useState<{[key: string]: boolean}>({});

  const togglePostalCode = (postalCode: string) => {
    setExpandedPostalCodes(prev => ({
      ...prev,
      [postalCode]: !prev[postalCode]
    }));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Aufschlüsselung nach PLZ</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(postalCodeBreakdown).map(([postalCode, plzBusinesses]) => (
          <Card key={postalCode} className="overflow-hidden">
            <CardHeader 
              className="cursor-pointer bg-slate-50 py-2 hover:bg-slate-100"
              onClick={() => togglePostalCode(postalCode)}
            >
              <CardTitle className="flex justify-between items-center text-base">
                <span className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  PLZ {postalCode}
                </span>
                <span className="flex items-center">
                  {plzBusinesses.length} Treffer
                  {expandedPostalCodes[postalCode] ? 
                    <ChevronUp className="h-4 w-4 ml-1" /> : 
                    <ChevronDown className="h-4 w-4 ml-1" />
                  }
                </span>
              </CardTitle>
            </CardHeader>
            {expandedPostalCodes[postalCode] && (
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Kategorie</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {plzBusinesses.map(business => (
                      <TableRow key={business.id}>
                        <TableCell className="py-2">{business.name}</TableCell>
                        <TableCell className="py-2">
                          {business.category === 'restaurants' ? 'Restaurant' : 'Hotel'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PostalCodeBreakdown;
