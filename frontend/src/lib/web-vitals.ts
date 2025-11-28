import { onCLS, onINP, onFCP, onLCP, onTTFB, type Metric } from 'web-vitals';

// Log Web Vitals metrics to console in development
// In production, you would send these to an analytics endpoint
const logMetric = (metric: Metric) => {
  if (import.meta.env.DEV) {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
    });
  }

  // In production, send to analytics
  // Example: sendToAnalytics(metric);
  if (import.meta.env.PROD) {
    // You can send to Google Analytics, Vercel Analytics, etc.
    // window.gtag?.('event', metric.name, {
    //   value: Math.round(metric.value),
    //   metric_id: metric.id,
    //   metric_value: metric.value,
    //   metric_delta: metric.delta,
    // });
  }
};

export const registerWebVitals = () => {
  // Cumulative Layout Shift (CLS) - Target: < 0.1
  onCLS(logMetric);

  // Interaction to Next Paint (INP) - Target: < 200ms (replaces FID)
  onINP(logMetric);

  // First Contentful Paint (FCP) - Target: < 1.8s
  onFCP(logMetric);

  // Largest Contentful Paint (LCP) - Target: < 2.5s
  onLCP(logMetric);

  // Time to First Byte (TTFB) - Target: < 600ms
  onTTFB(logMetric);
};
