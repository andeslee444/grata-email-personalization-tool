'use client';

import { useState } from 'react';
import { Company } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, ChevronDown, ChevronRight, Newspaper, TrendingUp, Users2 } from 'lucide-react';

interface CompanyTableProps {
  companies: Company[];
  onSelectOutreach: (company: Company) => void;
}

export function CompanyTable({ companies, onSelectOutreach }: CompanyTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (companyId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(companyId)) {
      newExpanded.delete(companyId);
    } else {
      newExpanded.add(companyId);
    }
    setExpandedRows(newExpanded);
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[50px]"></TableHead>
            <TableHead className="w-[250px]">Company</TableHead>
            <TableHead>Industry</TableHead>
            <TableHead>Location</TableHead>
            <TableHead className="w-[400px]">Description</TableHead>
            <TableHead>Recent Activity</TableHead>
            <TableHead className="text-center w-[120px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.map((company) => {
            const isExpanded = expandedRows.has(company.id);
            return (
              <>
                <TableRow key={company.id} className="hover:bg-muted/50">
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleRow(company.id)}
                      className="h-8 w-8 p-0"
                    >
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell
                    className="font-medium cursor-pointer"
                    onClick={() => toggleRow(company.id)}
                  >
                    <div>
                      <div className="font-semibold">{company.name}</div>
                      {company.website && (
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-muted-foreground hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {company.website.replace('https://', '')}
                        </a>
                      )}
                    </div>
                  </TableCell>
                  <TableCell onClick={() => toggleRow(company.id)} className="cursor-pointer">
                    <Badge variant="secondary" className="whitespace-nowrap">
                      {company.industry}
                    </Badge>
                  </TableCell>
                  <TableCell onClick={() => toggleRow(company.id)} className="text-sm cursor-pointer">
                    {company.geography}
                  </TableCell>
                  <TableCell onClick={() => toggleRow(company.id)} className="text-sm text-muted-foreground cursor-pointer">
                    {company.description}
                  </TableCell>
                  <TableCell onClick={() => toggleRow(company.id)} className="cursor-pointer">
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
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectOutreach(company);
                      }}
                      className="w-full"
                    >
                      <Mail className="h-4 w-4 mr-1" />
                      Outreach
                    </Button>
                  </TableCell>
                </TableRow>
                {isExpanded && (
                  <TableRow key={`${company.id}-expanded`}>
                    <TableCell colSpan={7} className="bg-muted/20 p-0">
                      <div className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* Recent News */}
                          {company.recentNews && company.recentNews.length > 0 && (
                            <Card>
                              <CardHeader className="pb-3">
                                <CardTitle className="text-sm flex items-center gap-2">
                                  <Newspaper className="h-4 w-4" />
                                  Recent News
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-3">
                                {company.recentNews.map((news) => (
                                  <div key={news.id} className="text-sm">
                                    <div className="font-medium">{news.title}</div>
                                    <div className="text-xs text-muted-foreground mt-1">
                                      {news.summary}
                                    </div>
                                    <div className="text-xs text-muted-foreground mt-1">
                                      {news.source} • {new Date(news.date).toLocaleDateString()}
                                    </div>
                                  </div>
                                ))}
                              </CardContent>
                            </Card>
                          )}

                          {/* Strategic Signals */}
                          <Card>
                            <CardHeader className="pb-3">
                              <CardTitle className="text-sm flex items-center gap-2">
                                <TrendingUp className="h-4 w-4" />
                                Strategic Signals
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              {company.strategicSignals.map((signal, idx) => (
                                <div key={idx} className="text-sm">
                                  <Badge variant="outline" className="text-xs mb-1">
                                    {signal.type}
                                  </Badge>
                                  <div className="text-xs text-muted-foreground">
                                    {signal.description}
                                  </div>
                                </div>
                              ))}
                            </CardContent>
                          </Card>

                          {/* Management Team */}
                          <Card>
                            <CardHeader className="pb-3">
                              <CardTitle className="text-sm flex items-center gap-2">
                                <Users2 className="h-4 w-4" />
                                Management Team
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              {company.management.map((member) => (
                                <div key={member.id} className="text-sm">
                                  <div className="font-medium">{member.name}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {member.title}
                                  </div>
                                </div>
                              ))}
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
