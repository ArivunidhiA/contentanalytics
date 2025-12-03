import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cohort } from '@/types/analytics';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';

interface CohortRetentionTableProps {
  cohorts: Cohort[];
  isLoading?: boolean;
}

const getRetentionColor = (value: number) => {
  if (value >= 40) return 'bg-primary/90 text-primary-foreground';
  if (value >= 30) return 'bg-primary/70 text-primary-foreground';
  if (value >= 20) return 'bg-primary/50';
  if (value >= 10) return 'bg-primary/30';
  return 'bg-primary/10';
};

export const CohortRetentionTable = ({ cohorts, isLoading }: CohortRetentionTableProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Cohort Retention</CardTitle>
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
        <CardTitle>Cohort Retention</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-3 font-medium text-muted-foreground">Cohort</th>
                <th className="text-center py-2 px-3 font-medium text-muted-foreground">Size</th>
                <th className="text-center py-2 px-3 font-medium text-muted-foreground">Week 1</th>
                <th className="text-center py-2 px-3 font-medium text-muted-foreground">Week 2</th>
                <th className="text-center py-2 px-3 font-medium text-muted-foreground">Week 3</th>
                <th className="text-center py-2 px-3 font-medium text-muted-foreground">Week 4</th>
              </tr>
            </thead>
            <tbody>
              {cohorts.map((cohort) => (
                <tr key={cohort.cohortDate} className="border-b border-border/50 hover:bg-muted/30">
                  <td className="py-2 px-3 font-medium">
                    {format(parseISO(cohort.cohortDate), 'MMM d')}
                  </td>
                  <td className="text-center py-2 px-3 text-muted-foreground">
                    {cohort.cohortSize.toLocaleString()}
                  </td>
                  <td className="py-2 px-3">
                    <div className={cn(
                      "rounded px-2 py-1 text-center text-xs font-medium",
                      getRetentionColor(cohort.retention.week1)
                    )}>
                      {cohort.retention.week1.toFixed(1)}%
                    </div>
                  </td>
                  <td className="py-2 px-3">
                    <div className={cn(
                      "rounded px-2 py-1 text-center text-xs font-medium",
                      getRetentionColor(cohort.retention.week2)
                    )}>
                      {cohort.retention.week2.toFixed(1)}%
                    </div>
                  </td>
                  <td className="py-2 px-3">
                    <div className={cn(
                      "rounded px-2 py-1 text-center text-xs font-medium",
                      getRetentionColor(cohort.retention.week3)
                    )}>
                      {cohort.retention.week3.toFixed(1)}%
                    </div>
                  </td>
                  <td className="py-2 px-3">
                    <div className={cn(
                      "rounded px-2 py-1 text-center text-xs font-medium",
                      getRetentionColor(cohort.retention.week4)
                    )}>
                      {cohort.retention.week4.toFixed(1)}%
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <span>Retention scale:</span>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded bg-primary/10" />
            <span>0-10%</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded bg-primary/30" />
            <span>10-20%</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded bg-primary/50" />
            <span>20-30%</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded bg-primary/70" />
            <span>30-40%</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded bg-primary/90" />
            <span>40%+</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
