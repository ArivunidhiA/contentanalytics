// Article Performance Data
export interface ArticleMetrics {
  pageViews: number;
  uniqueVisitors: number;
  avgTimeOnPage: number; // seconds
  bounceRate: number; // percentage
  scrollDepth: number; // percentage
  engagementRate: number; // percentage
  socialShares: number;
  comments: number;
}

export interface TrafficSources {
  organic: number;
  social: number;
  direct: number;
  referral: number;
}

export interface Article {
  id: string;
  title: string;
  author: string;
  category: string;
  publishDate: string;
  url: string;
  thumbnail: string;
  metrics: ArticleMetrics;
  trafficSources: TrafficSources;
}

// User Behavior Data
export interface UserJourneyStep {
  page: string;
  timestamp: string;
  timeSpent: number;
}

export interface UserBehavior {
  userId: string;
  sessionId: string;
  timestamp: string;
  device: 'mobile' | 'desktop' | 'tablet';
  location: { country: string; city: string };
  userType: 'new' | 'returning';
  journey: UserJourneyStep[];
}

// Cohort Data
export interface CohortRetention {
  week1: number;
  week2: number;
  week3: number;
  week4: number;
}

export interface Cohort {
  cohortDate: string;
  cohortSize: number;
  retention: CohortRetention;
}

// Dashboard KPIs
export interface DashboardKPIs {
  totalViews: number;
  avgTimeOnPage: number;
  engagementRate: number;
  activeUsers: number;
  viewsChange: number;
  timeChange: number;
  engagementChange: number;
  usersChange: number;
}

// Filter State
export interface FilterState {
  dateRange: '7d' | '30d' | '90d' | 'custom';
  startDate: Date | null;
  endDate: Date | null;
  categories: string[];
  authors: string[];
  devices: ('mobile' | 'desktop' | 'tablet')[];
  trafficSources: ('organic' | 'social' | 'direct' | 'referral')[];
}

// Live Activity
export interface LiveActivity {
  id: string;
  type: 'pageview' | 'click' | 'scroll' | 'share';
  articleTitle: string;
  location: string;
  device: 'mobile' | 'desktop' | 'tablet';
  timestamp: Date;
}

// Chart Data Types
export interface TimeSeriesData {
  date: string;
  views: number;
  engagement: number;
  visitors: number;
}

export interface GeographicData {
  country: string;
  visitors: number;
  percentage: number;
}

export interface DeviceData {
  device: string;
  count: number;
  engagement: number;
}
