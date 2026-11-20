/**
 * Prefix a /public path with the site's base URL so it also works when the
 * site is served from a sub-folder (e.g. GitHub Pages: username.github.io/repo/).
 * Full URLs (https://...) are returned unchanged.
 */
export function asset(path?: string) {
  if (!path) return ''
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path
  return import.meta.env.BASE_URL + path.replace(/^\//, '')
}
