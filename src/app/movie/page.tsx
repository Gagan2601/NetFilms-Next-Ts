import Link from 'next/link';
import React from 'react';
import MovieCard from '../components/MovieCard';
import styles from '@/app/styles/common.module.css';

interface MovieData {
  entityId: string;
  entityKind: string;
  title: string;
  verticalArtworkUrl: string;
}

const Movie = async () => {
  await new Promise(resolve => setTimeout(resolve, 2000));

  const url: string = process.env.NEXT_PUBLIC_RAPIDAPI_URL || '';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '',
      'X-RapidAPI-Host': 'netflix-api8.p.rapidapi.com',
    },
  };

  try {
    const res: Response = await fetch(url, options);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    const movies: MovieData[] = [];
    const searchPageByReference = data.value.searchPageByReferenceV2;
    for (const key in searchPageByReference) {
      const item = searchPageByReference[key];
      if (item && typeof item === 'object') {
        for (const index in item) {
          const nestedItem = item[index][0];
          if (nestedItem && nestedItem.summary) {
            const movie = nestedItem.summary;
            movies.push({
              entityId: movie.entityId,
              entityKind: movie.entityKind,
              title: movie.title,
              verticalArtworkUrl: movie.verticalArtworkUrl,
            });
          }
        }
      }
    }

    return (
      <section className={styles.movieSection}>
        <div className={styles.container}>
          <h1>Series & Movies</h1>
          <div className={styles.card_section}>
            {movies.length > 0 ? (
              movies.map((curElem) => (
                <MovieCard
                  key={curElem.entityId}
                  title={curElem.title}
                  imageUrl={curElem.verticalArtworkUrl}
                  entityKind={curElem.entityKind}
                  entityId={curElem.entityId}
                />
              ))
            ) : (
              <p>No movies found.</p>
            )}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error fetching movies:", error);
    return <div>Error loading movies</div>;
  }
};

export default Movie;
