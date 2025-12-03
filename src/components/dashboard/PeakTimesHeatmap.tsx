import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

interface PeakTimesHeatmapProps {
  isLoading?: boolean;
}

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const hours = ['12a', '3a', '6a', '9a', '12p', '3p', '6p', '9p'];

const generateHeatmapData = () => {
  const data: number[][] = [];
  
  for (let day = 0; day < 7; day++) {
    const dayData: number[] = [];
    for (let hour = 0; hour < 8; hour++) {
      // Simulate realistic patterns: higher during work hours, lower on weekends
      const isWeekend = day === 0 || day === 6;
      const isWorkHour = hour >= 2 && hour <= 5; // 6am to 9pm in 3-hour blocks
      const baseValue = isWeekend ? 30 : 50;
      const hourMultiplier = isWorkHour ? 1.5 : 0.7;
      const randomFactor = 0.8 + Math.random() * 0.4;
      
      dayData.push(Math.round(baseValue * hourMultiplier * randomFactor));
    }
    data.push(dayData);
  }
  
  return data;
};

const getHeatColor = (value: number, max: number) => {
  const intensity = value / max;
  if (intensity >= 0.8) return 'bg-primary';
  if (intensity >= 0.6) return 'bg-primary/75';
  if (intensity >= 0.4) return 'bg-primary/50';
  if (intensity >= 0.2) return 'bg-primary/25';
  return 'bg-primary/10';
};

export const PeakTimesHeatmap = ({ isLoading }: PeakTimesHeatmapProps) => {
  const data = useMemo(() => generateHeatmapData(), []);
  const maxValue = useMemo(() => Math.max(...data.flat()), [data]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Peak Reading Times</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 animate-pulse rounded-lg bg-muted/50" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Peak Reading Times</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[300px]">
            {/* Hour labels */}
            <div className="flex mb-2 pl-10">
              {hours.map((hour) => (
                <div key={hour} className="flex-1 text-center text-xs text-muted-foreground">
                  {hour}
                </div>
              ))}
            </div>
            
            {/* Heatmap grid */}
            <div className="space-y-1">
              {days.map((day, dayIndex) => (
                <div key={day} className="flex items-center gap-2">
                  <span className="w-8 text-xs text-muted-foreground text-right">{day}</span>
                  <div className="flex flex-1 gap-1">
                    {data[dayIndex].map((value, hourIndex) => (
                      <div
                        key={`${dayIndex}-${hourIndex}`}
                        className={cn(
                          "flex-1 h-6 rounded-sm transition-colors cursor-pointer hover:ring-2 hover:ring-primary/50",
                          getHeatColor(value, maxValue)
                        )}
                        title={`${days[dayIndex]} ${hours[hourIndex]}: ${value}% engagement`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Legend */}
            <div className="flex items-center justify-end gap-2 mt-4">
              <span className="text-xs text-muted-foreground">Low</span>
              <div className="flex gap-1">
                <div className="w-4 h-4 rounded-sm bg-primary/10" />
                <div className="w-4 h-4 rounded-sm bg-primary/25" />
                <div className="w-4 h-4 rounded-sm bg-primary/50" />
                <div className="w-4 h-4 rounded-sm bg-primary/75" />
                <div className="w-4 h-4 rounded-sm bg-primary" />
              </div>
              <span className="text-xs text-muted-foreground">High</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
