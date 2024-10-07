import {lazy, Suspense} from "react";
import {Routes, Route} from "react-router-dom";

import Loader from "./components/Loader/Loader";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const PortfolioPage = lazy(() => import("./pages/PortfolioPage/PortfolioPage"));
const BlogPage = lazy(() => import("./pages/BlogPage/BlogPage"));
const ContactPage = lazy(() => import("./pages/ContactPage/ContactPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

const UserRoutes = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/*" element={<NotFoundPage />} />
            </Routes>
        </Suspense>
    )
}

export default UserRoutes;