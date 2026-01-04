
## API Overview
The Movie Database (TMDb) API is a public RESTful API that provides access to a large collection of movies, TV shows, actors, images, and related metadata. Developers can search for movies, fetch details like release date, genres, cast, crew, and images. It also supports trending content, filtering, and pagination.

## Version
TMDb API Version: 3

## Available Endpoints
- **GET /search/movie** — Search for movies by keyword. Returns a list of matching movies.  
- **GET /movie/{movie_id}** — Fetch detailed information about a specific movie, including title, overview, genres, runtime, release date, etc.  
- **GET /movie/{movie_id}/credits** — Retrieve cast and crew information for a specific movie.  
- **GET /movie/popular** — Retrieve a list of currently popular movies.  
- **GET /movie/{movie_id}/images** — Get posters, backdrops, and other images associated with a movie.  

## Request and Response Format
Requests are made via HTTP GET with query parameters, most importantly the API key.

**Example Request:**
```http
GET https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=Inception
````

**Example Response:**

```json
{
  "page": 1,
  "results": [
    {
      "id": 27205,
      "title": "Inception",
      "overview": "A skilled thief is given a chance at redemption...",
      "release_date": "2010-07-15",
      "genre_ids": [28, 12, 878]
    }
  ],
  "total_pages": 1,
  "total_results": 1
}
```

**TypeScript Interface Example:**

```ts
interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  genre_ids: number[];
}

interface SearchMovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
```

## Authentication

* Obtain an API key by signing up at [TMDb](https://www.themoviedb.org/).
* Include the API key in requests as a query parameter:

```http
?api_key=YOUR_API_KEY
```

* Or use a Bearer token in the header:

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

## Error Handling

Common API errors:

* `401 Unauthorized` — Missing or invalid API key/token.
* `404 Not Found` — Resource does not exist.
* `429 Too Many Requests` — Rate limit exceeded.

In TypeScript/JavaScript:

```ts
if (!response.ok) {
  throw new Error(`API request failed with status ${response.status}`);
}
```

## Usage Limits and Best Practices

* Respect rate limits to avoid being blocked.
* Use `append_to_response` to combine multiple data requests into one.
* Implement pagination for large result sets.
* Cache results when possible to reduce repeated API calls.
* Sanitize inputs to prevent malformed requests.



