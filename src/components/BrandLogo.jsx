export default function BrandLogo({ size = 28 }) {
  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      <span
        style={{ width: size, height: size }}
        className="inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-container text-white shadow-sm shrink-0"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
          <path d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3zm0 13.73L4.53 12.6V16c0 2.76 3.34 5 7.47 5s7.47-2.24 7.47-5v-3.4L12 16.73z" />
        </svg>
      </span>
      <span className="font-bold text-[17px] tracking-tight text-primary">DoubtBridge</span>
    </span>
  );
}
