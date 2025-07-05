import { type Config } from "tailwindcss";
import { shadcnPlugin } from "@shadcn/ui";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {}
  },
  plugins: [shadcnPlugin]
} satisfies Config;
