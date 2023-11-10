import {twMerge,} from 'tailwind-merge';
import { ReactNode } from 'react';

export default function TableHead(props: { readonly children: ReactNode, readonly classes?: string }) {
  const { children, classes } = props;

  return (
    <th scope="col" className={twMerge("tableTh", classes)}>
      {children}
    </th>
  );
}
