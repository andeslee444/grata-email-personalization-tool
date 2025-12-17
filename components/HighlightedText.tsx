'use client';

import { useState } from 'react';
import { Citation } from '@/types';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { PopoverContent } from '@/components/ui/popover';

interface HighlightedTextProps {
  text: string;
  citations: Citation[];
  className?: string;
}

interface TextSegment {
  text: string;
  citation?: Citation;
  startIndex: number;
  endIndex: number;
}

export function HighlightedText({ text, citations, className = '' }: HighlightedTextProps) {
  const [openFootnote, setOpenFootnote] = useState<string | null>(null);

  // If no text, return empty
  if (!text) {
    return <span className={className}></span>;
  }

  // If no citations, render plain text
  if (!citations || citations.length === 0) {
    return <span className={className}>{text}</span>;
  }

  // Sort citations by startIndex to process them in order
  const sortedCitations = [...citations].sort((a, b) => a.startIndex - b.startIndex);

  // Split text into segments (cited and non-cited)
  const segments: TextSegment[] = [];
  let currentIndex = 0;

  sortedCitations.forEach((citation) => {
    // Skip invalid citations
    if (citation.startIndex < 0 || citation.endIndex > text.length || citation.startIndex >= citation.endIndex) {
      return;
    }

    // Add non-cited text before this citation
    if (currentIndex < citation.startIndex) {
      segments.push({
        text: text.substring(currentIndex, citation.startIndex),
        startIndex: currentIndex,
        endIndex: citation.startIndex
      });
    }

    // Add cited text
    segments.push({
      text: text.substring(citation.startIndex, citation.endIndex),
      citation,
      startIndex: citation.startIndex,
      endIndex: citation.endIndex
    });

    currentIndex = citation.endIndex;
  });

  // Add remaining non-cited text
  if (currentIndex < text.length) {
    segments.push({
      text: text.substring(currentIndex),
      startIndex: currentIndex,
      endIndex: text.length
    });
  }

  // Fallback: if no segments, render plain text
  if (segments.length === 0) {
    return <span className={className}>{text}</span>;
  }

  const getFootnoteColor = (sourceType: string) => {
    // Blue for Grata sources (company_profile, news, company_website)
    // Orange for user uploads (user_upload)
    if (sourceType === 'user_upload') {
      return 'text-orange-600 hover:text-orange-700';
    }
    return 'text-blue-600 hover:text-blue-700';
  };

  return (
    <span className={className}>
      {segments.map((segment, index) => {
        if (segment.citation) {
          // This is a footnote marker like [1], [2], etc.
          const footnoteNumber = segment.text.replace(/[\[\]]/g, ''); // Extract number from [1]

          return (
            <PopoverPrimitive.Root
              key={index}
              open={openFootnote === footnoteNumber}
              onOpenChange={(open) => setOpenFootnote(open ? footnoteNumber : null)}
            >
              <PopoverPrimitive.Trigger asChild>
                <button
                  type="button"
                  className={`${getFootnoteColor(segment.citation.source.type)} cursor-help font-bold transition-colors align-super text-[0.75em] hover:underline`}
                  onMouseEnter={() => setOpenFootnote(footnoteNumber)}
                  onMouseLeave={() => setOpenFootnote(null)}
                >
                  [{footnoteNumber}]
                </button>
              </PopoverPrimitive.Trigger>
              <PopoverContent
                className="w-96"
                side="top"
                onMouseEnter={() => setOpenFootnote(footnoteNumber)}
                onMouseLeave={() => setOpenFootnote(null)}
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      segment.citation.source.type === 'user_upload'
                        ? 'bg-orange-400'
                        : 'bg-blue-400'
                    }`} />
                    <h4 className="font-semibold text-sm">
                      {segment.citation.source.type === 'user_upload'
                        ? 'User Upload'
                        : 'Grata Data'}
                    </h4>
                  </div>

                  {segment.citation.source.evidence && (
                    <div className="bg-muted/50 p-3 rounded-md border-l-2 border-blue-500">
                      <p className="text-xs font-medium text-muted-foreground mb-1">Evidence:</p>
                      <p className="text-sm italic">"{segment.citation.source.evidence}"</p>
                    </div>
                  )}

                  <div className="text-sm">
                    <p className="font-medium">{segment.citation.source.name}</p>
                    {segment.citation.source.detail && (
                      <p className="text-muted-foreground text-xs mt-1">
                        {segment.citation.source.detail}
                      </p>
                    )}
                  </div>

                  <div className="text-xs text-muted-foreground pt-2 border-t">
                    <p className="capitalize">{segment.citation.source.type.replace('_', ' ')}</p>
                  </div>
                </div>
              </PopoverContent>
            </PopoverPrimitive.Root>
          );
        }

        return <span key={index}>{segment.text}</span>;
      })}
    </span>
  );
}
