import { render, screen } from "@testing-library/react";
import Search from "@/features/shared/Search";
import { useSearch } from "@/hooks/queries/useSearch";
import { usePagination } from "@/hooks/usePagination";
import { productFixture } from "@/test-utils/fixtures";

jest.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams("page=2"),
}));

jest.mock("@/hooks/queries/useSearch", () => ({
  useSearch: jest.fn(),
}));

jest.mock("@/hooks/usePagination", () => ({
  usePagination: jest.fn(),
}));

jest.mock("@/components/Loaders/LoadingModel", () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock("@/features/shared/ProductSection", () => ({
  __esModule: true,
  default: ({
    title,
    data,
    isError,
    isLoading,
  }: {
    title: string;
    data: unknown[];
    isError: boolean;
    isLoading: boolean;
  }) => (
    <div
      data-testid="product-section"
      data-title={title}
      data-count={data.length}
      data-error={String(isError)}
      data-loading={String(isLoading)}
    />
  ),
}));

jest.mock("@/features/shared/Pagination", () => ({
  __esModule: true,
  default: ({
    page,
    total,
    disabled,
  }: {
    page: number;
    total: number;
    disabled?: boolean;
  }) => (
    <div
      data-testid="pagination"
      data-page={page}
      data-total={total}
      data-disabled={String(disabled)}
    />
  ),
}));

const mockUseSearch = jest.mocked(useSearch);
const mockUsePagination = jest.mocked(usePagination);

describe("Search", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUsePagination.mockReturnValue({
      limit: 20,
      skip: 20,
      page: 2,
      handlePageChange: jest.fn(),
    });

    mockUseSearch.mockReturnValue({
      products: {
        products: [productFixture],
        total: 40,
        skip: 20,
        limit: 20,
      },
      isLoading: false,
      isError: false,
      isFetching: false,
    });
  });

  it("shows a prompt when there is no search term", () => {
    render(<Search title="" />);

    expect(
      screen.getByRole("heading", { name: "Search products" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Use the search bar in the header to find products by name."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Continue shopping" }),
    ).toHaveAttribute("href", "/");
    expect(screen.queryByTestId("product-section")).not.toBeInTheDocument();
    expect(screen.queryByTestId("pagination")).not.toBeInTheDocument();
  });

  it("renders search results and pagination", () => {
    render(<Search title="phone" />);

    expect(mockUsePagination).toHaveBeenCalledWith(2);
    expect(mockUseSearch).toHaveBeenCalledWith("phone", 20, 20);
    expect(screen.getByTestId("product-section")).toHaveAttribute(
      "data-title",
      "phone",
    );
    expect(screen.getByTestId("product-section")).toHaveAttribute(
      "data-count",
      "1",
    );
    expect(screen.getByTestId("pagination")).toHaveAttribute("data-total", "40");
  });

  it("passes error and fetching states through", () => {
    mockUseSearch.mockReturnValue({
      products: undefined,
      isLoading: false,
      isError: true,
      isFetching: true,
    });

    render(<Search title="phone" />);

    expect(screen.getByTestId("product-section")).toHaveAttribute(
      "data-error",
      "true",
    );
    expect(screen.getByTestId("product-section")).toHaveAttribute(
      "data-loading",
      "false",
    );
    expect(screen.getByTestId("pagination")).toHaveAttribute(
      "data-disabled",
      "true",
    );
  });
});
