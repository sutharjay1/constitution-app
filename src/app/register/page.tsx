import Heading from "@/components/Heading";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/NavBar";
import SelectLanguage from "@/components/SelectLanguage";

const Page = () => {
  return (
    <>
      <Navbar />
      <MaxWidthWrapper paddingTop="medium">
        <div className="flex flex-col items-center justify-center">
          {" "}
          <Heading className="text-2xl text-zinc-700 sm:text-3xl">
            What language do you speak?
          </Heading>
          <div className="mt-10 flex w-full max-w-[26rem] items-center justify-center">
            <SelectLanguage />
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default Page;
