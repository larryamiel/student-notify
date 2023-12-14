import { Typography } from "@material-tailwind/react";

export function Footer({ brandName, brandLink, routes }) {
  const year = new Date().getFullYear();

  return (
    <footer className="py-2">
      <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
        <Typography variant="small" className="font-normal text-inherit">
          &copy; Copyright {year}
        </Typography>
      </div>
    </footer>
  );
};

Footer.displayName = "/src/widgets/layout/footer.jsx";

export default Footer;
