'use client';

import { Company } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building2, MapPin, TrendingUp } from 'lucide-react';

interface CompanyCardProps {
  company: Company;
  onSelectOutreach: (company: Company) => void;
}

export function CompanyCard({ company, onSelectOutreach }: CompanyCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              {company.name}
            </CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3" />
              {company.geography}
            </CardDescription>
          </div>
          <Badge variant="secondary">{company.industry}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {company.description}
        </p>

        {company.strategicSignals.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground mb-2">
              <TrendingUp className="h-3 w-3" />
              Recent Activity
            </div>
            <div className="flex flex-wrap gap-1">
              {company.strategicSignals.slice(0, 3).map((signal, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {signal.type}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <Button
          onClick={() => onSelectOutreach(company)}
          className="w-full"
          variant="default"
        >
          Start Outreach
        </Button>
      </CardContent>
    </Card>
  );
}
