/**
 * Elegant gradient placeholder used whenever a project image is
 * missing or fails to load. Keeps the 16:9 layout stable.
 */
export default function PlaceholderGradient({ label = '', className = '' }) {
  const initial = (label || '?').trim().charAt(0).toUpperCase();
  return (
    <div
      aria-hidden="true"
      className={[
        'relative flex h-full w-full items-center justify-center overflow-hidden',
        'bg-gradient-to-br from-indigo-500/20 via-slate-800 to-emerald-500/10',
        className,
      ].join(' ')}
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 25%, rgba(99,102,241,0.35), transparent 42%),' +
            'radial-gradient(circle at 80% 80%, rgba(16,185,129,0.25), transparent 46%)',
        }}
      />
      <span className="relative select-none text-5xl font-black text-white/10">{initial}</span>
    </div>
  );
}