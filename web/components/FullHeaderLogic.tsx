import { HeaderMenu } from "@/components/Header/HeaderMenu";
import { NavbarNested } from "@/components/SidePanel/NavbarNested";

export default function FullHeaderLogic({ navbarShow }: any) {
  return <div> {navbarShow ? <NavbarNested /> : <HeaderMenu />}</div>;
}
