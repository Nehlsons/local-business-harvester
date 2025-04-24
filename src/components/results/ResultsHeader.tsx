
import { Button } from "@/components/ui/button";
import { FileSpreadsheet } from "lucide-react";

interface ResultsHeaderProps {
  resultCount: number;
  onExport: () => void;
  isExporting: boolean;
}

const ResultsHeader = ({ resultCount, onExport, isExporting }: ResultsHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-bold">Ergebnisse ({resultCount})</h2>
      <Button 
        variant="outline" 
        className="flex items-center gap-2"
        onClick={onExport}
        disabled={resultCount === 0 || isExporting}
      >
        <FileSpreadsheet className="h-4 w-4" />
        {isExporting ? "Exportiere..." : "Nach Excel exportieren"}
      </Button>
    </div>
  );
};

export default ResultsHeader;
