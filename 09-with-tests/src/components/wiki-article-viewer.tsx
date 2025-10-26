"use client";

import {
  Calendar,
  ChevronRight,
  Edit,
  Eye,
  Home,
  Trash,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { deleteArticleForm } from "@/app/actions/articles";
import { incrementPageview } from "@/app/actions/pageviews";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ViewerArticle {
  title: string;
  author: string | null;
  id: number;
  content: string;
  createdAt: string;
  imageUrl?: string | null;
}

interface WikiArticleViewerProps {
  article: ViewerArticle;
  canEdit?: boolean;
  pageviews?: number | null;
}

export default function WikiArticleViewer({
  article,
  canEdit = false,
  pageviews = null,
}: WikiArticleViewerProps) {
  // local state to show updated pageviews after increment
  const [localPageviews, setLocalPageviews] = useState<number | null>(
    pageviews ?? null,
  );

  useEffect(() => {
    async function fetchPageview() {
      const newCount = await incrementPageview(article.id);
      setLocalPageviews(newCount ?? null);
    }
    fetchPageview();
  }, [article.id]);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
        <Link
          href="/"
          className="flex items-center hover:text-foreground transition-colors"
        >
          <Home className="h-4 w-4 mr-1" />
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-primary font-medium">{article.title}</span>
      </nav>

      {/* Article Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-primary mb-4">
            {article.title}
          </h1>

          {/* Article Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              <span>By {article.author ?? "Unknown"}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{formatDate(article.createdAt)}</span>
            </div>
            <div className="flex items-center">
              <Badge variant="secondary">Article</Badge>
              <div className="ml-3 flex items-center text-sm text-muted-foreground">
                <Eye className="h-4 w-4 mr-1" />
                <span>{localPageviews ? localPageviews : "—"}</span>
                <span className="ml-1">views</span>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Button - Only shown if user has edit permissions */}
        {canEdit && (
          <div className="ml-4 flex items-center gap-2">
            <Link href={`/wiki/edit/${article.id}`} className="cursor-pointer">
              <Button variant="outline" className="cursor-pointer">
                <Edit className="h-4 w-4 mr-2" />
                Edit Article
              </Button>
            </Link>

            {/* Delete form calls the server action wrapper */}
            <form action={deleteArticleForm} method="POST">
              <input type="hidden" name="id" value={String(article.id)} />
              <Button
                type="submit"
                variant="destructive"
                className="ml-2 cursor-pointer"
              >
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </form>
          </div>
        )}
      </div>

      {/* Article Content */}
      <Card>
        <CardContent className="pt-6">
          {/* Article Image - Display if exists */}
          {article.imageUrl && (
            <div className="mb-8">
              <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
                <Image
                  src={article.imageUrl}
                  alt={`Image for ${article.title}`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}

          {/* Rendered Markdown Content */}
          <div className="prose prose-stone dark:prose-invert max-w-none">
            <ReactMarkdown
              components={{
                // Customize heading styles
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold mt-8 mb-4 text-primary">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-semibold mt-6 mb-3 text-primary">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold mt-4 mb-2 text-primary">
                    {children}
                  </h3>
                ),
                // Customize paragraph styles
                p: ({ children }) => (
                  <p className="mb-4 text-foreground leading-7">{children}</p>
                ),
                // Customize list styles
                ul: ({ children }) => (
                  <ul className="mb-4 ml-6 list-disc text-foreground">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="mb-4 ml-6 list-decimal text-foreground">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="mb-1 text-foreground">{children}</li>
                ),
                // Customize code styles
                code: ({ children, className }) => {
                  const isInline = !className;
                  return isInline ? (
                    <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground">
                      {children}
                    </code>
                  ) : (
                    <code className={className}>{children}</code>
                  );
                },
                pre: ({ children }) => (
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4 text-sm">
                    {children}
                  </pre>
                ),
                // Customize blockquote styles
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-muted-foreground pl-4 italic my-4 text-muted-foreground">
                    {children}
                  </blockquote>
                ),
                // Customize link styles
                a: ({ children, href }) => (
                  <a
                    href={href}
                    className="text-primary hover:underline font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
                // Customize table styles
                table: ({ children }) => (
                  <div className="overflow-x-auto mb-4">
                    <table className="min-w-full border-collapse border border-border">
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="border border-border bg-muted px-4 py-2 text-left font-semibold">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="border border-border px-4 py-2">{children}</td>
                ),
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>
        </CardContent>
      </Card>

      {/* Footer Actions */}
      <div className="mt-8 flex justify-between items-center">
        <Link href="/">
          <Button variant="outline">← Back to Articles</Button>
        </Link>

        {canEdit && (
          <div className="flex items-center gap-2">
            <Link href={`/wiki/edit/${article.id}`} className="cursor-pointer">
              <Button className="cursor-pointer">
                <Edit className="h-4 w-4 mr-2" />
                Edit This Article
              </Button>
            </Link>

            <form action={deleteArticleForm} method="POST">
              <input type="hidden" name="id" value={String(article.id)} />
              <Button
                type="submit"
                variant="destructive"
                className="cursor-pointer"
              >
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
