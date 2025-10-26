import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface WikiCardProps {
  title: string;
  author: string;
  date: string;
  summary: string;
  href: string;
}

export function WikiCard({
  title,
  author,
  date,
  summary,
  href,
}: WikiCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{author}</span>
          <span>•</span>
          <span>{date}</span>
        </div>
        <CardTitle className="text-lg text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent className="py-0">
        <CardDescription>{summary}</CardDescription>
      </CardContent>
      <CardFooter className="pt-2">
        <Link
          href={href}
          className="text-primary hover:underline text-sm font-medium w-fit"
        >
          Read article &rarr;
        </Link>
      </CardFooter>
    </Card>
  );
}
