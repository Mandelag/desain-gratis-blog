import { BlogPosts } from "app/components/posts";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Hi, I'm Keenan
      </h1>
      <p className="mb-4">
        Creative problem solver in software, data, and research engineering.
      </p>
      <p className="mb-4">
        Professional software engineer with 8+ years of experience, with broad
        enough skillsets to create values, while maintaining specialty in
        backend service development and research engineering.
      </p>
      <p className="mb-4">
        Today, I'm most comfortable with Golang for back-end service
        development. For data management and research, I am comfortable with
        Java, Python, C++. For web development, I'm a React/Typescript person.
      </p>
      <p className="mb-4">
        Feel free to contact me via{" "}
        <Link
          href="https://www.linkedin.com/in/keenan-gebze/"
          rel="noopener noreferrer"
          target="_blank"
          className="underline "
        >
          LinkedIn
        </Link>
        .
      </p>
      <div className="flex overflow-auto my-8 align-middle items-center">
        <Certifications />
      </div>
      <p className="mb-4 text-xs text-slate-400">
        <b>Ceritifications and achievements</b>, from left-to-right. ArcGIS
        Developer Certified (2017), Oracle Certified Java 8 Associate (2018),
        IBM Principles of Reactive Programming certified (2018), Author of IEEE
        indexed paper, "The positional accuracy of crowdsourced geographic data
        from open source web GIS" (2017), co-editor of "Creative Greenfoot" book
        by Michael Haungs (2015), and Winner of "Greenfoot Codepoint 2008" game
        development contest (2008) category under-16.
      </p>
      <br />
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}

const Certifications = () => {
  return (
    <>
      <Link
        href="https://www.credly.com/badges/17f47fb6-e881-44b5-aa3b-da0091706a29"
        target="_blank"
        className="rounded-sm p-4"
      >
        <Image
          src="/esri-addc.png"
          alt="esri certified arcgis developer"
          width={75}
          height={75}
          className="rounded-sm"
        />
      </Link>
      <Link
        href="https://www.credly.com/badges/6091bf3b-d926-424d-9456-bf977156fa15"
        target="_blank"
        className="rounded-sm p-4"
      >
        <Image
          src="/oracle-sa.png"
          alt="oracle certified associate"
          width={75}
          height={75}
          className="rounded-sm"
        />
      </Link>
      <Link
        href="https://www.credly.com/badges/a1743b48-bd75-466a-aeca-ff818690d288"
        target="_blank"
        className="rounded-sm p-4"
      >
        <Image
          src="/ibm-pora-cc.png"
          alt="IBM principles of reactive architecture"
          width={75}
          height={75}
          className="rounded-sm"
        />
      </Link>
      <Link
        href="https://ieeexplore.ieee.org/document/8280674"
        target="_blank"
        className="rounded-sm p-4"
      >
        <Image src="/ieee-mb-blue.png" alt="IEEE" width={75} height={75} />
      </Link>
      <Link
        href="https://www.packtpub.com/product/creative-greenfoot-raw/9781783980383"
        target="_blank"
        className="rounded-sm p-4"
      >
        <Image
          src="/creative-greenfoot.png"
          alt="creative greenfoot"
          width={75}
          height={75}
        />
      </Link>
      <Link
        href="https://www.greenfootgallery.org/winners/"
        target="_blank"
        className="rounded-sm"
      >
        <Image src="/greenfoot.png" alt="greenfoot" width={75} height={75} />
      </Link>
    </>
  );
};
