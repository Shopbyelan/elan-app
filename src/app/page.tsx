import { redirect } from "next/navigation";

// Root redirects to the shop homepage
export default function RootPage() {
  redirect("/home");
}
