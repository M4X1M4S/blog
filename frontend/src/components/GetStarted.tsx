const GetStarted = () => {
  return (
    <div className="bg-[#f7f4ed] min-h-screen w-screen flex flex-col justify-between">
      <div className="border-b-1 border-gray-900 ">
        <div className="flex justify-between  py-5 w-3/4 items-center mx-auto">
          <div className="font-[gt-super] text-4xl  font-bold tracking-tight">
            Typetide
          </div>
          <div className=" md:flex hidden">
            <div className="inline-flex items-center justify-center font-sans pr-5 mr-4 text-center  hover:cursor-pointer">
              Sign in
            </div>
            <div className="inline-flex items-center justify-center">
              <button className=" text-sm font-semibold font-sans text-white bg-black rounded-4xl px-4 py-2  hover:cursor-pointer">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 font-[gt-super] relative pb-15">
        <div className="flex-col justify-around py-5 w-3/4  mx-auto">
          <div className="mt-25">
            <p className="text-9xl tracking-tighter leading-28">
              Human
              <br />
              stories & ideas
            </p>
          </div>
          <div className="my-10">
            <p className="text-2xl font-sans">
              A place to read, write, and deepen your understanding
            </p>
          </div>
          <div className="inline-flex items-center justify-center">
            <button className="text-2xl font-sans bg-black px-6 py-2 border-1 rounded-4xl text-white">
              Start reading
            </button>
          </div>
        </div>
        <div className="hidden lg:block absolute right-0 top-0">
          <img
            className=" w-[460px] h-[600px]"
            src="https://res.cloudinary.com/dn1u5iskz/image/upload/v1751200722/4_SdjkdS98aKH76I8eD0_qjw_pfgpai.webp"
            alt="img-placeholder"
          />
        </div>
      </div>
      <div className="border-t-1 border-gray-800">
        <div className=" flex  items-center h-16 w-3/4 mx-auto justify-center  ">
          <p className="mx-2">Status</p>
          <p className="mx-2">Help</p>
          <p className="mx-2">About</p>
          <p className="mx-2">Careers</p>
          <p className="mx-2">Press</p>
          <p className="mx-2">Blog</p>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
