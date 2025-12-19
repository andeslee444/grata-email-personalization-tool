'use client';

import { useState } from 'react';
import { EmailDraft } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Edit2, Check, RefreshCw, Wand2, Minimize2, FileText, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { HighlightedText } from './HighlightedText';

interface EmailDraftCardProps {
  draft: EmailDraft;
  onCopy: () => void;
  onEdit: (draftId: string, newSubject: string, newBody: string) => void;
  onRegenerateSelection?: (selectedText: string) => void;
  onToneAdjust?: (draftId: string, adjustment: 'formal' | 'casual' | 'shorten' | 'detail') => void;
  angleIcon?: React.ReactNode;
}

export function EmailDraftCard({ draft, onCopy, onEdit, onRegenerateSelection, onToneAdjust, angleIcon }: EmailDraftCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSubject, setEditedSubject] = useState(draft.subject);
  const [editedBody, setEditedBody] = useState(draft.body);
  const [copied, setCopied] = useState(false);
  const [isAdjusting, setIsAdjusting] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`Subject: ${draft.subject}\n\n${draft.body}`);
    setCopied(true);
    onCopy();
    toast.success('Email copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    onEdit(draft.id, editedSubject, editedBody);
    setIsEditing(false);
    toast.success('Draft updated!');
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const selectedText = selection?.toString().trim();

    if (selectedText && selectedText.length > 10 && onRegenerateSelection) {
      // Show regenerate option for selected text
      console.log('Selected text:', selectedText);
    }
  };

  const handleToneAdjust = async (adjustment: 'formal' | 'casual' | 'shorten' | 'detail') => {
    if (!onToneAdjust) return;
    setIsAdjusting(true);
    try {
      await onToneAdjust(draft.id, adjustment);
      const adjustmentLabels = {
        formal: 'More formal',
        casual: 'More casual',
        shorten: 'Shortened',
        detail: 'More detailed'
      };
      toast.success(`${adjustmentLabels[adjustment]} version generated!`);
    } catch (error) {
      toast.error('Failed to adjust tone');
    } finally {
      setIsAdjusting(false);
    }
  };

  return (
    <Card className="relative h-full flex flex-col group">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Badge variant="secondary" className="flex items-center gap-1">
          {angleIcon}
          {draft.angle}
        </Badge>
        <div className="flex gap-1">
          {!isEditing && (
            <>
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
                className="h-7 w-7 p-0"
              >
                <Edit2 className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant={copied ? "default" : "outline"}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy();
                }}
                className="h-7 w-7 p-0"
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              </Button>
            </>
          )}
          {isEditing && (
            <Button size="sm" onClick={handleSave} className="h-7 text-xs px-2">
              Save
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-2 flex-1 overflow-hidden">
        {isEditing ? (
          <>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Subject</label>
              <Textarea
                value={editedSubject}
                onChange={(e) => setEditedSubject(e.target.value)}
                className="mt-1 min-h-[30px] text-xs"
                rows={1}
              />
            </div>
            <div className="flex-1">
              <label className="text-xs font-medium text-muted-foreground">Body</label>
              <Textarea
                value={editedBody}
                onChange={(e) => setEditedBody(e.target.value)}
                className="mt-1 h-[200px] text-xs"
                rows={8}
              />
            </div>
          </>
        ) : (
          <>
            <div
              onClick={() => setIsEditing(true)}
              className="cursor-pointer hover:bg-muted/30 transition-colors rounded p-2 -m-2"
            >
              <div className="text-xs font-medium text-muted-foreground mb-1">Subject</div>
              <HighlightedText
                text={draft.subject}
                citations={draft.citations.filter(c =>
                  c.startIndex < draft.subject.length
                )}
                className="font-medium text-xs line-clamp-2"
              />
            </div>
            <div
              onClick={() => setIsEditing(true)}
              className="flex-1 overflow-hidden cursor-pointer hover:bg-muted/30 transition-colors rounded p-2 -m-2"
            >
              <div className="text-xs font-medium text-muted-foreground mb-1">Body</div>
              <HighlightedText
                text={draft.body}
                citations={draft.citations}
                className="text-xs whitespace-pre-wrap leading-relaxed select-text line-clamp-[12] overflow-hidden"
              />
            </div>
          </>
        )}
      </CardContent>

      {/* Quick Tone Adjustment Buttons */}
      {!isEditing && onToneAdjust && (
        <div className="border-t px-4 py-2 bg-muted/20">
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-muted-foreground mr-1">Quick adjust:</span>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleToneAdjust('formal')}
              disabled={isAdjusting}
              className="h-6 text-[10px] px-2 py-0"
            >
              <Wand2 className="h-3 w-3 mr-1" />
              Formal
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleToneAdjust('casual')}
              disabled={isAdjusting}
              className="h-6 text-[10px] px-2 py-0"
            >
              <Zap className="h-3 w-3 mr-1" />
              Casual
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleToneAdjust('shorten')}
              disabled={isAdjusting}
              className="h-6 text-[10px] px-2 py-0"
            >
              <Minimize2 className="h-3 w-3 mr-1" />
              Shorten
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleToneAdjust('detail')}
              disabled={isAdjusting}
              className="h-6 text-[10px] px-2 py-0"
            >
              <FileText className="h-3 w-3 mr-1" />
              Detail
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
