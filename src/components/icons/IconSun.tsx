import React from "react";

export function IconSun(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0-16 1 3h-2l1-3Zm0 22-1-3h2l-1 3ZM2 13l3-1v2l-3-1Zm22-1-3 1v-2l3 1ZM4.22 4.22 6.34 6.34 4.93 7.75 2.81 5.63l1.41-1.41ZM21.19 18.37l-2.12-2.12 1.41-1.41 2.12 2.12-1.41 1.41ZM2.81 18.37l2.12-2.12 1.41 1.41-2.12 2.12-1.41-1.41ZM22.59 5.63l-2.12 2.12-1.41-1.41 2.12-2.12 1.41 1.41Z"
      />
    </svg>
  );
}