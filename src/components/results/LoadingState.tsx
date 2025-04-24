
import { Loader2 } from "lucide-react";

const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 space-y-4">
      <Loader2 className="h-10 w-10 text-harvester-blue animate-spin" />
      <p className="text-muted-foreground">Suche nach Geschäften...</p>
    </div>
  );
};

export default LoadingState;
