import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Transaction = {
  id: string;
  amount: number;
  name: string;
  type: string;
  createdAt: string;
  category?: string;
  description?: string;
};
