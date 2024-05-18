import NavBar from "../components/navbar"

export default function AboutLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
        <section>
     <NavBar/>
   
        {children}
      </section>
    )
  }