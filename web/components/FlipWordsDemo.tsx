import { FlipWords } from "./ui/flip-words";

export function FlipWordsDemo() {
  const words = ["Youtube", "Facebook", "Instagram", "Tiktok"];

  return (
    <div className="h-[15rem] flex justify-center items-center px-4">
      <div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
        Download
        <FlipWords words={words} /> <br />
        videos with Download Xpert
      </div>
    </div>
  );
}
