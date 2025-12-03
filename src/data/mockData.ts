import { Article, UserBehavior, Cohort, DashboardKPIs, TimeSeriesData, GeographicData, DeviceData, LiveActivity } from '@/types/analytics';

const categories = ['Technology', 'Business', 'Politics', 'Entertainment', 'Sports', 'Health', 'Science'];
const authors = ['Sarah Chen', 'Michael Roberts', 'Emma Wilson', 'James Taylor', 'Olivia Brown', 'David Lee', 'Sophie Martinez'];
const countries = ['United States', 'United Kingdom', 'India', 'Germany', 'Canada', 'Australia', 'France', 'Brazil', 'Japan', 'Netherlands'];
const cities = ['New York', 'London', 'Mumbai', 'Berlin', 'Toronto', 'Sydney', 'Paris', 'São Paulo', 'Tokyo', 'Amsterdam'];

const generateId = () => Math.random().toString(36).substring(2, 11);

const randomBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const randomFloat = (min: number, max: number, decimals: number = 2) => 
  parseFloat((Math.random() * (max - min) + min).toFixed(decimals));

const articleTitles = [
  "The Future of AI: How Machine Learning is Transforming Industries",
  "Global Markets Rally on Strong Economic Data",
  "Climate Summit Reaches Historic Agreement",
  "New Study Reveals Surprising Health Benefits",
  "Tech Giants Face Increased Regulatory Scrutiny",
  "Breakthrough in Renewable Energy Storage",
  "Remote Work Revolution: The New Normal",
  "Cryptocurrency Market Sees Major Shift",
  "Sports League Announces Expansion Plans",
  "Entertainment Industry Embraces Streaming",
  "Innovation Hub Opens in Silicon Valley",
  "Healthcare System Undergoes Digital Transformation",
  "Education Technology Startup Raises Funding",
  "Sustainable Fashion Gains Momentum",
  "Space Exploration Enters New Era",
  "Cybersecurity Threats on the Rise",
  "Electric Vehicle Sales Surge Worldwide",
  "Social Media Platform Launches New Features",
  "Economic Recovery Shows Strong Momentum",
  "Scientific Discovery Could Change Medicine",
  "Political Leaders Meet for Summit",
  "Gaming Industry Breaks Revenue Records",
  "Travel Industry Shows Signs of Recovery",
  "Fintech Innovation Disrupts Banking",
  "Mental Health Awareness Campaign Launches",
  "Agricultural Technology Transforms Farming",
  "Urban Planning Takes Sustainable Turn",
  "Biotech Company Announces Breakthrough",
  "Media Landscape Continues Evolution",
  "Global Supply Chain Challenges Persist",
  "Environmental Initiatives Gain Support",
  "Tech Conference Announces Major Speakers",
  "Investment Trends Shift Toward ESG",
  "Healthcare Workers Receive Recognition",
  "Digital Art Market Experiences Growth",
  "Retail Industry Adapts to New Consumer Habits",
  "Telecommunications Upgrade Expands Coverage",
  "Food Industry Embraces Plant-Based Options",
  "Transportation Sector Goes Green",
  "Real Estate Market Shows Resilience",
  "Music Industry Evolves with Technology",
  "Publishing World Embraces Digital First",
  "Manufacturing Returns to Local Production",
  "Tourism Destinations Promote Sustainable Travel",
  "Financial Services Embrace Automation",
  "Energy Sector Transitions to Renewables",
  "Sports Technology Enhances Performance",
  "Creative Industries Flourish Post-Pandemic",
  "Infrastructure Investment Plans Unveiled",
  "Consumer Electronics Show Highlights Innovation"
];

export const generateArticles = (count: number = 50): Article[] => {
  return Array.from({ length: count }, (_, index) => {
    const organic = randomBetween(20, 50);
    const social = randomBetween(15, 35);
    const direct = randomBetween(10, 25);
    const referral = 100 - organic - social - direct;
    
    const daysAgo = randomBetween(0, 30);
    const publishDate = new Date();
    publishDate.setDate(publishDate.getDate() - daysAgo);

    return {
      id: generateId(),
      title: articleTitles[index % articleTitles.length],
      author: authors[randomBetween(0, authors.length - 1)],
      category: categories[randomBetween(0, categories.length - 1)],
      publishDate: publishDate.toISOString(),
      url: `https://example.com/article/${generateId()}`,
      thumbnail: `https://images.unsplash.com/photo-${1550000000000 + (index * 100000)}?w=400&h=300&fit=crop&auto=format`,
      metrics: {
        pageViews: randomBetween(1000, 100000),
        uniqueVisitors: randomBetween(800, 80000),
        avgTimeOnPage: randomBetween(30, 600),
        bounceRate: randomFloat(20, 70),
        scrollDepth: randomFloat(30, 95),
        engagementRate: randomFloat(20, 80),
        socialShares: randomBetween(10, 5000),
        comments: randomBetween(0, 500)
      },
      trafficSources: {
        organic,
        social,
        direct,
        referral: Math.max(0, referral)
      }
    };
  });
};

export const generateKPIs = (): DashboardKPIs => ({
  totalViews: randomBetween(500000, 2000000),
  avgTimeOnPage: randomBetween(120, 300),
  engagementRate: randomFloat(35, 65),
  activeUsers: randomBetween(5000, 25000),
  viewsChange: randomFloat(-10, 25),
  timeChange: randomFloat(-5, 15),
  engagementChange: randomFloat(-8, 20),
  usersChange: randomFloat(-5, 30)
});

export const generateTimeSeriesData = (days: number = 30): TimeSeriesData[] => {
  const data: TimeSeriesData[] = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Add weekend dip pattern
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const multiplier = isWeekend ? 0.7 : 1;
    
    data.push({
      date: date.toISOString().split('T')[0],
      views: Math.floor(randomBetween(30000, 80000) * multiplier),
      engagement: randomFloat(35, 55) * multiplier,
      visitors: Math.floor(randomBetween(15000, 40000) * multiplier)
    });
  }
  
  return data;
};

export const generateGeographicData = (): GeographicData[] => {
  const baseData = [
    { country: 'United States', visitors: randomBetween(150000, 300000) },
    { country: 'United Kingdom', visitors: randomBetween(50000, 120000) },
    { country: 'India', visitors: randomBetween(80000, 180000) },
    { country: 'Germany', visitors: randomBetween(30000, 80000) },
    { country: 'Canada', visitors: randomBetween(25000, 60000) },
    { country: 'Australia', visitors: randomBetween(20000, 50000) },
    { country: 'France', visitors: randomBetween(18000, 45000) },
    { country: 'Brazil', visitors: randomBetween(15000, 40000) },
    { country: 'Japan', visitors: randomBetween(12000, 35000) },
    { country: 'Netherlands', visitors: randomBetween(10000, 30000) }
  ];
  
  const total = baseData.reduce((sum, item) => sum + item.visitors, 0);
  
  return baseData.map(item => ({
    ...item,
    percentage: parseFloat(((item.visitors / total) * 100).toFixed(1))
  }));
};

export const generateDeviceData = (): DeviceData[] => [
  { device: 'Mobile', count: randomBetween(300000, 500000), engagement: randomFloat(30, 45) },
  { device: 'Desktop', count: randomBetween(150000, 300000), engagement: randomFloat(50, 70) },
  { device: 'Tablet', count: randomBetween(50000, 100000), engagement: randomFloat(40, 55) }
];

export const generateCohorts = (): Cohort[] => {
  const cohorts: Cohort[] = [];
  const today = new Date();
  
  for (let i = 0; i < 8; i++) {
    const cohortDate = new Date(today);
    cohortDate.setDate(cohortDate.getDate() - (i * 7));
    
    const size = randomBetween(5000, 15000);
    
    cohorts.push({
      cohortDate: cohortDate.toISOString().split('T')[0],
      cohortSize: size,
      retention: {
        week1: randomFloat(35, 50),
        week2: randomFloat(20, 35),
        week3: randomFloat(12, 25),
        week4: randomFloat(8, 18)
      }
    });
  }
  
  return cohorts;
};

export const generateLiveActivity = (): LiveActivity => {
  const types: LiveActivity['type'][] = ['pageview', 'click', 'scroll', 'share'];
  const countryIndex = randomBetween(0, countries.length - 1);
  
  return {
    id: generateId(),
    type: types[randomBetween(0, types.length - 1)],
    articleTitle: articleTitles[randomBetween(0, articleTitles.length - 1)].substring(0, 50) + '...',
    location: `${cities[countryIndex]}, ${countries[countryIndex]}`,
    device: ['mobile', 'desktop', 'tablet'][randomBetween(0, 2)] as 'mobile' | 'desktop' | 'tablet',
    timestamp: new Date()
  };
};

export const trafficSourceColors = {
  organic: 'hsl(var(--chart-1))',
  social: 'hsl(var(--chart-2))',
  direct: 'hsl(var(--chart-3))',
  referral: 'hsl(var(--chart-4))'
};

export const categories_list = categories;
export const authors_list = authors;
