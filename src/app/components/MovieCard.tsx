import styles from '@/app/styles/common.module.css';
import Image from 'next/image';
import Link from 'next/link';
interface Summary {
    id: string;
    type: string;
    title: string;
    synopsis: string;
    backgroundImage: {
        url: string;
    }
}
const MovieCard = (curElem: { jawSummary: Summary }) => {
    const { id, type, title, synopsis } = curElem.jawSummary;
    if (!curElem.jawSummary.backgroundImage?.url) {
        return null; // Skip rendering the card if no image is available
    }
    return (
        <>
            <div className={styles.card}>
                <div className={styles.card_image}>
                    <Image src={curElem.jawSummary.backgroundImage.url} alt="background image" width={260} height={200} priority={true} />
                </div>
                <div className={styles.card_data}>
                    <h2>{title.substring(0, 18)}</h2>
                    <p>{`${synopsis.substring(0, 66)} ...`}</p>
                    <Link href={`/movie/${id}`}>
                        <button>
                            Read More
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default MovieCard