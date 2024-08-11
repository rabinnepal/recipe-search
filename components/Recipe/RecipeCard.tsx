import { FC } from "react";
import Link from "next/link";

interface RecipeCardProps {
  href: string;
  imgSrc: string;
  imgAlt: string;
  title: string;
  description: string;
}

const RecipeCard: FC<RecipeCardProps> = ({
  href,
  imgSrc,
  imgAlt,
  title,
  description,
}) => {
  return (
    <div className="relative overflow-hidden rounded-lg group">
      <Link href={href} className="absolute inset-0 z-10" prefetch={false}>
        <span className="sr-only">{`View ${title}`}</span>
      </Link>
      <img
        src={imgSrc}
        alt={imgAlt}
        width={400}
        height={300}
        className="object-cover w-full h-60"
        style={{ aspectRatio: "400/300", objectFit: "cover" }}
      />
      <div className="p-4 bg-background">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default RecipeCard;
