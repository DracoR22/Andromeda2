import Heading from "@/utils/Heading";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
        <Heading title={`Admin - Andromeda`} description="Andromeda is a platform where sellers can post and sell their products for free without restrictions"
         keywords="e-commerce"/>
          {children}
        </div>
    )
}