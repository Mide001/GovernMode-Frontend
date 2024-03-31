import { ConnectButton } from "@rainbow-me/rainbowkit";
import Logo from "../assets/Encryten-logo.png";
import Image from "next/image";
import Link from "next/link";

const DaoNavbar = () => {
  return (
    <>
      <nav className="py-2 md:py-2">
        <div className="container mx-auto flex items-center justify-between border-b border-gray-300 py-2 pl-2">
          <div>
            <Link href="/">
              <Image src={Logo} alt="Encrypten Logo" className="w-16 h-5" />
            </Link>
          </div>

          <div className="mr-2">
            <ConnectButton
              accountStatus={{
                smallScreen: "avatar",
                largeScreen: "full",
              }}
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default DaoNavbar;