export type NavigationLink = {
  title: string;
  slug: string;
};

export type NavigationItem = {
  title: string;
  slug?: string;
  children?: NavigationLink[];
  image?: string;
};

export type CategoryItem = {
  id: string;
  title: string;
  image: string;
  href: string;
};
