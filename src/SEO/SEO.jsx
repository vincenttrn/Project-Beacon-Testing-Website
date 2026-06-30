import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://projectbeacon.org.au";

export default function SEO({ title, description, image }) {
  const location = useLocation();

  const path = location.pathname.endsWith("/")
    ? location.pathname.slice(0, -1)
    : location.pathname;

  const canonical = path === "" ? `${BASE_URL}/` : `${BASE_URL}${path}`;

  const defaultTitle = "Project Beacon";
  const defaultDescription =
    "Project Beacon delivers hands-on robotics STEM incursions for schools across Sydney. Students build and program real robots.";
  const defaultImage = `${BASE_URL}/logo/pb_v2.png`;

  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalImage = image || defaultImage;

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{finalTitle}</title>
      <link rel="canonical" href={canonical} />
      <meta name="description" content={finalDescription} />

      {/* Open Graph */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Project Beacon" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
    </Helmet>
  );
}