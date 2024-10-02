import { FC } from "react";
import styles from '@/app/styles/common.module.css';
import Image from "next/image";

interface PageProps {
    params: {
        id: string;
    };
}

interface Actor {
    id: number;
    name: string;
}

interface MovieDetails {
    title: string;
    synopsis: string;
    backgroundImage: string;
    releaseYear?: number;
    runtime?: number;
    maturityRating?: string;
    actors?: Actor[];
}

const page: FC<PageProps> = async ({ params }) => {
    const id: string = params.id;
    const url: string = `https://netflix-api8.p.rapidapi.com/api/title/details?titleId=${id}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '',
            'X-RapidAPI-Host': 'netflix-api8.p.rapidapi.com'
        }
    };

    try {
        const res: Response = await fetch(url, options);
        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        const main_data = data.value.videos[id]?.details; // Get the object associated with the id
        const backgroundImage = main_data.verticalBackgroundArt[0];
        const details: MovieDetails = {
            title: main_data.title,
            synopsis: main_data.synopsis,
            backgroundImage: backgroundImage || '', // Assuming verticalDisplayArt is the correct field for background image
            releaseYear: main_data.releaseYear,
            runtime: main_data.runtime,
            maturityRating: main_data.maturityRating,
            actors: main_data.actors || []
        };

        return (
            <div className={styles.movie_page_container}>
                {/* Page Title */}
                <h2 className={styles.movie_title}>
                    Netflix \ <span>{main_data.maturityRating || "Unknown Rating"}</span>
                </h2>

                <div className={styles.movie_content}>
                    {/* Image Section */}
                    {main_data.verticalBackgroundArt?.[0] && (
                        <div className={styles.movie_image}>
                            <Image
                                src={main_data.verticalBackgroundArt[0]}
                                alt={main_data.title || "No title"}
                                width={300}
                                height={450}
                                className={styles.movie_image_style}
                            />
                        </div>
                    )}

                    {/* Details Section */}
                    <div className={styles.movie_details}>
                        <h1>{main_data.title || "No title available"}</h1>
                        <p className={styles.movie_synopsis}>{main_data.synopsis || "No synopsis available"}</p>
                        <p><strong>Release Year:</strong> {main_data.releaseYear}</p>
                        <p><strong>Runtime:</strong> {main_data.runtime ? `${Math.floor(main_data.runtime / 60)}h ${main_data.runtime % 60}m` : "N/A"}</p>
                        {main_data.actors && main_data.actors.length > 0 && (
                            <p>
                                <strong>Actors: </strong>
                                {main_data.actors.map((actor: { name: string }) => actor.name).join(", ")}
                            </p>
                        )}
                        {main_data.directors && main_data.directors.length > 0 && (
                            <p>
                                <strong>Directors: </strong>
                                {main_data.directors.map((director: { name: string }) => director.name).join(", ")}
                            </p>
                        )}

                        {/* Render genres with validation */}
                        {main_data.genres && main_data.genres.length > 0 && (
                            <p>
                                <strong>Genres: </strong>
                                {main_data.genres.map((genre: { name: string }) => genre.name).join(", ")}
                            </p>
                        )}

                    </div>
                </div>
            </div>
        );


    } catch (error) {
        console.error(error);
        return <div className={styles.container}>Error loading movie details.</div>;
    }
};

export default page;
