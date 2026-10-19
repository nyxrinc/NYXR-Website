const paths = {
  arrow: 'M4 12h16M14 6l6 6-6 6',
  down: 'M12 4v16M6 14l6 6 6-6',
  chevron: 'm6 9 6 6 6-6',
  download: 'M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4',
  play: 'm9 5 11 7-11 7Z',
  close: 'm6 6 12 12M6 18 18 6',
  menu: 'M4 7h16M4 12h16M4 17h16',
  chat: 'M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-6 3V6a2 2 0 0 1 2-2ZM7 9h10M7 13h7',
  code: 'm8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18',
  folder: 'M3 5h6l2 3h10v12H3Z',
  cursor: 'm5 3 15 10-8 1-4 7Z',
  voice: 'M9 5a3 3 0 0 1 6 0v7a3 3 0 0 1-6 0ZM5 10v2a7 7 0 0 0 14 0v-2M12 19v3m-4 0h8',
  panel: 'M3 4h18v16H3ZM15 4v16',
  spark: 'm12 2 2.7 7.3L22 12l-7.3 2.7L12 22l-2.7-7.3L2 12l7.3-2.7Z',
  route: 'M5 3v13a4 4 0 0 0 8 0V8a4 4 0 0 1 8 0v13M2 6l3-3 3 3m10 12 3 3 3-3',
  memory: 'M8 3h8v3h3v12h-3v3H8v-3H5V6h3ZM9 9h6v6H9ZM1 9h4m-4 6h4m14-6h4m-4 6h4',
  nodes: 'M12 3v5m0 8v5M3 12h5m8 0h5M8 8l-4-4m12 4 4-4M8 16l-4 4m12-4 4 4M9 9h6v6H9Z',
  sliders: 'M4 7h16M4 17h16M8 4v6m8 4v6',
  timeline: 'M5 3v18M2 6h6m-6 6h6m-6 6h6M11 6h10M11 12h7m-7 6h10',
  check: 'm5 12 4 4L20 5',
  expand: 'M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5',
  shield: 'm12 2 8 3v6c0 5-8 11-8 11S4 16 4 11V5Zm-4 10 3 3 5-6',
};
export default function Icon({ name = 'arrow', size = 20, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={paths[name] || paths.arrow} />
    </svg>
  );
}
