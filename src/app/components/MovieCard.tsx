import styles from '@/app/styles/common.module.css';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
interface MovieProps {
    title: string;
    imageUrl: string;
    entityKind: string;
    entityId: string;
}
const MovieCard = ({ title, imageUrl, entityKind, entityId }: MovieProps) => {
    // Skip rendering if there's no image URL
    if (!imageUrl) {
        return null;
    }

    return (
        <>
            <div className={styles.card}>
                <div className={styles.card_image}>
                    <Image
                        src={imageUrl}
                        alt={`${title} poster`}
                        width={260}
                        height={200}
                        priority={true}
                    />
                </div>
                <div className={styles.card_data}>
                    <h2>{title.substring(0, 18)}</h2>
                    <p>{entityKind}</p>
                    <Link href={`/movie/${entityId}`}>
                        <button>
                            Read More
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}
export default MovieCard