"use client";

import ReactMarkdown from "react-markdown";

interface MarkdownProps {
  content: string;
  className?: string;
  size?: "sm" | "base" | "lg" | "xl";
}

/**
 * Reusable Markdown Component
 * Renders markdown content with consistent styling
 */
export default function Markdown({
  content,
  className = "",
  size = "base",
}: MarkdownProps) {
  const sizeClasses = {
    sm: "text-sm",
    base: "text-base sm:text-lg",
    lg: "text-base sm:text-lg md:text-xl",
    xl: "text-base sm:text-lg md:text-xl lg:text-2xl",
  };

  return (
    <div
      className={`space-y-4 ${sizeClasses[size]} text-foreground leading-relaxed prose prose-lg max-w-none ${className}`}
    >
      <ReactMarkdown
        components={{
          p: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
          h1: ({ children }) => (
            <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-4 mt-6 first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-3 mt-5 first:mt-0">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg sm:text-xl font-bold text-primary mb-2 mt-4 first:mt-0">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-base sm:text-lg font-bold text-primary mb-2 mt-3 first:mt-0">
              {children}
            </h4>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-4 space-y-2 ml-4">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="text-foreground">{children}</li>,
          strong: ({ children }) => (
            <strong className="font-semibold text-primary">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-foreground">{children}</em>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-primary underline hover:text-primary/80 transition-colors"
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">
              {children}
            </blockquote>
          ),
          code: ({ children, className }) => {
            const isInline = !className;
            return isInline ? (
              <code className="bg-primary/10 text-primary px-1.5 py-0.5 rounded text-sm font-mono">
                {children}
              </code>
            ) : (
              <code className="block bg-primary/10 text-primary p-4 rounded-lg text-sm font-mono overflow-x-auto">
                {children}
              </code>
            );
          },
          hr: () => <hr className="border-t border-primary/20 my-6" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
