import PortfolioCard from "@/components/portfolio/PortfolioCard";

export default function PortfolioGrid({ works, headingLevel = "h3" }) {
  return (
    <ul className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-9">
      {works.map((work, index) => (
        <li key={work.slug}>
          <PortfolioCard
            work={work}
            headingLevel={headingLevel}
            tone={index % 2 === 0 ? "dark" : "light"}
          />
        </li>
      ))}
    </ul>
  );
}
