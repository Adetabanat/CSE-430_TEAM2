import styles from "@/app/page.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Card({
  id,
  title,
  creator,
  image,
  price,
  rating,
}: {
  id: number;
  title: string;
  creator: string;
  image: string;
  price: number;
  rating: number;
}) {
  const stars =
    rating > 4.9
      ? "★★★★★"
      : rating > 3.9
      ? "★★★★"
      : rating > 2.9
      ? "★★★"
      : rating > 1.9
      ? "★★"
      : "★";

  return (
    <div className={styles.featuredcard}>
      <Image src={`${image}`} alt={`${title} image`} width={600} height={450} />
      <div className={styles.productInfo}>
        <div>
          <h3>{title}</h3>
          <p>{`by ${creator}`}</p>
        </div>
        <p>
          <span className={styles.stars}> {`${stars}`}</span>
          {`  ${rating}`}
        </p>
        <div className={styles.cardPrice}>
          <p>
            <strong>{`$${price}`}</strong>
          </p>
          <button className={styles.productButton}>Add to cart</button>
        </div>
      </div>
      <Link
        className={styles.link}
        href={`/product/${id}`}
        aria-label="View Details"
        title="View Details"
      >
        View Details
      </Link>
    </div>
  );
}
