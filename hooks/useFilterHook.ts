import { useEffect, useMemo, useState } from "react";

export const useFilterPagination = <T>(dataList: T[], itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil((dataList?.length ?? 0) / itemsPerPage));

  useEffect(() => {
    setCurrentPage((p) => Math.min(Math.max(1, p), totalPages));
  }, [totalPages]);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return dataList.slice(start, start + itemsPerPage);
  }, [dataList, currentPage, itemsPerPage]);

  return {
    currentItems,
    currentPage,
    totalPages,
    setCurrentPage,
  };
};
