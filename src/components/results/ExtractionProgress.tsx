
import { Progress } from "@/components/ui/progress";

interface ExtractionProgressProps {
  totalBusinesses: number;
  extractedCount: number;
  progress: number;
}

const ExtractionProgress = ({ totalBusinesses, extractedCount, progress }: ExtractionProgressProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>{extractedCount} von {totalBusinesses} extrahiert</span>
        <span>{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};

export default ExtractionProgress;
