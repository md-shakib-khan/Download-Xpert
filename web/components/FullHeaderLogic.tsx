import { HeaderMegaMenu } from "@/components/Header/HeaderMegaMenu";
import { NavbarNested } from "@/components/SidePanel/NavbarNested";

export default function FullHeaderLogic({ navbarShow }: any) {
  return <div> {navbarShow ? <NavbarNested /> : <HeaderMegaMenu />}</div>;
}
