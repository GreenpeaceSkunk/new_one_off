import Analytics, { AnalyticsInstance } from 'analytics';
import googleAnalytics from '@analytics/google-analytics';

let analytics: AnalyticsInstance;

export const initialize = () => {
  analytics = Analytics({
    app: `${process.env.REACT_APP_NAME}`,
    plugins: [
      googleAnalytics({
        trackingId: `${process.env.REACT_APP_GOOGLE_ANALYTICS_ID}`,
      })
    ]
  })
}

export const trackPage = () => {
  if(analytics) {
    analytics.page({
      url: window.location.href,
      path: window.location.pathname,
      search: window.location.search,
    });
  }
}