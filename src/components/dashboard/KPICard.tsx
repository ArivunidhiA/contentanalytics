import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Eye, Clock, Activity, Users } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  change: number;
  icon: 'views' | 'time' | 'engagement' | 'users';
  isLoading?: boolean;
}

const iconMap = {
  views: Eye,
  time: Clock,
  engagement: Activity,
  users: Users
};

export const KPICard = ({ title, value, change, icon, isLoading }: KPICardProps) => {
  const Icon = iconMap[icon];
  const isPositive = change >= 0;

  if (isLoading) {
    return (
      <Card className="animate-pulse">
        <CardContent className="p-6">
          <div className="h-4 w-24 rounded bg-muted/50 mb-4" />
          <div className="h-8 w-32 rounded bg-muted/50 mb-2" />
          <div className="h-4 w-20 rounded bg-muted/50" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-border/50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-muted-foreground">{title}</span>
          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
          <div className="flex items-center gap-1.5">
            {isPositive ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-destructive" />
            )}
            <span className={cn(
              "text-sm font-medium",
              isPositive ? "text-green-600" : "text-destructive"
            )}>
              {isPositive ? '+' : ''}{change.toFixed(1)}%
            </span>
            <span className="text-sm text-muted-foreground">vs last period</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
