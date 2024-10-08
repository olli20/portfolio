import {lazy, Suspense} from "react";
import {Routes, Route} from "react-router-dom";

import {Loader} from "./components/Loader/Loader";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const PortfolioPage = lazy(() => import("./pages/PortfolioPage/PortfolioPage"));
const BlogPage = lazy(() => import("./pages/BlogPage/BlogPage"));
const BlogEnteryPage = lazy(() => import("./pages/BlogEnteryPage/BlogEnteryPage"));
const ContactPage = lazy(() => import("./pages/ContactPage/ContactPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

export const UserRoutes = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Routes basename="/portfolio">
                <Route path="/" element={<HomePage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:blogId" element={<BlogEnteryPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/*" element={<NotFoundPage />} />
            </Routes>
        </Suspense>
    )
};