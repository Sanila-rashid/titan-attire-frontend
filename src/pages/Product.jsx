import React, { useState, useEffect, useMemo, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Item from "../components/Item/Item";
import "./Product.css";
import { CartContext } from "../context/CartContext";
import api from "../utils/api";
import { getByCategory } from "../utils/productHelpers";

const BASE_URL = "http://localhost:5000"; // only for images

// Helper: returns full URL
const getImageUrl = (url) => {
  if (!url) return "";
  return url.startsWith("http") ? url : `${BASE_URL}${url}`;
};


const Product = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [sizeError, setSizeError] = useState(false);

  // ===============================
  // 🔥 FETCH SINGLE PRODUCT
  // ===============================
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        const data = res.data;

        setProduct(data);

        const firstColor = data?.colors?.[0] || null;
        setSelectedColor(firstColor);

        const initialImage =
  getImageUrl(firstColor?.images?.front) ||
  getImageUrl(data?.images?.front) ||
  "";


        setMainImage(initialImage);
        setSelectedSize(null);
        setLoaded(true);
      } catch (err) {
        console.error("❌ Error fetching product:", err);
        setProduct(null);
        setLoaded(true);
      }
    };

    fetchProduct();
  }, [id]);

  // ===============================
  // 🔁 FETCH ALL PRODUCTS
  // ===============================
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await api.get("/products");
        if (Array.isArray(res.data)) setAllProducts(res.data);
      } catch (err) {
        console.error("❌ Error fetching all products:", err);
      }
    };

    fetchAllProducts();
  }, []);

  // ===============================
  // ⭐ RECOMMENDATIONS
  // ===============================
  

const recommendations = useMemo(() => {
  if (!product || !allProducts.length) return [];

  // Try same category first
  let sameCategory = getByCategory(allProducts, product.category)
    .filter((p) => String(p._id) !== String(id));

  // If nothing in same category, show any other products
  if (sameCategory.length === 0) {
    sameCategory = allProducts.filter((p) => String(p._id) !== String(id));
  }

  return sameCategory.slice(0, 4);
}, [allProducts, product, id]);


  if (!loaded) return <p>Loading product...</p>;
  if (!product) return <div className="not-found fade-in">❌ Product Not Found</div>;

  // ===============================
  // 🖼 THUMBNAILS
  // ===============================
  const thumbnails = (
  selectedColor?.images
    ? [selectedColor.images.front, selectedColor.images.back]
    : [product.images.front, product.images.back]
)
  .filter(Boolean)
  .map(getImageUrl);


  return (
    <div className="product-wrapper fade-in">
      {/* BREADCRUMB */}
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span>›</span>
        <p>{product.name}</p>
      </div>

      <div className="product-page">
        {/* LEFT */}
        <div className="product-left">
          <div className="thumbnails">
            {thumbnails.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                className={`thumb ${mainImage === img ? "active" : ""}`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
          <div className="image-zoom-box">
            {mainImage && (
              <img src={mainImage} alt={product.name} className="main-image" />
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="product-right">
          <h1>{product.name}</h1>

          <div className="price-box">
            <p className="new-price">Rs. {product.price?.current}</p>
            {product.price?.old && (
              <p className="old-price">Rs {product.price.old}</p>
            )}
          </div>

          <p className="stock">✔ Only {product.stock} left in stock</p>

          {/* SIZE */}
          <div className="sizes">
            <h3>Select Size</h3>
            <div className="size-options">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? "active" : ""}`}
                  onClick={() => {
                    setSelectedSize(size);
                    setSizeError(false);
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
            {sizeError && (
              <p className="size-warning">⚠ Please select a size</p>
            )}
          </div>

          {/* COLORS */}
          {product.colors?.length > 0 && (
            <div className="colors">
              <h3>Select Color</h3>
              <div className="color-options">
                {product.colors.map((color, i) => (
                  <div key={i}>
                    <span
                      className={`color-dot ${
                        selectedColor?.name === color.name ? "active" : ""
                      }`}
                      style={{ backgroundColor: color.hex }}
                      onClick={() => {
                        setSelectedColor(color);
                        if (color.images?.front) {
  setMainImage(getImageUrl(color.images.front));
}

                      }}
                    />
                    <p>{color.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ADD TO CART */}
          <button
            className="add-btn"
            onClick={() => {
              if (!selectedSize) {
                setSizeError(true);
                return;
              }

              addToCart({
                id: product._id,
                name: product.name,
                price: product.price.current,
                size: selectedSize,
                color: selectedColor?.name || "default",
                image: mainImage,
                uniqueKey: `${product._id}-${selectedSize}-${selectedColor?.name}-${Date.now()}`,
              });
            }}
          >
            ADD TO CART
          </button>
        </div>
      </div>

      {/* RECOMMENDED */}
      <div className="recommended">
        <h2>You May Also Like</h2>
        <div className="recommended-items">
          {recommendations.map((item) => (
           <Item
  key={item._id}
  _id={item._id}
  name={item.name}
  image_front={getImageUrl(item.images?.front)}
  image_back={getImageUrl(item.images?.back)}
  new_price={item.price?.current}
  old_price={item.price?.old}
  badges={{ sale: item.on_sale || !!item.price?.old }}


            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
