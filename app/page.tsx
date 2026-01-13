import Link from "next/link";
import {
  ArrowRight,
  Database,
  Layout,
  MousePointer2,
  Search,
  Zap,
  Shield,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StoreReset } from "@/components/layout/store-reset";
import { APP_NAME } from "@/constants";
import Image from "next/image";

const features = [
  {
    icon: Zap,
    title: "Fast Generation",
    description: "Generate ERD diagrams from your database schema in seconds.",
  },
  {
    icon: Layout,
    title: "Modern UI",
    description:
      "Clean, intuitive interface that makes database visualization enjoyable.",
  },
  {
    icon: MousePointer2,
    title: "Drag & Drop Layout",
    description:
      "Arrange tables freely with drag-and-drop. Your layout, your way.",
  },
  {
    icon: Search,
    title: "Smart Navigator",
    description: "Search and navigate through tables and columns with ease.",
  },
  {
    icon: Database,
    title: "MySQL & PostgreSQL",
    description: "Full support for the most popular relational databases.",
  },
  {
    icon: Shield,
    title: "Secure by Design",
    description: "Your credentials are never stored. Privacy-first approach.",
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <StoreReset />
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex items-center">
          <div className="absolute inset-0 bg-linear-to-b from-primary/5 via-transparent to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-3xl opacity-20" />

          <div className="container relative py-12">
            <div className="mx-auto max-w-4xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary mb-8">
                <Sparkles className="h-4 w-4" />
                <span>Modern ERD Generator</span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Visualize Your Database
                <span className="block text-primary mt-2">
                  Schema Beautifully
                </span>
              </h1>

              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                {APP_NAME} generates clean, interactive ERD diagrams from MySQL
                and PostgreSQL. No more outdated tools with clunky interfaces.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-base px-8"
                  asChild
                >
                  <Link href="/connect">
                    Generate ERD
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-base px-8"
                  asChild
                >
                  <Link href="/erd?demo=true&dialect=postgresql&db=demo_db">
                    View Demo
                  </Link>
                </Button>
              </div>

              <div className="mt-12 flex items-center justify-center gap-8 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Image
                    src={"/img/postgres-logo.png"}
                    alt="Logo PostgreSQL"
                    width={120}
                    height={0}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    src={"/img/mysql-logo.png"}
                    alt="Logo MySQL"
                    width={120}
                    height={0}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-t border-border/50 bg-card/30 py-24">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Why {APP_NAME}?
              </h2>
              <p className="mt-4 text-muted-foreground text-lg">
                Most ERD tools have outdated UIs and poor UX. We built something
                better.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group rounded-xl border border-border/50 bg-card/50 p-6 transition-all hover:border-primary/50 hover:bg-card"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-24">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                How It Works
              </h2>
              <p className="mt-4 text-muted-foreground text-lg">
                Three simple steps to visualize your database
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Connect",
                  desc: "Enter your database credentials or connection URL",
                },
                {
                  step: "02",
                  title: "Generate",
                  desc: "We introspect your schema and build the diagram",
                },
                {
                  step: "03",
                  title: "Explore",
                  desc: "Drag, zoom, search, and navigate your ERD",
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary text-2xl font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-border/50 bg-linear-to-b from-card/50 to-background py-24">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Connect your database and generate your ERD in seconds.
              </p>
              <Button size="lg" className="text-base px-8" asChild>
                <Link href="/connect">
                  Connect Database
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
