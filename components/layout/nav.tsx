import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/nav/mobile-nav";
import { mainMenu } from "@/menu.config";
import { siteConfig } from "@/site.config";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Heart, Search, ShoppingBag } from "lucide-react";

interface NavProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
}

export function Nav({ className, children, id }: NavProps) {
  return (
    <nav
      className={cn("sticky z-50 top-0 bg-background", "border-b", className)}
      id={id}
    >
      <div
        id="nav-container"
        className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-3 sm:px-6 lg:px-10"
      >
        <Link
          className="hover:opacity-75 transition-all flex gap-4 items-center"
          href="/"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://www.sf6relations.com/wp-content/uploads/2022/09/logo-1.ico"
            alt="SF6 Relations Logo"
            className="h-11 w-11"
          />
          <h2 className="text-sm font-black text-[#262f33]">{siteConfig.site_name}</h2>
        </Link>
        {children}
        <div className="flex items-center gap-2">
          <div className="mx-2 hidden md:flex">
            {Object.entries(mainMenu).map(([key, href]) => (
              <Button key={href} asChild variant="ghost" size="sm" className="rounded-sm">
                <Link href={href}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Link>
              </Button>
            ))}
          </div>
          <div className="hidden items-center gap-1 lg:flex">
            <Button asChild variant="ghost" size="sm" className="rounded-sm">
              <Link href="/productcatalogue/finder">
                <Heart className="mr-2 h-4 w-4" />
                Favorites
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="rounded-sm">
              <Link href="/productcatalogue/finder">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Inquiry list
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="rounded-sm">
              <Link href="/productcatalogue/finder">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Link>
            </Button>
          </div>
          <Button asChild className="hidden rounded-sm bg-[#eb690b] text-white hover:bg-[#c95608] sm:flex">
            <Link href="/productcatalogue/finder">Find product</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </nav>
  );
}
