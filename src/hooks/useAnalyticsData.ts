import { useState, useEffect, useCallback } from 'react';
import { 
  Article, 
  DashboardKPIs, 
  TimeSeriesData, 
  GeographicData, 
  DeviceData,
  Cohort,
  LiveActivity,
  FilterState 
} from '@/types/analytics';
import {
  generateArticles,
  generateKPIs,
  generateTimeSeriesData,
  generateGeographicData,
  generateDeviceData,
  generateCohorts,
  generateLiveActivity
} from '@/data/mockData';

export const useAnalyticsData = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [kpis, setKpis] = useState<DashboardKPIs | null>(null);
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[]>([]);
  const [geographicData, setGeographicData] = useState<GeographicData[]>([]);
  const [deviceData, setDeviceData] = useState<DeviceData[]>([]);
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [liveActivities, setLiveActivities] = useState<LiveActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    dateRange: '30d',
    startDate: null,
    endDate: null,
    categories: [],
    authors: [],
    devices: [],
    trafficSources: []
  });

  // Initial data load
  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      setIsLoading(true);
      // Simulate brief API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      if (!mounted) return;
      
      setArticles(generateArticles(50));
      setKpis(generateKPIs());
      setTimeSeriesData(generateTimeSeriesData(30));
      setGeographicData(generateGeographicData());
      setDeviceData(generateDeviceData());
      setCohorts(generateCohorts());
      setLiveActivities(Array.from({ length: 5 }, generateLiveActivity));
      setIsLoading(false);
    };

    loadData();
    
    return () => {
      mounted = false;
    };
  }, []);

  // Real-time updates simulation
  useEffect(() => {
    if (isLoading) return;

    const interval = setInterval(() => {
      // Update KPIs slightly
      setKpis(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          totalViews: prev.totalViews + Math.floor(Math.random() * 100),
          activeUsers: prev.activeUsers + Math.floor(Math.random() * 10) - 5
        };
      });

      // Add new live activity
      setLiveActivities(prev => {
        const newActivity = generateLiveActivity();
        return [newActivity, ...prev.slice(0, 9)];
      });
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, [isLoading]);

  // Filtered articles based on current filters
  const filteredArticles = useCallback(() => {
    return articles.filter(article => {
      if (filters.categories.length > 0 && !filters.categories.includes(article.category)) {
        return false;
      }
      if (filters.authors.length > 0 && !filters.authors.includes(article.author)) {
        return false;
      }
      return true;
    });
  }, [articles, filters]);

  const updateFilters = useCallback((newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const refreshData = useCallback(() => {
    setKpis(generateKPIs());
    setTimeSeriesData(generateTimeSeriesData(30));
    setGeographicData(generateGeographicData());
    setDeviceData(generateDeviceData());
  }, []);

  return {
    articles: filteredArticles(),
    allArticles: articles,
    kpis,
    timeSeriesData,
    geographicData,
    deviceData,
    cohorts,
    liveActivities,
    isLoading,
    filters,
    updateFilters,
    refreshData
  };
};
