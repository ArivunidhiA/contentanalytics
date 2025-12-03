import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Article } from '@/types/analytics';
import { ArrowUpDown, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';

interface TopArticlesTableProps {
  articles: Article[];
  isLoading?: boolean;
}

type SortKey = 'pageViews' | 'engagementRate' | 'avgTimeOnPage' | 'socialShares';
type SortDirection = 'asc' | 'desc';

export const TopArticlesTable = ({ articles, isLoading }: TopArticlesTableProps) => {
  const [sortKey, setSortKey] = useState<SortKey>('pageViews');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const sortedArticles = useMemo(() => {
    return [...articles].sort((a, b) => {
      const aValue = a.metrics[sortKey];
      const bValue = b.metrics[sortKey];
      return sortDirection === 'desc' ? bValue - aValue : aValue - bValue;
    }).slice(0, 10);
  }, [articles, sortKey, sortDirection]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc');
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const SortButton = ({ label, sortKeyValue }: { label: string; sortKeyValue: SortKey }) => (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 px-2 hover:bg-muted"
      onClick={() => handleSort(sortKeyValue)}
    >
      {label}
      <ArrowUpDown className={cn(
        "ml-1 h-3 w-3",
        sortKey === sortKeyValue && "text-primary"
      )} />
    </Button>
  );

  if (isLoading) {
    return (
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Top Performing Articles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-16 animate-pulse rounded-lg bg-muted/50" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span>Top Performing Articles</span>
          <Badge variant="secondary" className="font-normal">
            {articles.length} articles
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[40%]">Article</TableHead>
                <TableHead><SortButton label="Views" sortKeyValue="pageViews" /></TableHead>
                <TableHead><SortButton label="Engagement" sortKeyValue="engagementRate" /></TableHead>
                <TableHead><SortButton label="Avg. Time" sortKeyValue="avgTimeOnPage" /></TableHead>
                <TableHead><SortButton label="Shares" sortKeyValue="socialShares" /></TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedArticles.map((article) => (
                <>
                  <TableRow 
                    key={article.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => setExpandedRow(expandedRow === article.id ? null : article.id)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img 
                          src={article.thumbnail} 
                          alt=""
                          className="h-10 w-14 rounded object-cover"
                        />
                        <div className="min-w-0">
                          <p className="font-medium truncate max-w-[300px]">{article.title}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{article.author}</span>
                            <span>•</span>
                            <span>{format(parseISO(article.publishDate), 'MMM d, yyyy')}</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{formatNumber(article.metrics.pageViews)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-16 rounded-full bg-muted overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${article.metrics.engagementRate}%` }}
                          />
                        </div>
                        <span className="text-sm">{article.metrics.engagementRate.toFixed(1)}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{formatTime(article.metrics.avgTimeOnPage)}</TableCell>
                    <TableCell>{formatNumber(article.metrics.socialShares)}</TableCell>
                    <TableCell>
                      {expandedRow === article.id ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </TableCell>
                  </TableRow>
                  {expandedRow === article.id && (
                    <TableRow key={`${article.id}-expanded`}>
                      <TableCell colSpan={6} className="bg-muted/30 p-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Unique Visitors</p>
                            <p className="font-semibold">{formatNumber(article.metrics.uniqueVisitors)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Bounce Rate</p>
                            <p className="font-semibold">{article.metrics.bounceRate.toFixed(1)}%</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Scroll Depth</p>
                            <p className="font-semibold">{article.metrics.scrollDepth.toFixed(1)}%</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Comments</p>
                            <p className="font-semibold">{article.metrics.comments}</p>
                          </div>
                          <div className="col-span-2 md:col-span-4">
                            <p className="text-xs text-muted-foreground mb-2">Traffic Sources</p>
                            <div className="flex gap-2 flex-wrap">
                              <Badge variant="outline">Organic: {article.trafficSources.organic}%</Badge>
                              <Badge variant="outline">Social: {article.trafficSources.social}%</Badge>
                              <Badge variant="outline">Direct: {article.trafficSources.direct}%</Badge>
                              <Badge variant="outline">Referral: {article.trafficSources.referral}%</Badge>
                            </div>
                          </div>
                          <div className="col-span-2 md:col-span-4 pt-2">
                            <Button size="sm" variant="outline" asChild>
                              <a href={article.url} target="_blank" rel="noopener noreferrer">
                                View Article <ExternalLink className="ml-2 h-3 w-3" />
                              </a>
                            </Button>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
