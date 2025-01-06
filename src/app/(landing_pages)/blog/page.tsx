"use client";

import { useEffect, useState } from "react";
import LazyImage from "@/components/custom-ui/LazyImage";
import { StyleSix } from "@/components/custom-ui/CustomTitle";
import BlogPostCard from "./BlogPostCard";
import { IPost } from "@/abstract/interface";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Masonry from "react-masonry-css";
import axios from "axios";

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState<IPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false); // Add loading state
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/posts`, {
          params: { page: currentPage, limit: 9 }
        });
        const data = response.data;
        router.push(`/blog?page=${currentPage}`);
        setBlogPosts(data.posts);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className="relative">
      <div className="container py-5">
        <div className="relative bg-gradient-to-br from-accent to-primary text-white overflow-hidden rounded-t-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between">
              <div className="lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
                <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                  Explore the World of
                  <span className="block text-primary">Tech & Education</span>
                </h1>
                <p className="text-lg md:text-xl mb-8 text-teal-50 max-w-2xl">
                  Dive into our latest articles covering cutting-edge technology
                  trends, expert programming tips, and transformative educational
                  insights.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#blog-posts"
                    className="bg-primary text-white hover:text-accent transition-colors duration-300 font-semibold py-2 px-6 rounded-full shadow-lg"
                  >
                    Latest Posts
                  </a>
                  <a
                    href="#categories"
                    className="bg-accent text-white hover:bg-white hover:text-primary transition-colors duration-300 font-semibold py-2 px-6 rounded-full"
                  >
                    Categories
                  </a>
                </div>
              </div>
              <div className="hidden sm:block lg:w-1/2 mt-8 lg:mt-0">
                <div className="relative rounded-lg overflow-hidden shadow-2xl">
                  <LazyImage
                    src="/images/posts/blog-hero.png"
                    alt="Blog Hero Image"
                    width={600}
                    height={400}
                    layout="responsive"
                    className="relative rounded-lg shadow-2xl transform hover:scale-110 origin-center transition-transform duration-500 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          <svg
            className="absolute -bottom-1 left-0 right-0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#070f2c"
              fillOpacity="1"
              d="M0,256L48,240C96,224,192,192,288,181.3C384,171,480,181,576,186.7C672,192,768,192,864,170.7C960,149,1056,107,1152,101.3C1248,96,1344,128,1392,144L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>

        <div
          className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mt-10"
          id="blog-posts"
        ></div>
        <StyleSix title="Latest Posts" className="!text-4xl font-bold" />

      </div>

      <div className="container">
        {loading ? ( // Show skeleton effect when loading
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 pt-5">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-300 h-48 mb-4 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <Masonry
            breakpointCols={{ default: 3, 1100: 2, 700: 1 }}
            className="flex w-auto gap-5"
            columnClassName="masonry-grid_column"
          >
              {blogPosts.map((post: IPost) => (
                <BlogPostCard key={post._id} post={post} />
              ))}
          </Masonry>
        )}

        <div className="mt-10 flex justify-between">
          <div className="text-gray-500 text-sm">
            Showing {currentPage} of {totalPages} pages
          </div>
          <div className="gap-2 inline-flex">
            {
              currentPage !== 1 && (
                <>
                  <Button
                    variant={'default'}
                    onClick={handlePrevPage}
                  >
                    Previous
                  </Button>

                  <Button variant={'outline'}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >{currentPage - 1}</Button>
                </>
              )
            }
            <Button variant={'default'}>{currentPage}</Button>

            {
              currentPage !== totalPages && (
                <>
                  <Button variant={'outline'}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >{currentPage + 1}</Button>
                  <Button
                    variant={'default'}
                    onClick={handleNextPage}
                  >
                    Next
                  </Button>
                </>
              )
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
