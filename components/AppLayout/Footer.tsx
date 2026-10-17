import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { BrandSection } from "@/components/AppLayout/brand-section";
import { company, customerCare, primaryLinks } from "@/constants/Links";
import { FooterLink } from "@/types/type";
import { motion } from "motion/react";

const contactInfo = [
  { icon: Phone, text: "+20 1203009255" },
  { icon: Mail, text: "support@vendra.com" },
  { icon: MapPin, text: "Cairo, Egypt" },
  { icon: Clock, text: "Daily, 9 AM to 9 PM" },
];

function toShopHref(slug: string) {
  return slug.startsWith("/shop/") ? slug : `/shop/${slug}`;
}

const linkClass =
  "inline-flex min-h-8 items-center text-sm text-muted-foreground transition-colors hover:text-red-800 focus-visible:text-red-800 focus-visible:outline-none dark:hover:text-red-400 dark:focus-visible:text-red-400";

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) {
  return (
    <nav aria-label={title}>
      <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-foreground">
        {title}
      </h3>
      <ul className="space-y-1">
        {links.map((link) => (
          <li key={link.label}>
            {link.href ? (
              <Link href={link.href} className={linkClass}>
                {link.label}
              </Link>
            ) : (
              <p className={`${linkClass} cursor-pointer`}>{link.label}</p>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Footer() {
  const shopLinks: FooterLink[] = primaryLinks.map((group) => ({
    label: group.title,
    href: toShopHref(group.slug ?? "/"),
  }));

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="mt-12 border-t border-border bg-[#eae6e6] pb-20 dark:bg-accent lg:pb-0"
    >
      <div className="mx-auto max-w-[1920px] px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div className="space-y-4">
            <BrandSection />
            <p className="max-w-xs text-sm text-muted-foreground">
              Everything you need, in one place.
            </p>

            <ul className="space-y-2 text-sm text-muted-foreground">
              {contactInfo.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-2">
                  <Icon className="size-4 shrink-0" aria-hidden="true" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <FooterColumn title="Shop" links={shopLinks} />
            <FooterColumn title="Customer Care" links={customerCare} />
            <div className="col-span-2 sm:col-span-1">
              <FooterColumn title="Company" links={company} />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1920px] flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-10">
          <p>© {new Date().getFullYear()} Vendra. All rights reserved.</p>
          <p>Demo store built for practice. Product data from DummyJSON.</p>
        </div>
      </div>
    </motion.footer>
  );
}
