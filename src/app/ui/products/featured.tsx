import Link from "next/link";
import styles from "@/app/page.module.css";
import Card from "@/app/ui/products/card";
import { getThreeProducts, getUserById } from "@/lib/data";
import { Product } from "@/lib/interfaces";
import { calculateAverage } from "@/lib/utils";

export default async function ProductPage() {
  const products: Product[] = await getThreeProducts();
  console.log(products);

  const productsWithRatings = await Promise.all(
    products.map(async (product) => {
      console.log(product);
      const ratings = product.reviews.map((review) => review.rating);
      const average = calculateAverage(ratings);
      const user = await getUserById(product.userId);
      return {
        ...product,
        average,
        user,
      };
    })
  );

  return (
    <section className={styles.featuredSection}>
      <h2>Featured Products</h2>
      <p>
        Discover our most loved handcrafted pieces, each one unique and made
        with exceptional attention to detail.
      </p>
      <div className={styles.featuredProducts}>
        {productsWithRatings.map((item) => {
          return (
              <Card
                id={item.id}
                key={item.name}
                title={item.name}
                creator={item.user[0].name}
                image={item.image}
                price={item.price}
                rating={item.average}
              />
          );
        })}
      </div>
      <Link key="allProducts" href="/product">
        View All Products
      </Link>
    </section>
  );
}

// function getThreeItems() {
//   console.log("made it")
// }

