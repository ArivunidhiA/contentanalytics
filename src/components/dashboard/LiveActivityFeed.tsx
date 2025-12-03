import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LiveActivity } from '@/types/analytics';
import { Eye, MousePointer, ScrollText, Share2, Smartphone, Monitor, Tablet } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface LiveActivityFeedProps {
  activities: LiveActivity[];
  isLoading?: boolean;
}

const activityIcons = {
  pageview: Eye,
  click: MousePointer,
  scroll: ScrollText,
  share: Share2
};

const deviceIcons = {
  mobile: Smartphone,
  desktop: Monitor,
  tablet: Tablet
};

const activityColors = {
  pageview: 'bg-blue-500/10 text-blue-600',
  click: 'bg-green-500/10 text-green-600',
  scroll: 'bg-purple-500/10 text-purple-600',
  share: 'bg-orange-500/10 text-orange-600'
};

export const LiveActivityFeed = ({ activities, isLoading }: LiveActivityFeedProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Live Activity</CardTitle>
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
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          Live Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
          {activities.map((activity, index) => {
            const ActivityIcon = activityIcons[activity.type];
            const DeviceIcon = deviceIcons[activity.device];
            
            return (
              <div 
                key={activity.id}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-lg border border-border/50 bg-card/50",
                  "transition-all duration-300 hover:border-border hover:bg-card",
                  index === 0 && "animate-in slide-in-from-top-2 fade-in duration-300"
                )}
              >
                <div className={cn(
                  "p-2 rounded-lg shrink-0",
                  activityColors[activity.type]
                )}>
                  <ActivityIcon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{activity.articleTitle}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <DeviceIcon className="h-3 w-3" />
                    <span>{activity.location}</span>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">
                  {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
