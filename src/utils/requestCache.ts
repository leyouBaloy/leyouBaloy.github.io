const jsonCache = new Map<string, Promise<unknown>>();

export const getCachedJson = async <T>(url: string): Promise<T> => {
  if (!jsonCache.has(url)) {
    jsonCache.set(
      url,
      fetch(url).then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch ${url}: ${response.status}`);
        }
        return response.json();
      })
    );
  }

  return jsonCache.get(url) as Promise<T>;
};

