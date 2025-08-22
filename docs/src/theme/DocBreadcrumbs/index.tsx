// import React, {type ReactNode} from 'react';
// import DocBreadcrumbs from '@theme-original/DocBreadcrumbs';
// import type DocBreadcrumbsType from '@theme/DocBreadcrumbs';
// import type {WrapperProps} from '@docusaurus/types';

// type Props = WrapperProps<typeof DocBreadcrumbsType>;

// export default function DocBreadcrumbsWrapper(props: Props): ReactNode {
//   return (
//     <>
//       <DocBreadcrumbs {...props} />
//     </>
//   );
// }

import React from 'react';
import OriginalDocBreadcrumbs from '@theme-original/DocBreadcrumbs';
import Link from '@docusaurus/Link';

export default function DocBreadcrumbsWrapper(props) {
  return (
    <div className="breadcrumbsWrapper" style={{ display: 'flex', gap: '0.25rem;',alignItems: 'left' }}>
      {/* Home link */}
      <Link className="breadcrumbs__link" to="/docs/">
        {/* 🏠 */}
      </Link>
      {/* Original breadcrumbs */}
      <OriginalDocBreadcrumbs {...props} />
    </div>
  );
}

