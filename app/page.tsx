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
        {`I'm a software engineer with more than 5 years of experience maintaining and developing e-commerce personalization systems and their data pipelines.`}
      </p>
      <p className="mb-4">
        {`I'm an ex-solutions architect, having a broad knowledge of technologies and the know-how of applying them in your organization based on sound capacity planning.`}
      </p>
      <p className="mb-4">
        {`I can help in any part of IT business process, be it system integrations, application and/or service development, research, process improvements and cost-optimization.
      I have technical knowledge in the Geographic Information Systems (GIS) and statistics.`}
      </p>
      <br />
      <div className="flex overflow-auto my-8">
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
        />
      </Link>
    </>
  );
};
