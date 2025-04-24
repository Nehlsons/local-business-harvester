
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface NoResultsProps {
  onRetry?: () => void;
}

const NoResults = ({ onRetry }: NoResultsProps) => {
  return (
    <div className="text-center py-10 space-y-4">
      <p className="text-muted-foreground">Keine Ergebnisse gefunden. Bitte versuchen Sie eine andere Suche.</p>
      
      {onRetry && (
        <Button 
          variant="outline" 
          onClick={onRetry} 
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Mit anderer Quelle versuchen
        </Button>
      )}
    </div>
  );
};

export default NoResults;
