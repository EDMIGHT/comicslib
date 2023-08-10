import {
  Bookmark,
  BookMarked,
  BookOpen,
  ChevronsRight,
  ChevronsUpDown,
  FolderOpen,
  Github,
  History,
  Home,
  Library,
  ListPlus,
  Loader2,
  LucideProps,
  Menu,
  MessageCircle,
  Orbit,
  PlusCircle,
  Search,
  Star,
  Twitter,
  UploadCloud,
  X,
} from 'lucide-react';

type IconType = {
  [key: string]: (props: LucideProps) => JSX.Element;
};
export const Icons: IconType = {
  logo: (props: LucideProps) => <Orbit {...props} />,
  menu: (props: LucideProps) => <Menu {...props} />,
  close: (props: LucideProps) => <X {...props} />,
  loading: (props: LucideProps) => <Loader2 {...props} />,
  search: (props: LucideProps) => <Search {...props} />,
  link: (props: LucideProps) => <ChevronsRight {...props} />,
  read: (props: LucideProps) => <BookOpen {...props} />,
  add: (props: LucideProps) => <PlusCircle {...props} />,
  upload: (props: LucideProps) => <UploadCloud {...props} />,
  folder: (props: LucideProps) => <FolderOpen {...props} />,
  listPlus: (props: LucideProps) => <ListPlus {...props} />,
  history: (props: LucideProps) => <History {...props} />,
  home: (props: LucideProps) => <Home {...props} />,
  titles: (props: LucideProps) => <Library {...props} />,
  follows: (props: LucideProps) => <BookMarked {...props} />,
  star: (props: LucideProps) => <Star {...props} />,
  bookmark: (props: LucideProps) => <Bookmark {...props} />,
  comment: (props: LucideProps) => <MessageCircle {...props} />,
  chevronUpDown: (props: LucideProps) => <ChevronsUpDown {...props} />,
  github: (props: LucideProps) => <Github {...props} />,
  discord: (props: LucideProps) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='32'
      height='32'
      fill='none'
      viewBox='0 0 32 32'
      {...props}
    >
      <path
        fill='currentColor'
        d='M13.416 13.394c-.905 0-1.62.794-1.62 1.763 0 .97.731 1.764 1.62 1.764.905 0 1.619-.795 1.619-1.764.016-.969-.714-1.763-1.62-1.763Zm5.793 0c-.904 0-1.619.794-1.619 1.763 0 .97.73 1.764 1.62 1.764.904 0 1.619-.795 1.619-1.764s-.715-1.763-1.62-1.763Z'
      ></path>
      <path
        fill='currentColor'
        d='M26.924.066H5.654A3.263 3.263 0 0 0 2.4 3.338v21.478a3.263 3.263 0 0 0 3.254 3.273h18l-.841-2.94 2.032 1.891 1.92 1.78 3.413 3.018v-28.5A3.263 3.263 0 0 0 26.924.066Zm-6.127 20.747s-.572-.683-1.048-1.287c2.08-.587 2.873-1.89 2.873-1.89a9.09 9.09 0 0 1-1.825.937c-.794.334-1.556.556-2.302.683a11.09 11.09 0 0 1-4.11-.016 13.31 13.31 0 0 1-2.334-.683 9.3 9.3 0 0 1-1.159-.54c-.047-.032-.095-.048-.143-.08-.032-.015-.047-.031-.063-.047-.286-.159-.445-.27-.445-.27s.762 1.27 2.778 1.874c-.476.604-1.063 1.319-1.063 1.319-3.508-.111-4.842-2.415-4.842-2.415 0-5.115 2.286-9.261 2.286-9.261 2.286-1.716 4.46-1.668 4.46-1.668l.16.19c-2.858.826-4.176 2.081-4.176 2.081s.35-.19.937-.46c1.698-.747 3.048-.953 3.603-1.001.095-.016.175-.032.27-.032a13.419 13.419 0 0 1 3.206-.032c1.508.175 3.127.62 4.778 1.525 0 0-1.254-1.191-3.952-2.017l.222-.254s2.175-.048 4.46 1.668c0 0 2.286 4.146 2.286 9.261 0 0-1.35 2.304-4.857 2.415Z'
      ></path>
    </svg>
  ),
  twitter: (props: LucideProps) => <Twitter {...props} />,
};
