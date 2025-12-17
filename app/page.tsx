'use client';

import { useState } from 'react';
import { SavedListView } from '@/components/SavedListView';
import { OutreachPanel } from '@/components/OutreachPanel';
import { mockSavedLists, mockUserContext } from '@/lib/mock-data';
import { Company } from '@/types';
import { Mail } from 'lucide-react';

export default function Home() {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const savedList = mockSavedLists[0];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Grata Email Personalization</h1>
              <p className="text-sm text-muted-foreground">AI-powered outreach for private markets</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <SavedListView
          savedList={savedList}
          onSelectCompany={setSelectedCompany}
        />
      </main>

      {/* Outreach Panel (Side Pop-out) */}
      {selectedCompany && (
        <OutreachPanel
          company={selectedCompany}
          userContexts={mockUserContext}
          onClose={() => setSelectedCompany(null)}
        />
      )}
    </div>
  );
}
