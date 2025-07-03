import Image from "next/image";

function Logo() {
  return (
    <div>
      <Image src={"/logo.png"} alt="logo" width={180} height={50} />
    </div>
  );
}

export default Logo;
