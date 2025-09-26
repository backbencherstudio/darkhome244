import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    scrollTargetRef?: React.RefObject<HTMLElement>;
}

export default function PaginationComponent({
    currentPage,
    totalPages,
    onPageChange,
    scrollTargetRef,
}: PaginationProps) {

    const handlePageChange = (page: number) => {
        onPageChange(page);

        if (typeof window === "undefined") return;

        requestAnimationFrame(() => {
            const el = scrollTargetRef?.current;
            if (el?.scrollIntoView) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
            } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        });
    };
    

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        className={`w-8 h-8 rounded-[8px] border border-[#C9C9C9] text-[#C9C9C9] hover:bg-gray-100 hover:text-[#004D49] transition duration-300 ease-in-out cursor-pointer ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    />
                </PaginationItem>

                {/* First 2 pages */}
                {[1, 2].map(
                    (page) =>
                        page <= totalPages && (
                            <PaginationItem key={page}>
                                <PaginationLink
                                    onClick={() => handlePageChange(page)}
                                    isActive={currentPage === page}
                                    className={`w-8 h-8 rounded-[8px] transition duration-300 ease-in-out cursor-pointer ${currentPage === page
                                        ? "bg-[#161A1E] text-white border-none"
                                        : "border border-[#C9C9C9] text-[#C9C9C9] hover:bg-gray-100 hover:text-[#004D49]"
                                        }`}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        )
                )}

                {/* Show ellipsis and current page if beyond page 2 */}
                {currentPage > 2 && currentPage < totalPages && (
                    <>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink
                                onClick={() => handlePageChange(currentPage)}
                                isActive={true}
                                className="w-8 h-8 rounded-[8px] bg-[#D1DFDE] text-[#004D49] border-none transition duration-300 ease-in-out cursor-pointer"
                            >
                                {currentPage}
                            </PaginationLink>
                        </PaginationItem>
                    </>
                )}

                {/* Show ellipsis before last page if needed */}
                {currentPage < totalPages - 1 && totalPages > 3 && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}

                {/* Last page */}
                {totalPages > 2 && (
                    <PaginationItem>
                        <PaginationLink
                            onClick={() => handlePageChange(totalPages)}
                            isActive={currentPage === totalPages}
                            className={`w-8 h-8 rounded-[8px] transition duration-300 ease-in-out cursor-pointer ${currentPage === totalPages
                                ? "bg-[#D1DFDE] text-[#004D49] border-none"
                                : "border border-[#C9C9C9] text-[#C9C9C9] hover:bg-gray-100 hover:text-[#004D49]"
                                }`}
                        >
                            {totalPages}
                        </PaginationLink>
                    </PaginationItem>
                )}

                <PaginationItem>
                    <PaginationNext
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        className={`w-8 h-8 rounded-[8px] border border-[#C9C9C9] text-[#C9C9C9] hover:bg-gray-100 hover:text-[#004D49] transition duration-300 ease-in-out cursor-pointer ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}