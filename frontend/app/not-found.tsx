import Link from "next/link";
import { buttonStyles } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-foreground mb-4">
        Pagina niet gevonden
      </h2>
      <p className="text-lg text-muted-foreground mb-8">
        De pagina die je zoekt bestaat niet of is verplaatst.
      </p>
      <Link href="/" className={buttonStyles.getClasses("default", "lg")}>
        Terug naar Home
      </Link>
    </div>
  );
}
