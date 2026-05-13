interface AdSlotProps {
  id: string;
  size?: "leaderboard" | "rectangle" | "half-page" | "banner";
  className?: string;
}

// AdSense placeholder — returns null until AdSense is approved.
// All slot positions are placed throughout the site ready for activation.
export default function AdSlot(_props: AdSlotProps) {
  return null;
}
