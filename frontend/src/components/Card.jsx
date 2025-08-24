export default function Card({ title, children, actions }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      {title && <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        {actions}
      </div>}
      <div>{children}</div>
    </div>
  );
}

