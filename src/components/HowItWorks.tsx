
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSearch, Database, FileSpreadsheet, AlertTriangle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FileSearch className="h-6 w-6 text-harvester-blue" />,
      title: "Suche",
      description: "Geben Sie eine Stadt oder Postleitzahl ein und wählen Sie den Geschäftstyp aus (Restaurants, Hotels oder beides)."
    },
    {
      icon: <Database className="h-6 w-6 text-harvester-blue" />,
      title: "Datenextraktion",
      description: "Die App sucht relevante Geschäfte und extrahiert automatisch Kontaktdaten von deren Webseiten."
    },
    {
      icon: <FileSpreadsheet className="h-6 w-6 text-harvester-blue" />,
      title: "Export",
      description: "Die gesammelten Daten können als Excel-Tabelle exportiert werden für weitere Analysen oder Marketingzwecke."
    },
    {
      icon: <AlertTriangle className="h-6 w-6 text-amber-500" />,
      title: "Rechtliche Hinweise",
      description: "Stellen Sie sicher, dass Ihre Datennutzung DSGVO-konform ist und respektieren Sie die Datenschutzrechte."
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">So funktioniert es</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((step, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                {step.icon}
                <div className="bg-harvester-lightBlue text-harvester-blue rounded-full h-6 w-6 flex items-center justify-center">
                  {index + 1}
                </div>
              </div>
              <CardTitle className="text-lg">{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{step.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
