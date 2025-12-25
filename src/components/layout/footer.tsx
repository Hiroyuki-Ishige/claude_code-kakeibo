export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center text-sm text-gray-600">
          <p>&copy; {currentYear} Money Tracker. All rights reserved.</p>
          <p className="mt-2">3つの機能だけ。続けられる家計簿</p>
        </div>
      </div>
    </footer>
  );
}
