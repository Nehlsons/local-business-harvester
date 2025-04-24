
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const LegalNotice = () => {
  return (
    <Alert className="mt-8">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Rechtlicher Hinweis</AlertTitle>
      <AlertDescription>
        Diese Anwendung sammelt nur öffentlich verfügbare Daten. Die Nutzung muss 
        im Einklang mit der DSGVO und anderen rechtlichen Bestimmungen erfolgen. 
        Stellen Sie sicher, dass Sie die gesammelten Daten rechtmäßig verwenden und verarbeiten.
      </AlertDescription>
    </Alert>
  );
};

export default LegalNotice;
