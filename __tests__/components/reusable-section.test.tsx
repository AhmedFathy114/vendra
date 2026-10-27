import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import ReusableSection from "@/components/shared/ReusableSection";

const mockSlidePrev = jest.fn();
const mockSlideNext = jest.fn();

jest.mock("swiper/css", () => ({}));
jest.mock("swiper/css/pagination", () => ({}));
jest.mock("swiper/modules", () => ({
  A11y: {},
  Mousewheel: {},
  Pagination: {},
}));
jest.mock("swiper/react", () => {
  const { useEffect } = jest.requireActual<typeof import("react")>("react");

  return {
    Swiper: ({
      children,
      onSwiper,
    }: {
      children: ReactNode;
      onSwiper?: (swiper: {
        isBeginning: boolean;
        isEnd: boolean;
        slidePrev: () => void;
        slideNext: () => void;
      }) => void;
    }) => {
      useEffect(() => {
        onSwiper?.({
          isBeginning: false,
          isEnd: false,
          slidePrev: mockSlidePrev,
          slideNext: mockSlideNext,
        });
      }, [onSwiper]);

      return <div data-testid="swiper">{children}</div>;
    },
    SwiperSlide: ({ children }: { children: ReactNode }) => (
      <div>{children}</div>
    ),
  };
});

describe("ReusableSection", () => {
  it("renders a title, a view all link, and the items", () => {
    render(
      <ReusableSection
        title="Featured"
        data={["Alpha", "Beta"]}
        render={(item) => <span>{item}</span>}
        getKey={(item) => item}
        viewAllHref="/shop/featured"
      />,
    );

    expect(screen.getByRole("heading", { name: "Featured" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View All" })).toHaveAttribute(
      "href",
      "/shop/featured",
    );
    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(screen.getByText("Beta")).toBeInTheDocument();
  });

  it("moves the slider with the arrow buttons", () => {
    render(
      <ReusableSection
        title="Featured"
        data={["Alpha"]}
        render={(item) => <span>{item}</span>}
        getKey={(item) => item}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Next slide" }));
    fireEvent.click(screen.getByRole("button", { name: "Previous slide" }));

    expect(mockSlideNext).toHaveBeenCalledTimes(1);
    expect(mockSlidePrev).toHaveBeenCalledTimes(1);
  });

  it("renders skeletons while loading", () => {
    const { container } = render(
      <ReusableSection
        title="Featured"
        data={[]}
        render={(item) => <span>{item}</span>}
        getKey={(item) => item}
        isLoading
      />,
    );

    expect(screen.queryByRole("heading", { name: "Featured" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "View All" })).not.toBeInTheDocument();
    expect(container.querySelectorAll(".animate-pulse").length).toBeGreaterThan(0);
  });

  it("renders nothing when there is no data and it is not loading", () => {
    const { container } = render(
      <ReusableSection
        title="Empty"
        data={[]}
        render={(item) => <span>{item}</span>}
        getKey={(item) => item}
      />,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
