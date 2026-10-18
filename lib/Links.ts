import type { FooterLink, NavigationItem } from "@/types/type";

export const primaryLinks: NavigationItem[] = [
  {
    title: "Electronics",
    slug: "/shop/electronics",
    image:
      "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/1.webp",
    children: [
      {
        title: "Smartphones",
        slug: "/shop/electronics/smartphones",
        image:
          "https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/1.webp",
      },
      {
        title: "Laptops",
        slug: "/shop/electronics/laptops",
        image:
          "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/1.webp",
      },
      {
        title: "Tablets",
        slug: "/shop/electronics/tablets",
        image:
          "https://cdn.dummyjson.com/product-images/tablets/ipad-mini-2021-starlight/1.webp",
      },
      {
        title: "Mobile Accessories",
        slug: "/shop/electronics/mobile-accessories",
        image:
          "https://cdn.dummyjson.com/product-images/mobile-accessories/amazon-echo-plus/1.webp",
      },
    ],
  },
  {
    title: "Men's Fashion",
    slug: "/shop/mens-fashion",
    image:
      "https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/1.webp",
    children: [
      {
        title: "Men's Shirts",
        slug: "/shop/mens-fashion/mens-shirts",
        image:
          "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/1.webp",
      },
      {
        title: "Men's Shoes",
        slug: "/shop/mens-fashion/mens-shoes",
        image:
          "https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/1.webp",
      },
      {
        title: "Men's Watches",
        slug: "/shop/mens-fashion/mens-watches",
        image:
          "https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/1.webp",
      },
      {
        title: "Tops",
        slug: "/shop/mens-fashion/tops",
        image:
          "https://cdn.dummyjson.com/product-images/tops/blue-frock/1.webp",
      },
    ],
  },
  {
    title: "Women's Fashion",
    slug: "/shop/womens-fashion",
    image:
      "https://cdn.dummyjson.com/product-images/womens-dresses/corset-with-black-skirt/1.webp",
    children: [
      {
        title: "Women's Dresses",
        slug: "/shop/womens-fashion/womens-dresses",
        image:
          "https://cdn.dummyjson.com/product-images/womens-dresses/black-women's-gown/1.webp",
      },
      {
        title: "Women's Shoes",
        slug: "/shop/womens-fashion/womens-shoes",
        image:
          "https://cdn.dummyjson.com/product-images/womens-shoes/black-&-brown-slipper/1.webp",
      },
      {
        title: "Women's Bags",
        slug: "/shop/womens-fashion/womens-bags",
        image:
          "https://cdn.dummyjson.com/product-images/womens-bags/blue-women's-handbag/1.webp",
      },
      {
        title: "Women's Jewellery",
        slug: "/shop/womens-fashion/womens-jewellery",
        image:
          "https://cdn.dummyjson.com/product-images/womens-jewellery/green-crystal-earring/1.webp",
      },
      {
        title: "Women's Watches",
        slug: "/shop/womens-fashion/womens-watches",
        image:
          "https://cdn.dummyjson.com/product-images/womens-watches/iwc-ingenieur-automatic-steel/1.webp",
      },
      {
        title: "Sunglasses",
        slug: "/shop/womens-fashion/sunglasses",
        image:
          "https://cdn.dummyjson.com/product-images/sunglasses/black-sun-glasses/1.webp",
      },
    ],
  },
  {
    title: "Beauty & Personal Care",
    slug: "/shop/beauty-personal-care",
    image:
      "https://cdn.dummyjson.com/product-images/skin-care/attitude-super-leaves-hand-soap/thumbnail.webp",
    children: [
      {
        title: "Beauty",
        slug: "/shop/beauty-personal-care/beauty",
        image:
          "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp",
      },
      {
        title: "Skin Care",
        slug: "/shop/beauty-personal-care/skin-care",
        image:
          "https://cdn.dummyjson.com/product-images/skin-care/attitude-super-leaves-hand-soap/1.webp",
      },
      {
        title: "Fragrances",
        slug: "/shop/beauty-personal-care/fragrances",
        image:
          "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/1.webp",
      },
    ],
  },
  {
    title: "Home & Living",
    slug: "/shop/home-living",
    image:
      "https://cdn.dummyjson.com/product-images/home-decoration/decoration-swing/1.webp",
    children: [
      {
        title: "Furniture",
        slug: "/shop/home-living/furniture",
        image:
          "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/1.webp",
      },
      {
        title: "Home Decoration",
        slug: "/shop/home-living/home-decoration",
        image:
          "https://cdn.dummyjson.com/product-images/home-decoration/decoration-swing/1.webp",
      },
      {
        title: "Kitchen Accessories",
        slug: "/shop/home-living/kitchen-accessories",
        image:
          "https://cdn.dummyjson.com/product-images/kitchen-accessories/bamboo-spatula/1.webp",
      },
      {
        title: "Groceries",
        slug: "/shop/home-living/groceries",
        image:
          "https://cdn.dummyjson.com/product-images/groceries/apple/1.webp",
      },
    ],
  },
  {
    title: "Sports & Automotive",
    slug: "/shop/sports-automotive",
    image:
      "https://cdn.dummyjson.com/product-images/motorcycle/generic-motorcycle/1.webp",
    children: [
      {
        title: "Sports Accessories",
        slug: "/shop/sports-automotive/sports-accessories",
        image:
          "https://cdn.dummyjson.com/product-images/sports-accessories/american-football/1.webp",
      },
      {
        title: "Motorcycle",
        slug: "/shop/sports-automotive/motorcycle",
        image:
          "https://cdn.dummyjson.com/product-images/motorcycle/generic-motorcycle/1.webp",
      },
      {
        title: "Vehicle",
        slug: "/shop/sports-automotive/vehicle",
        image:
          "https://cdn.dummyjson.com/product-images/vehicle/300-touring/1.webp",
      },
    ],
  },
];

export const images = [
  {
    id: 1,
    src: "/Yellow_Collie_Facts_or_Trivia_Dogs_Facebook_Cover_4.webp",
    href: "",
  },
  {
    id: 2,
    src: "/Yellow_Collie_Facts_or_Trivia_Dogs_Facebook_Cover_5.webp",
    href: "",
  },
  {
    id: 3,
    src: "/electronics-online-shopping-banner-devices-delivery-box-270532354.webp",
    href: "",
  },
];

export const customerCare: FooterLink[] = [
  { label: "Contact Us" },
  { label: "Shipping & Delivery" },
  { label: "Returns & Refunds" },
  { label: "FAQ", href: "/faq" },
  { label: "Track Your Order" },
];

export const company: FooterLink[] = [
  { label: "About Vendra" },
  { label: "Careers" },
  { label: "Privacy Policy" },
  { label: "Terms & Conditions" },
];
