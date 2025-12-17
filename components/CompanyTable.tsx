'use client';

import { Company } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail } from 'lucide-react';

interface CompanyTableProps {
  companies: Company[];
  onSelectOutreach: (company: Company) => void;
}

export function CompanyTable({ companies, onSelectOutreach }: CompanyTableProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[250px]">Company</TableHead>
            <TableHead>Industry</TableHead>
            <TableHead>Location</TableHead>
            <TableHead className="w-[400px]">Description</TableHead>
            <TableHead>Recent Activity</TableHead>
            <TableHead className="text-center w-[120px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.map((company) => (
            <TableRow key={company.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">
                <div>
                  <div className="font-semibold">{company.name}</div>
                  {company.website && (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted-foreground hover:underline"
                    >
                      {company.website.replace('https://', '')}
                    </a>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className="whitespace-nowrap">
                  {company.industry}
                </Badge>
              </TableCell>
              <TableCell className="text-sm">{company.geography}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {company.description}
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1 max-w-[200px]">
                  {company.strategicSignals.slice(0, 2).map((signal, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {signal.type}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-center">
                <Button
                  size="sm"
                  onClick={() => onSelectOutreach(company)}
                  className="w-full"
                >
                  <Mail className="h-4 w-4 mr-1" />
                  Outreach
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
