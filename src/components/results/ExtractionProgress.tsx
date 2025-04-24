
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";

interface ExtractionProgressProps {
  totalBusinesses: number;
  extractedCount: number;
  progress: number;
  isExtracting?: boolean;
}

const ExtractionProgress = ({ 
  totalBusinesses, 
  extractedCount, 
  progress, 
  isExtracting = false 
}: ExtractionProgressProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="flex items-center">
          {extractedCount} von {totalBusinesses} extrahiert
          {isExtracting && (
            <Loader2 className="ml-2 h-3 w-3 text-harvester-blue animate-spin" />
          )}
        </span>
        <span>{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};

export default ExtractionProgress;
