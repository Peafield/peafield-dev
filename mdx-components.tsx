import Link from 'next/link';
import { ComponentPropsWithoutRef } from 'react';

type AnchorProps = ComponentPropsWithoutRef<'a'>;

// `prose` (@tailwindcss/typography) styles standard Markdown elements site-wide,
// so we only override what prose can't do:
//  - `a`: client-side routing for internal links / safe external links
//  - `Table`: a custom component invoked explicitly in MDX, not a Markdown element
const components = {
  a: ({ href, children, ...props }: AnchorProps) => {
    if (href?.startsWith('/')) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }
    if (href?.startsWith('#')) {
      return (
        <a href={href} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <table>
      <thead>
        <tr>
          {data.headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}
