import NavigationBar from "../utilities/navigationbar"

export default function HomepageLayout({
    children,
  } : {
    children: React.ReactNode
  }) {
    return (
      <section>
        <NavigationBar/>
        {children}
      </section>
    )
  }