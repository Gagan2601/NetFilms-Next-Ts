import { FC } from "react";
import styles from '@/app/styles/common.module.css'
import Image from "next/image";

interface PageProps {
    params: {
        id: string;
    }
}
interface MovieDetails {
    details: {
        type: string;
        backgroundImage: {
            url: string;
        };
        title: string;
        synopsis: string;
    }
}

const page: FC<PageProps> = async ({ params }) => {
    const id: string = params.id;
    const url: string = `https://netflix54.p.rapidapi.com/title/details/?ids=${id}&lang=en`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || '',
            'X-RapidAPI-Host': 'netflix54.p.rapidapi.com'
        }
    };
    const res: Response = await fetch(url, options);
    const data: MovieDetails[] = await res.json();
    const main_data: MovieDetails['details'] = data[0].details;
    return (
        <div className={styles.container}>
            <h2 className={styles.movie_title}>   Netflix \ <span>{main_data.type}</span></h2>
            <div className={styles.card_section}>
                <div>
                    <Image src={main_data.backgroundImage.url} alt={main_data.title} width={600} height={300} />
                </div>
                <div>
                    <h1>{main_data.title}</h1>
                    <p>{main_data.synopsis}</p>
                </div>
            </div>
        </div>
    )
}

export default page