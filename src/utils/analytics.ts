// Google Analytics 4 Integration

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Initialize Google Analytics
export const initGA = (measurementId: string) => {
  // Add GA script
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script1);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', measurementId);
};

// Track page views
export const trackPageView = (pageName: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'page_view', {
      page_title: pageName,
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  }
};

// Track custom events
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, eventParams);
  }
};

// Specific tracking functions for your app

// YouTube Tag Generator Events
export const trackYouTubeTagGeneration = (data: {
  keyword: string;
  tagCount: number;
  tab: string;
}) => {
  trackEvent('youtube_tag_generated', {
    keyword: data.keyword,
    tag_count: data.tagCount,
    tab_type: data.tab,
    timestamp: new Date().toISOString(),
  });
};

export const trackYouTubeTagExport = (format: string, count: number) => {
  trackEvent('youtube_tag_exported', {
    export_format: format,
    tag_count: count,
    timestamp: new Date().toISOString(),
  });
};

// Instagram Caption Events
export const trackInstagramCaptionGeneration = (data: {
  topic: string;
  style: string;
  charCount: number;
}) => {
  trackEvent('instagram_caption_generated', {
    topic: data.topic,
    caption_style: data.style,
    character_count: data.charCount,
    timestamp: new Date().toISOString(),
  });
};

export const trackInstagramCaptionExport = (charCount: number) => {
  trackEvent('instagram_caption_exported', {
    character_count: charCount,
    timestamp: new Date().toISOString(),
  });
};

// Instagram Hashtag Events
export const trackInstagramHashtagSearch = (data: {
  query: string;
  resultCount: number;
}) => {
  trackEvent('instagram_hashtag_searched', {
    search_query: data.query,
    result_count: data.resultCount,
    timestamp: new Date().toISOString(),
  });
};

export const trackInstagramHashtagSelection = (data: {
  selectedCount: number;
  category: string;
}) => {
  trackEvent('instagram_hashtag_selected', {
    selected_count: data.selectedCount,
    category: data.category,
    timestamp: new Date().toISOString(),
  });
};

export const trackInstagramHashtagExport = (count: number) => {
  trackEvent('instagram_hashtag_exported', {
    hashtag_count: count,
    timestamp: new Date().toISOString(),
  });
};

// Favorites Events
export const trackFavoriteSaved = (type: string) => {
  trackEvent('favorite_saved', {
    content_type: type,
    timestamp: new Date().toISOString(),
  });
};

export const trackFavoriteDeleted = (type: string) => {
  trackEvent('favorite_deleted', {
    content_type: type,
    timestamp: new Date().toISOString(),
  });
};

// Best Times View
export const trackBestTimesView = (niche: string) => {
  trackEvent('best_times_viewed', {
    niche: niche,
    timestamp: new Date().toISOString(),
  });
};

// Copy Events
export const trackCopyAction = (contentType: string) => {
  trackEvent('content_copied', {
    content_type: contentType,
    timestamp: new Date().toISOString(),
  });
};

// Navigation Events
export const trackNavigation = (from: string, to: string) => {
  trackEvent('navigation', {
    from_page: from,
    to_page: to,
    timestamp: new Date().toISOString(),
  });
};

// Session Events
export const trackSessionStart = () => {
  trackEvent('session_start', {
    timestamp: new Date().toISOString(),
  });
};

export const trackSessionEnd = () => {
  trackEvent('session_end', {
    timestamp: new Date().toISOString(),
  });
};
