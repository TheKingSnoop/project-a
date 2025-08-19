import { RenderMode, ServerRoute } from '@angular/ssr';

// For static hosting, we can either disable server routes entirely
// or use prerender for specific routes only
export const serverRoutes: ServerRoute[] = [
  // Only prerender specific routes if needed
  // { path: '', renderMode: RenderMode.Prerender },
  // { path: 'user-account', renderMode: RenderMode.Prerender }
];

// Alternative: Use Server mode only if you deploy to a Node.js environment
// export const serverRoutes: ServerRoute[] = [
//   {
//     path: '**',
//     renderMode: RenderMode.Server
//   }
// ];
