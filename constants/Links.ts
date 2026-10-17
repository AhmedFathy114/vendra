import type { FooterLink, NavigationItem } from "@/types/type";

export const primaryLinks: NavigationItem[] = [
  {
    title: "Electronics",
    slug: "/shop/electronics",
    image:
      "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/1.webp",
    children: [
      { title: "Smartphones", slug: "/shop/smartphones" },
      { title: "Laptops", slug: "/shop/laptops" },
      { title: "Tablets", slug: "/shop/tablets" },
      {
        title: "Mobile Accessories",
        slug: "/shop/mobile-accessories",
      },
    ],
  },
  {
    title: "Men's Fashion",
    slug: "/shop/mens-fashion",
    image:
      "https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/1.webp",
    children: [
      { title: "Men's Shirts", slug: "/shop/mens-shirts" },
      { title: "Men's Shoes", slug: "/shop/mens-shoes" },
      { title: "Men's Watches", slug: "/shop/mens-watches" },
      { title: "Tops", slug: "/shop/tops" },
    ],
  },
  {
    title: "Women's Fashion",
    slug: "/shop/womens-fashion",
    image:
      "https://cdn.dummyjson.com/product-images/womens-dresses/corset-with-black-skirt/1.webp",
    children: [
      { title: "Women's Dresses", slug: "/shop/womens-dresses" },
      { title: "Women's Shoes", slug: "/shop/womens-shoes" },
      { title: "Women's Bags", slug: "/shop/womens-bags" },
      {
        title: "Women's Jewellery",
        slug: "/shop/womens-jewellery",
      },
      { title: "Women's Watches", slug: "/shop/womens-watches" },
      { title: "Sunglasses", slug: "/shop/sunglasses" },
    ],
  },
  {
    title: "Beauty & Personal Care",
    slug: "/shop/beauty-personal-care",
    image:
      "https://cdn.dummyjson.com/product-images/skin-care/attitude-super-leaves-hand-soap/thumbnail.webp",
    children: [
      { title: "Beauty", slug: "/shop/beauty" },
      { title: "Skin Care", slug: "/shop/skin-care" },
      { title: "Fragrances", slug: "/shop/fragrances" },
    ],
  },
  {
    title: "Home & Living",
    slug: "/shop/home-living",
    image:
      "https://cdn.dummyjson.com/product-images/home-decoration/decoration-swing/1.webp",
    children: [
      { title: "Furniture", slug: "/shop/furniture" },
      { title: "Home Decoration", slug: "/shop/home-decoration" },
      {
        title: "Kitchen Accessories",
        slug: "/shop/kitchen-accessories",
      },
      { title: "Groceries", slug: "/shop/groceries" },
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
        slug: "/shop/sports-accessories",
      },
      { title: "Motorcycle", slug: "/shop/motorcycle" },
      { title: "Vehicle", slug: "/shop/vehicle" },
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
