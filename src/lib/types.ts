import { FormikErrors, FormikTouched } from "formik";

export interface SearchValue {
  query: string;
}

export interface FormProps {
  name: string;
  title?: string;
  placeholder?: string;
  errors: FormikErrors<SearchValue>;
  touched: FormikTouched<SearchValue>;
}

export interface ChartProps {
  url: string;
  title: string;
  artist: string;
  thumbnail?: string;
}

export interface IChartProps {
  songs: ChartProps[];
  start?: number;
}

export interface ILyricContext {
  url?: string;
  setUrl: (url: string) => void;
}

export interface LyricProps {
  q: string;
  artist: string;
}

export interface SearchProps {
  best: {
    url: string;
    title: string;
    artist: string;
    thumbnail: string;
  };
  rest: ChartProps[];
}
