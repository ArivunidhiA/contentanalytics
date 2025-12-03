import { Helmet } from 'react-helmet-async';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Content Analytics Dashboard | Real-Time Performance Metrics</title>
        <meta 
          name="description" 
          content="Track real-time article engagement, reader behavior, and content performance metrics with our comprehensive analytics dashboard." 
        />
        <meta name="keywords" content="content analytics, article performance, engagement metrics, audience insights, real-time analytics" />
        <link rel="canonical" href="/" />
      </Helmet>
      <Dashboard />
    </>
  );
};

export default Index;
