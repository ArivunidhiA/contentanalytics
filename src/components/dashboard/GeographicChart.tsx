import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GeographicData } from '@/types/analytics';
import { Globe, MapPin } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface GeographicChartProps {
  data: GeographicData[];
  isLoading?: boolean;
}

const countryFlags: Record<string, string> = {
  'United States': '🇺🇸',
  'United Kingdom': '🇬🇧',
  'India': '🇮🇳',
  'Germany': '🇩🇪',
  'Canada': '🇨🇦',
  'Australia': '🇦🇺',
  'France': '🇫🇷',
  'Brazil': '🇧🇷',
  'Japan': '🇯🇵',
  'Netherlands': '🇳🇱'
};

export const GeographicChart = ({ data, isLoading }: GeographicChartProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Geographic Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 animate-pulse rounded-lg bg-muted/50" />
        </CardContent>
      </Card>
    );
  }

  const maxVisitors = Math.max(...data.map(d => d.visitors));
  const totalVisitors = data.reduce((sum, d) => sum + d.visitors, 0);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          Geographic Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.slice(0, 8).map((item, index) => (
            <div key={item.country} className="group">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{countryFlags[item.country] || '🌍'}</span>
                  <span className="text-sm font-medium">{item.country}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">
                    {item.visitors.toLocaleString()}
                  </span>
                  <span className="text-xs font-medium text-primary">
                    {item.percentage}%
                  </span>
                </div>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary transition-all duration-500 group-hover:from-primary/80 group-hover:to-primary"
                  style={{ width: `${(item.visitors / maxVisitors) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total Visitors</span>
            <span className="font-semibold">{totalVisitors.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
