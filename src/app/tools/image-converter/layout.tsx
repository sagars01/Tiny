import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tiny Image Convertor",
    description: "A simple webp to svg image convertor",
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <div>
            {children}
        </div>
    );
}