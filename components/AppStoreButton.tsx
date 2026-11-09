import { APP_STORE_URL } from "@/lib/appstore";

type Props = {
  label?: string;
  variant?: "solid" | "small";
  className?: string;
};

/** Link to Pixley's App Store listing, styled as a brand button. */
export default function AppStoreButton({
  label = "Download on the App Store",
  variant = "solid",
  className = "",
}: Props) {
  const size =
    variant === "small"
      ? "px-4 py-2 text-sm sm:px-5"
      : "px-6 py-3 text-base";
  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener"
      className={`inline-block rounded-full bg-coral font-bold text-cream transition-opacity hover:opacity-90 ${size} ${className}`}
    >
      {label}
    </a>
  );
}
