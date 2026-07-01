import type { Metadata } from "next";
import EnSubLayout from "@/components/en/EnSubLayout";
import AboutSection from "@/components/sub/about/AboutSection";
import { EN_ABOUT_WAYS } from "@/data/en/about";

export const metadata: Metadata = {
  title: "METAPOLIS | About METAPOLIS",
  description: "About METAPOLIS — Dongtan's premier heart of premium lifestyle.",
};

export default function Page() {
  return (
    <EnSubLayout
      currentPath="/en/about"
      label="About METAPOLIS"
      bannerImage="/img/sub/banner/menu1.png"
      className="about"
    >
      <AboutSection
        introEyebrow="Mall Introduction"
        introTitle={<b>About METAPOLIS</b>}
        lead={
          <>
            <p>
              Metapolis breathes new inspiration into your daily life, turning an
              ordinary day into an extraordinary scene.
            </p>
            <p>
              Discover a freshly uncovered sense of relaxation on our
              nature-embraced terrace. Enjoy joyful moments built together with
              your loved ones, and experience the comforting stay delivered by our
              thoughtfully designed spaces. Where shopping, dining, and culture
              seamlessly blend — Metapolis, the premier heart of Dongtan&apos;s
              premium lifestyle.
            </p>
            <p>
              In this space where you can stay and linger as if strolling through
              your daily routine, welcome a special day filled with pleasant,
              uplifting healing.
            </p>
          </>
        }
        waysEyebrow="Three Ways to Stay"
        waysTitle={
          <>
            Three Ways to <strong>Elevate Your Everyday</strong>
          </>
        }
        ways={EN_ABOUT_WAYS}
      />
    </EnSubLayout>
  );
}
