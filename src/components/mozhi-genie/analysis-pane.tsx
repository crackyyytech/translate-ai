import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface AnalysisPaneProps {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
  contentClassName?: string;
  fontClassName?: string;
}

const AnalysisPane = ({ title, children, actions, className, contentClassName, fontClassName }: AnalysisPaneProps) => {
  return (
    <Card className={cn("flex flex-col h-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </CardHeader>
      <CardContent className="flex-grow p-0 overflow-hidden">
        <ScrollArea className="h-full">
            <div className={cn("p-6 pt-0 text-base leading-relaxed whitespace-pre-wrap min-h-full", contentClassName, fontClassName)}>
                {children}
            </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AnalysisPane;
