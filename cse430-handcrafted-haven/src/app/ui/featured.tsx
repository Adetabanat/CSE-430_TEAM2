import styles from "../page.module.css";
import Link from "next/link";
import Image from "next/image";

export default function FeaturedProducts() {
  const products = [
    {
      product: "Handcrafted Ceramic Bowl Set",
      creatorName: "Jane Doe",
      description:
        "This ceramic set is made from high-quality materials, and each item is shaped and glazed by hand, making every piece one of a kind. This stoneware is durable for both hot and cold foods and cleans up easily. Set includes 4 ceramic bowls. Dishwasher and microwave safe.",
      rating: 4.8,
      price: 49.99,
      image: "ceramic-bowls.webp",
    },
    {
      product: "Hand Carved Wooden Animals",
      creatorName: "John Smith",
      description:
        "Celebrate the beauty of nature and craftsmanship with this exquisite hand-carved wooden animal set. Each figure is lovingly shaped from sustainably sourced wood, showcasing unique grain patterns and lifelike detail. Carefully sanded and smoothed by hand, the animals feature a natural finish that highlights their organic charm.",
      rating: 4.9,
      price: 35.21,
      image: "animal-wood.webp",
    },
    {
      product: "Silver Jewelry Collection",
      creatorName: "Sarah Jones",
      description:
        "From delicate chains and minimalist rings to statement earrings, each piece is crafted from high-quality 925 sterling silver for lasting beauty and shine.",
      rating: 4.7,
      price: 156.99,
      image: "jewelry.webp",
    },
  ];

  return (
      <section className={styles.featuredSection}>
      <h2>Featured Products</h2>
      <p>
        Discover our most loved handcrafted pieces, each one unique and made
        with exceptional attention to detail.
      </p>
      <div className={styles.featuredProducts}>
        {products.map((item) => {
          return (
            
              <Card
                key={item.product}
                title={item.product}
                creator={item.creatorName}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            
          );
        })}
          </div>
          <Link key="allProducts" href="#">View All Products</Link>
    </section>
  );
}

export function Card({
  title,
  creator,
  image,
  price,
  rating,
}: {
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
      <Image
        src={`/${image}`}
        alt={`${title} image`}
        width={600}
        height={450}
      />
      <h3>{title}</h3>
      <p>{`by ${creator}`}</p>
      <p>
        <span className={styles.stars}> {`${stars}`}</span>
        {`  ${rating}`}
      </p>
      <p>
        <strong>{`$${price}`}</strong>
      </p>
      <button className={styles.addToCart}>Add to cart</button>
    </div>
  );
}
