import { render, screen } from "@testing-library/react";
import Collection from "@/features/collection/collection";
import { useCollections } from "@/hooks/queries/useCollectionProduct";
import { usePagination } from "@/hooks/usePagination";
import { productFixture } from "@/test-utils/fixtures";

jest.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams("page=2"),
}));

jest.mock("@/hooks/queries/useCollectionProduct", () => ({
  useCollections: jest.fn(),
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

const mockUseCollections = jest.mocked(useCollections);
const mockUsePagination = jest.mocked(usePagination);

describe("Collection", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUsePagination.mockReturnValue({
      limit: 20,
      skip: 20,
      page: 2,
      handlePageChange: jest.fn(),
    });

    mockUseCollections.mockReturnValue({
      data: {
        products: [productFixture],
        total: 40,
        skip: 20,
        limit: 20,
      },
      isError: false,
      isLoading: false,
      isFetching: false,
    });
  });

  it("loads new arrivals by creation date", () => {
    render(<Collection collection="new-arrival" />);

    expect(mockUsePagination).toHaveBeenCalledWith(2);
    expect(mockUseCollections).toHaveBeenCalledWith(
      "meta.createdAt",
      "desc",
      20,
      20,
    );
    expect(screen.getByTestId("product-section")).toHaveAttribute(
      "data-title",
      "new-arrival",
    );
    expect(screen.getByTestId("product-section")).toHaveAttribute(
      "data-count",
      "1",
    );
    expect(screen.getByTestId("pagination")).toHaveAttribute("data-total", "40");
    expect(screen.getByTestId("pagination")).toHaveAttribute(
      "data-disabled",
      "false",
    );
  });

  it("loads other collections by rating", () => {
    render(<Collection collection="best-seller" />);

    expect(mockUseCollections).toHaveBeenCalledWith("rating", "desc", 20, 20);
  });

  it("passes loading and error states to the product section", () => {
    mockUseCollections.mockReturnValue({
      data: undefined,
      isError: true,
      isLoading: false,
      isFetching: true,
    });

    render(<Collection collection="best-seller" />);

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
