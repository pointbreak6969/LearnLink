import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Clock, FileText, Trash2 } from "lucide-react";

const Resources = () => {
  const [Resources] = useState(
    Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `Uploaded Resource ${i + 1}`,
      date: `2026-01-${String(i + 1).padStart(2, "0")}`,
      approved: i % 2 === 0,
    }))
  );

  return (
    <div>
        <Card className="animate-fade-in-up">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-semibold text-ink-900">
                Your Resources
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {Resources.map((resource) => (
                <Card
                  key={resource.id}
                  className="overflow-hidden transition-all duration-300 hover:border-brand-300 hover:shadow-glow hover:-translate-y-1"
                >
                  <CardHeader className="p-0">
                    <div className="h-20 flex items-center justify-center bg-brand-50">
                      <FileText className="h-9 w-9 text-brand-500" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <h3 className="text-sm font-semibold mb-2 text-ink-900 truncate">
                      {resource.title}
                    </h3>
                    <p className="text-xs text-ink-500 mb-3 flex items-center">
                      <Clock className="w-3 h-3 mr-1" /> Uploaded on{" "}
                      {resource.date}
                    </p>
                    <div className="flex justify-between items-center">
                      <Badge
                        variant={resource.approved ? "success" : "secondary"}
                      >
                        {resource.approved ? "Approved" : "Pending"}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 flex items-center gap-1 text-xs"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
    </div>
  );
};

export default Resources;
