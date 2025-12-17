'use client';

import { useState } from 'react';
import { EmailDraft } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Edit2, Check, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

interface EmailDraftCardProps {
  draft: EmailDraft;
  onCopy: () => void;
  onEdit: (draftId: string, newSubject: string, newBody: string) => void;
  onRegenerateSelection?: (selectedText: string) => void;
}

export function EmailDraftCard({ draft, onCopy, onEdit, onRegenerateSelection }: EmailDraftCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSubject, setEditedSubject] = useState(draft.subject);
  const [editedBody, setEditedBody] = useState(draft.body);
  const [copied, setCopied] = useState(false);

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

  return (
    <Card className="relative">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <Badge variant="secondary">{draft.angle}</Badge>
        <div className="flex gap-2">
          {!isEditing && (
            <>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsEditing(true)}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant={copied ? "default" : "outline"}
                onClick={handleCopy}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </>
          )}
          {isEditing && (
            <Button size="sm" onClick={handleSave}>
              Save
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {isEditing ? (
          <>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Subject</label>
              <Textarea
                value={editedSubject}
                onChange={(e) => setEditedSubject(e.target.value)}
                className="mt-1 min-h-[40px]"
                rows={1}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Body</label>
              <Textarea
                value={editedBody}
                onChange={(e) => setEditedBody(e.target.value)}
                className="mt-1 min-h-[200px]"
                rows={10}
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <div className="text-xs font-medium text-muted-foreground mb-1">Subject</div>
              <div className="font-medium text-sm">{draft.subject}</div>
            </div>
            <div>
              <div className="text-xs font-medium text-muted-foreground mb-1">Body</div>
              <div
                className="text-sm whitespace-pre-wrap leading-relaxed select-text"
                onMouseUp={handleTextSelection}
              >
                {draft.body}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
