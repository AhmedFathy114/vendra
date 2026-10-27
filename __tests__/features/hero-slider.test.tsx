import { act, fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { HeroSlider } from "@/features/home/HeroSlider";

const mockSlidePrev = jest.fn();
const mockSlideNext = jest.fn();
const mockPlay = jest.fn().mockResolvedValue(undefined);
const mockPause = jest.fn();
let mockOnSlideChange:
  | ((swiper: { realIndex: number }) => void)
  | undefined;

jest.mock("swiper/css", () => ({}));
jest.mock("swiper/css/navigation", () => ({}));
jest.mock("swiper/css/pagination", () => ({}));
jest.mock("swiper/css/effect-fade", () => ({}));
jest.mock("swiper/modules", () => ({
  Autoplay: {},
  EffectFade: {},
  Navigation: {},
  Pagination: {},
}));
jest.mock("swiper/react", () => {
  const { useEffect } = jest.requireActual<typeof import("react")>("react");

  return {
    Swiper: ({
      children,
      onSwiper,
      onSlideChange,
    }: {
      children: ReactNode;
      onSwiper?: (swiper: {
        slidePrev: () => void;
        slideNext: () => void;
      }) => void;
      onSlideChange?: (swiper: { realIndex: number }) => void;
    }) => {
      useEffect(() => {
        mockOnSlideChange = onSlideChange;
        onSwiper?.({
          slidePrev: mockSlidePrev,
          slideNext: mockSlideNext,
        });
      }, [onSwiper, onSlideChange]);

      return <div data-testid="hero-swiper">{children}</div>;
    },
    SwiperSlide: ({ children }: { children: ReactNode }) => (
      <div>{children}</div>
    ),
  };
});

describe("HeroSlider", () => {
  beforeAll(() => {
    Object.defineProperty(HTMLMediaElement.prototype, "play", {
      configurable: true,
      value: mockPlay,
    });
    Object.defineProperty(HTMLMediaElement.prototype, "pause", {
      configurable: true,
      value: mockPause,
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the video, images, and navigation buttons", () => {
    const { container } = render(<HeroSlider />);

    expect(screen.getByTestId("hero-swiper")).toBeInTheDocument();
    expect(container.querySelector("video")).toHaveAttribute(
      "src",
      expect.stringContaining("activ.eg"),
    );
    expect(screen.getAllByRole("img").length).toBeGreaterThan(0);
    expect(
      screen.getByRole("button", { name: "Previous slide" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Next slide" }),
    ).toBeInTheDocument();
  });

  it("moves the slider with the arrow buttons", () => {
    render(<HeroSlider />);

    fireEvent.click(screen.getByRole("button", { name: "Next slide" }));
    fireEvent.click(screen.getByRole("button", { name: "Previous slide" }));

    expect(mockSlideNext).toHaveBeenCalledTimes(1);
    expect(mockSlidePrev).toHaveBeenCalledTimes(1);
  });

  it("pauses the video when leaving the first slide", () => {
    render(<HeroSlider />);

    act(() => {
      mockOnSlideChange?.({ realIndex: 1 });
    });

    expect(mockPause).toHaveBeenCalled();
  });
});
