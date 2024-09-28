import Link from 'next/link'
import React from 'react'
import MovieCard from '../components/MovieCard';
import styles from '@/app/styles/common.module.css'
import { resolve } from 'path';

interface Summary {
  id: string;
  type: string;
  title: string;
  synopsis: string;
  backgroundImage: {
    url: string;
  }
}
interface MovieData {
  jawSummary: Summary
}

const Movie = async () => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  const url: string = process.env.NEXT_PUBLIC_RAPIDAPI_URL || '';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '',
      'X-RapidAPI-Host': 'netflix54.p.rapidapi.com'
    }
  };
  const res: Response = await fetch(url, options);
  const data: { titles: MovieData[] } = await res.json();
  const main_data: MovieData[] = data.titles;
  console.log(main_data);
  return (
    <>
      <section className={styles.movieSection}>
        <div className={styles.container}>
          <h1>Series & Movies</h1>
          <div className={styles.card_section}>
            {
              main_data.map((curElem) => {
                return <MovieCard key={curElem.jawSummary.id} {...curElem} />
              })
            }
          </div>
        </div>
      </section>
    </>
  )
}

export default Movie