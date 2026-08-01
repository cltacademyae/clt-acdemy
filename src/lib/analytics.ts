// GA4 events via the GTM dataLayer.
// whatsapp_click / phone_click / form_submit must be marked key events in GA4 admin.
type EventName =
  | "whatsapp_click"
  | "phone_click"
  | "email_click"
  | "form_submit"
  | "course_view"
  | "scroll_depth";

type EventParams = Record<string, string | number | undefined>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackEvent(event: EventName, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    page_path: window.location.pathname,
    page_title: document.title,
    ...params,
  });
}
