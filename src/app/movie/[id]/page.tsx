import { FC } from "react";
import styles from '@/app/styles/common.module.css';
import Image from "next/image";

interface PageProps {
    params: {
        id: string;
    };
}

interface MovieDetails {
    details?: {
        type?: string;
        backgroundImage?: {
            url?: string;
        };
        title?: string;
        synopsis?: string;
    };
}

const page: FC<PageProps> = async ({ params }) => {
    const id: string = params.id;
    const url: string = `https://netflix54.p.rapidapi.com/title/details/?ids=${id}&lang=en`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '',
            'X-RapidAPI-Host': 'netflix54.p.rapidapi.com'
        }
    };

    try {
        const res: Response = await fetch(url, options);
        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }
        const data: MovieDetails[] = await res.json();
        const main_data: MovieDetails['details'] | undefined = data[0]?.details;

        if (!main_data) {
            return <h2 className={styles.movie_title}>No movie details available.</h2>;
        }

        return (
            <div className={styles.container}>
                <h2 className={styles.movie_title}>
                    Netflix \ <span>{main_data.type || "Unknown Type"}</span>
                </h2>
                <div className={styles.card_section}>
                    {/* Conditionally render image if available */}
                    {main_data.backgroundImage?.url ? (
                        <div>
                            <Image
                                src={main_data.backgroundImage.url}
                                alt={main_data.title || "No title"}
                                width={600}
                                height={300}
                            />
                        </div>
                    ) : (
                        // Skip rendering image if not available
                        null
                    )}

                    <div>
                        <h1>{main_data.title || "No title available"}</h1>
                        <p>{main_data.synopsis || "No synopsis available"}</p>
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
