export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p>&copy; {currentYear} Tomas Rojder. All rights reserved.</p>
    </footer>
  );
}
