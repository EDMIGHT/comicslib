import {
  AlertTriangle,
  BookCopy,
  Bookmark,
  BookMarked,
  BookOpen,
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  ChevronsUpDown,
  Eraser,
  Filter,
  FolderOpen,
  Github,
  HeartCrack,
  History,
  Home,
  Library,
  ListPlus,
  Loader2,
  LogOut,
  LucideIcon,
  LucideProps,
  Maximize2,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Orbit,
  Palette,
  PlusCircle,
  Scale,
  Search,
  Star,
  Trash2,
  Twitter,
  Upload,
  UploadCloud,
  User2,
  Users,
  X,
} from 'lucide-react';

// type IconType = {
//   [key: string]: (props: LucideProps) => JSX.Element;
// };
export type Icon = LucideIcon;

export const Icons = {
  add: PlusCircle,
  back: ChevronLeft,
  bookmark: Bookmark,
  calendar: CalendarIcon,
  chevronUpDown: ChevronsUpDown,
  cleaning: Eraser,
  close: X,
  comment: MessageCircle,
  community: Users,
  crackedHeart: HeartCrack,
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
  delete: Trash2,
  logOut: LogOut,
  listPlus: ListPlus,
  filter: Filter,
  folder: FolderOpen,
  follows: BookMarked,
  github: Github,
  google: ({ ...props }: LucideProps) => (
    <svg
      aria-hidden='true'
      focusable='false'
      data-prefix='fab'
      data-icon='discord'
      role='img'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 488 512'
      {...props}
    >
      <path
        fill='currentColor'
        d='M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z'
      ></path>
    </svg>
  ),
  history: History,
  home: Home,
  library: Library,
  link: ChevronsRight,
  loading: Loader2,
  logo: Orbit,
  maximize: Maximize2,
  more: MoreHorizontal,
  menu: Menu,
  next: ChevronRight,
  nextjs: (props: LucideProps) => (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {...props}>
      <path
        fill='currentColor'
        d='M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z'
      />
    </svg>
  ),
  palette: Palette,
  read: BookOpen,
  rules: Scale,
  search: Search,
  star: Star,
  titles: BookCopy,
  twitter: Twitter,
  uploadCloud: UploadCloud,
  upload: Upload,
  user: User2,
  warning: AlertTriangle,
};
