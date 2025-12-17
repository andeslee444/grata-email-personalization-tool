'use client';

import { SavedList, Company } from '@/types';
import { CompanyTable } from './CompanyTable';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderOpen } from 'lucide-react';

interface SavedListViewProps {
  savedList: SavedList;
  onSelectCompany: (company: Company) => void;
}

export function SavedListView({ savedList, onSelectCompany }: SavedListViewProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5" />
            {savedList.name}
          </CardTitle>
          <CardDescription>
            {savedList.companies.length} companies • Last updated {new Date(savedList.updatedAt).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
      </Card>

      <CompanyTable
        companies={savedList.companies}
        onSelectOutreach={onSelectCompany}
      />
    </div>
  );
}
