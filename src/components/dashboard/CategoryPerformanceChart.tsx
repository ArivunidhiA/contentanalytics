import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Article } from '@/types/analytics';
import { useMemo } from 'react';

interface CategoryPerformanceChartProps {
  articles: Article[];
  isLoading?: boolean;
}

const COLORS = [
  '#f59e0b', // amber
  '#3b82f6', // blue
  '#10b981', // emerald
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#06b6d4', // cyan
  '#84cc16'  // lime
];

export const CategoryPerformanceChart = ({ articles, isLoading }: CategoryPerformanceChartProps) => {
  const data = useMemo(() => {
    if (!articles.length) return [];
    
    const categoryStats = articles.reduce((acc, article) => {
      if (!acc[article.category]) {
        acc[article.category] = {
          totalViews: 0,
          totalTime: 0,
          count: 0
        };
      }
      acc[article.category].totalViews += article.metrics.pageViews;
      acc[article.category].totalTime += article.metrics.avgTimeOnPage;
      acc[article.category].count += 1;
      return acc;
    }, {} as Record<string, { totalViews: number; totalTime: number; count: number }>);

    return Object.entries(categoryStats)
      .map(([category, stats]) => ({
        category,
        avgViews: Math.round(stats.totalViews / stats.count),
        avgTime: Math.round(stats.totalTime / stats.count),
        articles: stats.count
      }))
      .sort((a, b) => b.avgViews - a.avgViews);
  }, [articles]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Category Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 animate-pulse rounded-lg bg-muted/50" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Category Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={data} 
              layout="vertical"
              margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} horizontal={true} vertical={false} />
              <XAxis 
                type="number"
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <YAxis 
                type="category"
                dataKey="category"
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                tickLine={false}
                axisLine={false}
                width={75}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                  boxShadow: 'var(--shadow-lg)'
                }}
                formatter={(value: number, name: string) => {
                  if (name === 'avgViews') return [`${value.toLocaleString()}`, 'Avg. Views'];
                  return [value, name];
                }}
              />
              <Bar 
                dataKey="avgViews" 
                radius={[0, 4, 4, 0]}
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
