import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { GetServerSideProps } from "next";
const Inventory = ({ data }) => {
  const products = data.products;
  return (
    <div>
      <Head>
        <title>Inventory</title>
      </Head>
      <div className={`my-4`}>
        <h3 className={`text-lg`}>Inventory</h3>
        <div className={`flex flex-row justify-evenly flex-wrap`}>
          {products.map((p) => {
            return (
              <Link
                href={`/products/[id]`}
                as={`/products/${p._id}`}
                key={p._id}
              >
                <div
                  className={`w-[10rem] h-[13rem] xl:w-[15rem] bg-slate-500 p-2 rounded-xl m-2 hover:cursor-pointer`}
                >
                  <div className={`w-full h-2/3 relative`}>
                    <Image
                      // layout="fill"
                      fill
                      src={p.imageURL ? p.imageURL : "/ws2.jpg"}
                      alt="product"
                      title={p.name ? p.name : "Product Name"}
                      className="w-full h-full rounded-2xl object-contain"
                    />
                  </div>
                  <p className={``}>{p.name ? p.name : "Product Name"}</p>
                  <span className={`font-mono`}>
                    {p.price ? `#${p.price}` : "#9,999"}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
        {/* <Link
        href={`/shop/[category]`}
        as={`/shop/kitchenware`}
      >{`View More >`}</Link> */}
      </div>
    </div>
  );
  // sort by quantity/price/availability
};

export default Inventory;

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("https://creepy-plum-elk.cyclic.app/products");
  // const res = await fetch("http://localhost:4000/products");
  const data = await res.json();
  // console.log(data.products[0]._id);
  // console.log(data);

  return {
    props: { data: data },
  };
};
