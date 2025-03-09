import Features from "@/components/homePage/Features";
import Header from "@/components/homePage/Header";
import { Button } from "@heroui/button";
import { ChevronRight, PiggyBank } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-cornsilk">
      <Header />

      {/* Hero Section */}
      <section className="py-20 md:py-32 dark:bg-[#1a1a1a]">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter dark:text-secondary sm:text-5xl md:text-6xl text-primary">
                  Take Control of Your Finances
                </h1>
                <p className="max-w-[600px] text-dark-moss-green dark:text-secondary md:text-xl">
                  BudgetEase helps you track expenses, set budgets, and analyze
                  spending patterns to achieve your financial goals.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  as={Link}
                  href="/auth"
                  size="lg"
                  className="bg-accent hover:bg-accent-secondary"
                >
                  Start for Free
                </Button>
                <Button
                  as={Link}
                  href="#features"
                  variant="bordered"
                  size="lg"
                  className="border-secondary text-secondary hover:bg-secondary hover:text-primary-foreground"
                >
                  Learn More
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[500px] aspect-video rounded-xl overflow-hidden shadow-xl">
                <img
                  src="/placeholder.svg?height=500&width=800"
                  alt="BudgetEase Dashboard Preview"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Features />

      {/* CTA Section */}
      <section className="py-16 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary-foreground">
                Ready to Take Control of Your Finances?
              </h2>
              <p className="max-w-[600px] text-primary-foreground/90 md:text-xl">
                Join thousands of users who have transformed their financial
                habits with BudgetEase.
              </p>
            </div>
            <Button
              as={Link}
              href="/auth"
              size="lg"
              className="bg-accent hover:bg-accent-secondary"
            >
              Get Started for Free
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-secondary/20 bg-cornsilk">
        <div className="container px-4 py-12 md:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center gap-2">
                <PiggyBank className="h-6 w-6 text-accent" />
                <span className="text-xl font-bold text-primary">
                  BudgetEase
                </span>
              </div>
              <p className="text-sm text-dark-moss-green">
                Your personal finance companion for better financial decisions.
              </p>
            </div>
            <div className="flex flex-col space-y-4">
              <h3 className="text-sm font-medium text-primary">Product</h3>
              <Link
                href="#"
                className="text-sm text-dark-moss-green hover:text-accent"
              >
                Features
              </Link>
              <Link
                href="#"
                className="text-sm text-dark-moss-green hover:text-accent"
              >
                Pricing
              </Link>
              <Link
                href="#"
                className="text-sm text-dark-moss-green hover:text-accent"
              >
                Testimonials
              </Link>
            </div>
            <div className="flex flex-col space-y-4">
              <h3 className="text-sm font-medium text-primary">Company</h3>
              <Link
                href="#"
                className="text-sm text-dark-moss-green hover:text-accent"
              >
                About
              </Link>
              <Link
                href="#"
                className="text-sm text-dark-moss-green hover:text-accent"
              >
                Careers
              </Link>
              <Link
                href="#"
                className="text-sm text-dark-moss-green hover:text-accent"
              >
                Contact
              </Link>
            </div>
            <div className="flex flex-col space-y-4">
              <h3 className="text-sm font-medium text-primary">Legal</h3>
              <Link
                href="#"
                className="text-sm text-dark-moss-green hover:text-accent"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-dark-moss-green hover:text-accent"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-sm text-dark-moss-green hover:text-accent"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 border-t border-secondary/20 pt-6 mt-8 md:flex-row">
            <p className="text-xs text-dark-moss-green">
              © {new Date().getFullYear()} BudgetEase. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-dark-moss-green hover:text-accent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-dark-moss-green hover:text-accent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-dark-moss-green hover:text-accent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
