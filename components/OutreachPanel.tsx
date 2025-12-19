'use client';

import { useState, useEffect } from 'react';
import { Company, EmailDraft, OutreachConfig, UserContext } from '@/types';
import { EmailDraftCard } from './EmailDraftCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { X, Loader2, Building2, Users, Target, Lightbulb, Handshake, TrendingUp, MessageCircle, Rocket, Briefcase, Linkedin } from 'lucide-react';
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

  // Helper function to get recipient options from company management
  const getRecipientOptions = () => {
    const recipientMap: Record<string, { titles: string[], label: string }> = {
      'founder': { titles: ['Founder', 'Co-Founder'], label: 'Founder' },
      'ceo': { titles: ['CEO'], label: 'CEO' },
      'cfo': { titles: ['CFO'], label: 'CFO' },
      'business_lead': { titles: ['VP', 'COO', 'CTO', 'Chief'], label: 'Business Lead' }
    };

    const options: Array<{ value: string, label: string, name: string, title: string }> = [];

    Object.entries(recipientMap).forEach(([value, { titles, label }]) => {
      const recipient = company.management.find(m =>
        titles.some(title => m.title.includes(title))
      );

      if (recipient) {
        options.push({
          value,
          label,
          name: recipient.name,
          title: recipient.title
        });
      }
    });

    return options;
  };

  const recipientOptions = getRecipientOptions();

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

  const handleToneAdjust = async (draftId: string, adjustment: 'formal' | 'casual' | 'shorten' | 'detail') => {
    const draft = drafts.find(d => d.id === draftId);
    if (!draft) return;

    const adjustmentPrompts = {
      formal: 'Rewrite this email in a more formal, professional tone while maintaining all the key points and citations.',
      casual: 'Rewrite this email in a more casual, conversational tone while maintaining professionalism and all citations.',
      shorten: 'Shorten this email by approximately 30% while keeping the most important points and citations.',
      detail: 'Expand this email with more detail and context while maintaining the same tone and adding relevant citations.'
    };

    try {
      const response = await fetch('/api/regenerate-section', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalDraft: draft,
          selectedText: draft.body,
          direction: adjustmentPrompts[adjustment],
          company,
          config,
          userContexts
        })
      });

      if (!response.ok) {
        throw new Error('Failed to adjust tone');
      }

      const data = await response.json();

      // Update the draft with the new version
      setDrafts(prev => prev.map(d =>
        d.id === draftId ? { ...d, body: data.regeneratedText } : d
      ));
    } catch (error) {
      console.error('Error adjusting tone:', error);
      throw error;
    }
  };

  const getAngleIcon = (angle: string) => {
    switch (angle) {
      case 'Strategy':
        return <Lightbulb className="h-4 w-4" />;
      case 'Portfolio Synergy':
        return <Briefcase className="h-4 w-4" />;
      case 'Relationship':
        return <Handshake className="h-4 w-4" />;
      case 'Market Commentary':
        return <TrendingUp className="h-4 w-4" />;
      case 'Growth Partnership':
        return <Rocket className="h-4 w-4" />;
      case 'Acquisition Interest':
        return <Target className="h-4 w-4" />;
      default:
        return <MessageCircle className="h-4 w-4" />;
    }
  };

  useEffect(() => {
    // Auto-generate on mount
    handleGenerate();
  }, []);

  const selectedRecipient = company.management.find(m => {
    const recipientMap: Record<string, string[]> = {
      'founder': ['Founder', 'Co-Founder'],
      'ceo': ['CEO'],
      'cfo': ['CFO'],
      'business_lead': ['VP', 'COO', 'CTO', 'Chief']
    };
    const targetTitles = recipientMap[config.recipientPersona] || ['CEO'];
    return targetTitles.some(title => m.title.includes(title));
  }) || company.management[0];

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
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
                  <SelectValue>
                    {(() => {
                      const selected = recipientOptions.find(opt => opt.value === config.recipientPersona);
                      return selected ? (
                        <div className="flex items-baseline gap-2">
                          <span className="font-medium">{selected.name}</span>
                          <span className="text-xs text-muted-foreground">• {selected.title}</span>
                        </div>
                      ) : 'Select recipient';
                    })()}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {recipientOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-baseline gap-2">
                        <span className="font-medium">{option.name}</span>
                        <span className="text-xs text-muted-foreground">• {option.title}</span>
                      </div>
                    </SelectItem>
                  ))}
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

      {/* Main Content - Two Column Layout */}
      <div className="flex-1 overflow-hidden flex">
        {/* Left: Email Drafts */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
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
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-lg">Generated Drafts</h3>
                  <Badge variant="outline">{drafts.length} variations</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {drafts.map((draft) => (
                    <EmailDraftCard
                      key={draft.id}
                      draft={draft}
                      onCopy={handleCopyDraft}
                      onEdit={handleEditDraft}
                      onToneAdjust={handleToneAdjust}
                      angleIcon={getAngleIcon(draft.angle)}
                    />
                  ))}
                </div>
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
        </div>

        {/* Right: Company & Recipient Information Sidebar */}
        <div className="w-96 border-l bg-muted/30 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Company Metrics */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Company Overview
              </h3>
              <Card>
                <CardContent className="p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Description</p>
                      <p className="text-sm font-medium mt-1">{company.description}</p>
                    </div>
                  </div>
                  {company.website && (
                    <div>
                      <p className="text-xs text-muted-foreground">Website</p>
                      <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                        {company.website}
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Recipient Information */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Recipient Profile
              </h3>
              <Card>
                <CardContent className="p-4 space-y-3">
                  <div>
                    <p className="font-medium">{selectedRecipient.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedRecipient.title}</p>
                  </div>
                  {selectedRecipient.background && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Background</p>
                      <p className="text-sm">{selectedRecipient.background}</p>
                    </div>
                  )}
                  {selectedRecipient.interests && selectedRecipient.interests.length > 0 && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Interests</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedRecipient.interests.map((interest, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedRecipient.tenure && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Tenure</p>
                      <p className="text-sm">{selectedRecipient.tenure}</p>
                    </div>
                  )}
                  {selectedRecipient.recentActivity && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Recent Activity</p>
                      <p className="text-sm">{selectedRecipient.recentActivity}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* LinkedIn Activity */}
            {selectedRecipient.linkedInActivity && selectedRecipient.linkedInActivity.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Linkedin className="h-4 w-4 text-blue-600" />
                  Recent LinkedIn Activity
                </h3>
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      {selectedRecipient.linkedInActivity.slice(0, 3).map((post, idx) => (
                        <div key={idx} className={idx !== 0 ? 'pt-4 border-t' : ''}>
                          <div className="flex items-start gap-2 mb-2">
                            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                              <span className="text-[10px] text-white font-bold">
                                {selectedRecipient.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium">{selectedRecipient.name}</p>
                              <p className="text-[10px] text-muted-foreground">{post.date}</p>
                            </div>
                          </div>
                          <p className="text-xs text-foreground leading-relaxed mb-2">{post.content}</p>
                          {post.engagement && (
                            <p className="text-[10px] text-muted-foreground">{post.engagement}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Strategic Signals */}
            {company.strategicSignals && company.strategicSignals.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Rocket className="h-4 w-4" />
                  Strategic Signals
                </h3>
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {company.strategicSignals.slice(0, 5).map((signal, idx) => (
                        <div key={idx} className="flex gap-2">
                          <div className="flex-shrink-0 mt-0.5">
                            {signal.type === 'growth' && <TrendingUp className="h-4 w-4 text-green-600" />}
                            {signal.type === 'hiring' && <Users className="h-4 w-4 text-blue-600" />}
                            {signal.type === 'ma' && <Briefcase className="h-4 w-4 text-purple-600" />}
                            {signal.type === 'expansion' && <Rocket className="h-4 w-4 text-orange-600" />}
                            {signal.type === 'product_launch' && <Lightbulb className="h-4 w-4 text-yellow-600" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm">{signal.description}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {signal.date} • {signal.source}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Recent News */}
            {company.recentNews && company.recentNews.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Recent News
                </h3>
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {company.recentNews.map((news) => (
                        <div key={news.id} className="space-y-1">
                          <p className="text-sm font-medium">{news.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {news.date} • {news.source}
                          </p>
                          {news.summary && news.summary !== news.title && (
                            <p className="text-xs text-muted-foreground">{news.summary}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
