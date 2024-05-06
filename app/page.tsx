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
        I'm a software engineer with more than 5 years of experience maintaining
        and developing personalization systems and data pipelines.
      </p>
      <p className="mb-4">I'm a T-shaped engineer,</p>
      <p className="mb-4">
        broad—like a full-stack developer or solution architect, able to create
        complete solutions and deliver value to your organizations; and
        <br />
        in-depth—for specific field of interest such as back-end, GIS, and
        research engineering.
      </p>

      <p className="mb-4">
        Today, I'm most comfortable with Golang for back-end service
        development. For data management and research, I am comfortable with
        Java, Python, C++. For web development, I'm a React/Typescript person.
      </p>
      <p className="mb-4">Feel free to contact me via LinkedIn.</p>
      <div className="flex overflow-auto my-8 align-middle items-center">
        <Certifications />
      </div>
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
        className="flex-none w-24"
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
        className="flex-none w-24"
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
        className="flex-none w-24"
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
        className="rounded-sm"
      >
        <Image src="/ieee-mb-blue.png" alt="IEEE" width={75} height={75} />
      </Link>
    </>
  );
};
