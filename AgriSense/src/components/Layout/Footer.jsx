export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full mt-auto border-t border-gray-100 bg-white py-5 text-center">
      <div className="mx-auto max-w-4xl px-4">
        <p className="text-sm text-gray-500">
          🌾 &nbsp;AgriSense Expert System &nbsp;·&nbsp; Team MindCraft &nbsp;·&nbsp; {year}
        </p>
        <p className="mt-1 text-xs text-gray-400">
          Diagnoses are advisory only. Always consult a qualified agronomist for confirmation.
        </p>
      </div>
    </footer>
  );
}
