export default function TechBadge({ children, className = '' }) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-md border border-slate-800 bg-slate-900/70',
        'px-2.5 py-1 text-xs font-medium text-slate-300',
        className,
      ].join(' ')}
    >
      {children}
    </span>
  );
}