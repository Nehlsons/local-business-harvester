
import { Mail, Phone } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface ResultsFiltersProps {
  filters: {
    hasEmail: boolean;
    hasPhone: boolean;
  };
  onFiltersChange: (filters: { hasEmail: boolean; hasPhone: boolean }) => void;
}

const ResultsFilters = ({ filters, onFiltersChange }: ResultsFiltersProps) => {
  return (
    <div className="flex gap-4 items-center">
      <div className="flex items-center gap-2">
        <Checkbox 
          id="hasEmail" 
          checked={filters.hasEmail}
          onCheckedChange={(checked) => 
            onFiltersChange({ ...filters, hasEmail: checked as boolean })
          }
        />
        <label htmlFor="hasEmail" className="text-sm flex items-center gap-1">
          <Mail className="h-4 w-4" />
          Hat E-Mail
        </label>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox 
          id="hasPhone" 
          checked={filters.hasPhone}
          onCheckedChange={(checked) => 
            onFiltersChange({ ...filters, hasPhone: checked as boolean })
          }
        />
        <label htmlFor="hasPhone" className="text-sm flex items-center gap-1">
          <Phone className="h-4 w-4" />
          Hat Telefonnummer
        </label>
      </div>
    </div>
  );
};

export default ResultsFilters;
