// docs/src/theme/DocBreadcrumbs/index.tsx
import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useSidebarBreadcrumbs} from '@docusaurus/plugin-content-docs/client';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import DocBreadcrumbsStructuredData from '@theme/DocBreadcrumbs/StructuredData';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import IconHome from '@theme/Icon/Home';

import styles from './styles.module.css';

// Simple link item used in the trail
function BreadcrumbsItemLink({
  children,
  href,
  isLast,
}: {
  children: ReactNode;
  href: string | undefined;
  isLast: boolean;
}): ReactNode {
  const className = 'breadcrumbs__link';
  if (isLast) return <span className={className}>{children}</span>;
  return href ? (
    <Link className={className} href={href}>
      <span>{children}</span>
    </Link>
  ) : (
    <span className={className}>{children}</span>
  );
}

function BreadcrumbsItem({
  children,
  active,
}: {
  children: ReactNode;
  active?: boolean;
}): ReactNode {
  return (
    <li
      className={clsx('breadcrumbs__item', {
        'breadcrumbs__item--active': active,
      })}
    >
      {children}
    </li>
  );
}

export default function DocBreadcrumbs(): ReactNode {
  const breadcrumbs = useSidebarBreadcrumbs();
  const {siteConfig} = useDocusaurusContext();
  const appBaseUrl =
    (siteConfig as any)?.customFields?.appBaseUrl ?? 'http://localhost:5173';

  if (!breadcrumbs) return null;

  return (
    <>
      <DocBreadcrumbsStructuredData breadcrumbs={breadcrumbs} />
      <nav
        className={clsx(
          ThemeClassNames.docs.docBreadcrumbs,
          styles.breadcrumbsContainer,
        )}
        aria-label={translate({
          id: 'theme.docs.breadcrumbs.navAriaLabel',
          message: 'Breadcrumbs',
          description: 'The ARIA label for the breadcrumbs',
        })}
      >
        <ul className="breadcrumbs">
          {/* Home icon: always render, go to your app's Welcome */}
          <li className="breadcrumbs__item">
            <a
              className="breadcrumbs__link"
              href={`${appBaseUrl}/welcome`} // اگر روتت چیز دیگری است، همین‌جا عوض کن
              target="_top"
              rel="noopener noreferrer"
              aria-label={translate({
                id: 'theme.docs.breadcrumbs.home',
                message: 'Home page',
                description:
                  'The ARIA label for the home page in the breadcrumbs',
              })}
            >
              <IconHome className={styles.breadcrumbHomeIcon} />
            </a>
          </li>

          {/* Rest of the trail */}
          {breadcrumbs.map((item, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            const href =
              item.type === 'category' && item.linkUnlisted
                ? undefined
                : item.href;
            return (
              <BreadcrumbsItem key={idx} active={isLast}>
                <BreadcrumbsItemLink href={href} isLast={isLast}>
                  {item.label}
                </BreadcrumbsItemLink>
              </BreadcrumbsItem>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
