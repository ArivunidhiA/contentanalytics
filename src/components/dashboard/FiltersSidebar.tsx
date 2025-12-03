import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { FilterState } from '@/types/analytics';
import { categories_list, authors_list } from '@/data/mockData';
import { 
  Filter, 
  X, 
  Calendar, 
  Tag, 
  User, 
  Smartphone, 
  Globe,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface FiltersSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: Partial<FilterState>) => void;
  onClose?: () => void;
}

const dateRangeOptions = [
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
  { value: 'custom', label: 'Custom' }
] as const;

const deviceOptions = ['mobile', 'desktop', 'tablet'] as const;
const trafficOptions = ['organic', 'social', 'direct', 'referral'] as const;

export const FiltersSidebar = ({ filters, onFiltersChange, onClose }: FiltersSidebarProps) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    dateRange: true,
    categories: true,
    authors: false,
    devices: false,
    traffic: false
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    onFiltersChange({ categories: newCategories });
  };

  const handleAuthorToggle = (author: string) => {
    const newAuthors = filters.authors.includes(author)
      ? filters.authors.filter(a => a !== author)
      : [...filters.authors, author];
    onFiltersChange({ authors: newAuthors });
  };

  const handleDeviceToggle = (device: 'mobile' | 'desktop' | 'tablet') => {
    const newDevices = filters.devices.includes(device)
      ? filters.devices.filter(d => d !== device)
      : [...filters.devices, device];
    onFiltersChange({ devices: newDevices });
  };

  const handleTrafficToggle = (source: 'organic' | 'social' | 'direct' | 'referral') => {
    const newSources = filters.trafficSources.includes(source)
      ? filters.trafficSources.filter(s => s !== source)
      : [...filters.trafficSources, source];
    onFiltersChange({ trafficSources: newSources });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      dateRange: '30d',
      categories: [],
      authors: [],
      devices: [],
      trafficSources: []
    });
  };

  const activeFiltersCount = 
    filters.categories.length + 
    filters.authors.length + 
    filters.devices.length + 
    filters.trafficSources.length;

  const FilterSection = ({ 
    title, 
    icon: Icon, 
    sectionKey,
    children 
  }: { 
    title: string; 
    icon: typeof Filter; 
    sectionKey: string;
    children: React.ReactNode;
  }) => (
    <Collapsible open={openSections[sectionKey]} onOpenChange={() => toggleSection(sectionKey)}>
      <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:text-primary transition-colors">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4" />
          <span className="text-sm font-medium">{title}</span>
        </div>
        {openSections[sectionKey] ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-2 pb-4">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );

  return (
    <Card className="h-fit sticky top-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="h-5 w-5" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount}
              </Badge>
            )}
          </CardTitle>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs h-8">
            Clear all
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-1 divide-y divide-border">
        {/* Date Range */}
        <FilterSection title="Date Range" icon={Calendar} sectionKey="dateRange">
          <div className="flex flex-wrap gap-2">
            {dateRangeOptions.map(option => (
              <Button
                key={option.value}
                variant={filters.dateRange === option.value ? 'default' : 'outline'}
                size="sm"
                className="text-xs h-8"
                onClick={() => onFiltersChange({ dateRange: option.value })}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </FilterSection>

        {/* Categories */}
        <FilterSection title="Categories" icon={Tag} sectionKey="categories">
          <div className="space-y-2">
            {categories_list.map(category => (
              <label key={category} className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                <Checkbox
                  checked={filters.categories.includes(category)}
                  onCheckedChange={() => handleCategoryToggle(category)}
                />
                <span className="text-sm">{category}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Authors */}
        <FilterSection title="Authors" icon={User} sectionKey="authors">
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {authors_list.map(author => (
              <label key={author} className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                <Checkbox
                  checked={filters.authors.includes(author)}
                  onCheckedChange={() => handleAuthorToggle(author)}
                />
                <span className="text-sm">{author}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Devices */}
        <FilterSection title="Devices" icon={Smartphone} sectionKey="devices">
          <div className="space-y-2">
            {deviceOptions.map(device => (
              <label key={device} className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                <Checkbox
                  checked={filters.devices.includes(device)}
                  onCheckedChange={() => handleDeviceToggle(device)}
                />
                <span className="text-sm capitalize">{device}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Traffic Sources */}
        <FilterSection title="Traffic Sources" icon={Globe} sectionKey="traffic">
          <div className="space-y-2">
            {trafficOptions.map(source => (
              <label key={source} className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                <Checkbox
                  checked={filters.trafficSources.includes(source)}
                  onCheckedChange={() => handleTrafficToggle(source)}
                />
                <span className="text-sm capitalize">{source}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      </CardContent>
    </Card>
  );
};
