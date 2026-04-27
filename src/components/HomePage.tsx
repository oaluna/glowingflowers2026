import Hero from "@/sections/Hero";
import CuratedPicks from "@/sections/CuratedPicks";
//import BuildBouquet from "@/sections/BuildBouquet";
import HowItWorks from "@/sections/HowItWorks";
import CollectionSpotlight from "@/sections/CollectionSpotlight";
import SeasonalFavorites from "@/sections/SeasonalFavorites";
import Gifting from "@/sections/Gifting";
import Footer from "@/sections/Footer";

export default function HomePage() {
    return (
        <main>
            <Hero />
            <CuratedPicks />
            {/* <BuildBouquet /> */}
            <HowItWorks />
            <CollectionSpotlight />
            <SeasonalFavorites />
            <Gifting />
            <Footer />
        </main>
    )
}