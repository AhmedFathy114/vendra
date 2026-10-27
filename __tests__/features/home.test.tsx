import { render, screen } from "@testing-library/react";
import Home from "@/features/home/home";
import { useCategoryProduct } from "@/hooks/queries/useCategoryProduct";
import { useCollections } from "@/hooks/queries/useCollectionProduct";
import { productFixture } from "@/test-utils/fixtures";

jest.mock("@/hooks/queries/useCollectionProduct", () => ({
  useCollections: jest.fn(),
}));

jest.mock("@/hooks/queries/useCategoryProduct", () => ({
  useCategoryProduct: jest.fn(),
}));

jest.mock("@/components/Loaders/LoadingModel", () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock("@/features/home/HeroSlider", () => ({
  HeroSlider: () => <div data-testid="hero-slider" />,
}));

jest.mock("@/features/home/HeroCategory", () => ({
  HeroCategory: () => <div data-testid="hero-category" />,
}));

jest.mock("@/components/shared/ReusableSection", () => ({
  __esModule: true,
  default: ({
    title,
    data,
    viewAllHref,
  }: {
    title: string;
    data: unknown[];
    viewAllHref?: string;
  }) => (
    <section aria-label={title}>
      <h2>{title}</h2>
      <a href={viewAllHref} aria-label={`View all ${title}`}>
        View All
      </a>
      <span data-testid={`count-${title}`}>{data.length}</span>
    </section>
  ),
}));

const mockUseCollections = jest.mocked(useCollections);
const mockUseCategoryProduct = jest.mocked(useCategoryProduct);

describe("Home", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseCollections.mockReturnValue({
      data: {
        products: [productFixture],
        total: 1,
        skip: 0,
        limit: 20,
      },
      isLoading: false,
      isFetching: false,
      isError: false,
    });

    mockUseCategoryProduct.mockReturnValue({
      categoryProducts: {
        products: [productFixture],
        total: 1,
        skip: 0,
        limit: 20,
      },
      isLoading: false,
      isError: false,
      isFetching: false,
    });
  });

  it("renders the hero and all product sections", () => {
    render(<Home />);

    expect(screen.getByTestId("hero-slider")).toBeInTheDocument();
    expect(screen.getByTestId("hero-category")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "new arrivals" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Best Seller" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "smart phones" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "mens shirts" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "womens dresses" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "furniture" }),
    ).toBeInTheDocument();
  });

  it("uses the correct view-all links", () => {
    render(<Home />);

    expect(
      screen.getByRole("link", { name: "View all new arrivals" }),
    ).toHaveAttribute("href", "/shop/collection/new-arrival");
    expect(
      screen.getByRole("link", { name: "View all Best Seller" }),
    ).toHaveAttribute("href", "/shop/collection/best-seller");
    expect(
      screen.getByRole("link", { name: "View all smart phones" }),
    ).toHaveAttribute("href", "/shop/electronics/smartphones");
    expect(
      screen.getByRole("link", { name: "View all mens shirts" }),
    ).toHaveAttribute("href", "/shop/mens-fashion/mens-shirts");
    expect(
      screen.getByRole("link", { name: "View all womens dresses" }),
    ).toHaveAttribute("href", "/shop/womens-fashion/womens-dresses");
    expect(
      screen.getByRole("link", { name: "View all furniture" }),
    ).toHaveAttribute("href", "/shop/home-living/furniture");
  });

  it("loads the expected collections and categories", () => {
    render(<Home />);

    expect(mockUseCollections).toHaveBeenCalledWith("rating", "desc");
    expect(mockUseCollections).toHaveBeenCalledWith("meta.createdAt", "desc");
    expect(mockUseCategoryProduct).toHaveBeenCalledWith("smartphones");
    expect(mockUseCategoryProduct).toHaveBeenCalledWith("mens-shirts");
    expect(mockUseCategoryProduct).toHaveBeenCalledWith("womens-dresses");
    expect(mockUseCategoryProduct).toHaveBeenCalledWith("furniture");
  });

  it("passes the section data to each product section", () => {
    render(<Home />);

    expect(screen.getByTestId("count-new arrivals")).toHaveTextContent("1");
    expect(screen.getByTestId("count-smart phones")).toHaveTextContent("1");
    expect(screen.getByTestId("count-furniture")).toHaveTextContent("1");
  });
});
