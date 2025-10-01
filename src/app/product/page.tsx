import styles from "@/app/page.module.css";
import Card from "@/app/ui/products/card";
import { getAllProducts, getUserById } from "@/lib/data";
import { Product } from "@/lib/interfaces";
import { calculateAverage } from "@/lib/utils";

export default async function ProductPage() {
  const products: Product[] = await getAllProducts();

  const productsWithRatings = await Promise.all(
    products.map(async (product) => {
      console.log(product);
      const ratings = product.reviews.map((review) => review.rating);
      const average = calculateAverage(ratings);
      const user = await getUserById(product.userId);
      return {
        ...product,
        average,
        user
      };
    })
  );

  return (
    <section className={styles.featuredSection}>
      <h2>Explore Our Products</h2>
      <p>From artisan hands to your home</p>
      <div className={styles.featuredProducts}>
        {productsWithRatings.map((item) => {
          console.log(item)
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
    </section>
  );
}

