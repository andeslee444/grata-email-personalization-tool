'use client';

import { useState, useEffect } from 'react';
import { Company, EmailDraft, OutreachConfig, UserContext } from '@/types';
import { EmailDraftCard } from './EmailDraftCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { X, Loader2, Building2, Users, Target } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

interface OutreachPanelProps {
  company: Company;
  userContexts: UserContext[];
  onClose: () => void;
}

export function OutreachPanel({ company, userContexts, onClose }: OutreachPanelProps) {
  const [drafts, setDrafts] = useState<EmailDraft[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState<OutreachConfig>({
    objective: 'relationship',
    recipientPersona: 'ceo',
  });
  const [copyCount, setCopyCount] = useState(0);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company,
          config,
          userContexts,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate emails');
      }

      const data = await response.json();
      setDrafts(data.drafts);
      toast.success('Email drafts generated!');
    } catch (error) {
      console.error('Error generating drafts:', error);
      toast.error('Failed to generate email drafts. Please check your API key.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditDraft = (draftId: string, newSubject: string, newBody: string) => {
    setDrafts(prev =>
      prev.map(draft =>
        draft.id === draftId
          ? { ...draft, subject: newSubject, body: newBody }
          : draft
      )
    );
  };

  const handleCopyDraft = () => {
    setCopyCount(prev => prev + 1);
  };

  useEffect(() => {
    // Auto-generate on mount
    handleGenerate();
  }, []);

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-2/3 lg:w-1/2 bg-background border-l shadow-2xl z-50 flex flex-col">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold">{company.name}</h2>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{company.industry} • {company.geography}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Configuration */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-xs font-medium flex items-center gap-1">
                <Target className="h-3 w-3" />
                Objective
              </label>
              <Select
                value={config.objective}
                onValueChange={(value: any) => setConfig(prev => ({ ...prev, objective: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relationship">Relationship Building</SelectItem>
                  <SelectItem value="buy_side">Buy-Side Interest</SelectItem>
                  <SelectItem value="sell_side">Sell-Side Pitch</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium flex items-center gap-1">
                <Users className="h-3 w-3" />
                Recipient
              </label>
              <Select
                value={config.recipientPersona}
                onValueChange={(value: any) => setConfig(prev => ({ ...prev, recipientPersona: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="founder">Founder</SelectItem>
                  <SelectItem value="ceo">CEO</SelectItem>
                  <SelectItem value="cfo">CFO</SelectItem>
                  <SelectItem value="business_lead">Business Lead</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {drafts.length > 0 ? 'Regenerate All Drafts' : 'Generate Drafts'}
          </Button>

          {copyCount > 0 && (
            <div className="text-center">
              <Badge variant="secondary">
                {copyCount} {copyCount === 1 ? 'draft' : 'drafts'} copied
              </Badge>
            </div>
          )}
        </div>
      </div>

      {/* Drafts */}
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-4">
          {isLoading && drafts.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                <p className="text-sm text-muted-foreground">
                  Generating personalized email drafts...
                </p>
              </CardContent>
            </Card>
          )}

          {drafts.length > 0 && (
            <>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Generated Drafts</h3>
                <Badge variant="outline">{drafts.length} variations</Badge>
              </div>

              {drafts.map((draft) => (
                <EmailDraftCard
                  key={draft.id}
                  draft={draft}
                  onCopy={handleCopyDraft}
                  onEdit={handleEditDraft}
                />
              ))}
            </>
          )}

          {!isLoading && drafts.length === 0 && (
            <Card>
              <CardHeader>
                <CardTitle>No Drafts Yet</CardTitle>
                <CardDescription>
                  Configure your outreach settings and click "Generate Drafts" to get started.
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
